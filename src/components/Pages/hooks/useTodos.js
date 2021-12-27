import React from "react";
import AuthContext from "../../store/authContext";
import TodosContext from "../../store/todosContext";

function useTodos() {
	return React.useContext(TodosContext);
}

export default useTodos;
