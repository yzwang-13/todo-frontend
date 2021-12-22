import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import LoginComponent from "../Auth/LoginComponent";
import LayoutComponent from "../Layouts/LayoutComponent";
import ErrorComponent from "../Pages/ErrorComponent";
import HomeComponent from "../Pages/HomeComponent";
import ListTodosComponent from "../Pages/ListTodosComponent";
import WelcomeComponent from "../Pages/WelcomeComponent";
import AuthContext from "../store/authContext";
import RequireAuthComponent from "../Auth/RequireAuthComponent";
import LogoutComponent from "../Auth/LogoutComponent";

const TodoApp = () => {
	const authContext = useContext(AuthContext);

	return (
		<LayoutComponent>
			<Routes>
				<Route path="/" element={<HomeComponent />} />
				<Route path="/login" element={<LoginComponent />} />
				<Route path="/welcome" element={<WelcomeComponent />} />
				<Route path="/welcome/:name" element={<WelcomeComponent />} />
				<Route
					path="/todos"
					element={
						<RequireAuthComponent>
							<ListTodosComponent />
						</RequireAuthComponent>
					}
				/>
				<Route
					path="/logout"
					element={
						<RequireAuthComponent>
							<LogoutComponent />
						</RequireAuthComponent>
					}
				/>
				<Route path="*" element={<ErrorComponent />} />
			</Routes>
		</LayoutComponent>
	);
};

export default TodoApp;
