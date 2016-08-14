var Discord = require ("discord.js");

var colors = require ("colors");

try {
	var AuthDetails = require("./auth.json");
} catch (e){
	console.log("Auth file is missing or incorrect! Did you properly rename auth.json.example into auth.json?".red);
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
console.log("Amber is online and ready to rock!".green);
bot.sendMessage(AuthDetails.ownerid, "Amber is ready, Daddy! :heart:");
bot.sendMessage(AuthDetails.logchannelid, "Amber started.");
});

bot.on("message", function (message)
{
	if (message.channel.isPrivate === false)
	{
		if (message.content === "!uptime")
		{
			var time = bot.uptime / 1000;
			var time = Math.round(time);
			var hours = Math.floor(time / 3600);
			var time = time - hours * 3600;
			var minutes = Math.floor (time / 60);
			var seconds = time - minutes * 60;
			bot.sendMessage(message,"Amber has been running for " + hours + " hours, " + minutes + " minutes, " + seconds + " seconds.");
		}

		if (message.content === "!rdmboobs")
		{
			var boobspicid = Math.floor(Math.random() * 9999);
			bot.sendMessage(message, "http://media.oboobs.ru/boobs_preview/0" + boobspicid + ".jpg");
		}

		if (message.content === "Amber")
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


	if (message.channel.isPrivate === true)
	{
		if (message.content === "!disconnect" && message.author.id === AuthDetails.ownerid)
		{
			bot.sendMessage(message, "Bye Daddy...");
			console.log("!disconnect command recieved, terminating...");
			process.exit();
		}
	} 
});



