import logo from "./logo.svg";
import "./App.css";
import TodoApp, {
	LoginComponent,
	WelcomeComponent
} from "./components/TodoApp";
import "./bootstrap.css";

function App() {
	return (
		<div className="App">
			<TodoApp />
		</div>
	);
}

export default App;
