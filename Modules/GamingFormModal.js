const {
  ActionRowBuilder,
  TextInputBuilder,
  TextInputStyle,
  ModalBuilder,
} = require("discord.js");

module.exports = async (interaction) => {
  const modalforteam = new ModalBuilder()
    .setCustomId("GamingModal")
    .setTitle("Team Registration Form");
  const TeamQuestion1 = new TextInputBuilder()
    .setCustomId("TeamQuestion1")
    .setLabel("Team Leader Name")
    .setStyle(TextInputStyle.Short);
  const TeamQuestion2 = new TextInputBuilder()
    .setCustomId("TeamQuestion2")
    .setLabel("Team Name")
    .setStyle(TextInputStyle.Short);
  const TeamQuestion3 = new TextInputBuilder()
    .setCustomId("TeamQuestion3")
    .setLabel("Team Members Discord ID (Separate Using ,)")
    .setStyle(TextInputStyle.Short);
  const TeamQuestion4 = new TextInputBuilder()
    .setCustomId("TeamQuestion4")
    .setLabel("Participant of which Game?")
    .setStyle(TextInputStyle.Short);
  const actionrow1 = new ActionRowBuilder().addComponents(TeamQuestion1);
  const actionrow2 = new ActionRowBuilder().addComponents(TeamQuestion2);
  const actionrow3 = new ActionRowBuilder().addComponents(TeamQuestion3);
  const actionrow4 = new ActionRowBuilder().addComponents(TeamQuestion4);

  modalforteam.addComponents(
    actionrow1,
    actionrow2,
    actionrow3,
    actionrow4,
  );

  interaction.showModal(modalforteam);
};
