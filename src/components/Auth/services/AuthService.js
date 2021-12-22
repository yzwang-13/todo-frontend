export class AuthService {
	static registerSuccessfulLogin(username, password) {
		localStorage.setItem("authenticatedUser", username);
		console.log("login registered");
	}

	static registerSuccessfulLogout(username, password) {
		localStorage.removeItem("authenticatedUser");
		console.log("logout registered");
	}
}

const fakeAuthProvider = {
	isAuthenticated: false,
	signin(callback) {
		// performa async api call

		let authenticated = true;
		callback(authenticated);
	},
	signout(callback) {
		fakeAuthProvider.isAuthenticated = false;
		setTimeout(callback, 100);
	}
};

export { fakeAuthProvider };
