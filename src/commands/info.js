const util = require("../util");

module.exports = {
    name: "vote",
    aliases: ["vote"],
    exec: (msg) => {
        msg.channel.send(util.embed()
         .setAuthor("Vote me on top.gg", msg.client.user.displayAvatarURL
)
         .setColor("#FF0000").setDescription("**Here is vote link** [Click here](https://top.gg/bot/826795830111109153/vote) **Thank for voting & supporting.** ❤️"));
    }
};