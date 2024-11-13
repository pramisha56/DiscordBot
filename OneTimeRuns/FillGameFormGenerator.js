const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

async function sendTeamButtons(client, formChannelId) {
  try {
    const channel = await client.channels.cache.get(formChannelId);
    if (!channel) {
      console.error(`Channel with ID ${formChannelId} not found`);
      return;
    }

    const formButton = new ActionRowBuilder();
    formButton.components.push(
      new ButtonBuilder()
        .setCustomId("gaming-form")
        .setLabel("Press to Fill Form.")
        .setStyle(ButtonStyle.Primary)
    );

    await channel.send({
      content: "Below is the Team Registration Form\nPlease Fill the Form Carefully",
      components: [formButton]
    });
  } catch (error) {
    console.error("Error sending buttons:", error);
  }
}

module.exports = { sendTeamButtons };
