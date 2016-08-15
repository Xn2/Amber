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
	var Version = require("./version.json");
} catch (e){
	console.log("version.json is missing or incorrect!".red);
	process.exit();
}

var iscopying = false;
var usercopying = "None";
var usercopyingid = "None";
var hascopied;

var bot = new Discord.Client();

if (AuthDetails.officialbot === "0")
{
	bot.login(AuthDetails.email, AuthDetails.password);
}
if (AuthDetails.officialbot === "1")
{
	bot.loginWithToken(AuthDetails.token);
}

bot.on("ready", function (message)
{
bot.setUsername(AuthDetails.botname)
console.log("");
console.log(AuthDetails.botname.green + " " + Version.version.green + " is online and ready to rock!".green);
console.log("");
bot.sendMessage(AuthDetails.ownerid, AuthDetails.botname + " is ready, Daddy! :heart:");
bot.sendMessage(AuthDetails.logchannelid, AuthDetails.botname + " started.");
});

bot.on("message", function (message)
{
	if (message.channel.isPrivate === false)
	{
		hascopied = false;

		if (AuthDetails.logenable === "0")
		{
			console.log(message.author.name + "#" + message.author.discriminator + "@#" + message.channel.name + " on " + message.server.name + " : " + message.content);
		}
		else
		{
			log.info(message.author.name + "#" + message.author.discriminator + "@#" + message.channel.name + " on " + message.server.name + " : " + message.content);
		}	

		if (message.content === "!enablelogging" && message.author.id === AuthDetails.ownerid)
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

				AuthDetails = require("./config.json");

				bot.sendMessage(message, "Logging has been enabled, a restart is needed for the changes to take effect.")
			}

			else
			{
				bot.sendMessage(message, "Logging is already enabled.")
			}
		}

		if (message.content === "!disablelogging" && message.author.id === AuthDetails.ownerid)
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

				AuthDetails = require("./config.json");

				bot.sendMessage(message, "Logging has been disabled, a restart is needed for the changes to take effect.")
			}

			else
			{
				bot.sendMessage(message, "Logging is already disabled.")
			}
		}

		if (message.content === "!help")
		{
			if (message.author.id === AuthDetails.ownerid)
			{
				bot.sendMessage(message.author.id, "AmberBot version **" + Version.version + "**, Published on **" + Version.releasedate + "**\n\n**Github** : <https://github.com/Xn2/Amber>\n\n**Invite link** : " + AuthDetails.invitelink + "\n\n**Commands list** : <http://s.xn2.fr/ambercommands>" + "\n\nYou are the **owner** of the bot");
			}
			else
			{
				bot.sendMessage(message.author.id, "AmberBot version **" + Version.version + "**, Published on **" + Version.releasedate + "**\n\n**Github** : <https://github.com/Xn2/Amber>\n\n**Invite link** : " + AuthDetails.invitelink + "\n\n**Commands list** : <http://s.xn2.fr/ambercommands>");
			}
		}

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

		if (message.content === "!rdmboobs")
		{
			if (AuthDetails.nsfwenable === "0")
			{
				bot.sendMessage(message, "Not safe for work commands are not enabled, edit `auth.json` to enable them");
			}

			if (AuthDetails.nsfwenable === "1")
			{
				var boobspicid = Math.floor(Math.random() * 9999);
				bot.sendMessage(message, "http://media.oboobs.ru/boobs_preview/0" + boobspicid + ".jpg");
			}
		}

		if (message.content === "!copy")
		{
			iscopying = true;
			bot.sendMessage(message, "Copying " + message.author.name + "'s messages, use !stopcopy to stop.");
			usercopying = message.author.name;
			usercopyingid = message.author.id;
			hascopied = true
		}

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

		if (iscopying === true && hascopied === false && usercopyingid === message.author.id)
		{
			bot.sendMessage(message, message.content);
			hascopied = true;
		}

		if (message.content === AuthDetails.botname)
		{
			bot.sendMessage(message, "Hi");
		}

		if (message.content === "Amber, am I your master?")
		{
			if (message.author.id === AuthDetails.ownerid)
				{
					bot.reply(message, "Yes Daddy :heart:");
				}
			else
				{
					bot.reply(message, "No you fucker, I belong to my daddy :heart:");
				}
		}
	}

	if (message.channel.isPrivate === true && message.author.id === AuthDetails.ownerid)
	{
		if (message.content === "!disconnect")
		{
			bot.sendMessage(message, "Bye Daddy...");
			log.info("!disconnect command recieved, terminating...");
			process.exit();
		}

		if (message.content === "!help")
		{
			bot.sendMessage(message.author.id, "AmberBot version **" + Version.version + "**, Published on **" + Version.releasedate + "**\n\n**Github** : <https://github.com/Xn2/Amber>\n\n**Invite link** : " + AuthDetails.invitelink + "\n\n**Commands list** : <http://s.xn2.fr/ambercommands>" + "\n\nYou are the **owner** of the bot");
		}
	} 	

	if (message.channel.isPrivate === true && message.author.id !== AuthDetails.ownerid)
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



