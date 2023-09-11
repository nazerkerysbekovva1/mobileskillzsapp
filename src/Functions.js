import React from 'react';
import { Fetch } from 'react-native';
import { Config } from './Config';
import AsyncStorage from '@react-native-async-storage/async-storage';


export async function userLogin() {

	let value = await AsyncStorage.getItem('user_login');

	if (value == '1')
		return true;
	else
		return false;
}
export async function userData() {
	let value = await AsyncStorage.getItem('user');

	if (value == undefined || value == '')
		return [];

	return JSON.parse(value);
}
export async function getUserData(token) {
	let content = await fetch(Config.url + '/api/v' + Config.version + '/user/info', {
		method: 'POST',
		body: JSON.stringify({
			token: token
		})
	});
	content = await content.json();
	if (content.status == '1') {
		AsyncStorage.setItem('user', content.data.user);
	} else {
		return; 
	}

}
export async function getData() {
	let content = [];
	if (await userLogin()) {
		let Token = await userData()['token'];
		content = await fetch(Config.url + '/api/v' + Config.version + '/content', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				Token: Token,
				API_KEY: Config.secret,
			})
		});
	} else {
		content = await fetch(Config.url + '/products', {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'x-api-key': Config.secret
			}
		});
	}

	content = await content.json();

	console.log('getData content', content)
	if (content.status == 'retrieved') {
		await AsyncStorage.setItem('content', JSON.stringify(content.data));
		if (content.data.user != undefined) {
			await AsyncStorage.setItem('user', JSON.stringify(content.data.user));
		}
		return true;
	}

	return false;
}
export async function returnData() {
	let data = [];
	let content = await AsyncStorage.getItem('content');
	if (JSON.parse(content)) {
		data = await JSON.parse(content);
	}

	return data;
}
export async function getProduct(id) {
	let Post;
	if (await userLogin()) {
		let T = await userData();
		let Token = null;
		if (T) {
			Token = T['token'];
		}
		Post = JSON.stringify({
			token: Token,
			secret: Config.secret,
		});
	} else {
		Post = JSON.stringify({
			secret: Config.secret,
		});
	}

	let content = await fetch(Config.url + '/api/v' + Config.version + '/product/' + id, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: Post
	});

	content = await content.json();
	if (content.status == '1') {
		return content.data.product;
	}

	return false;
}
export async function getCategory(id, data) {
	let content = [];
	let Post;
	if (await userLogin()) {
		let Token = await userData()['token'];
		Post = JSON.stringify({
			Token: Token,
			Secret: Config.secret,
			id: id,
			data: data
		});
	} else {
		Post = JSON.stringify({
			Secret: Config.secret,
			id: id,
			data: data
		});
	}


	content = await fetch(Config.url + '/api/v' + Config.version + '/category', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: Post
	});

	content = await content.json();
	if (content.status == '1') {
		return content.data;
	}

	return content;
}
export async function getSupport() {
	let content = [];
	let User = await userData();
	content = await fetch(Config.url + '/api/v' + Config.version + '/user/support/list', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			token: User['token'],
			secret: Config.secret
		})
	});

	content = await content.json();
	if (content.status == '1') {
		return content.data;
	} else {
		return null;
	}

}
export async function getMessages(id) {
	let content = [];
	let User = await userData();
	content = await fetch(Config.url + '/api/v' + Config.version + '/user/support/messages', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			token: User['token'],
			secret: Config.secret,
			id: id
		})
	});

	content = await content.json();
	if (content.status == 1) {
		return content.data;
	} else {
		return null;
	}
}
export async function getCourses() {
	let User = await userData();
	let content = await fetch(Config.url + '/api/v' + Config.version + '/user/courses', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			token: User['token'],
			secret: Config.secret
		})
	})

	content = await content.json();
	if (content.status == '1') {
		return content.data;
	} else {
		return null;
	}

}
export async function getFinancial() {
	let User = await userData();
	let content = await fetch(Config.url + '/api/v' + Config.version + '/user/financial', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			token: User['token'],
			secret: Config.secret
		})
	})

	content = await content.json();
	if (content.status == '1') {
		return content.data;
	} else {
		return null;
	}
}
export async function getChannel() {
	let User = await userData();
	let content = await fetch(Config.url + '/api/v' + Config.version + '/user/channel', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			token: User['token'],
			secret: Config.secret
		})
	})

	content = await content.json();
	if (content.status == '1') {
		return content.data;
	} else {
		return null;
	}
}
export async function getProfile(id) {
	let User = await userData();
	let content = await fetch(Config.url + '/api/v' + Config.version + '/profile', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			token: User['token'],
			secret: Config.secret,
			id: id
		})
	})

	content = await content.json();
	if (content.status == '1') {
		return content.data;
	} else {
		return null;
	}
}



