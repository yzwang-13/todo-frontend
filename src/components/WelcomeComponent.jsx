import { Link, useParams } from "react-router-dom";

const WelcomeComponent = (props) => {
	let params = useParams();

	return (
		<>
			<h1>Welcome</h1>
			<div className="container">
				{params.name ? params.name : null}
				You can manage your todos <Link to="/todos">here</Link>.
			</div>
		</>
	);
};

export default WelcomeComponent;
