const util = require("../util");

module.exports = {
    name: "stop",
    aliases: ["leave", "dc"],
    exec: async (msg) => {
        const { music } = msg.guild;
        if (!music.player) return msg.channel.send(util.embed().setDescription("<a:error:864210015275188225> |   Currently Not Playing anything", msg.client.user.displayAvatarURL()));
        if (!msg.member.voice.channel)
            return msg.channel.send(util.embed().setDescription("<a:error:864210015275188225> |   You aren't connected to a voice channel"));
        if (msg.guild.me.voice.channel && !msg.guild.me.voice.channel.equals(msg.member.voice.channel))
            return msg.channel.send(util.embed().setDescription(`<a:error:864210015275188225> |   You must be on ${msg.guild.me.voice.channel} to use this command.`));

        try {
            await music.stop();
            msg.react(":pause_button:").catch(e => e);
        } catch (e) {
            msg.channel.send(`<a:error:864210015275188225> | An error occured: ${e.message}.`);
        }
    }
};
