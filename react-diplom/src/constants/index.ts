export const CHECK_EMAIL = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const CHECK_NAME = /^[A-Za-z][A-Za-z0-9_]{7,29}$/;

export const EMPTY_USERNAME = 'UserName не может быть пустым';
export const EMPTY_EMAIL = 'Email не может быть пустым';
export const EMPTY_PASSWORD = 'Password не может быть пустым';
export const INCORRECT_EMAIL = 'Некорректный Email';
export const INCORRECT_PASSWORD = 'Password должен содержать не менее 8 символов';
export const INCORRECT_USERNAME = 'Password должен содержать не менее 8 символов';

export const OPTIONS = [		
	{ label: '', value: '' },
	{ label: 'Title (A-Z)', value: 'title' },
	{ label: 'Description (A-Z)', value: 'summary' },
];