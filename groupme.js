var mebots = require("mebots");
let bot = new mebots.Bot("linkbot", process.env.BOT_TOKEN);

const express = require("express");
const app = express();
const axios = require("axios");

const Discord = require("discord.js");
const client = new Discord.Client();
const DBL = require("dblapi.js");
//const dbl = new DBL(process.env.TOPGG, client);
const config = require("./config.json");
const db = require("quick.db");

app.use(express.json());
app.get("/", function(req, res) {
  res.sendStatus(200);
});

app.post("/gm", async (req, res) => {
  console.log(req.body);
  let msg = req.body.text;
  let author = req.body.name;
  let gid = req.body.group_id
  let args = msg
    .slice(config.prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();
  if (author === "LinkBot") return;
  if (!msg.startsWith(config.prefix)) {
    let dc = db.get(gid)
    if (!dc) return console.log("Channel not set");
    client.channels.get(dc).send(`${author}: ${msg}`);
    
  }

  if (command === "setchannel") {
    db.set(req.body.group_id, args[0])
    sendmsg("Successfully linked this group to " + args[0], req.body.group_id);
  }
  if (command === "id") {
    sendmsg("Group id: " + req.body.group_id, req.body.group_id);
    let link = db.get(gid)
    if(link) sendmsg("Currently linked to: " + link, req.body.group_id);
  }
});

client.on("message", async message => {
  if (message.author.bot) return;
  if (message.guild === null) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (!message.content.startsWith(config.prefix)){
    let gid = db.get(message.channel.id)
    sendmsg(message.author.tag + ": " + message.content, gid);
  }
  
  if(command === "setchannel"){
    db.set(message.channel.id, args[0])
    message.channel.send("Successfully linked this channel to the group with the ID of " + args[0])
  }
  
  if(command === "id") {
    message.channel.send("Channel ID: " + message.channel.id)
    let link = db.get(message.channel.id)
    if(link) sendmsg("Currently linked to: " + link);
  }
  
  if (command === "eval") {
    if(message.author.id !== config.ownerID) 
      return message.reply(":warning: You don't have permission to use that command! :warning:")
    try {
      const code = args.join(" ");
      let evaled = eval(code);
 
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
 
      message.channel.send(clean(evaled), {code:"xl"});
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  }
});

const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});

function sendmsg(msg, groupid) {
  bot.getInstance(groupid).then(instance => {
    console.log("Instance")
    console.log(instance)
    axios
      .post("https://api.groupme.com/v3/bots/post", {
        text: msg,
        bot_id: instance.id
      })
      .then(res => {
        console.log(`statusCode: ${res.statusCode}`);
        console.log(res);
      })
      .catch(error => {
        console.error(error);
      });
  });
}

client.login(process.env.DISCORD);

function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}