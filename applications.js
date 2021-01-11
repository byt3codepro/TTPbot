//©raltec 2021
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('message', message => {
		//   space for dm commands  
		
		if (message.content == "?testing") {
			logNamesAndMajors();
		}
		
		//   space for dm commands  
});

/**
 * Creates a Sheets API service object and prints the names and majors of
 * students in a sample spreadsheet:
 * https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 */
function logNamesAndMajors() {
  var spreadsheetId = '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms';
  var rangeName = 'Class Data!A2:E';
  var values = Sheets.Spreadsheets.Values.get(spreadsheetId, rangeName).values;
  if (!values) {
    Logger.log('No data found.');
  } else {
    Logger.log('Name, Major:');
    for (var row = 0; row < values.length; row++) {
      // Print columns A and E, which correspond to indices 0 and 4.
      Logger.log(' - %s, %s', values[row][0], values[row][4]);
    }
  }
}

client.login(process.env.BOT_TOKEN);
//©raltec 2021
