import { UI_ELEMENTS } from "../UI_ELEMENTS/view.mjs";
export {
	getInputToken,
	timeConverter,
	showNotice,
};


function getInputToken() {
	let inputToken = UI_ELEMENTS.INPUT_CONFIRMATION.value;
	UI_ELEMENTS.INPUT_CONFIRMATION.value = '';
	return inputToken;
}


function showNotice(text, color) {
	UI_ELEMENTS.NOTICE_BLOCK.style.display = 'flex';
	UI_ELEMENTS.NOTICE_TEXT.textContent = text;
	UI_ELEMENTS.NOTICE_TEXT.style.color = color;
}


function timeConverter(time = Date.now()) {
	const date = new Date(time);

	let hour = String(date.getHours());
	if (hour.length === 1) {
		hour = 0 + hour;
	}
	let minute = String(date.getMinutes());
	if (minute.length === 1) {
		minute = 0 + minute;
	}
	return `${hour}:${minute}`;
}

