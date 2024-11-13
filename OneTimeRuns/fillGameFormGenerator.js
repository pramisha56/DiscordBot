const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

const TEAMBUILD_ID = "1306190603641557073";

const roles = [
  {
    id: "Finding Member",
    label: "Find a Member"
  },
  {
    id: "Finding Team",
    label: "Find a Team"
  }
];

async function sendTeamButtons(client) {
  try {
    const channel = await client.channels.cache.get(TEAMBUILD_ID);
    if (!channel) {
      console.error(`Channel with ID ${TEAMBUILD_ID} not found`);
      return;
    }

    const row = new ActionRowBuilder();

    roles.forEach((role) => {
      row.components.push(
        new ButtonBuilder()
          .setCustomId(role.id)
          .setLabel(role.label)
          .setStyle(ButtonStyle.Primary)
      );
    });

    console.log("Sending buttons to the channel...");

    await channel.send({
      content: "Select an option. Our bot will send you a message with additional instructions later.",
      components: [row]
    });
  } catch (error) {
    console.error("Error sending buttons:", error);
  }
}

module.exports = { sendTeamButtons };
