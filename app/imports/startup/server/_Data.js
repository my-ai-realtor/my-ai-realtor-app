import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';

Meteor.methods({
  fetchGameDetails: async function () {
    try {
      console.log('Fetching game details...');
      const response = HTTP.get('https://www.rolimons.com/gametable');
      console.log('Response received');

      const html = response.content;

      // Regex to capture the script content containing 'var game_details = {...};'
      const gameDetailsRegex = /var game_details = (\{.*?\});/s;
      const match = gameDetailsRegex.exec(html);

      if (!match || match.length < 2) {
        throw new Meteor.Error('no-data-found', 'No game details found in the page');
      }

      const gameDetails = match[1]; // The captured JSON-like content of `var game_details`
      console.log('Game details JSON string:', gameDetails);

      let parsedGameDetails;
      try {
        parsedGameDetails = JSON.parse(gameDetails);
      } catch (jsonError) {
        console.error('Error parsing JSON:', jsonError.message);
        throw new Meteor.Error('json-parse-error', 'Failed to parse game details JSON');
      }

      console.log('Game details parsed:', parsedGameDetails);

      const formattedGameDetails = Object.entries(parsedGameDetails).map(([id, details]) => ({
        id,
        name: details[0],
        genre: details[1],
        thumbnail: details[2],
        activePlayers: details[3],
        visits: details[4],
        upvotes: details[5],
        downvotes: details[6],
        favorites: details[7],
        peakPlayers: details[8],
      }));

      console.log('Formatted game details:', formattedGameDetails);
      return formattedGameDetails;
    } catch (error) {
      console.error('Error fetching game details:', error.message);
      throw new Meteor.Error('fetch-failed', 'Failed to fetch game details');
    }
  },
});
