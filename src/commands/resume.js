const util = require("../util");

module.exports = {
    name: "resume",
    aliases: ["res","re"],
    exec: async (msg) => {
        const { music } = msg.guild;
        if (!music.player || !music.player.playing) return msg.channel.send(util.embed().setAuthor(" |   Currently Not Playing Anything.", msg.client.user.displayAvatarURL()));
        if (!msg.member.voice.channel)
            return msg.channel.send(util.embed().setAuthor(" |   You aren't connected to a voice channel", msg.client.user.displayAvatarURL()));
        if (msg.guild.me.voice.channel && !msg.guild.me.voice.channel.equals(msg.member.voice.channel))
            return msg.channel.send(util.embed().setAuthor(" |   You not connected to the same voice channel"));

        try {
            await music.resume();
            msg.react("<a:dis_t:856857286264619018>").catch(e => e);
        } catch (e) {
            msg.channel.send(`An error occured: ${e.message}.`);
        }
    }
};
