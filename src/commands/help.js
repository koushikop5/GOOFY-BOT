const util = require("../util");

const unlisted = ["eval", "source"];
prefix=process.env.PREFIX;
module.exports = {
    name: "help",
    aliases: ["h", "hp"],
    exec: (msg) => {
        const commands = msg.client.commands
            .filter(c => !unlisted.includes(c.name))
            .map(c => `\`${c.name}\``);

        const embed = util.embed()
            .setAuthor("Disney Help Menu")
            .setDescription("Disney gets ready with zero configuration just give read access where you are going to use it and you are ready to play high quality music.")
            .addField("• Music [18] ", "`24/7`, `play`, `loop`, `lyrics`, `nowplaying`, `pause`, `queue`, `remove`, `resume`, `search`, `shuffle`, `skip`, `skipto`, `stop`, `volume`, `seek`, `autoplay`, `move`")
            .addField("• Filters [3] ",  "`nightcore`, `vapowave`, `bassboost`")
            .addField("• Owner [3] ", "`eval`, `shards`, `reload`")
            .addField("• Utility [6] ", "`invite`, `help`, `stats`, `ping`, `node`, `vote`")
            .addField("Others", "[Invite Me](https://discord.com/oauth2/authorize?client_id=826795830111109153&scope=bot&permissions=3459136) • [Support](https://discord.gg/mHdMG8unV4) • [Vote Me](https://top.gg/bot/826795830111109153/vote) • [Website](https://www.disneybot.tk)")
            .setFooter(`Here is all command Use ${prefix}help [command name] gets all command info.`)
            .setColor("#FF0000")
            
            .setThumbnail(msg.client.user.displayAvatarURL({ dynamic: true, size: 2048 }));

        msg.channel.send(embed);
    }
};

console.log("help working");
