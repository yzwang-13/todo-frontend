import React, { useCallback, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import Spinner from "../utils/Spinner/Spinner";
import useTodos from "./hooks/useTodos";
import ErrorService from "./services/ErrorService";
import TodoService from "./services/TodoService";
import TodoRowComponent from "./TodoRowComponent";

const ListTodosComponent = (props) => {
	const navigate = useNavigate();
	const {
		todos,
		todosInitialized,
		initializeTodos,
		setTodosDoneInitialization,
		deleteTodo
	} = useTodos();

	console.log("ListTodosComponent");

	// const [todos, setTodos] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState(null);

	const fetchTodos = useCallback(() => {
		console.log("fetch todos");
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
				console.log(transformedTodo);
				initializeTodos(transformedTodo);
				setIsLoading(false);
				setTodosDoneInitialization(true);
			})
			.catch((error) => ErrorService.handleError(error));
	}, []);

	useEffect(() => {
		if (!todosInitialized) {
			fetchTodos();
		}
	}, [todosInitialized, fetchTodos]);

	const updateTodoHander = (id) => {
		navigate(`/todo/${id}`);
	};

	const deleteTodoHandler = (id) => {
		TodoService.deleteTodo(id)
			.then((response) => {
				console.log(response);
				if (response.status === 200) {
					setMessage("Delete message successful");
					deleteTodo(id);
				} else {
					setMessage("Delete message unsuccessful!!!!");
				}
			})
			.catch((error) => {
				ErrorService.handleError(error);
			});
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

	const addTodoHandler = () => {
		navigate(`/todo/-1`);
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
						<button
							className="btn btn-sm btn-outline-danger"
							onClick={addTodoHandler}
						>
							Add A Todo
						</button>
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
