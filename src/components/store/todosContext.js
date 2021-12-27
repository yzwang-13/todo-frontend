import moment from "moment";
import React, { useState } from "react";

const TodosContext = React.createContext({
	todos: [],
	initializeTodos: () => {},
	getSingleTodoById: () => {}
});

export const TodosContextProvider = (props) => {
	const [todos, setTodos] = useState([]);

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
		console.log(todos);
		console.log(transformedTodos);
		setTodos(transformedTodos);
	};

	const getSingleTodoById = (id) => {
		console.log("getSingleTodoById");
		console.log(id);
		console.log(todos);
		if (todos.length > 0) {
			for (const todo of todos) {
				console.log(todo.id);
				if (todo.id === id) {
					console.log("returning");
					return todo;
				}
			}
		}
		return null;
	};

	const contextValue = {
		todos,
		initializeTodos,
		getSingleTodoById
	};

	return (
		<TodosContext.Provider value={contextValue}>
			{props.children}
		</TodosContext.Provider>
	);
};

export default TodosContext;
