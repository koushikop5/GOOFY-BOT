const MusicClient = require("./structures/MusicClient");
const { Database } = require("quickmongo");
const db = new Database(process.env.MONGO_URI);
const client = new MusicClient({
    disableMentions: "everyone"
});
db.on("ready", () => {
    console.log("Database connected!");
});
client.db = db
client.build();
