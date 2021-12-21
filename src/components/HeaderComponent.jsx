import { Link } from "react-router-dom";
import { AuthService } from "../services/AuthService";

const HeaderComponent = (props) => {
	const isUserLoggedIn = AuthService.isUserLoggedIn();
	console.log(isUserLoggedIn);

	return (
		<header>
			<nav className="navbar navbar-expand-md navbar-dark bg-dark">
				<div className="navbar-brand">Wilson's</div>
				<ul className="navbar-nav">
					{isUserLoggedIn && (
						<li>
							<Link className="nav-link" to="/welcome">
								Home
							</Link>
						</li>
					)}
					{isUserLoggedIn && (
						<li>
							<Link className="nav-link" to="/todos">
								Todos
							</Link>
						</li>
					)}
				</ul>
				<ul className="navbar-nav navbar-collapse justify-content-end">
					{!isUserLoggedIn && (
						<li>
							<Link className="nav-link" to="/login">
								login
							</Link>
						</li>
					)}
					{isUserLoggedIn && (
						<li>
							<Link
								className="nav-link"
								to="/logout"
								onClick={AuthService.registerSuccessfulLogout}
							>
								logout
							</Link>
						</li>
					)}
				</ul>
			</nav>
		</header>
	);
};

export default HeaderComponent;
