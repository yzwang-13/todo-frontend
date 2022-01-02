import React, { useCallback, useState } from "react";
import { AuthService, fakeAuthProvider } from "../Auth/services/AuthService";

// initialize context and give einitial values
const AuthContext = React.createContext({
	token: "",
	isLoggedIn: true,
	signin: () => {},
	signout: () => {}
});

export const AuthContextProvider = (props) => {
	const [token, setToken] = useState(localStorage.getItem("token") || null);
	let isLoggedIn = !!token;
	// TODO: need to set axios interceptors with token if we have in order to pass the authentication
	// each time when we call RESTful apis , but if a user refresh the page
	// we do not know the username and password but we may know jwt in the browser local storage

	let signin = (username, password, callback) => {
		return fakeAuthProvider.signin(username, password, (authenticated) => {
			if (authenticated) {
				// set token
				AuthService.setupAxiosInterceptors(username, password);
				setToken("aaaa");
				localStorage.setItem("token", "wilsonwang");
				localStorage.setItem("username", "wilsonwang");
				callback(true);
			} else {
				callback(false);
			}
		});
	};

	const signout = useCallback(
		(callback) => {
			// return fakeAuthProvider.signout(() => {
			// 	setUser(null);
			// 	callback();
			// });

			// remove token
			setToken(null);

			callback();
		},
		[setToken]
	);

	const contextValue = {
		token: "aaa",
		isLoggedIn: isLoggedIn,
		signin,
		signout
	};

	return (
		<AuthContext.Provider value={contextValue}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
