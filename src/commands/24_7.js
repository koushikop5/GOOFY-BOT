const db = require("quick.db");
const util = require("../util");
module.exports = {

    name: "24/7",

    aliases: ["24/7","247","24*7"],
    
	     exec: async (msg, args) => {
        const message = msg;
        let x = db.get(`247_${message.guild.id}`);
        if(x == true) {
            db.set(`247_${message.guild.id}`, false);
           msg.channel.send(util.embed().setDescription("<a:dis_1:856857396444921866> | 24/7 mode is now \`disabled\` in this server"));
        }
        else if(!x){
            db.set(`247_${message.guild.id}`, true);
            msg.channel.send(util.embed().setDescription("<a:dis_t:856857286264619018> |  24/7 mode is now \`enabled\` in this server"));
        }

    }

}
