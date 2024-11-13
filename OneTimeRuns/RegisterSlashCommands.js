require('dotenv').config();
const { REST, Routes,ApplicationCommandOptionType } = require('discord.js');


 const commands = [ 
  {
    name: "create-sub-event-channel",
    description: "Creates a category and text channel within it",
    options: [
      {
        type : 3, //string type
        name: 'category-name',
        description: 'The name of the text channel category',
        required: true,
      },
    ],
  },

  {
    name:"create-gaming-category",
    description:"Creates a category and voice channel within it",
    options:[
      {
        type:3,
        name:'game-category-name',
        description:'The name of the game',
        required:true,
      }
    ]
  }
 ]

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log('Registering slash commands...');

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );

    console.log('Slash commands were registered successfully!');
  } catch (error) {
    console.log(`There was an error: ${error}`);
  }
})();