import { Selector } from 'testcafe';

class ChatAssistant {
    /** Verify the chat assistant page is visible */
    async isChatAssistantVisible(testController) {
        const chatPage = Selector('.chat-assistant-page');
        await testController.expect(chatPage.exists).ok('Chat Assistant page is not visible');
    }

    /** Send a message and verify it appears */
    async sendMessage(testController, message) {
        const inputField = Selector('input[placeholder="Type a message..."]');

        await testController
            .typeText(inputField, message)
            .pressKey('enter');

        const userMessage = Selector('.chat-message.user').withText(message);
        await testController.expect(userMessage.exists).ok('User message did not appear in chat');
    }

    /** Verify the assistant's response */
    async verifyAssistantResponse(testController, expectedResponse) {
        const assistantMessage = Selector('.chat-message.assistant').withText(expectedResponse);
        await testController.expect(assistantMessage.exists).ok('Assistant response did not appear in chat');
    }

    /** Verify messages persist across sessions */
    async verifyMessagePersistence(testController, message) {
        await this.sendMessage(testController, message);
        await testController.eval(() => location.reload(true)); // Reload the page

        const persistedMessage = Selector('.chat-message.user').withText(message);
        await testController.expect(persistedMessage.exists).ok('User message did not persist after reload');
    }
}

export const chatAssistant = new ChatAssistant();
