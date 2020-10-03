const re = require("./resources.js").data
require("dotenv").config()
const { Telegraf } = require("telegraf")
const config = re.config
const cmd = require("node-cmd")
const bot = new Telegraf(process.env.TELEGRAM)

// bot.use((ctx) => {
//     console.log(ctx.message)
//   })

bot.catch((err, ctx) => {
	ctx.reply("An error has occured. Please join the @andromedasystem group for assistance.")
	console.error(`Encountered an error for ${ctx.updateType}`, err)
})

bot.start((ctx) => {
    ctx.reply("Hi there, I'm Wormhole. I'm part of the Andromeda system! My job is to link your chats from Discord to a Telegram group here! To learn how to use me, use the command /help!")
})

bot.command("say", (ctx) => {
	if (ctx.message.from.id != config.tgshadow) return
    bot.telegram.sendMessage(ctx.message.chat.id, ctx.message.text.replace("/say ", ""))
    bot.telegram.deleteMessage(ctx.message.chat.id, ctx.message_id)
})

bot.command("eval", (ctx) => {
    if (ctx.message.from.id != config.tgshadow) return
    console.log("eval")
	try {
		const code = ctx.message.text.replace("/eval ", "")
		let evaled = eval(code)

		if (typeof evaled !== "string") evaled = require("util").inspect(evaled)

		ctx.reply(evaled)
	} catch (err) {
		ctx.reply(`\`ERROR\` \n${err}`)
	}
})

function sm(msg) {
	bot.telegram.sendMessage(config.tgsupport, message)
}

bot.launch().then((x) => {
	console.log("Telegram has started")
})
