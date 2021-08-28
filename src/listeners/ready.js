prefix = process.env.PREFIX;

module.exports = {
    name: "ready",
    exec: async (client) => {
        console.log(`Logged in as ${client.user.tag}`);
        let activity = [`${client.guilds.cache.size} Guilds!`, `${client.guilds.cache.reduce((prev, guild) => prev + guild.memberCount, 0)} | Members!`, `${client.channels.cache.size} | Channels!`], i = 0;
        setInterval(() => client.user.setActivity(`@Disney`, { type: "LISTENING", url: "https://www.twitch.tv/nanotect_" }), 15000);

        if (client.spotify) await client.spotify.requestToken();

        const nodes = [...client.manager.nodes.values()];
        for (const node of nodes) {
            try {
                await node.connect();
            } catch (e) {   
                client.manager.emit("error", e, node);
            }
        }
    }
};
