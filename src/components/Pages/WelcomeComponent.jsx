import { useState } from "react";
import { Link, useParams } from "react-router-dom";

const WelcomeComponent = (props) => {
	let params = useParams();

	console.log("Welcome Component rendering...");
	let [randomText, setRandomText] = useState(
		"Replace some ramdom text when call /hello-world api on localhost:8080"
	);

	// const makeHelloWorldCall = async () => {
	// 	try {
	// 		// const result = await axios.get("localhost:8080/hello-world");
	// 		// console.log(result.data);
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

	const makeHelloWorldCallSync = () => {
		// 		return axios.get("http://www.abc.cd/test")
		//    .then((response) => console.log(response.data));
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
				<h3></h3>
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
