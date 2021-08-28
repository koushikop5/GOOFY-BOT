const Discord = require("discord.js");
module.exports = {
    name: "autoplay",
    aliases: ["ap"],
    description: "Toggle the autoplayer.",
    extendedHelp: [
        "NOTE! This command does not make Sneyra play a song from the nowhere, it tells her whether to play the first",
        "non-duplicated (in a range of 30 songs) song from the related videos she has fetched in the latest added song.",
        "That is to say, Sneyra receives a list of 25-30 related songs, she also saves the 30 previous played songs. If",
        "the song has already been played, it will be skipped and check the next, until finding a song that has not been",
        "played recently. This allows two things:\n- 1: Play music unlimitedly without playing the same song twice.\n- 2:",
        "Find new songs from YouTube."
    ].join(" "),
    requireMusic: true,
    exec: async msg => {
        const { music } = msg.guild;
        music.autoplay = !music.autoplay;
        if(!msg.guild.me.voice.channel) //msg.member.voice.channel.join();

    
        if(music.autoplay) {
            music.autoplayed = [];
        }
        const embed = new Discord.MessageEmbed()
            .setColor("#FF0000")
            .setDescription(`<:d_forward:856874626884567060> | Autoplay mode is now \`${music.autoplay ? "enabled" : "disabled"}\` in this server`);
        return msg.channel.send(embed);
    }
};
