import axios from "axios";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import HelloWorldService from "./services/HelloWorldService";

const WelcomeComponent = (props) => {
	let params = useParams();

	console.log("Welcome Component rendering...");
	let [randomText, setRandomText] = useState(
		"Replace some ramdom text when call /hello-world api on localhost:8080"
	);

	const makeHelloWorldCallSync = () => {
		HelloWorldService.getHelloWorldBeanMessage()
			.then((response) => {
				console.log(response);
				setRandomText(response.data.message);
			})
			.catch();
	};

	// useEffect(() => {
	// 	effect
	// 	return () => {
	// 		cleanup
	// 	};
	// }, [input]);

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
