const util = require("../util");

module.exports = {
    name: "loop",
    aliases: ["repeat", "lp"],
    exec: (msg) => {
        const { music } = msg.guild;
        if (!music.player) return msg.channel.send(util.embed().setDescription("<a:error:864210015275188225> |   Currently Not Playing Anything.", msg.client.user.displayAvatarURL()));
        if (!msg.member.voice.channel)
            return msg.channel.send(util.embed().setDescription("<a:error:864210015275188225> | You not Connected To A Voice Channel"));
        if (msg.guild.me.voice.channel && !msg.guild.me.voice.channel.equals(msg.member.voice.channel))
            return msg.channel.send(util.embed().setDescription("<a:error:864210015275188225> | You not Connected To The Same Voice Channel"));

        music.loop = !music.loop;

        msg.channel.send(util.embed().setDescription(`<a:dis_t:856857286264619018> | Loop ${music.loop ? "Enabled" : "Disabled"}.`));
    }
};
