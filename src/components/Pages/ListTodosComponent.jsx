import React, { useState } from "react";

const ListTodosComponent = (props) => {
	const [todos, setTodos] = useState([
		{
			id: "1",
			description: "buy milk",
			done: false,
			targetDate: new Date()
		},
		{
			id: "2",
			description: "learn kafka",
			done: false,
			targetDate: new Date()
		},
		{
			id: "3",
			description: "make money",
			done: false,
			targetDate: new Date()
		}
	]);

	const outputTodosTableBodyRows = todos.map((todo) => {
		return (
			<tr key={todo.id}>
				<td>{todo.id}</td>
				<td>{todo.description}</td>
				<td>{todo.done.toString()}</td>
				<td>{todo.targetDate.toDateString()}</td>
			</tr>
		);
	});

	return (
		<React.Fragment>
			<h1>List Todos</h1>
			<div className="container">
				<table className="table">
					<thead>
						<tr>
							<th>ID</th>
							<th>Description</th>
							<th>Is completed?</th>
							<th>Target Date</th>
						</tr>
					</thead>
					<tbody>{outputTodosTableBodyRows}</tbody>
				</table>
			</div>
		</React.Fragment>
	);
};

export default ListTodosComponent;
