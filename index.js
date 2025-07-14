const { Client, GatewayIntentBits } = require("discord.js");
const axios = require("axios");

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.once("ready", () => {
  console.log(`Conectado como ${client.user.tag}`);

  setInterval(async () => {
    try {
      const res = await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd");
      const ethPrice = res.data.ethereum.usd.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });

      await client.user.setActivity(`ETH: ${ethPrice}`, { type: 3 }); // type 3 = Watching
    } catch (err) {
      console.error("Error al obtener el precio:", err);
    }
  }, 60 * 1000); // cada 60 segundos
});

client.login(process.env.DISCORD_TOKEN);