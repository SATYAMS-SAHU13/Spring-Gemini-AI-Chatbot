
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const chatBox = document.getElementById("chatBox");
const sendBtn = document.getElementById("sendBtn");

const API_URL = "http://localhost:8080/api/gemini/ask";

// Display messages inside chat
function addMessage(message, className) {
    const messageDiv = document.createElement("div");

    messageDiv.classList.add("message", className);
    messageDiv.textContent = message;

    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;

    return messageDiv;
}

// Send question to Spring Boot backend
chatForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const question = userInput.value.trim();

    if (!question) return;

    addMessage(question, "user-message");

    userInput.value = "";
    sendBtn.disabled = true;

    const loadingMessage = addMessage(
        "Gemini is thinking...",
        "bot-message"
    );

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                prompt: question
            })
        });

        if (!response.ok) {
            throw new Error("API Error: " + response.status);
        }

        const answer = await response.text();

        loadingMessage.textContent = answer;

    } catch (error) {
        console.error(error);

        loadingMessage.textContent =
            "Sorry, something went wrong. Please try again.";

    } finally {
        sendBtn.disabled = false;
        userInput.focus();
        chatBox.scrollTop = chatBox.scrollHeight;
    }
});
