import axios from "axios";

export class AuthService {
	static registerSuccessfulLogin(username, password) {
		localStorage.setItem("authenticatedUser", username);
		console.log("login registered");
	}

	static registerSuccessfulLogout(username, password) {
		localStorage.removeItem("authenticatedUser");
		console.log("logout registered");
	}

	static setupAxiosInterceptors = (username, password) => {
		axios.interceptors.request.use((config) => {
			config.auth = {
				username: username,
				password: password
			};

			return config;
		});
	};
}

const fakeAuthProvider = {
	isAuthenticated: false,
	signin(username, password, callback) {
		// performa async api call
		console.log(username, password);
		axios
			.get(process.env.REACT_APP_BASE_URL_DEV + `/basicauth`, {
				auth: {
					username: username,
					password: password
				}
			})
			.then((response) => {
				console.log(response);
				let authenticated = true;
				callback(authenticated);
			})
			.catch((error) => {
				let authenticated = false;
				callback(authenticated);
			});
	},
	signout(callback) {
		fakeAuthProvider.isAuthenticated = false;
		setTimeout(callback, 100);
	}
};

export { fakeAuthProvider };
