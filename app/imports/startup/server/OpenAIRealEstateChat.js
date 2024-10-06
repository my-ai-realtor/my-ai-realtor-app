import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import { check } from 'meteor/check';

// TODO: This is a temporary prototype for connecting to the OpenAI API.
// Future improvement: Make the system modular to support multiple API providers based on configuration.

Meteor.methods({
  'chatRealEstate'(message) {
    check(message, String);

    const apiKey = Meteor.settings.private.openaiApiKey;
    if (!apiKey) {
      throw new Meteor.Error('API key not found');
    }

    this.unblock();

    try {
      const response = HTTP.call('POST', 'https://api.openai.com/v1/chat/completions', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        data: {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a knowledgeable assistant specialized in real estate. Provide helpful and accurate information about real estate topics.',
            },
            {
              role: 'user',
              content: message,
            },
          ],
          max_tokens: 1500,
          temperature: 0.7,
        },
      });

      const assistantReply = response.data.choices[0].message.content;
      return assistantReply;
    } catch (error) {
      throw new Meteor.Error('Failed to get response from OpenAI API');
    }
  },
});
