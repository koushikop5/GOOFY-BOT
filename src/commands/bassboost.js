const { MessageEmbed } = require("discord.js");
const levels = {
    none: [
        { band: 0, gain: 0 },
  
        { band: 1, gain: 0 },
  
        { band: 2, gain: 0 },
  
        { band: 3, gain: 0 },
  
        { band: 4, gain: 0 },
  
        { band: 5, gain: 0 },
  
        { band: 6, gain: 0 },
  
        { band: 7, gain: 0 },
  
        { band: 8, gain: 0 },
  
        { band: 9, gain: 0 },
  
        { band: 10, gain: 0 },
  
        { band: 11, gain: 0 },
  
        { band: 12, gain: 0 },
  
        { band: 13, gain: 0 }
    ],
    low: [
        { band: 0, gain: 0.10 },
        { band: 1, gain: 0.10 },
        { band: 2, gain: 0.10 },
        { band: 3, gain: 0.10 },
        { band: 4, gain: 0.10 },
        { band: 5, gain: 0.10 },
        { band: 6, gain: 0.10 },
        { band: 7, gain: 0.10 },
        { band: 8, gain: 0.10 },
        { band: 9, gain: 0.10 },
        { band: 10, gain: 0.10 },
        { band: 11, gain: 0.10 },
        { band: 12, gain: 0.10 },
        { band: 13, gain: 0.10 }
    ],
    medium: [
        { band: 0, gain: 0.15 },
        { band: 1, gain: 0.15 },
        { band: 2, gain: 0.15 },
        { band: 3, gain: 0.15 },
        { band: 4, gain: 0.15 },
        { band: 5, gain: 0.15 },
        { band: 6, gain: 0.15 },
        { band: 7, gain: 0.15 },
        { band: 8, gain: 0.15 },
        { band: 9, gain: 0.15 },
        { band: 10, gain: 0.15 },
        { band: 11, gain: 0.15 },
        { band: 12, gain: 0.15 },
        { band: 13, gain: 0.15 }
    ],
    high: [
        { band: 0, gain: 0.20 },
  
        { band: 1, gain: 0.20 },
  
        { band: 2, gain: 0.20 },
  
        { band: 3, gain: 0.20 },
  
        { band: 4, gain: 0.20 },
  
        { band: 5, gain: 0.20 },
  
        { band: 6, gain: 0.20 },
  
        { band: 7, gain: 0.20 },
  
        { band: 8, gain: 0.20 },
  
        { band: 9, gain: 0.20 },
  
        { band: 10, gain: 0.20 },
  
        { band: 11, gain: 0.20 },
  
        { band: 12, gain: 0.20 },
  
        { band: 13, gain: 0.20 }
    ]
};
  
module.exports = {
    name: "bassboost",
    aliases: ["bb"],
    exec: async (msg, args) => {
        const message = msg;
        const player = msg.guild.music;
  

        if (!player)
            return msg.reply(
                "I have not joined a channel because I have nothing to play. Use the play command to play the song."
            );
  
        const { channel } = message.member.voice;
  
        if (!channel) return message.reply("You need to join a voice channel.");
        if (!player.player)
            return message.reply("You're not in the same voice channel.");
  
        if (!args)
            return message.channel.send(
                "You need to provide a bassboost level. Available Levels are, `none`, `low`, `medium`, `high`."
            );
        if(args[0] == 'low' || args[0] == 'medium' || args[0]  == 'high' || args[0] == 'none') {
            let level = "none";
            if (args.length && args[0].toLowerCase() in levels)
                level = args[0].toLowerCase();
            const m = await msg.channel.send(new MessageEmbed().setColor("#FF0000").setDescription(`<a:dis_t:856857286264619018> | Bassboost set to \`${args[0]}\` in this server.`));
            player.player.equalizer(levels[level]);
  
            
        }
        else if(args[0] && Number(args[0]) !== false) {
            const m = await msg.channel.send(new MessageEmbed().setColor("#FF0000").setDescription (`<a:dis_t:856857286264619018> | Bassboost level set to \`${args[0]}\` in this server.`));
            player.player.equalizer(Array(14).fill(null).map((_, i) => ({ band: i, gain: args[0]})))
            
        }
        else {
            message.channel.send(new MessageEmbed().setColor("#FF0000").setDescription("Choose bassboost level from \`high, medium, low\` or provide your custom level.\nFor turning off select `none` as level."));
        }
      
    }
};
