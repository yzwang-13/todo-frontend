export default class ErrorService {
	static handleError(error) {
		console.log(error.response);
		return error.response.data.message;
	}
}
