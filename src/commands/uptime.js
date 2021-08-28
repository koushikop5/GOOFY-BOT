const prettyMs = require("pretty-ms");
const util = require("../util");
const moment = require("moment");

module.exports = {
    name: "developer",
    aliases: ["dev"],
    exec: (msg) => {
        /** @type {import("lavacord").LavalinkNode[]} */
        const nodes = [...msg.client.manager.nodes.values()];
        if (msg.author.id !== process.env.OWNER_ID) return;

        msg.channel.send(util.embed()
            .setAuthor("", msg.client.user.displayAvatarURL())
            /*.setTitle("")
            .setURL("h")*/
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

                    return `\`\`\`asciidoc
ID        :: ${node.id}
Status    :: ${node.connected ? "Connected" : "Disconnected"}
${node.connected ? `
CPU Load  :: ${cpuLoad}%
LavaUptime:: ${uptime}
ping      :: ${msg.client.ws.ping}ms
Users     :: ${msg.client.guilds.cache.reduce((prev, guild) => prev + guild.memberCount, 0)}
` : ""}\`\`\``;
                })
            )
            .setTimestamp()
        );
    }
};