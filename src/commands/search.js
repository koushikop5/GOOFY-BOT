const util = require("../util");

module.exports = {
    name: "search",
    aliases: ["sc","Sc","Sh","sh"],
    exec: async (msg, args) => {
        const { music } = msg.guild;
        if (!msg.member.voice.channel)
            return msg.channel.send(util.embed().setAuthor(" |   You not connected to a voice channel", msg.client.user.displayAvatarURL()));
        if (msg.guild.me.voice.channel && !msg.guild.me.voice.channel.equals(msg.member.voice.channel))
            return msg.channel.send(util.embed().setAuthor(" |   You not Connected To The Same Voice Channel", msg.client.user.displayAvatarURL()));

        const missingPerms = util.missingPerms(msg.guild.me.permissionsIn(msg.member.voice.channel), ["CONNECT", "SPEAK"]);
        if ((!music.player || !music.player.playing) && missingPerms.length)
            return msg.channel.send(util.embed().setDescription(`<a:dis_1:856857396444921866> | I need ${missingPerms.length > 1 ? "these" : "this"} permission${missingPerms.length > 1 ? "s" : ""} on your voice channel: ${missingPerms.map(x => `\`${x}\``).join(", ")}.`));

        if (!music.node || !music.node.connected)
            return msg.channel.send(util.embed().setDescription("<a:dis_1:856857396444921866> | Lavalink node not connected."));

        const query = args.join(" ");
        if (!query) return msg.channel.send(util.embed().setAuthor(" |   Please Type In Something To Search", msg.client.user.displayAvatarURL()));

        try {
            let { tracks } = await music.load(`ytsearch:${query}`);
            if (!tracks.length) return msg.channel.send(util.embed().setAuthor(" |  Couldn't find any results.", msg.client.user.displayAvatarURL()));

            tracks = tracks.slice(0, 10);

            const resultMessage = await msg.channel.send(util.embed()
                .setAuthor("Search Result", msg.client.user.displayAvatarURL())
                .setDescription(tracks.map((x, i) => `\`${++i}.\` [${x.info.title}](${x.info.uri})`))
                .setFooter("Select from 1 to 10 or type \"cancel\" to cancel the command."));

            const collector = await awaitMessages();
            if (!collector) return resultMessage.edit(util.embed().setAuthor(" | Time is up Better Luck Next Time!", msg.client.user.displayAvatarURL()));
            const response = collector.first();

            if (response.deletable) response.delete();

            if (/^cancel$/i.exec(response.content))
                return resultMessage.edit(util.embed().setAuthor(" |  Cancelled", msg.client.user.displayAvatarURL()));

            const track = tracks[response.content - 1];
            track.requester = msg.author;
            music.queue.push(track);

            if (music.player && music.player.playing) {
                resultMessage.edit(util.embed()
                    .setAuthor(" |   Queued", music.client.user.displayAvatarURL())
                    .setDescription(`[${track.info.title}](${track.info.uri})`)
                );
            } else {
                resultMessage.delete();
            }

            if (!music.player) await music.join(msg.member.voice.channel);
            if (!music.player.playing) await music.start();

            music.setTextCh(msg.channel);
        } catch (e) {
            msg.channel.send(`An error occured: ${e.message}.`);
        }

        async function awaitMessages() {
            try {
                const collector = await msg.channel.awaitMessages(
                    m => m.author.equals(msg.author) && (/^cancel$/i.exec(m.content) || (!isNaN(parseInt(m.content, 10)) && (m.content >= 1 && m.content <= 10))),
                    {
                        time: 10000,
                        max: 1,
                        errors: ["time"]
                    }
                );
                return collector;
            } catch {
                return null;
            }
        }
    }
};
