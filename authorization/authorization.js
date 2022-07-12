import { showNotice } from "../helperFunctions/main.mjs";
import { UI_ELEMENTS, API_DATA } from "../UI_ELEMENTS/view.mjs";
import { saveCookie } from "../cookie/cookie.js";

function getInputEmail() {
	let inputEmail = UI_ELEMENTS.INPUT_AUTHORIZATION.value;
	UI_ELEMENTS.INPUT_AUTHORIZATION.value = '';
	return inputEmail;
}

export async function sendAuthorizationCode() {
	const inputEmail = getInputEmail();
	let response = await fetch(API_DATA.AUTHORIZATION_CODE_LINK, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify({ email: inputEmail })
	});
	if (!response.ok) {
		showNotice("Code submission failed. You entered the wrong email.", 'red');
	} else if (response.ok) {
		UI_ELEMENTS.AUTHORIZATION_BLOCK.style.display = 'none';
		UI_ELEMENTS.CONFIRMATION_BLOCK.style.display = 'flex';
		saveCookie("Email", inputEmail);
		showNotice('The code has been sent to your email.', '#48d030');
	}
}