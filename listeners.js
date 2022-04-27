import { UI_ELEMENTS } from "./view.mjs";

UI_ELEMENTS.BTN_SETTINGS.addEventListener('click', () => {
	UI_ELEMENTS.SETTINGS_BLOCK.style.display = 'flex';
})

UI_ELEMENTS.BTN_CLOSE_SETTINGS.addEventListener('click', () => {
	UI_ELEMENTS.SETTINGS_BLOCK.style.display = 'none';
})

UI_ELEMENTS.BTN_CLOSE_AUTHORIZATION.addEventListener('click', () => {
	UI_ELEMENTS.AUTHORIZATION_BLOCK.style.display = 'none';
})

UI_ELEMENTS.BTN_EXIT.addEventListener('click', () => {
	UI_ELEMENTS.AUTHORIZATION_BLOCK.style.display = 'flex';
})

UI_ELEMENTS.BTN_CLOSE_CONFIRMATION.addEventListener('click', () => {
	UI_ELEMENTS.CONFIRMATION_BLOCK.style.display = 'none';
})