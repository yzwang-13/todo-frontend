import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../services/AuthService.js";

const LoginComponent = (props) => {
	const navigate = useNavigate();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

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
		if (username === "111" && password === "111") {
			// login successful
			// <Navigate to='/welcome'></Navigate>
			navigate("/welcome", { replace: true });
			AuthService.registerSuccessfulLogin(username, password);
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
				/>
				Password:
				<input
					type="password"
					name="password"
					value={password}
					onChange={onSetPassword}
				/>
				<button className="btn btn-secondary" onClick={onLoginClicked}>
					Login
				</button>
			</div>
		</React.Fragment>
	);
};

export default LoginComponent;
