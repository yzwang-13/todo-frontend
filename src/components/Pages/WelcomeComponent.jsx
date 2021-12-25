import axios from "axios";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import HelloWorldService from "./services/HelloWorldService";
import ErrorService from "./services/ErrorService";

const WelcomeComponent = (props) => {
	let params = useParams();

	console.log("Welcome Component rendering...");
	let [randomText, setRandomText] = useState(
		"Replace some ramdom text when call /hello-world api on localhost:8080"
	);

	const makeHelloWorldCallSync = () => {
		// HelloWorldService.getHelloWorldMessage()
		// 	.then((response) => {
		// 		console.log(response);
		// 		setRandomText(response.data);
		// 	})
		// 	.catch();

		// HelloWorldService.getHelloWorldBeanMessage()
		// 	.then((response) => {
		// 		console.log(response);
		// 		setRandomText(response.data.message);
		// 	})
		// 	.catch();

		HelloWorldService.getHelloWorldBeanPathVariableMessage(
			"Wilson Wang",
			100,
			"WW"
		)
			.then((response) => {
				console.log(response);
				setRandomText(response.data.message);
			})
			.catch((error) => setRandomText(ErrorService.handleError(error)));
	};



	return (
		<>
			<h1>Welcome</h1>
			<div className="container">
				{params.name ? params.name : null}
				You can manage your todos <Link to="/todos">here</Link>.
			</div>
			<div className="container">
				<h3>{randomText}</h3>
				<button
					className="btn btn-dark"
					onClick={makeHelloWorldCallSync}
				>
					Make your Call!!
				</button>
			</div>
		</>
	);
};

export default WelcomeComponent;
