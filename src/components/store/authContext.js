import React, { useCallback, useState } from "react";
import { fakeAuthProvider } from "../Auth/services/AuthService";

// initialize context and give einitial values
const AuthContext = React.createContext({
	token: "",
	isLoggedIn: true,
	signin: () => {},
	signout: () => {}
});

export const AuthContextProvider = (props) => {
	const [token, setToken] = useState(null);
	let isLoggedIn = !!token;

	let signin = (newUser, callback) => {
		return fakeAuthProvider.signin((authenticated) => {
			if (authenticated) {
				// set token
				setToken("aaaa");
				localStorage.setItem("token", token);
				localStorage.setItem("username", "wilsonwang");
				console.log("aaaa");
				callback();
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
