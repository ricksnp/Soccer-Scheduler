import { API_BASE_URL} from '../constants';

export function postGames(games) {
	return request({
		url    : API_BASE_URL + '/api/calendar',
		method : 'POST',
		body   : JSON.stringify(games)
	});
}