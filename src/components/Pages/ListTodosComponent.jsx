import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import Spinner from "../utils/Spinner/Spinner";
import useTodos from "./hooks/useTodos";
import ErrorService from "./services/ErrorService";
import TodoService from "./services/TodoService";
import TodoRowComponent from "./TodoRowComponent";

const ListTodosComponent = (props) => {
	const navigate = useNavigate();
	const todos = useTodos().todos;
	const initializeTodos = useTodos().initializeTodos;

	console.log("ListTodosComponent");

	// const [todos, setTodos] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState(null);

	useEffect(() => {
		console.log("useEffect");
		fetchTodos();
	}, []);

	const updateTodoHander = (id) => {
		navigate(`/todo/${id}`);
	};

	const deleteTodoHandler = (id) => {
		TodoService.deleteTodo(id)
			.then((response) => {
				setMessage("Delete message successful");
				console.log(response);
				fetchTodos();
			})
			.catch((error) => {
				ErrorService.handleError(error);
			});
	};

	const fetchTodos = () => {
		setIsLoading(true);
		TodoService.getListofTodos()
			.then((response) => {
				const newTodos = [...response.data];
				const transformedTodo = newTodos.map((todo) => {
					return {
						id: todo.id,
						description: todo.description,
						done: todo.done,
						targetDate: todo.targetDate
					};
				});
				initializeTodos(transformedTodo);
				setIsLoading(false);
			})
			.catch((error) => ErrorService.handleError(error));
	};

	const outputTodosTableBodyRows = () => {
		if (todos.length > 0) {
			return [
				...todos.map((todo) => {
					return (
						<TodoRowComponent
							key={todo.id}
							todo={todo}
							updateTodoHander={updateTodoHander}
							deleteTodoHandler={deleteTodoHandler}
						/>
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
									<th>Update</th>
									<th>Delete</th>
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
