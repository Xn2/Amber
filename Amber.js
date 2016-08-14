var Discord = require ("discord.js");

var colors = require ("colors");

try {
	var AuthDetails = require("./auth.json");
} catch (e){
	console.log("Auth file is missing or incorrect! Did you properly rename auth.json.example into auth.json?".red);
	process.exit();
}

try {
	var Version = require("./version.json");
} catch (e){
	console.log("version.json is missing of incorrct!".red);
	process.exit();
}

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
console.log("");
console.log(AuthDetails.botname.green + " is online and ready to rock!".green);
bot.sendMessage(AuthDetails.ownerid, AuthDetails.botname + " is ready, Daddy! :heart:");
bot.sendMessage(AuthDetails.logchannelid, AuthDetails.botname + " started.");
});

bot.on("message", function (message)
{
	if (message.channel.isPrivate === false)
	{
		if (message.content === "!help")
		{
			bot.sendMessage(message.author.id, "AmberBot version **" + Version.version + "**, Published on **" + Version.releasedate + "**\n\n**Github** : <https://github.com/Xn2/Amber>\n\n**Invite link** : " + AuthDetails.invitelink);
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
			var boobspicid = Math.floor(Math.random() * 9999);
			bot.sendMessage(message, "http://media.oboobs.ru/boobs_preview/0" + boobspicid + ".jpg");
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
			console.log("!disconnect command recieved, terminating...");
			process.exit();
		}

		if (message.content === "!help")
		{
			bot.sendMessage(message.author.id, "AmberBot version **" + Version.version + "**, Published on **" + Version.releasedate + "**\n\n**Github** : <https://github.com/Xn2/Amber>\n\n**Invite link** : " + AuthDetails.invitelink + "\n\nYou are the **owner** of the bot");
		}
	} 	

	if (message.channel.isPrivate === true && message.author.id !== AuthDetails.ownerid)
	{
		if (message.content !== "!help")
		{
			bot.sendMessage(message.author.id, "Type !help for help.")
		}
		else{
			bot.sendMessage(message.author.id, "AmberBot version **" + Version.version + "**, Published on **" + Version.releasedate + "**\n\n**Github** : <https://github.com/Xn2/Amber>\n\n**Invite link** : " + AuthDetails.invitelink);
		}
	}
});



