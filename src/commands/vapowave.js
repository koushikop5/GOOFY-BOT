const util = require("../util");
module.exports = {
    name: "vapowave",
    aliases: ["vop"],
    exec: async (msg, args) => {

        const { music } = msg.guild;
        if (!music.player || !music.player.playing) return msg.channel.send(util.embed().setDescription("<a:error:864210015275188225> | Currently not playing anything."));
        if (!msg.member.voice.channel)
            return msg.channel.send(util.embed().setDescription("<a:error:864210015275188225> | You must be on a voice channel."));
        if (msg.guild.me.voice.channel && !msg.guild.me.voice.channel.equals(msg.member.voice.channel))
            return msg.channel.send(util.embed().setDescription(`<a:error:864210015275188225> | You must be on ${msg.guild.me.voice.channel} to use this command.`)); 

        music.setVaporwave(!music.vaporwave);  
        msg.channel.send(util.embed().setDescription(` ${music.vaporwave ? "<a:dis_t:856857286264619018> | \`enabled\`" : "<a:dis_1:856857396444921866> | \`disabled\`"} Vaporwave`));

    }
};
