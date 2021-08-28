const util = require("../util");

module.exports = {
    name: "move",
    aliases: ["mv"],
    exec: async (msg, args) => {
        const { music } = msg.guild;
        const from = args[0] ? parseInt(args[0], 10) : null;
        const to = args[1] ? parseInt(args[1], 10) : null;
        if (!music.player || !music.player.playing) return msg.channel.send(util.embed().setAuthor(" |  Currently Not Playing Anything", msg.client.user.displayAvatarURL()));
        if (!music.queue.length) return msg.channel.send(util.embed().setDescription(" | Queue Is Empty."));

        if (!msg.member.voice.channel)
            return msg.channel.send(util.embed().setAuthor(" |  You Aren't Connected To A Voice channel", msg.client.user.displayAvatarURL()));
        if (msg.guild.me.voice.channel && !msg.guild.me.voice.channel.equals(msg.member.voice.channel))
            return msg.channel.send(util.embed().setDescription(" |  You Aren't Connected To The Same Voice Channel As I Am"));

        if (from === null || to === null)
            return msg.channel.send(util.embed().setAuthor(` |  Please Check. Example Usage e.g. \`${msg.client.prefix}Move 2 1\``, msg.client.user.displayAvatarURL()));

        if (from === to || (isNaN(from) || from < 1 || from > music.queue.length) || (isNaN(to) || to < 1 || to > music.queue.length))
            return msg.channel.send(util.embed().setAuthor(" |  Number Is Invalid Or Exceeds Queue Length.", msg.client.user.displayAvatarURL()));

        const moved = music.queue[from - 1];

        util.moveArrayElement(music.queue, from - 1, to - 1);

        msg.channel.send(util.embed()
            .setAuthor(" |  Moved ",  msg.client.user.displayAvatarURL())
            .setDescription(`**${moved.info.title}](${moved.info.uri}) to \`${to}\``)
        );
    }
};
