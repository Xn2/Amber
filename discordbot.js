var Discord = require ("discord.js");

var colors = require ("colors");

try {
	var AuthDetails = require("./auth.json");
} catch (e){
	console.log("Auth file is missing or incorrect! Did you properly rename auth.json.example into auth.json?".red);
	process.exit();
}

var bot = new Discord.Client();

bot.loginWithToken(AuthDetails.token);

bot.on("ready", function (message)
{
console.log("")
console.log("Amber is online and ready to rock!".green)
bot.sendMessage(AuthDetails.ownerid, "Ambey is ready, Daddy! :heart:");
bot.sendMessage(AuthDetails.logchannelid, "Amber started.")
});

bot.on("message", function (message)
{
	if (message.content === "Amber")
	{
		bot.sendMessage(message, "Hi")
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

	if (message.channel.isPrivate === true)
	{
		if (message.content === "!disconnect" && message.author.id === AuthDetails.ownerid)
		{
			bot.sendMessage(message, "Bye Daddy...");
			console.log("!disconnect command recieved, terminating...")
			process.exit();
		}
	} 
});



