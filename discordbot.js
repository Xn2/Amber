var Discord = require ("discord.js");

var bot = new Discord.Client();

bot.loginWithToken("MjEzNzg3NDI0OTQ4NDg2MTQ1.Co_idw.avAwjKieTDkvWrALiq-UKpqeUJs");

bot.sendMessage("94913717988229120", "Amber Bot started");

bot.on("ready", function (message)
{
bot.sendMessage("94913717988229120", "Ambey is ready, Daddy! :heart:");
bot.sendMessage("214067025755111426", "Amber started.")
});

bot.on("message", function (message)
{
	if (message.author.id === "213787424948486145")
	{
		
	}

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
			bot.logout();
		}
	} 
});

bot.on("userBanned", function (message)
{
let banneduserObject
bot.sendMessage("94913717988229120", "banned user" + User)
});


