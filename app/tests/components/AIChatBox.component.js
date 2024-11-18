import { Selector } from 'testcafe';

class ChatBox {
    /** Open the chatbox if it is not already open */
    async openChat(testController) {
        const isOpen = await Selector('div').withText('Chat Assistant').exists;
        if (!isOpen) {
            await testController.click('button').withText('💬');
        }
    }

    /** Close the chatbox if it is open */
    async closeChat(testController) {
        const isOpen = await Selector('div').withText('Chat Assistant').exists;
        if (isOpen) {
            await testController.click('button').withText('✖');
        }
    }

    /** Send a message and verify it appears in the chat */
    async sendMessage(testController, message) {
        await this.openChat(testController);

        // Input the message
        const messageInput = Selector('input[placeholder="Type a message..."]');
        await testController
            .typeText(messageInput, message)
            .pressKey('enter');

        // Verify the message appears in the chat
        const userMessage = Selector('div').withText(message).withAttribute('style', /background-color: #007bff/);
        await testController.expect(userMessage.exists).ok('User message did not appear in chat');
    }

    /** Verify a response from the assistant */
    async verifyAssistantResponse(testController, expectedResponse) {
        const assistantMessage = Selector('div').withText(expectedResponse).withAttribute('style', /background-color: #f1f0f0/);
        await testController.expect(assistantMessage.exists).ok('Assistant response did not appear in chat');
    }

    /** Check if messages persist across sessions */
    async verifyMessagePersistence(testController, message) {
        await this.sendMessage(testController, message);
        await testController.eval(() => location.reload(true)); // Reload the page
        await this.openChat(testController);

        // Verify the message still exists in the chat after reload
        const persistedMessage = Selector('div').withText(message).withAttribute('style', /background-color: #007bff/);
        await testController.expect(persistedMessage.exists).ok('Message did not persist across sessions');
    }
}

export const chatBox = new ChatBox();
