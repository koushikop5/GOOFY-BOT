const util = require("../util");

module.exports = {
    name: "shuffle",
    aliases: ["sf","Sf"],
    exec: async (msg) => {
        const { music } = msg.guild;
        if (!music.player || !music.player.playing) return msg.channel.send(util.embed().setAuthor(" |   Currently Not Playing anything", msg.client.user.displayAvatarURL()));
        if (!music.queue.length) return msg.channel.send(util.embed().setAuthor(" |   Queue is empty.", msg.client.user.displayAvatarURL()));
        if (!msg.member.voice.channel)
            return msg.channel.send(util.embed().setAuthor(" |   You aren't connected to a voice channel.",  msg.client.user.displayAvatarURL()));
        if (msg.guild.me.voice.channel && !msg.guild.me.voice.channel.equals(msg.member.voice.channel))
            return msg.channel.send(util.embed().setAuthor(" |   You Aren't Connected To The Same Voice Channel As I Am", msg.client.user.displayAvatarURL()));

        music.queue = util.shuffleArray(music.queue);

        msg.channel.send(util.embed().setAuthor(` |   Queue shuffled! Type ${msg.client.prefix} queue to see changes.`, msg.client.user.displayAvatarURL()));
    }
};
