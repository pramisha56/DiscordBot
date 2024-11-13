require("dotenv").config();
const { PermissionsBitField } = require('discord.js');

const handelinteraction = async (interaction) => {
    try {
        if (!interaction.isChatInputCommand()) return;
        
        if (interaction.commandName === 'create-gaming-category') {
            
            const categoryName = interaction.options.getString('game-category-name');
            await interaction.deferReply();


            if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
                return interaction.editReply('I need permission to manage channels to use this command.');
            }

            console.log("print");
            const role = interaction.guild.roles.cache.find(r => r.name === "Developers");
            if (!role) {
                return interaction.editReply('Specified role not found.');
            }

            try {
                const category = await interaction.guild.channels.create({
                    name: categoryName,
                    type: 4,
                    permissionOverwrites: [
                        {
                            id: interaction.guild.roles.everyone.id,
                            deny: [PermissionsBitField.Flags.ViewChannel],
                        },
                        {
                            id: role.id,
                            allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
                        }
                    ]
                });

                const voiceChannels = [];

                for (let i = 1; i <= 8; i++) {
                    const channel = await interaction.guild.channels.create({
                        name: `Team ${i}`,
                        type: 2,
                        parent: category.id,
                        permissionOverwrites: [
                            {
                                id: interaction.guild.roles.everyone.id,
                                deny: [PermissionsBitField.Flags.ViewChannel],
                            },
                            {
                                id: role.id,
                                allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
                            }
                        ]
                    });


                    voiceChannels.push(channel.name);
                }

                        
                const channel1 = await interaction.guild.channels.create({
                    name: "Test",
                    type: 0,
                    parent: category.id,
                    permissionOverwrites: [
                        {
                            id: interaction.guild.roles.everyone.id,
                            deny: [PermissionsBitField.Flags.ViewChannel],
                        },
                        {
                            id: role.id,
                            allow: [
                                PermissionsBitField.Flags.ViewChannel,
                                PermissionsBitField.Flags.SendMessages
                            ],
                        }
                    ]
                });

                await interaction.editReply(
                    `Category **${category.name}** and voice channels **${voiceChannels.join(", ")}** created successfully!`
                );
            } catch (error) {
                console.error(error);
                await interaction.editReply('There was an error creating the category and channels.');
            }
        }
    } catch (error) {
        console.error('Error in create-voice-channel command:', error);
        if (!interaction.replied) {
            await interaction.reply({
                content: 'There was an error processing your request.',
                ephemeral: true
            });
        }
    }
};

module.exports = {
    handelinteraction
};
