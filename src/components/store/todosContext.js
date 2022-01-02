import moment from "moment";
import React, { useState } from "react";

const TodosContext = React.createContext({
	todos: [],
	todosInitialized: false,
	initializeTodos: () => {},
	getSingleTodoById: () => {},
	setTodosDoneInitialization: () => {},
	updateTodo: () => {},
	deleteTodo: () => {}
});

export const TodosContextProvider = (props) => {
	const [todos, setTodos] = useState([]);
	const [todosInitialized, setTodosInitialized] = useState(false);

	const setTodosDoneInitialization = () => {
		setTodosInitialized(true);
		return todosInitialized;
	};

	const initializeTodos = (todos) => {
		const transformedTodos = todos.map((todo) => {
			return {
				id: todo.id,
				targetDate: moment(new Date(todo.targetDate))
					.format("YYYY-MM-DD")
					.toString(),
				done: todo.done,
				description: todo.description
			};
		});
		setTodos(transformedTodos);
	};

	// const updateRemoveTodo = (currentTodos) => {
	// 	const updatedTodos = currentTodos.filter(
	// 		(todo) => todo.id !== updateTodo.id
	// 	);
	// 	return [updateTodo, ...updatedTodos];
	// 	// const updatedTodos = [...currentTodos, updateTodo];
	// 	// return updatedTodos;
	// };

	const updateTodo = (updateTodo) => {
		setTodos((currentTodos) => {
			const updatedTodos = currentTodos.filter(
				(todo) => todo.id !== updateTodo.id
			);
			return [updateTodo, ...updatedTodos];
			// const updatedTodos = [...currentTodos, updateTodo];
			// return updatedTodos;
		});
	};

	const getSingleTodoById = (id) => {
		if (todos.length > 0) {
			for (const todo of todos) {
				if (todo.id === id) {
					return todo;
				}
			}
		}
		return null;
	};

	const deleteTodo = (id) => {
		setTodos((currentTodos) => {
			const updatedTodos = currentTodos.filter((todo) => todo.id !== id);
			return updatedTodos;
		});
	};

	const contextValue = {
		todos,
		todosInitialized,
		initializeTodos,
		getSingleTodoById,
		setTodosDoneInitialization,
		updateTodo,
		deleteTodo
	};

	return (
		<TodosContext.Provider value={contextValue}>
			{props.children}
		</TodosContext.Provider>
	);
};

export default TodosContext;
