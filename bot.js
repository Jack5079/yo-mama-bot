require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client({
  ws: {
    intents: Discord.Intents.NON_PRIVILEGED,
  },
});

const jokes = require("node-fetch")(
  "https://raw.githubusercontent.com/rdegges/yomomma-api/master/jokes.txt",
).then((res) => res.text()).then((text) => text.split("\n"));

client.login(process.env.TOKEN);
setInterval(() => {
  client.guilds.cache.forEach((guild) => {
    guild.channels.cache.forEach(async (channel) => {
      if (channel instanceof Discord.TextChannel) {
        /**
         * @type {string[]}
         */
        const jokearray = await jokes;

        channel.send("@everyone " + jokearray[Math.floor(Math.random() * jokearray.length)]);
      }
    });
  });
}, 1000 * 60 * 10);
