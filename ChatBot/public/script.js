//api setup
const API_KEY = "AIzaSyBdA9hYacojq_UFw353C8NWf1Txwuf5D8Y";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

const chatBody = document.querySelector(".chat-Body");
const messageInput = document.querySelector(".message-input");
const messageSendBtn = document.querySelector("#send-message");

const userData = {
  message: null,
};

//make message element with dynamic div and then returns it
const createMessageElement = (content, ...classes) => {
  const div = document.createElement("div");
  div.classList.add("message", ...classes);
  div.innerHTML = content;
  return div;
};

const generateBotResponse = async () => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: userData.message }],
        },
      ],
    }),
  };

  try {
    const response = await fetch(API_URL, requestOptions);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error.message);
      console.log(data);
    }
  } catch (error) {
    console.log(error);
  }
};

// handles outgoing messages
const handelOutGoingMessages = (e) => {
  e.preventDefault();
  userData.message = messageInput.value.trim();
  messageInput.value = "";

  //creates a user-messgae display
  const messageContent = `<div class="user-text-message"></div>`;
  const outGoingMessageDiv = createMessageElement(
    messageContent,
    "user-message"
  );
  outGoingMessageDiv.querySelector(".user-text-message").innerText =
    userData.message;
  chatBody.appendChild(outGoingMessageDiv);

  //simulate bot thinking indicator
  setTimeout(() => {
    const messageContent = `<svg xmlns="http://www.w3.org/2000/svg" class="bot-avatar" "50" height="50" viewBox="0 0 1024 1024"><path
        d="M738.3 287.6H285.7c-59 0-106.8 47.8-106.8 106.8v303.1c0 59 47.8 106.8 106.8 106.8h81.5v111.1c0 .7.8 1.1 1.4.7l166.9-110.6 41.8-.8h117.4l43.6-.4c59 0 106.8-47.8 106.8-106.8V394.5c0-59-47.8-106.9-106.8-106.9zM351.7
         448.2c0-29.5 23.9-53.5 53.5-53.5s53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5-53.5-23.9-53.5-53.5zm157.9 267.1c-67.8 0-123.8-47.5-132.3-109h264.6c-8.6
          61.5-64.5 109-132.3 109zm110-213.7c-29.5 0-53.5-23.9-53.5-53.5s23.9-53.5 53.5-53.5 53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5zM867.2 644.5V453.1h26.5c19.4 0 35.1
           15.7 35.1 35.1v121.1c0 19.4-15.7 35.1-35.1 35.1h-26.5zM95.2 609.4V488.2c0-19.4 15.7-35.1 35.1-35.1h26.5v191.3h-26.5c-19.4 0-35.1-15.7-35.1-35.1zM561.5
            149.6c0 23.4-15.6 43.3-36.9 49.7v44.9h-30v-44.9c-21.4-6.5-36.9-26.3-36.9-49.7 0-28.6 23.3-51.9 51.9-51.9s51.9 23.3 51.9 51.9z">
    </path>
 
</svg>
<div class="text-message ">
                    <div class="thinking-indicator">
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                    </div>
                </div>`;
    const incomingMessageDiv = createMessageElement(
      messageContent,
      "bot-message",
      "thinking"
    );
    incomingMessageDiv.innerHTML = messageContent;
    chatBody.appendChild(incomingMessageDiv);
    generateBotResponse();
  }, 600);
};

// Handles enter press to send messages
messageInput.addEventListener("keydown", (e) => {
  const userMessage = e.target.value.trim();
  if (e.key === "Enter" && e) {
    handelOutGoingMessages(e);
  }
});

messageSendBtn.addEventListener("click", (e) => handelOutGoingMessages(e));

function closeChat() {
  const chatHeader = document.querySelector(".chat-Header");
  const chatBody = document.querySelector(".chat-Body");
  const chatFooter = document.querySelector(".chat-footer");
  const isHidden = chatBody.classList.contains("hidden");

  if (isHidden) {
    chatBody.classList.remove("hidden");
    chatFooter.classList.remove("hidden");
  } else {
    chatHeader.classList.toggle("hidden");
    chatBody.classList.add("hidden");
    chatFooter.classList.add("hidden");
  }
}