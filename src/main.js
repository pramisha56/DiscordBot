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
const interactionsHandler = require("../Modules/Interactionhandler.js");
const { registerSlashCommand } = require("../OneTimeRuns/RegisterSlashCommands.js");
const gamingModal = require('../Modules/GamingFormModal.js');
const gamingModalSubmission = require('../Modules/GamingFormDelivery.js');
 
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
});

client.on("interactionCreate", async (interaction) => {
  try {
    if (interaction.isChatInputCommand()) {
      await interactionsHandler(interaction, client);
    }

    if (interaction.isButton()) {
      if (interaction.customId === "gaming-form") {
        await gamingModal(interaction);
      }
    }

    if (interaction.customId === "GamingModal") {
      gamingModalSubmission(interaction);
    }
  } catch(error) {
    console.error("Error handling interaction:", error);
  }
});

client.login(process.env.TOKEN);
