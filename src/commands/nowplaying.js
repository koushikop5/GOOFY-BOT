const util = require("../util");
const { porgressBar } = require("music-progress-bar");
const prettyMilliseconds = require("pretty-ms");

module.exports = {
    name: "nowplaying",
    aliases: ["np", "nowplay"],
    exec: (msg ,args) => {
        const { music } = msg.guild;
        if (!music.player || !music.player.playing) return msg.channel.send(util.embed().setAuthor(" |  Currently not playing anything.", msg.client.user.displayAvatarURL())		
            .setFooter(msg.author.username,  msg.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp());
        const yid = (music.current.info.identifier);
        const img = ("https://img.youtube.com/vi/");
        const las = ("/maxresdefault.jpg");
        const rem = (music.current.info.length - music.player.state.position /1);
        const rom = prettyMilliseconds(rem, { colonNotation: true, secondsDecimalDigits: 0 });
	
        let nowPlaying = util.embed()
            .setTitle(`${music.current.info.title}.`)
            .setURL(`${music.current.info.uri}`)
            
            
				
            
		;		
        if (music.current.info.isStream ) {
            nowPlaying.addField("\u200b", ":satellite:The Video Is Live ◉")
                .setFooter(msg.author.username, msg.author.displayAvatarURL({ dynamic: true }));
        
        }
        else {
            nowPlaying;
        }
        return msg.channel.send(nowPlaying);
		
    }};
