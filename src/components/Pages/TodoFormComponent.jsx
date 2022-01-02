import { ErrorMessage, Field, Form, Formik } from "formik";
import moment from "moment";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import LoginComponent from "../Auth/LoginComponent";
import Spinner from "../utils/Spinner/Spinner";
import useTodos from "./hooks/useTodos";
import TodoService from "./services/TodoService";
import TodoComponent from "./TodoRowComponent";

const TodoFormComponent = (props) => {
	const params = useParams();
	const todoContext = useTodos();
	const navigate = useNavigate();
	let todo;

	if (params.id !== "-1") {
		todo = todoContext.getSingleTodoById(params.id);
		console.log(todo);

		if (!todo) {
			navigate("/todos");
		}
	} else {
		console.log("aaaaa");

		todo = {
			username: localStorage.getItem("username"),
			description: "Please enter some description",
			targetDate: moment().format("YYYY-MM-DD").toString(),
			done: false
		};
		console.log(todo);
	}

	const handleSumbit = (values) => {
		console.log(values);

		const newTodo = {
			username: localStorage.getItem("username"),
			id: todo.id,
			description: values.description,
			targetDate: values.targetDate,
			done: values.done
		};
		if (!todo.id) {
			// add a new todo
			TodoService.addTodo(newTodo)
				.then((response) => {
					if (response.data && response.status === 200) {
						console.log(response);
						todoContext.addTodo(response.data);
						navigate("/todos");
					}
				})
				.catch((error) => {
					console.log(error);
				});
		} else {
			// update existing todo
			TodoService.updateTodo(todo.id, newTodo)
				.then((response) => {
					console.log(response);
					if (response.status === 200) {
						// update redux
						if (response.data) {
							todoContext.updateTodo(response.data);
							navigate("/todos");
						} else {
							// todoContext.updateTodo(response.data);
							// navigate("/todos");
						}
					}
				})
				.catch((error) => {
					console.log(error);
				});
		}
	};

	const formValidate = (values) => {
		let errors = {};
		console.log(values.description.length);
		if (values.description.length < 1) {
			errors.description = "Description shouldn't be empty";
		}

		const dateTime = moment(values.targetDate, "YYYY-MM-DD", true);
		console.log(dateTime.isValid());
		console.log(dateTime.isAfter("2099-01-01T00:00:00Z"));

		if (!dateTime.isValid() || dateTime.isAfter("2099-01-01T00:00:00Z")) {
			errors.targetDate = "Target Date is not a valid date";
		}
		// let errors = {
		// 	description: "should at least have 5 characters"
		// };
		console.log(values);
		return errors;
	};

	const handleFocus = (event) => {
		return event.target.select();
	};

	console.log(todo);
	console.log(todo.targetDate);

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
							onSubmit={handleSumbit}
							validate={formValidate}
							validateOnChange={false}
							validateOnBlur={false}
						>
							{({ values, errors, touched }) => (
								<Form>
									<ErrorMessage
										name="description"
										component="div"
										className="alert alert-warning"
									/>
									<ErrorMessage
										name="targetDate"
										component="div"
										className="alert alert-warning"
									/>
									<div className="form-group row">
										<label className="col-sm-2 col-form-label">
											Description
										</label>
										<div className="col-sm-10">
											<Field
												className="form-control"
												component="textarea"
												rows="4"
												name="description"
												onFocus={handleFocus}
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
