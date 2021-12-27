import { Field, Form, Formik } from "formik";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import Spinner from "../utils/Spinner/Spinner";
import useTodos from "./hooks/useTodos";
import TodoService from "./services/TodoService";
import TodoComponent from "./TodoRowComponent";

const TodoFormComponent = (props) => {
	const params = useParams();
	const todoContext = useTodos();
	const navigate = useNavigate();

	const todo = todoContext.getSingleTodoById(params.id);
	console.log(todo);

	useEffect(() => {
		if (!todo) {
			navigate("/todos");
		}
	}, []);

	const handleSumbit = (values) => {
		console.log(values);
		TodoService.updateTodo(todo.id, {
			username: localStorage.getItem("username"),
			id: todo.id,
			description: values.description,
			targetDate: values.targetDate,
			done: values.done
		})
			.then((response) => {
				console.log(response);
				if (response.status === 200) {
					navigate("/todos");
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<React.Fragment>
			{!todo && (
				<div>
					<Spinner className="pos-center" />
				</div>
			)}
			{todo && (
				<div>
					<h1>Todo</h1>
					<div className="container">
						<Formik
							initialValues={{
								description: todo.description,
								targetDate: todo.targetDate,
								done: todo.done
							}}
							onSubmit={(values) => {
								handleSumbit(values);
							}}
						>
							{(props) => (
								<Form>
									<div className="form-group row">
										<label className="col-sm-2 col-form-label">
											Description
										</label>
										<div class="col-sm-10">
											<Field
												className="form-control"
												component="textarea"
												rows="4"
												name="description"
											/>
										</div>
									</div>
									<div className="form-group row">
										<div className="col-sm-4">
											<label>Target Date</label>
											<Field
												className="form-control"
												type="date"
												name="targetDate"
											></Field>
										</div>
										<div className="col-sm-4">
											<div className="form-check">
												<label>Done</label>

												<Field
													className="form-control"
													component="input"
													type="checkbox"
													name="done"
												></Field>
											</div>
										</div>
										<div className="col-sm-4">
											<label>Done editing?</label>
											<button
												className="btn btn-sm btn-outline-secondary"
												type="submit"
											>
												Submit
											</button>
											<label>Not happy?</label>
											<button
												className="btn btn-sm btn-outline-secondary"
												type="submit"
											>
												Return
											</button>
										</div>
									</div>
								</Form>
							)}
						</Formik>
					</div>
				</div>
			)}
		</React.Fragment>
	);
};

export default TodoFormComponent;
