var Discord = require ("discord.js");

var colors = require ("colors");

var bot = new Discord.Client();

bot.loginWithToken("MjEzNzg3NDI0OTQ4NDg2MTQ1.Co_idw.avAwjKieTDkvWrALiq-UKpqeUJs");

bot.on("ready", function (message)
{
console.log("")
console.log("Amber is online and ready to rock!".green)
bot.sendMessage("94913717988229120", "Ambey is ready, Daddy! :heart:");
bot.sendMessage("214067025755111426", "Amber started.")
});

bot.on("message", function (message)
{
	if (message.content === "Amber")
	{
		bot.sendMessage(message, "Hi")
	}

	if (message.content === "Amber, am I your master?")
	{
		if (message.author.id === "94913717988229120")
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
		if (message.content === "!disconnect" && message.author.id === "94913717988229120")
		{
			bot.sendMessage(message, "Bye Daddy...");
			console.log("!disconnect command recieved, terminating...")
			bot.logout();
		}
	} 
});



