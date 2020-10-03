const re = require(`../resources.js`).data;
let messagefunc = require("../../global/message.js")
re.client.on("message", async message => {
    message.re = re


    await messagefunc(message, re)
});