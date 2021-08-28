const util = require("../util");
const Discord = require("discord.js")
const { MessagesEmbed } = require("discord.js")
module.exports = {
    name: "play",
    aliases: ["p", "P"],
    exec: async (msg, args) => {
        const { music } = msg.guild;
        if (!msg.member.voice.channel)
            return msg.channel.send(util.embed().setDescription("<a:error:864210015275188225> |  You aren't connected to a voice channel", msg.client.user.displayAvatarURL()));
        if (msg.guild.me.voice.channel && !msg.guild.me.voice.channel.equals(msg.member.voice.channel))
            return msg.channel.send(util.embed().setDescription("<a:error:864210015275188225> | You not connected to the same voice channel"));

        const missingPerms = util.missingPerms(msg.guild.me.permissionsIn(msg.member.voice.channel), ["CONNECT", "SPEAK"]);
        if ((!music.player || !music.player.playing) && missingPerms.length)
            return msg.channel.send(util.embed().setDescription(`<a:error:864210015275188225> |   I need ${missingPerms.length > 1 ? "these" : "this"} permission${missingPerms.length > 1 ? "s" : ""} on your voice channel: ${missingPerms.map(x => `\`${x}\``).join(", ")}.`,msg.client.user.displayAvatarURL()));

        if (!music.node || !music.node.connected)
            return msg.channel.send(util.embed().setDescription("<a:dis_1:856857396444921866> | Lavalink node not connected."));

        const query = args.join(" ");
        if (!query) return msg.channel.send(util.embed().setDescription("<a:error:864210015275188225> | Please Type In Something To Play"));

        try {
            const { loadType, playlistInfo: { name }, tracks } = await music.load(util.isValidURL(query) ? query : `ytsearch:${query}`);
            if (!tracks.length) return msg.channel.send(util.embed().setAuthor("<a:error:864210015275188225> |  Provide A Correct Link Or Type Song Name To Play"));
            
            if (loadType === "PLAYLIST_LOADED") {
                for (const track of tracks) {
                    track.requester = msg.author;
                    music.queue.push(track);
                }
                msg.channel.send(util.embed().setAuthor(` Loaded ${tracks.length} tracks from ${name}.`, msg.client.user.displayAvatarURL()));
            } else {
                const track = tracks[0];
                track.requester = msg.author;
                music.queue.push(track);
                if (music.player && music.player.playing) 
                    msg.channel.send(util.embed()
                        
                        .setDescription(`Queued [${track.info.title}](${track.info.uri})`)
                    );
            }
            
            if (!music.player) await music.join(msg.member.voice.channel);
            if (!music.player.playing) await music.start();

            music.setTextCh(msg.channel);
        } catch (e) {
            msg.channel.send(`<a:error:864210015275188225> | An error occured: ${e.message}.`);
        }
    }
};
