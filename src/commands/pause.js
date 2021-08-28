  
const util = require("../util");

module.exports = {
    name: "pause",
    aliases: ["pa"],
    exec: async (msg) => {
        const { music } = msg.guild;
        if (!music.player || !music.player.playing) return msg.channel.send(util.embed().setAuthor("Currently not playing anything."));
        if (!msg.member.voice.channel)
            return msg.channel.send(util.embed().setAuthor(" |  You not connected to a voice channel"));
        if (msg.guild.me.voice.channel && !msg.guild.me.voice.channel.equals(msg.member.voice.channel))
            return msg.channel.send(util.embed().setAuthor(" |  You not connected to the same voice channel"));

        try {
            await music.pause();
            msg.channel.send(util.embed().setDescription("<a:dis_t:856857286264619018> | Paused the song"));
        } catch (e) {
            msg.channel.send(util.embed().setAuthor(` |  An error occured: ${e.message}`));
        }
    }
};
