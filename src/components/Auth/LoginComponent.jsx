import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "./hooks/useAuth.js";

const LoginComponent = (props) => {
	const navigate = useNavigate();
	let location = useLocation();
	const auth = useAuth();

	let from = location.state?.from?.pathname || "/";

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [inputHighlight, setInputHighlight] = useState(null);

	const onSetUsernameHandler = (event) => {
		setUsername((preUsername) => {
			return event.target.value;
		});
	};

	const onSetPassword = (event) => {
		setPassword((prePassword) => {
			return event.target.value;
		});
	};

	const onLoginClicked = () => {
		// perform login authentication

		if (username && password) {
			// login successful
			// <Navigate to='/welcome'></Navigate>
			// navigate("/welcome", { replace: true });
			// AuthService.registerSuccessfulLogin(username, password);
			//TODO: set is loading

			//TODO: call login api

			//TODO: call login handler to set the context of a successfully logged in user
			auth.signin(username, password, (successfulLoggedIn) => {
				// Send them back to the page they tried to visit when they were
				// redirected to the login page. Use { replace: true } so we don't create
				// another entry in the history stack for the login page.  This means that
				// when they get to the protected page and click the back button, they
				// won't end up back on the login page, which is also really nice for the
				// user experience.
				if (successfulLoggedIn) {
					navigate(from, { replace: true });
				} else {
					console.log("You are not authenticated!!!");
					setInputHighlight("highlight");
				}
			});
		}
	};

	return (
		<React.Fragment>
			<h1>Login</h1>
			<div className="container">
				Username:
				<input
					type="text"
					name="username"
					value={username}
					onChange={onSetUsernameHandler}
					className={inputHighlight}
				/>
				Password:
				<input
					type="password"
					name="password"
					value={password}
					onChange={onSetPassword}
					className={inputHighlight}
				/>
				<button className="btn btn-secondary" onClick={onLoginClicked}>
					Login
				</button>
			</div>
		</React.Fragment>
	);
};

export default LoginComponent;
