import React from "react";
import AuthContext from "../../store/authContext";

function useAuth() {
	return React.useContext(AuthContext);
}

export default useAuth;
