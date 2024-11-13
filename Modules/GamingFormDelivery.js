// ID of the channel where the "Finding a team" form is submitted.
const TeamChannelID = "1306278701192839260";

const {
  EmbedBuilder
} = require("discord.js");

module.exports = async (interaction) => {
  const Answer1 = interaction.fields.getTextInputValue("TeamQuestion1");
  const Answer2 = interaction.fields.getTextInputValue("TeamQuestion2");
  const Answer3 = interaction.fields.getTextInputValue("TeamQuestion3");
  const Answer4 = interaction.fields.getTextInputValue("TeamQuestion4");

  const TeamformEmbed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle("Team Registration Form")
    .addFields(
      { name: "Issued By", value: `<@${interaction.user.id}>!` },
      { name: "Team Leader Name", value: Answer1 },
      { name: "Team Name", value: Answer2 },
      { name: "Team Members", value: Answer3 },
      { name: "Stack", value: Answer4 },
    );
  const channel = interaction.member.guild.channels.cache.get(TeamChannelID);
  channel.send({ embeds: [TeamformEmbed] });

  await interaction.reply({
    content: "Form has been submitted Successfully",
    ephemeral: true
  });
};
