require("dotenv").config();
const {
  Client,
  IntentsBitField,
  ActionRowBuilder,
  TextInputBuilder,
  TextInputStyle,
  ModalBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} = require("discord.js");
const { interactionsHandler } = require("../Modules/Interactionhandler.js");
const { registerSlashCommand } = require("../OneTimeRuns/RegisterSlashCommands.js");
const { sendTeamButtons } = require("../OneTimeRuns/fillGameFormGenerator.js");  


const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildMessageReactions,
    IntentsBitField.Flags.GuildEmojisAndStickers,
  ],
});

client.on("ready", async () => {
  console.log(`Bot is online as ${client.user.tag}`);
  
  await sendTeamButtons(client);
});

client.on("interactionCreate", async (interaction) => {
  try {
    // await interactionhandler(interaction);
  } catch (error) {
    console.error("Error handling interaction:", error);
  }
});


client.on("interactionCreate", async (interaction) => {
  if (interaction.isButton()) {
    if (interaction.customId === "Finding Member") {
      await interaction.reply("You selected to Find a Member!");
    } else if (interaction.customId === "Finding Team") {
      await interaction.reply("You selected to Find a Team!");
    }
  }
});

client.login(process.env.TOKEN);

