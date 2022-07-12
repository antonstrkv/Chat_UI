import { UI_ELEMENTS } from "../UI_ELEMENTS/view.mjs";
import { getMessagesRequest } from "../scrollHistory/scroll.js";
import { sendMessageToServer } from "../webSocket/webSocket.js";
import { sendAuthorizationCode } from "../authorization/authorization.js";
import { saveCookie } from "../cookie/cookie.js";
import { sendAuthorizationRequest } from "../settings/changeChatName.js";
import { getInputMessage } from "../chatMessages/chatMessages.js";
import {
	getInputToken,
	showNotice,
} from "../helperFunctions/main.mjs";


UI_ELEMENTS.BTN_DIALOD.addEventListener('submit', () => {
	(UI_ELEMENTS.BTN_EXIT.textContent === 'Log out') ?
		sendMessageToServer(getInputMessage()) :
		 showNotice("Message history and sending messages are available after authorization.", "red")
});


UI_ELEMENTS.BTN_AUTHORIZATION.addEventListener('submit', () => {
	sendAuthorizationCode().catch((err) => {
		showNotice(err, 'red')
	})
});


UI_ELEMENTS.BTN_CONFIRMATION.addEventListener('submit', () => {
	saveCookie("Token", getInputToken());
	UI_ELEMENTS.BTN_EXIT.textContent = 'Log out';
	UI_ELEMENTS.CONFIRMATION_BLOCK.style.display = 'none';
	getMessagesRequest();
});


UI_ELEMENTS.BTN_SETTINGS_SUBMIT.addEventListener('submit', () => {
	sendAuthorizationRequest();
});


UI_ELEMENTS.BTN_SETTINGS.addEventListener('click', () => {
	UI_ELEMENTS.SETTINGS_BLOCK.style.display = 'flex';
});


UI_ELEMENTS.BTN_CLOSE_SETTINGS.addEventListener('click', () => {
	UI_ELEMENTS.SETTINGS_BLOCK.style.display = 'none';
});


UI_ELEMENTS.BTN_CLOSE_AUTHORIZATION.addEventListener('click', () => {
	UI_ELEMENTS.AUTHORIZATION_BLOCK.style.display = 'none';
});


UI_ELEMENTS.BTN_EXIT.addEventListener('click', () => {
	UI_ELEMENTS.BTN_EXIT.textContent = 'Log in';
	UI_ELEMENTS.AUTHORIZATION_BLOCK.style.display = 'flex';
});


UI_ELEMENTS.BTN_CLOSE_CONFIRMATION.addEventListener('click', () => {
	UI_ELEMENTS.CONFIRMATION_BLOCK.style.display = 'none';
});


UI_ELEMENTS.BTN_AUTHORIZATION_ENTER.addEventListener('click', () => {
	UI_ELEMENTS.AUTHORIZATION_BLOCK.style.display = 'none';
	UI_ELEMENTS.CONFIRMATION_BLOCK.style.display = 'flex';
});


UI_ELEMENTS.NOTICE_CLOSE.addEventListener('click', () => {
	UI_ELEMENTS.NOTICE_BLOCK.style.display = 'none';
})


UI_ELEMENTS.NOTICE_OK.addEventListener('click', () => {
	UI_ELEMENTS.NOTICE_BLOCK.style.display = 'none';
})


