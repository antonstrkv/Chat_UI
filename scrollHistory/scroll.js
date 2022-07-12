import { UI_ELEMENTS, API_DATA, CONSTS } from "../UI_ELEMENTS/view.mjs";
import { timeConverter, } from "../helperFunctions/main.mjs";
import { getCookie } from "../cookie/cookie.js";


let timeout = '';
let from = 20;
let to = 40;


UI_ELEMENTS.MESSAGE_BOX.addEventListener('scroll', scrollChecker);


export async function getMessagesRequest() {
  if (!CONSTS.SAVED_MESSAGES) {
    let response = await fetch(API_DATA.MESSAGES_LINK)
    CONSTS.SAVED_MESSAGES = await response.json();
    CONSTS.SAVED_MESSAGES.messages.reverse();
    showTwentyMessages();
  }
}


function scrollChecker() {
  clearTimeout(timeout);
  timeout = setTimeout(function () {
    const scroll = UI_ELEMENTS.MESSAGE_BOX.scrollTop - UI_ELEMENTS.MESSAGE_BOX.offsetHeight;
    if ((UI_ELEMENTS.MESSAGE_BOX.scrollHeight + scroll) <= 0) {
      showTwentyMessages();
      from += 20;
      to += 20;
    }
  }, 50);
}


function showTwentyMessages() {
  for (let i = from; i < to; i++) {
    let sendDate = timeConverter(new Date(CONSTS.SAVED_MESSAGES.messages[i].createdAt).getTime())
    sendHistoryMessages(
      CONSTS.SAVED_MESSAGES.messages[i].text,
      sendDate,
      CONSTS.SAVED_MESSAGES.messages[i].user.name,
      CONSTS.SAVED_MESSAGES.messages[i].user.email,
    )
    if (i == (CONSTS.SAVED_MESSAGES.messages.length - 1)) {
      UI_ELEMENTS.MESSAGE_BOX.removeEventListener('scroll', scrollChecker);
      showNotificationLastMessage()
      break;
    }
  }
}


function showNotificationLastMessage() {
  UI_ELEMENTS.DIALOG_LIST.insertAdjacentHTML('afterend', `<li class="notification_message">
  <div class="notofication-text">This is the whole chat history</div>
</div>
</li>`);
}


function sendHistoryMessages(messageText, messageDate, messageName, messageEmail) {
  const TEMPLATE = (messageEmail === getCookie("Email")) ? document.querySelector('#tmpl') : document.querySelector('#tmp2');
  const templateName = TEMPLATE.content.querySelector('.userNoSelect');
  const templateText = TEMPLATE.content.querySelector('.dialog__message-text');
  const templateDate = TEMPLATE.content.querySelector('.dialog__message-time');

  templateName.textContent = messageName + ': '
  templateText.textContent = messageText;
  templateDate.textContent = messageDate;

  UI_ELEMENTS.DIALOG_LIST.prepend(TEMPLATE.content.cloneNode(true));
}

