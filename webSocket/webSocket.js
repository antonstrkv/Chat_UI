
import { timeConverter, showNotice } from "../helperFunctions/main.mjs";
import { getCookie } from "../cookie/cookie.js";
import { sendMessage } from "../chatMessages/chatMessages.js";

const socket = new WebSocket(`wss://mighty-cove-31255.herokuapp.com/websockets?${getCookie("Token")}`);


socket.onopen = function (e) {
	showNotice("[open] Connection opened.", '#48d030');
};


socket.onmessage = function (event) {
	let json = JSON.parse(event.data);
	let sendDate = timeConverter(new Date(json.createdAt).getTime());
	sendMessage(json.text, sendDate, json.user.name, json.user.email);
};


socket.onclose = function (event) {
	if (event.wasClean) {
		showNotice(`[close] Connection closed , code=${event.code} reason=${event.reason}.`, 'red');
	} else {
		showNotice('[close] Connection terminated.', 'red');
	}
};


export function sendMessageToServer(Text) {
	socket.send(JSON.stringify({
		text: Text,
	}));
}


socket.onerror = function (error) {
	showNotice(`[error] ${error.message}.`, 'red');
};
