const prettyMs = require("pretty-ms");
const util = require("../util");
const moment = require("moment");

module.exports = {
    name: "node",
    aliases: ["nd","node"],
    exec: (msg) => {
        /** @type {import("lavacord").LavalinkNode[]}**/ 
        const nodes = [...msg.client.manager.nodes.values()];
        

        msg.channel.send(disney.embed()
            
            
           
            .setDescription(
                nodes.map(node  => {
                    const cpuLoad = (node.stats.cpu.lavalinkLoad * 100).toFixed(2);
                    const memUsage = (node.stats.memory.used / 1024 / 1024).toFixed(2);
                    const uptime = prettyMs(node.stats.uptime, { verbose: true, secondsDecimalDigits: 0 });
                    const d = moment.duration(msg.client.uptime);
                    const days = (d.days() == 1) ? `${d.days()} day` : `${d.days()} days`;
                    const hours = (d.hours() == 1) ? `${d.hours()} hour` : `${d.hours()} hours`;
                    const seconds = (d.seconds() == 1) ? `${d.seconds()} seconds` : `${d.seconds()} seconds`;
                    const minutes = (d.minutes() == 1) ? `${d.minutes()} minutes` : `${d.minutes()} minutes`;

                    return `\`\`\`yml
Node: Disney.lava 
Stats: ${Connected}?
Stats 1: ${node.stats.players}
Stats 2: ${node.stats.playingPlayers}
Uptime: ${new Date(node.stats.uptime).toISOString().slice(11, 19)}
\nMemory
Storage Load: ${Math.round(node.stats.memory.reservable / 1024 / 1024)}MB
Storage Used: ${Math.round(node.stats.memory.used / 1024 / 1024)}MB
External Storage: ${Math.round(node.stats.memory.free / 1024 / 1024)}MB
Internal Storage: ${Math.round(node.stats.memory.allocated / 1024 / 1024)}MB
\nCPU
Cores: ${node.stats.cpu.cores}
Load 1: ${(Math.round(node.stats.cpu.systemLoad * 100) / 100).toFixed(2)}%
Load 2: ${(Math.round(node.stats.cpu.lavalinkLoad * 100) / 100).toFixed(2)}%
\`\`\``                
                })
            )
            
        ); 
           
    }

};
