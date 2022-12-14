import { Client, GatewayIntentBits, EmbedBuilder } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

// Initialize discord client
export const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

// Login into discord bot
export const initDiscord = async () => {
  client.on("ready", async () => {
    console.log(`Discord logged in as ${client.user?.tag}`);
  });

  await client.login(process.env.DISCORD_TOKEN);

  return client;
};

// Send message on discord
export const createPostOnDiscordChannel = async (channelId, message) => {
  try {
    if (!client.isReady()) {
      return;
    }

    const channel = await client.channels.fetch(channelId);
    await channel.send(message);

    console.log("Posted on Discord successfully");
  } catch (error) {
    console.error("Post on discord channel failed ", error);
  }
};

// Create embed
export const createEmbed = async (embedInfo) => {
  let keysSorted = Object.keys(embedInfo).sort(function (a, b) {
    return embedInfo[a] - embedInfo[b];
  });
  const embed = new EmbedBuilder()
    .setColor(0x534bb1)
    .setTitle("Top 3 pools")
    .setURL(`https://frakt.xyz/lend`)
    .setAuthor({
      name: `FRAKT Yield`,
      iconURL: "https://frakt.xyz/favicon.ico",
    })
    .addFields(
      {
        name: `${keysSorted[2]}`,
        value: `${embedInfo[keysSorted[2]]}%`,
      },
      {
        name: `${keysSorted[1]}`,
        value: `${embedInfo[keysSorted[1]]}%`,
      },
      {
        name: `${keysSorted[0]}`,
        value: `${embedInfo[keysSorted[0]]}%`,
      }
    )
    .setTimestamp()
    .setFooter({
      text: `Created by CryptoTioSam`,
    });
  return embed;
};
