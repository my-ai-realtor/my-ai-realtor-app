import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import fetch from 'node-fetch';
import { HfInference } from '@huggingface/inference';

// Polyfill fetch for Node.js
global.fetch = fetch;

Meteor.methods({
  async 'chatRealEstate'(message, selectedModel) {
    // Ensure both message and selectedModel are present before performing checks
    if (!message || !selectedModel) {
      throw new Meteor.Error('invalid-arguments', 'Message and model must be provided');
    }

    check(message, String);
    check(selectedModel, String);

    // Determine which model to use
    if (selectedModel.includes('tiiuae') || selectedModel.includes('meta-llama')) {
      // Hugging Face API logic
      const inference = new HfInference(Meteor.settings.private.huggingFaceApiKey);

      try {
        const response = await inference.textGeneration({
          model: selectedModel,
          inputs: message,
          parameters: {
            max_new_tokens: 500,
            temperature: 0.7,
          },
        });
        const assistantReply = response.generated_text;
        return assistantReply.trim();
      } catch (error) {
        throw new Meteor.Error('huggingface-api-error', 'Failed to get response from Hugging Face API');
      }
    } else {
      // OpenAI API logic
      const apiUrl = 'https://api.openai.com/v1/chat/completions';
      const apiKey = Meteor.settings.private.openaiApiKey;

      const data = {
        model: selectedModel,
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
      };

      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      };

      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(data),
        });

        const result = await response.json();

        // Handle API response errors
        if (!response.ok) {
          throw new Meteor.Error('openai-api-error', result.error.message || 'Failed to get response from OpenAI API');
        }

        return result.choices[0].message.content.trim();
      } catch (error) {
        throw new Meteor.Error('openai-api-error', 'Failed to get response from OpenAI API');
      }
    }
  },
});
