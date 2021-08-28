const { MessageEmbed } = require("discord.js");

module.exports = {

    name: "ping",

    aliases: ["pi"],

    exec: (msg,text) => {

        const latency = Date.now() - msg.createdTimestamp;

        msg.channel.send(new MessageEmbed().setColor("#FF0000").setDescription(`\`\`\`asciidoc
REST Latency: ${Math.round(msg.client.ws.ping)}ms
Gateway Latency: ${latency}ms 
\`\`\``));                     

    }

};