const aiChatBtn = document.getElementById("aiChatBtn");
const aiChatBox = document.getElementById("aiChatBox");
const aiCloseBtn = document.getElementById("aiCloseBtn");

const aiForm = document.getElementById("aiForm");
const aiInput = document.getElementById("aiInput");
const aiMessages = document.getElementById("aiMessages");

let anonymousUserId = localStorage.getItem("anonymousUserId");

if (!anonymousUserId) {
    anonymousUserId = crypto.randomUUID();

    localStorage.setItem(
        "anonymousUserId",
        anonymousUserId
    );
}

aiChatBtn.addEventListener("click", () => {

    aiChatBox.classList.add("active");

    aiInput.focus();
});


aiCloseBtn.addEventListener("click", () => {

    aiChatBox.classList.remove("active");
});


// function addMessage(message, type) {

//     const messageContainer = document.createElement("div");

//     messageContainer.classList.add(
//         "ai-message",
//         type
//     );


//     const icon = document.createElement("span");

//     icon.classList.add("message-icon");

//     icon.textContent =
//         type === "bot" ? "🤖" : "👤";


//     const bubble = document.createElement("div");

//     bubble.classList.add("message-bubble");

//     bubble.textContent = message;


//     messageContainer.appendChild(icon);

//     messageContainer.appendChild(bubble);

//     aiMessages.appendChild(messageContainer);

//     aiMessages.scrollTop =
//         aiMessages.scrollHeight;
// }

function addMessage(message, type) {

    const messageContainer =
        document.createElement("div");

    messageContainer.classList.add(
        "ai-message",
        type
    );

    const icon =
        document.createElement("span");

    icon.classList.add("message-icon");

    icon.textContent =
        type === "bot" ? "🤖" : "👤";

    const bubble =
        document.createElement("div");

    bubble.classList.add("message-bubble");

    bubble.textContent = message;

    messageContainer.appendChild(icon);
    messageContainer.appendChild(bubble);

    aiMessages.appendChild(messageContainer);

    aiMessages.scrollTop =
        aiMessages.scrollHeight;

    // مهم جدًا للـ Streaming
    return bubble;
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

// aiForm.addEventListener("submit", async (event) => {

//     event.preventDefault();

//     const message = aiInput.value.trim();

//     if (!message) {
//         return;
//     }

//     addMessage(message, "user");
//     aiInput.value = "";

//     showTyping();

//     try {

//         const response = await fetch(
//             "http://localhost:3000/api/ai/ask",
//             {
//                 method: "POST",

//                 headers: {
//                     "Content-Type": "application/json",
//                     "x-anonymous-user-id": anonymousUserId
//                 },

//                 body: JSON.stringify({
//                     question: message
//                 })
//             }
//         );

//         const data = await response.json();

//         removeTyping();

//         if (!response.ok) {
//             addMessage(
//                 data.message || "حصل خطأ، حاول تاني."
//             );
//             return;
//         }

//         addMessage(
//             data.answer,
//             "ai"
//         );

//     } catch (error) {

//         console.error("AI Request Error:", error);

//         removeTyping();

//         addMessage(
//             "حصل خطأ في الاتصال بالسيرفر، حاول تاني."
//         );
//     }
// });

aiForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const message = aiInput.value.trim();

    if (!message) {
        return;
    }

    addMessage(message, "user");
    aiInput.value = "";

    showTyping();

    try {

        const response = await fetch(
            "https://asu-science-rover-3o4z-git-main-asus-cience-rover.vercel.app/",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "x-anonymous-user-id": anonymousUserId
                },

                body: JSON.stringify({
                    question: message
                })
            }
        );


        // ================================
        // Error Response
        // ================================

        if (!response.ok) {

            const data = await response.json();

            removeTyping();

            addMessage(
                data.message || "حصل خطأ، حاول تاني."
            );

            return;
        }


        // ================================
        // Start Reading Stream
        // ================================

        const reader =
            response.body.getReader();

        const decoder =
            new TextDecoder("utf-8");

        let aiMessage = "";
        let aiMessageElement = null;


        // ================================
        // Read Chunks
        // ================================

        while (true) {

            const { value, done } =
                await reader.read();

            if (done) {
                break;
            }

            const chunk =
                decoder.decode(value, {
                    stream: true
                });

            aiMessage += chunk;


            // ============================
            // First Chunk
            // ============================

            if (!aiMessageElement) {

                removeTyping();

                aiMessageElement =
                    addMessage("", "bot");
            }


            // ============================
            // Update AI Message
            // ============================

            aiMessageElement.textContent =
                aiMessage;
        }


        // Finish decoding
        aiMessage += decoder.decode();

    } catch (error) {

        console.error(
            "AI Request Error:",
            error
        );

        removeTyping();

        addMessage(
            "حصل خطأ في الاتصال بالسيرفر، حاول تاني."
        );
    }

});