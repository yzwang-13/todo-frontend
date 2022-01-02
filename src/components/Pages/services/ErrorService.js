export default class ErrorService {
	static handleError(error) {
		console.log(error.message);
		console.log(error.response);
		let errorMessage = "";
		if (error.message) {
			// no response will come from server if there is an authentication error
			errorMessage += `${error.message}`;
		}
		if (error.response && error.response.data) {
			// checking if there is any response data coming back from server
			errorMessage += `  ${error.response.data.message}`;
		}

		return errorMessage;
	}
}
