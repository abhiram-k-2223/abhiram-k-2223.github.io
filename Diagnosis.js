async function sendMessage() {
    const userInput = document.getElementById("user-input").value;
    if (!userInput) {
        alert("Please type a message.");
        return;
    }

    const chatContent = document.getElementById("chat-content");
    const userMessage = document.createElement("div");
    userMessage.className = "chat-message user-message";
    userMessage.textContent = userInput;
    chatContent.appendChild(userMessage);

    document.getElementById("user-input").value = "";

    try {
        const response = await fetch('http://localhost:3001/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: userInput }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }

        const data = await response.json();
        const botMessage = document.createElement("div");
        botMessage.className = "chat-message bot-message";
        botMessage.textContent = data.response;
        chatContent.appendChild(botMessage);

        chatContent.scrollTop = chatContent.scrollHeight;
    } catch (error) {
        console.error('Error fetching response:', error);
    }
}
