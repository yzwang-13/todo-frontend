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
