import { UI_ELEMENTS, API_DATA, CONSTS } from "../UI_ELEMENTS/view.mjs";
import { showNotice } from "../helperFunctions/main.mjs";
import { getCookie } from "../cookie/cookie.js";


function getInputName() {
	return UI_ELEMENTS.INPUT_SETTINGS.value;
}


export async function sendAuthorizationRequest() {
	const logInStatus = (UI_ELEMENTS.BTN_EXIT.textContent === 'Log out') ? 1 : 0;
	try {
		if (logInStatus) {

			let response = await fetch(API_DATA.AUTHORIZATION_CODE_LINK, {
				method: 'PATCH',
				headers: {
					'Authorization': `Bearer ${getCookie("Token")}`,
					'Content-Type': 'application/json;charset=utf-8'
				},
				body: JSON.stringify({ name: getInputName() })
			});
			checkAuthorizationStatus(response);

		} else { showNotice('Login to change your name.', '#000') }

	} catch (err) {
		checkAuthorizationStatus();
	}
}


function checkAuthorizationStatus(res) {
	if (!res || !res.ok) {
		showNotice('You entered the wrong code. Please try to login again.', 'red');
		UI_ELEMENTS.BTN_EXIT.textContent = 'Log in';
	} else if (res.ok) {
		CONSTS.MY_CHAT_NAME = getInputName();
		changeMyChatName();
		showNotice('Your name has been successfully changed!', '#48d030');
	}
}


function changeMyChatName() {
	const myMessages = document.querySelectorAll('.personalMessage');
	myMessages.forEach(item => {
		item.textContent = CONSTS.MY_CHAT_NAME + ":";
	});
}