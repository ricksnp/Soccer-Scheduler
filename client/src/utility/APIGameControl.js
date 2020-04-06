import { API_BASE_URL, ACCESS_TOKEN } from '../constants';


const request = (options) => {
	const headers = new Headers({
		'Content-Type': 'application/json'
	});

	if (localStorage.getItem(ACCESS_TOKEN)) {
		headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN));
	}

	const defaults = { headers: headers };
	options = Object.assign({}, defaults, options);

	return fetch(options.url, options).then((response) =>
		response.json().then((json) => {
			if (!response.ok) {
				return Promise.reject(json);
			}
			return json;
		})
	);
};


export function postGames(games) {
	return request({
		url: API_BASE_URL + '/calendar',
		method: 'POST',
		body: JSON.stringify(games)
	});
}

export function apiGetGames() {
	return request({
		url: API_BASE_URL + '/calendar/allgames',
		method: 'GET'
	});

}

export function apiUpdateGame(game) {
	return request({
		url: API_BASE_URL + '/calendar/updategames',
		method: 'POST',
		body: JSON.stringify(game)
	});

}

export function addMultipleGames(game){
	return request({
		url: API_BASE_URL + '/calendar/multiplegames',
		method: 'POST',
		body: JSON.stringify(game)
	});
}
