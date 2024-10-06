import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import { check } from 'meteor/check';

Meteor.methods({
  'chatRealEstate'(message) {
    check(message, String);

    // Get feature flags from settings
    const useChatGPT = Meteor.settings.public.featureFlags.enableChatGPT;
    const useLLAMA = Meteor.settings.public.featureFlags.enableLLAMA;
    const useGPT4 = Meteor.settings.public.featureFlags.enableGPT4;

    // Determine which API key and model to use
    let apiUrl; let apiKey; let
      modelType;

    if (useChatGPT) {
      apiUrl = 'https://api.openai.com/v1/chat/completions';
      apiKey = Meteor.settings.private.openaiApiKey || 'test-openai-api-key'; // Use a dummy key for development
      modelType = 'gpt-3.5-turbo';
    } else if (useLLAMA) {
      apiUrl = 'https://api.llama.com/v1/chat/completions'; // Example URL for LLAMA API
      apiKey = Meteor.settings.private.llamaApiKey || 'test-llama-api-key'; // Use a dummy key for development
      modelType = 'llama-model-id';
    } else if (useGPT4) {
      apiUrl = 'https://api.openai.com/v1/chat/completions';
      apiKey = Meteor.settings.private.openaiApiKey || 'test-gpt4-api-key'; // Use a dummy key for development
      modelType = 'gpt-4';
    } else {
      throw new Meteor.Error('No AI model enabled. Please check feature flags.');
    }

    this.unblock(); // Allows other methods to run while this is still processing

    try {
      const response = HTTP.call('POST', apiUrl, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        data: {
          model: modelType,
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
      throw new Meteor.Error('Failed to get response from AI model API');
    }
  },
});
