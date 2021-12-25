import React, { useEffect, useState } from "react";
import Spinner from "../utils/Spinner/Spinner";
import ErrorService from "./services/ErrorService";
import TodoService from "./services/TodoService";

const ListTodosComponent = (props) => {
	console.log("ListTodosComponent");

	const [todos, setTodos] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState(null);

	useEffect(() => {
		console.log("useEffect");
		refreshTodos();
	}, []);

	const deleteTodoHandler = (id) => {
		TodoService.deleteTodo(id)
			.then((response) => {
				setMessage("Delete message successful");
				console.log(response);
				refreshTodos();
			})
			.catch((error) => {
				ErrorService.handleError(error);
			});
	};

	const refreshTodos = async () => {
		setTimeout(() => {
			setIsLoading(true);

			TodoService.getListofTodos()
				.then((response) => {
					setTimeout(() => {
						// const newTodos = response.data.foreach((todo) => {
						// 	console.log(todo);
						// 	const container = {};
						// 	container.id = todo.id;
						// 	container.description = todo.description;
						// 	container.done = false;
						// 	container.targetDate = todo.due;
						// 	return container;
						// });
						const newTodos = [...response.data];
						const transformedTodo = newTodos.map((todo) => {
							return {
								id: todo.id,
								description: todo.description,
								done: todo.done,
								targetDate: todo.targetDate
							};
						});
						setTodos(transformedTodo);
						setIsLoading(false);
					}, 1000);
				})
				.catch((error) => ErrorService.handleError(error));
		}, 1000);
	};

	const outputTodosTableBodyRows = () => {
		if (todos.length > 0) {
			return [
				...todos.map((todo) => {
					return (
						<tr key={todo.id}>
							<td>{todo.id}</td>
							<td>{todo.description}</td>
							<td>{todo.done.toString()}</td>
							<td>{todo.targetDate}</td>
							<td>
								<button
									className="btn btn-sm btn-outline-danger"
									onClick={() => deleteTodoHandler(todo.id)}
								>
									DELETE
								</button>
							</td>
						</tr>
					);
				})
			];
		} else {
			return (
				<div className="d-flex justify-content-center">
					<div className="spinner-border" role="status">
						<span className="sr-only">Loading...</span>
					</div>
				</div>
			);
		}
	};

	return (
		<React.Fragment>
			{message && <div className="alert alert-success">{message}</div>}
			{/* <div className="pos-center">
				<Spinner />
			</div> */}
			{!(todos.length > 0) && !isLoading && <h1>No items</h1>}
			{isLoading && (
				<div className="pos-center">
					<Spinner />
				</div>
			)}
			{!isLoading && todos.length > 0 && (
				<>
					<h1>List Todos</h1>
					<div className="container">
						<table className="table">
							<thead>
								<tr>
									<th>ID</th>
									<th>Description</th>
									<th>Is completed?</th>
									<th>Target Date</th>
									<th>Delete?</th>
								</tr>
							</thead>
							<tbody>{outputTodosTableBodyRows()}</tbody>
						</table>
					</div>
				</>
			)}
		</React.Fragment>
	);
};

export default ListTodosComponent;
