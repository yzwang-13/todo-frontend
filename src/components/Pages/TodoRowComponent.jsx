import React from "react";

const TodoRowComponent = (props) => {
	return (
		<React.Fragment>
			<tr>
				<td>{props.todo.id}</td>
				<td>{props.todo.description}</td>
				<td>{props.todo.done.toString()}</td>
				<td>{props.todo.targetDate}</td>
				<td>
					<button
						className="btn btn-sm btn-outline-warning"
						onClick={() => props.updateTodoHander(props.todo.id)}
					>
						UPDATE
					</button>
				</td>
				<td>
					<button
						className="btn btn-sm btn-outline-danger"
						onClick={() => props.deleteTodoHandler(props.todo.id)}
					>
						DELETE
					</button>
				</td>
			</tr>
		</React.Fragment>
	);
};

export default TodoRowComponent;
