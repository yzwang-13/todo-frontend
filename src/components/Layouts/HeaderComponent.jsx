import React from "react";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../Auth/hooks/useAuth";

const HeaderComponent = (props) => {
	const authContext = useAuth();

	const logoutHandler = (event) => {
		authContext.signout(() => {});
	};

	let location = useLocation();

	return (
		<header>
			<nav className="navbar navbar-expand-md navbar-dark bg-dark">
				<div className="navbar-nav">
					<Link className="nav-link" to="/">
						Wilson's
					</Link>
				</div>
				<ul className="navbar-nav">
					<li>
						<Link className="nav-link" to="/welcome">
							Home
						</Link>
					</li>
					{authContext.isLoggedIn && (
						<li>
							<Link className="nav-link" to="/todos">
								Todos
							</Link>
						</li>
					)}
				</ul>
				<ul className="navbar-nav navbar-collapse justify-content-end">
					{!authContext.isLoggedIn && (
						<li>
							<Link
								className="nav-link"
								to="/login"
								state={{ from: location }}
							>
								Login
							</Link>
						</li>
					)}
					{authContext.isLoggedIn && (
						<li>
							<Link
								className="nav-link"
								to="/logout"
								onClick={logoutHandler}
							>
								Logout
							</Link>
						</li>
					)}
				</ul>
			</nav>
		</header>
	);
};

// not a good use of react.memo, should be wrapped on smaller pieces
// that are having the same props on each render, eg. Wilsons, Home
export const Header = React.memo(HeaderComponent);
