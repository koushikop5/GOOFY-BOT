const util = require("../util");
module.exports = {
    name: "nightcore",
    aliases: ["nc"],
    exec: async (msg, args) => {

        const { music } = msg.guild;
        if (!music.player || !music.player.playing) return msg.channel.send(util.embed().setDescription("❌ | Currently not playing anything."));
        if (!msg.member.voice.channel)
            return msg.channel.send(util.embed().setDescription("❌ | You must be on a voice channel."));
        if (msg.guild.me.voice.channel && !msg.guild.me.voice.channel.equals(msg.member.voice.channel))
            return msg.channel.send(util.embed().setDescription(`❌ | You must be on ${msg.guild.me.voice.channel} to use this command.`));

        music.setNightcore(!music.nightcore);  
        msg.channel.send(util.embed().setDescription(` ${music.nightcore ? "<a:dis_t:856857286264619018> | \`enabled\`" : "<a:dis_1:856857396444921866> | \`disabled\`"} Nightcore`));

    }
};
