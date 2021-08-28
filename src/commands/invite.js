const util = require("../util");

module.exports = {
    name: "invite",
    aliases: ["inv" , "i"],
    exec: (msg) => {msg.channel.send(util.embed()
        .setAuthor("Invite For Disney Bot", msg.client.user.displayAvatarURL())
        .setDescription(`
Invite Disney [Click here](https://discord.com/oauth2/authorize?client_id=826795830111109153&scope=bot&permissions=3459136)

Invite Disney 2 [Click here](https://discord.com/api/oauth2/authorize?client_id=806374444859654144&permissions=3459136&scope=bot) 

Invite Disney 3 [Click here](https://discord.com/api/oauth2/authorize?client_id=802771209896853515&permissions=3459136&scope=bot) 

Vote For Disney [Click here](https://top.gg/bot/826795830111109153)`)
    );}    
};
