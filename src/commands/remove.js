const util = require("../util");

module.exports = {
    name: "remove",
    aliases: ["rm","r"],
    exec: async (msg, args) => {
        const { music } = msg.guild;
        if (!music.player || !music.player.playing) return msg.channel.send(util.embed().setAuthor(" |   Currently Not Playing anything", msg.client.user.displayAvatarURL()));
        if (!music.queue.length) return msg.channel.send(util.embed().setAuthor(" |   Please Type In A Number To Remove From The Queue",  msg.client.user.displayAvatarURL()));

        if (!msg.member.voice.channel)
            return msg.channel.send(util.embed().setAuthor(" |   You aren't connected to a voice channel.",  msg.client.user.displayAvatarURL()));
        if (msg.guild.me.voice.channel && !msg.guild.me.voice.channel.equals(msg.member.voice.channel))
            return msg.channel.send(util.embed().setAuthor(" |   You Aren't Connected To The Same Voice Channel As I Am", msg.client.user.displayAvatarURL()));

        if (!args[0]) return msg.channel.send(util.embed().setAuthor(" |   Please Type In A Number To Remove From The Queue",  msg.client.user.displayAvatarURL()));

        let iToRemove = parseInt(args[0], 10);
        if (isNaN(iToRemove) || iToRemove < 1 || iToRemove > music.queue.length)
            return msg.channel.send(util.embed().setAuthor(" |   Please Provide Correct Number To Remove The Song",  msg.client.user.displayAvatarURL()));


        const removed = music.queue.splice(--iToRemove, 1)[0];
        msg.channel.send(util.embed()
            .setAuthor(" |   Removed From The Queue", msg.client.user.displayAvatarURL())
            .setDescription(` [${removed.info.title}](${removed.info.uri})`)
        );
    }
};
