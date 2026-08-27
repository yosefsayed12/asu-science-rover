const aiChatBtn = document.getElementById("aiChatBtn");
const aiChatBox = document.getElementById("aiChatBox");
const aiCloseBtn = document.getElementById("aiCloseBtn");

const aiForm = document.getElementById("aiForm");
const aiInput = document.getElementById("aiInput");
const aiMessages = document.getElementById("aiMessages");

aiChatBtn.addEventListener("click", () => {

    aiChatBox.classList.add("active");

    aiInput.focus();
});


aiCloseBtn.addEventListener("click", () => {

    aiChatBox.classList.remove("active");
});


function addMessage(message, type) {

    const messageContainer = document.createElement("div");

    messageContainer.classList.add(
        "ai-message",
        type
    );


    const icon = document.createElement("span");

    icon.classList.add("message-icon");

    icon.textContent =
        type === "bot" ? "🤖" : "👤";


    const bubble = document.createElement("div");

    bubble.classList.add("message-bubble");

    bubble.textContent = message;


    messageContainer.appendChild(icon);

    messageContainer.appendChild(bubble);

    aiMessages.appendChild(messageContainer);

    aiMessages.scrollTop =
        aiMessages.scrollHeight;
}

function showTyping() {

    const typingMessage =
        document.createElement("div");

    typingMessage.classList.add(
        "ai-message",
        "bot"
    );

    typingMessage.id = "typingMessage";


    typingMessage.innerHTML =` 
        <span class="message-icon"><i class="fa-solid fa-robot" style="color: rgb(86, 84, 87)"></i></span>

        <div class="message-bubble">
            <div class="typing">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>`;


    aiMessages.appendChild(typingMessage);

    aiMessages.scrollTop =
        aiMessages.scrollHeight;
}

function removeTyping() {

    const typingMessage =
        document.getElementById("typingMessage");

    if (typingMessage) {
        typingMessage.remove();
    }
}

aiForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const message =
        aiInput.value.trim();


    if (!message) {
        return;
    }

    addMessage(message, "user");
    aiInput.value = "";

    showTyping();

    setTimeout(() => {

        removeTyping();

        addMessage(
            "المفروض يجي رد دلوقتي بس قريب ان شاء الله"
        );

    }, 1200);

});