import React from "react";
import TodosContext from "../../store/todosContext";

function useTodos() {
	return React.useContext(TodosContext);
}

export default useTodos;
