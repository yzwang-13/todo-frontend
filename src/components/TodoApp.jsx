import { useState } from "react";
import {
	BrowserRouter,
	Navigate,
	Route,
	Router,
	Routes,
	useNavigate
} from "react-router-dom";
import ErrorComponent from "./ErrorComponent";
import LayoutComponent from "./LayoutComponent";
import ListTodosComponent from "./ListTodosComponent";
import LoginComponent from "./LoginComponent";
import LogoutComponent from "./LogoutComponent";
import WelcomeComponent from "./WelcomeComponent";

const TodoApp = () => {
	return (
		<BrowserRouter>
			<LayoutComponent>
				<Routes>
					<Route path="/login" element={<LoginComponent />} />
					<Route path="/welcome" element={<WelcomeComponent />} />
					<Route
						path="/welcome/:name"
						element={<WelcomeComponent />}
					/>
					<Route path="/todos" element={<ListTodosComponent />} />
					<Route path="/logout" element={<LogoutComponent />} />
					<Route path="*" element={<ErrorComponent />} />
				</Routes>
			</LayoutComponent>
		</BrowserRouter>
	);
};

export default TodoApp;
