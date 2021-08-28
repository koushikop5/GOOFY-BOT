const util = require("../util");

const durationPattern = /^[0-5]?[0-9](:[0-5][0-9]){1,2}$/;

module.exports = {
    name: "seek",
    aliases: ["sk","Sk"],
    exec: async (msg, args) => {
        const { music } = msg.guild;
        if (!music.player || !music.player.playing) return msg.channel.send(util.embed().setAuthor(" |   Currently Not Playing anything", msg.client.user.displayAvatarURL()));
        if (!msg.member.voice.channel)
            return msg.channel.send(util.embed().setAuthor(" |   You aren't connected to a voice channel",  msg.client.user.displayAvatarURL()));
        if (msg.guild.me.voice.channel && !msg.guild.me.voice.channel.equals(msg.member.voice.channel))
            return msg.channel.send(util.embed().setAuthor(" |   You Aren't Connected To The Same Voice Channel As I Am", msg.client.user.displayAvatarURL()));

        if (!music.current.info.isSeekable)
            return msg.channel.send(util.embed().setAuthor(" |   Current track isn't seekable", msg.client.user.displayAvatarURL()));

        const duration = args[0];
        if (!duration)
            return msg.channel.send(util.embed().setAuthor(" |   You must provide duration to seek. Valid duration e.g. `1:34`", msg.client.user.displayAvatarURL()));
        if (!durationPattern.test(duration))
            return msg.channel.send(util.embed().setAuthor(" |   You provided an invalid duration. Valid duration e.g. `1:34`", msg.client.user.displayAvatarURL()));

        const durationMs = util.durationToMillis(duration);
        if (durationMs > music.current.info.length)
            return msg.channel.send(util.embed().setAuthor(" |   The duration you provide exceeds the duration of the current track", msg.client.user.displayAvatarURL()));

        try {
            await music.player.seek(durationMs);
            msg.channel.send(util.embed().setAuthor(` |   Seeked to ${util.millisToDuration(durationMs)}.`, msg.client.user.displayAvatarURL()));
        } catch (e) {
            msg.channel.send(`An error occured: ${e.message}.`);
        }
    }
};
