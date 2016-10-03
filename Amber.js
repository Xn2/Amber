//Calling dependencies
try {
var colors = require ("colors");
} catch (e){
	console.log("AmberBot requires colors, and it's missing, please execute npm install colors");
	process.exit();
}

try {
var log = require("simple-node-logger").createSimpleLogger("./amber.log");
} catch (e){
	console.log("AmberBot requires simple-node-logger, and it's missing, please execute npm install simple-node-logger".red);
	process.exit();
}

var fs = require('fs')
var http = require('http');
var https = require('https');
var file = fs.createWriteStream("versionchecker.json");
var request = https.get("https://cdn.rawgit.com/Xn2/Amber/master/version.json", function(response) {
response.pipe(file);
});

try {
var Discord = require ("discord.js");
} catch (e){
	console.log("AmberBot requires discord.js, and it's missing, please execute npm install discord.js".red);
	process.exit();
}

try {
	var AuthDetails = require("./config.json");
} catch (e){
	console.log("Config file is missing or incorrect! Did you properly rename config.json.example into config.json?".red);
	process.exit();
}

try {
	var Twitter = require("twitter");
} catch (e){
	console.log("AmberBot requires twitter, and it's missing, please execute npm install twitter".red);
	process.exit();
}

try {
	var Yourls = require("yourls");
} catch (e){
	console.log("AmberBot requires yourls, and it's missing, please execute npm install yourls".red);
	process.exit();
}

try {
	var Version = require("./version.json");
} catch (e){
	console.log("version.json is missing or incorrect!".red);
	process.exit();
}

try {
	var base64 = require('node-base64-image');
} catch (e){
	console.log("AmberBot requires node-base64-image, and it's missing, please execute npm install node-base64-image".red);
	process.exit();
}

try {
	var Danbooru = require('danbooru');
} catch (e){
	console.log("AmberBot requires danbooru, and it's missing, please execute npm install danbooru".red);
	process.exit();
}

//!copy variables stuff
var iscopying = false;
var usercopying = "None";
var usercopyingid = "None";
var hascopied;

//Creating the actual bot
var bot = new Discord.Client();

//Login process either with token or email/pass
if (AuthDetails.officialbot === "0")
{
	bot.login(AuthDetails.email, AuthDetails.password);
}
if (AuthDetails.officialbot === "1")
{
	bot.loginWithToken("Bot " + AuthDetails.token);
}

//What the bot does when it's ready
bot.on("ready", function (message)
{
bot.setUsername(AuthDetails.botname);	
console.log("");
console.log(AuthDetails.botname.green + " " + Version.version.green + " is online and ready to rock!".green);
console.log("");
bot.sendMessage(AuthDetails.ownerid, AuthDetails.botname + " is ready, Daddy! :heart:");
bot.sendMessage(AuthDetails.logchannelid, AuthDetails.botname + " started.");
});

//What the bot does each time a message is recieved
bot.on("message", function (message, server)
{
	if (message.channel.isPrivate === false)
	{
		//Split message btw command name and arguments
		var msplit = message.content.split(" ");

		//!copy variable set to false
		hascopied = false;

		//Chat logging to console and/or file
		if (AuthDetails.logenable === "0")
		{
			console.log(message.author.name + "#" + message.author.discriminator + "@#" + message.channel.name + " on " + message.server.name + " : " + message.content);
		}
		else
		{
			log.info(message.author.name + "#" + message.author.discriminator + "@#" + message.channel.name + " on " + message.server.name + " : " + message.content);
		}	

		//checkupdates command
		if (message.content === "!checkupdates")
		{
			var Versionchecker = require("./versionchecker.json")

			if (Version.versionraw === Versionchecker.versionraw)
			{
				bot.sendMessage(message, "I'm up to date!");
			}

			if (Version.versionraw < Versionchecker.versionraw)
			{
				bot.sendMessage(message, "An update is available! Use `git pull` from the command line to update!");
			}

			if (Version.versionraw > Versionchecker.versionraw)
			{
				bot.sendMessage(message, "Woa, I'm running under a version that is not out yet!");
			}
		}

		//!enablelogging command
		if (message.content === "!enablelogging" && AuthDetails.ownerid.indexOf(message.author.id) !== -1)
		{
			if (AuthDetails.logenable === "0")
			{
				fs.readFile("config.json", 'utf8', function (err,data) {
  					if (err) {
    				return console.log(err);
  					}
  				var result = data.replace("\"logenable\" : \"0\"", "\"logenable\" : \"1\"");
	
  				fs.writeFile("config.json", result, 'utf8', function (err) {
     			if (err) return console.log(err);
  					});
				});

				bot.sendMessage(message, "Logging has been **enabled**, the bot will now restart.");
			}

			else
			{
				bot.sendMessage(message, "Logging is already **enabled**.");
			}
		}

		//!disablelogging command
		if (message.content === "!disablelogging" && AuthDetails.ownerid.indexOf(message.author.id) !== -1)
		{
			if (AuthDetails.logenable === "1")
			{
				fs.readFile("config.json", 'utf8', function (err,data) {
  				if (err) {
    			return console.log(err);
  				}
  				var result = data.replace("\"logenable\" : \"1\"", "\"logenable\" : \"0\"");

  				fs.writeFile("config.json", result, 'utf8', function (err) {
	     		if (err) return console.log(err);
  					});
				});		

				bot.sendMessage(message, "Logging has been **disabled**, the bot will now restart.");
			}

			else
			{
				bot.sendMessage(message, "Logging is already **disabled**.");
			}
		}

		//!enablensfw command
		if (message.content === "!enablensfw" && AuthDetails.ownerid.indexOf(message.author.id) !== -1)
		{
			if (AuthDetails.nsfwenable === "0")
			{
				fs.readFile("config.json", 'utf8', function (err,data) {
  					if (err) {
    				return console.log(err);
  					}
  				var result = data.replace("\"nsfwenable\" : \"0\"", "\"nsfwenable\" : \"1\"");
	
  				fs.writeFile("config.json", result, 'utf8', function (err) {
     			if (err) return console.log(err);
  					});
				});

				bot.sendMessage(message, "Nsfw commands have been **enabled**, the bot will now restart.");
			}

			else
			{
				bot.sendMessage(message, "Nsfw commands are already **enabled**.");
			}
		}

		//!disablensfw command
		if (message.content === "!disablensfw" && AuthDetails.ownerid.indexOf(message.author.id) !== -1)
		{
			if (AuthDetails.logenable === "1")
			{
				fs.readFile("config.json", 'utf8', function (err,data) {
  				if (err) {
    			return console.log(err);
  				}
  				var result = data.replace("\"nsfwenable\" : \"1\"", "\"nsfwenable\" : \"0\"");

  				fs.writeFile("config.json", result, 'utf8', function (err) {
	     		if (err) return console.log(err);
  					});
				});		

				bot.sendMessage(message, "Nsfw commands have been **disabled**, the bot will now restart.");
			}

			else
			{
				bot.sendMessage(message, "Nsfw commands are already **disabled**.");
			}
		}

	    //!enabletwitter command
		if (message.content === "!enabletwitter" && AuthDetails.ownerid.indexOf(message.author.id) !== -1)
		{
			if (AuthDetails.twitterenable === "0")
			{
				fs.readFile("config.json", 'utf8', function (err,data) {
  					if (err) {
    				return console.log(err);
  					}
  				var result = data.replace("\"twitterenable\" : \"0\"", "\"twitterenable\" : \"1\"");
	
  				fs.writeFile("config.json", result, 'utf8', function (err) {
     			if (err) return console.log(err);
  					});
				});

				bot.sendMessage(message, "Twitter commands have been **enabled**, the bot will now restart.");
			}

			else
			{
				bot.sendMessage(message, "Twitter commands are already **enabled**.");
			}
		}

		//!disabletwitter command
		if (message.content === "!disabletwitter" && AuthDetails.ownerid.indexOf(message.author.id) !== -1)
		{
			if (AuthDetails.twitterenable === "1")
			{
				fs.readFile("config.json", 'utf8', function (err,data) {
  				if (err) {
    			return console.log(err);
  				}
  				var result = data.replace("\"twitterenable\" : \"1\"", "\"twitterenable\" : \"0\"");

  				fs.writeFile("config.json", result, 'utf8', function (err) {
	     		if (err) return console.log(err);
  					});
				});		

				bot.sendMessage(message, "Twitter commands have been **disabled**, the bot will now restart.");
			}

			else
			{
				bot.sendMessage(message, "Twitter commands are already **disabled**.");
			}
		}

		//!setgame command
		if (msplit[0] === "!setgame" && AuthDetails.ownerid.indexOf(message.author.id) !== -1)
		{
			if (message.content.indexOf(' ') === -1) 
			{
				bot.sendMessage(message, "Usage : `!setgame Game`");
			}

			if (message.content.indexOf(' ') !== -1) 
			{
				var game = message.content;
				game = game.substring('!setgame '.length);
				bot.setPlayingGame(game);
			}
		}

		//!setavatar command
		if (msplit[0] === "!setavatar" && AuthDetails.ownerid.indexOf(message.author.id) !== -1)
		{
			if (message.content.indexOf(' ') === -1) 
			{
				bot.sendMessage(message, "Usage : `!setavatar http://link.tld/image.png`");
			}

			if (message.content.indexOf(' ') !== -1)
			{
				var link = message.content;
				link = link.substring('!setavatar '.length);
				var fileavatar = fs.createWriteStream("avatar.png");
				var base64data;
				if (link.startsWith("https"))
				{
					var bitmap;
					var request = https.get(link, function(response) {
  					response.pipe(fileavatar);
					});
            		setTimeout(function() {
						var dataUri = ("./avatar.png");
    					var data = fs.readFileSync(dataUri).toString("base64");
						bot.setAvatar("data:image/png;base64," + data);
						bot.sendMessage(message, "New avatar set.")
					}, 5000);
				}
				else if (link.startsWith("http:"))
				{
					var bitmap;
					var request = http.get(link, function(response) {
  					response.pipe(fileavatar);
					});
            		setTimeout(function() {
						var dataUri = ("./avatar.png");
    					var data = fs.readFileSync(dataUri).toString("base64");
						bot.setAvatar("data:image/png;base64," + data);
						bot.sendMessage(message, "New avatar set.")
					}, 5000);
				}
				else
				{
					bot.sendMessage(message, "Please provide a valid http or https link.")
				}
			}
		}

		//!setname command
		if (msplit[0] === "!setname" && AuthDetails.ownerid.indexOf(message.author.id) !== -1)
		{
			if (message.content.indexOf(' ') === -1)
			{
				bot.sendMessage(message, "Usage : `!setname name`")
			}

			if (message.content.indexOf(' ') !== -1)
			{
				var newname = message.content;
				newname = newname.substring("!setname ".length);
				bot.setUsername(newname);
				bot.sendMessage(message, "Changed my username to " + newname + " for the current session.")	
			}
		}

		//!createchannel command
		if (msplit[0] === "!createchannel")
		{
			if (AuthDetails.ownerid.indexOf(message.author.id) !== -1)
			{
				if (message.content.indexOf(' ') !== -1) 
				{
					var channelname = msplit[1];
					bot.createChannel(message.channel.server.id, channelname);
					bot.sendMessage(message, "Channel #" + channelname + " created.")
				}
				else
				{
					bot.sendMessage(message, "Usage : `!createchannel chanel_name (spaces are not allowed)`");
				}
			}
			else
			{
				bot.sendMessage(message, "You're not allowed to do that.");
			}
		}

		//!deletechannel command
		if (msplit[0] === "!deletechannel")
		{
			if (AuthDetails.ownerid.indexOf(message.author.id) !== -1)
			{
				if (message.content.indexOf(' ') !== -1) 
				{
					var channelname = msplit[1];
					var channelname = channelname.substring('<#'.length);
					var channelname = channelname.slice(0, -1);
					bot.sendMessage(message, "Channel deleted.")
					bot.deleteChannel(channelname);
				}
				else
				{
					bot.sendMessage(message, "Usage : `!deletechannel #chanel_name`");
				}
			}
			else
			{
				bot.sendMessage(message, "You're not allowed to do that.");
			}
		}

		//settopic command
		if (msplit[0] === "!settopic")
		{
			if (AuthDetails.ownerid.indexOf(message.author.id) !== -1)
			{
				var newtopic = message.content
				var newtopic = newtopic.substring("!settopic ".length);
				bot.setTopic(message.channel, newtopic)
			}
		}

		//!say command
		if (msplit[0] === "!say")
		{
			if (message.content.indexOf(' ') === -1)
			{
				bot.sendMessage(message, "Usage : `!say #channel sometext`")
			}
			else if (message.content.indexOf('<#') === -1)
			{
				var texttosay = message.content;
				var texttosay = texttosay.substring(msplit[0].length);
				bot.sendMessage(message, texttosay)
			}
			else
			{
				var channel = msplit[1];
				var channel = channel.substring('<#'.length);
				var channel = channel.slice(0, -1);
				var texttosay = message.content;
				var texttosay = texttosay.substring(msplit[0].length);
				var texttosay = texttosay.substring(msplit[1].length);
				var texttosay = texttosay.substring("> ".length)
				bot.sendMessage(channel, texttosay)
			}
		}

		//!kick command
		if (msplit[0] === "!kick" && AuthDetails.ownerid.indexOf(message.author.id) !== -1) 
		{
			if (message.mentions)
			{
            	for (var user of message.mentions) 
            	{

    				bot.sendMessage(user.id, "You have been kicked from the server " + message.channel.server.name + " by " + message.author.name + ".")

            		setTimeout(function() {
               		bot.kickMember(user.id, message.channel.server.id);
					}, 5000);
          	  	}
			}

			if (message.content.indexOf(' ') === -1) 
			{
				bot.sendMessage(message, "You must mention a user.");
			}				
		}

		//!ban command
		if (msplit[0] === "!ban" && AuthDetails.ownerid.indexOf(message.author.id) !== -1)
		{
			if (message.mentions)
			{
            	for (var user of message.mentions) 
            	{
            		bot.sendMessage(user.id, "You have been permanently banned from the server " + message.channel.server.name + " by " + message.author.name + ".")

               		setTimeout(function() {
               		bot.banMember(user.id, message.channel.server.id);
					}, 5000);
          	  	}
			}

			if (message.content.indexOf(' ') === -1) 
			{
				bot.sendMessage(message, "You must mention a user.");
			}
		}

		//!avatar command
		if (msplit[0] === "!avatar")
		{
			if (message.mentions)
			{
            	for (var user of message.mentions) {
               	bot.sendFile(message, user.avatarURL);
          	  	}
			}

			if (message.content.indexOf(' ') === -1)
			{
				bot.sendFile(message, message.author.avatarURL);
			}
		}

		//!help command for public channels
		if (message.content === "!help")
		{
			if (AuthDetails.ownerid.indexOf(message.author.id) !== -1)
			{
				bot.sendMessage(message.author.id, "AmberBot version **" + Version.version + "**, Published on **" + Version.releasedate + "**\n\n**Github** : <https://github.com/Xn2/Amber>\n\n**Invite link** : " + AuthDetails.invitelink + "\n\n**Commands list** : <http://s.xn2.fr/ambercommands>" + "\n\nYou are the **owner** of the bot");
			}
			else
			{
				bot.sendMessage(message.author.id, "AmberBot version **" + Version.version + "**, Published on **" + Version.releasedate + "**\n\n**Github** : <https://github.com/Xn2/Amber>\n\n**Invite link** : " + AuthDetails.invitelink + "\n\n**Commands list** : <http://s.xn2.fr/ambercommands>");
			}
		}

		//!uptime command
		if (message.content === "!uptime")
		{
			var time = bot.uptime / 1000;
			var time = Math.round(time);
			var hours = Math.floor(time / 3600);
			var time = time - hours * 3600;
			var minutes = Math.floor (time / 60);
			var seconds = time - minutes * 60;
			bot.sendMessage(message, AuthDetails.botname + " has been running for " + hours + " hours, " + minutes + " minutes, " + seconds + " seconds.");
		}

		//!rdmboobs command
		if (message.content === "!rdmboobs")
		{
			if (AuthDetails.nsfwenable === "0")
			{
				bot.sendMessage(message, "Not safe for work commands are not enabled, use `!enablensfw` to enable them");
			}

			if (AuthDetails.nsfwenable === "1")
			{
				var picid = Math.floor(Math.random() * 9999);
				bot.sendMessage(message, "http://media.oboobs.ru/boobs_preview/0" + picid + ".jpg");
			}
		}

		//!rdmass command
		if (message.content === "!rdmass")
		{
			if (AuthDetails.nsfwenable === "0")
			{
				bot.sendMessage(message, "Not safe for work commands are not enabled, use `!enablensfw` to enable them");
			}

			if (AuthDetails.nsfwenable === "1")
			{
				var picid = Math.floor(Math.random() * 3850) + 1000;
				bot.sendMessage(message, "http://media.obutts.ru/butts_preview/0" + picid + ".jpg");
			}
		}

		//!rdmhentai command
		if (message.content === "!rdmhentai")
		{
			if (AuthDetails.nsfwenable === "0")
			{
				bot.sendMessage(message, "Not safe for work commands are not enabled, use `!enablensfw` to enable them");
			}

			if (AuthDetails.nsfwenable === "1")
			{
				Danbooru.search('rating:explicit', function(err, data) {
 				data.random()
      			.get()
      			.pipe(require('fs').createWriteStream('./random.jpg'));
				});
				setTimeout(function() {
      			bot.sendFile(message, "./random.jpg")
      			}, 4000);
			}
		}

		//!copy command
		if (message.content === "!copy")
		{
			iscopying = true;
			bot.sendMessage(message, "Copying " + message.author.name + "'s messages, use !stopcopy to stop.");
			usercopying = message.author.name;
			usercopyingid = message.author.id;
			hascopied = true
		}

		//!stopcopy command
		if (message.content === "!stopcopy")
		{
			if (iscopying === false)
			{
				bot.sendMessage(message, "I'm not copying anyone.");
			}

			if (iscopying === true)
			{
				iscopying = false;
				bot.sendMessage(message, "Stopped copying " + message.author.name + "'s messages.");
			}
		}

		//!tweet command
		if (msplit[0] === "!tweet" && AuthDetails.ownerid.indexOf(message.author.id) !== -1)
		{
			if (message.content.indexOf(' ') === -1)
			{
				bot.sendMessage(message, "Usage : `!tweet sometext`");
			}

			if (message.content.indexOf(' ') !== -1)
			{
				if (AuthDetails.twitterenable === "1")
				{
					var client = new Twitter({
 	 				consumer_key: AuthDetails.twitterconsumerkey,
 	 				consumer_secret: AuthDetails.twitterconsumersecret,
 	 				access_token_key: AuthDetails.twitteraccesstoken,
 	 				access_token_secret: AuthDetails.twitteraccesstokensecret
				});

				tweetcontent = message.content;
				tweetcontent = tweetcontent.substring("!tweet ".length);

				client.post('statuses/update', {status: tweetcontent},  function(error, tweet, response) {
  				if(error) throw error;
				});

				bot.sendMessage(message, "I did tweet " + tweetcontent + " for you :heart:")
				}
				
				else
				{
					bot.sendMessage(message, "Twitter commands are not enabled, use `!enabletwitter` to enable them");
				}
			}
		}

		//!shrink
		if (msplit[0] === "!shrink")
		{
			if (message.content.indexOf(' ') === -1)
			{
				bot.sendMessage(message, "Usage : `!shrink http://link.tld/`");
			}

			if (message.content.indexOf(' ') !== -1)
			{
				link = msplit[1]
				var yourls = new Yourls(AuthDetails.yourlsurl, AuthDetails.yourlsapi);
				yourls.shorten(link, function(error, result) {
				bot.sendMessage(message, "Here's your link : <http://s.xn2.fr/" + result.url.keyword + ">");
				if (error) {
				bot.sendMessage(message, "I'm sorry, there was an error.");
				throw error;
				}
				});
			}
		}

		//!roll command
		if (msplit[0] === "!roll")
		{
			if (message.content.indexOf(' ') === -1)
			{
				number = Math.floor(Math.random() * 100) + 1;
				bot.sendMessage(message, "You rolled " + number + "!");
			}

			if (message.content.indexOf(' ') !== -1)
			{
				x = msplit[1]
				number = Math.floor(Math.random() * x) + 1;
				bot.sendMessage(message, "You rolled " + number + "!");
			}
		}

		//Actual copying engine
		if (iscopying === true && hascopied === false && usercopyingid === message.author.id)
		{
			bot.sendMessage(message, message.content);
			hascopied = true;
		}

		//Says "Hi" if the message is the name of the bot
		if (message.content === AuthDetails.botname)
		{
			bot.sendMessage(message, "Hi");
		}

		//Ownership checker
		if (message.content === AuthDetails.botname + ", am I your master?")
		{
			if (AuthDetails.ownerid.indexOf(message.author.id) !== -1)
				{
					bot.reply(message, "Yes Daddy :heart:");
				}
			else
				{
					bot.reply(message, "No you fucker, I belong to my daddy :heart:");
				}
		}
	}

	//!disconnect command
	if (message.channel.isPrivate === true && AuthDetails.ownerid.indexOf(message.author.id) !== -1)
	{
		if (message.content === "!disconnect")
		{
			bot.sendMessage(message, "Bye Daddy...");
			log.info("!disconnect command recieved, terminating...");
			setTimeout(function() {
    			process.exit();
			}, 5000);
		}

		//help command, for private channels and owner
		if (message.content === "!help" && AuthDetails.ownerid.indexOf(message.author.id) !== -1)
		{
			bot.sendMessage(message.author.id, "AmberBot version **" + Version.version + "**, Published on **" + Version.releasedate + "**\n\n**Github** : <https://github.com/Xn2/Amber>\n\n**Invite link** : " + AuthDetails.invitelink + "\n\n**Commands list** : <http://s.xn2.fr/ambercommands>" + "\n\nYou are the **owner** of the bot");
		}
	} 	

	//!help command, for private channels
	if (message.channel.isPrivate === true && AuthDetails.ownerid.indexOf(message.author.id) === -1)
	{
		if (message.content !== "!help")
		{
			bot.sendMessage(message.author.id, "Type `!help` for help.")
		}
		else{
			bot.sendMessage(message.author.id, "AmberBot version **" + Version.version + "**, Published on **" + Version.releasedate + "**\n\n**Github** : <https://github.com/Xn2/Amber>\n\n**Invite link** : " + AuthDetails.invitelink + "\n\n**Commands list** : <http://s.xn2.fr/ambercommands>");
		}
	}
});



