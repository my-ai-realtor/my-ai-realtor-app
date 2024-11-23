/* eslint-disable no-console */
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { HTTP } from 'meteor/http';

Meteor.methods({
  async 'calculateComparable'(features) {
    check(features, Object);

    try {
      // Step 1: Make the initial POST request to start the prediction
      const postResponse = HTTP.post('https://caslabs-home-price-predictor-mockup.hf.space/gradio_api/call/predict', {
        headers: { 'Content-Type': 'application/json' },
        data: { data: [features] },
      });

      console.log('POST Response:', postResponse);

      // Extract EVENT_ID (hash) from the initial response
      const eventId = postResponse?.data?.event_id;

      if (!eventId) {
        console.error('No event ID returned from initial prediction request');
        throw new Meteor.Error('event-id-missing', 'No event ID returned from initial prediction request.');
      }

      // Step 2: Make the GET request using the EVENT_ID to retrieve the prediction
      const getResponse = HTTP.get(`https://caslabs-home-price-predictor-mockup.hf.space/gradio_api/call/predict/${eventId}`, {
        npmRequestOptions: {
          timeout: 60000, // Optional: Set timeout to 60 seconds
        },
      });

      console.log('GET Response:', getResponse);

      // The GET response content may include multiple lines
      if (getResponse.content) {
        // Split the content by new lines to process each line
        const lines = getResponse.content.split('\n');

        // Find the line that contains the prediction data
        const dataLine = lines.find(line => line.startsWith('data: '));

        if (dataLine) {
          // Remove 'data: ' prefix and parse the JSON
          const dataJson = dataLine.slice(6);

          const data = JSON.parse(dataJson);

          const predictedPrice = data[0]?.predicted_price;

          if (predictedPrice !== undefined) {
            // Return the predicted price to the frontend
            return { status: 'complete', predictedPrice };
          }
          return { status: 'error', message: 'Prediction data not found in response' };

        }
        return { status: 'error', message: 'Data line not found in response' };

      }
      return { status: 'error', message: 'No content in GET response' };

    } catch (error) {
      console.error('API request error:', error);
      throw new Meteor.Error('calculation-failed', 'Failed to calculate comparable price', error);
    }
  },
});
