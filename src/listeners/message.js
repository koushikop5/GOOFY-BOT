
/*const util = require("../util");

module.exports = {
    name: "message",
    exec: async (client, msg) => {
        if (!msg.guild) return;
        if (msg.author.bot) return;

        const prefix = msg.content.toLowerCase().startsWith(client.prefix) ? client.prefix : `<@!${client.user.id}>`;
        if (!msg.content.toLowerCase().startsWith(prefix)) return;
        
        const args = msg.content.slice(prefix.length).trim().split(/ +/g);
        const commandName = args.shift().toLowerCase();
        const command = client.commands.get(commandName) || client.commands.find(c => c.aliases && c.aliases.includes(commandName));
        if (command) {
            try {
                await command.exec(msg, args);
            } catch (e) {
                console.error(e);
            }
        }
    }
};*/




prefix = process.env.PREFIX;
const util = require("../util");
module.exports = {
    name: "message",
    exec: async (client, msg) => {
        if (!msg.guild) return;
        if (msg.author.bot) return;
        if (msg.channel.type === "dm") return;
        if(msg.content === `<@${client.user.id}>` || msg.content === `<@!${client.user.id}>`){
            msg.channel.send(util.embed().setDescription(`My prefix in this server is \`${prefix}\` . You can see my all commands type \`${prefix}help\`.`).setColor("#FF0000"));   
        }
        const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);

        if(!prefixRegex.test(msg.content)) return;
        const [, matchedPrefix] = msg.content.match(prefixRegex);
        const args = msg.content.slice(matchedPrefix.length).trim().split(/ +/g);
        const commandName = args.shift().toLowerCase();
        const command = client.commands.get(commandName) || client.commands.find(c => c.aliases && c.aliases.includes(commandName));
        if (command) {
            try {
                await command.exec(msg,args);
            } catch (e) {
                console.error(e);
            }
        }
    }
};
