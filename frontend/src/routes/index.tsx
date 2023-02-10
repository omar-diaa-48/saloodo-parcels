import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../components/shared/ProtectedRoute";
import Login from "../pages/Login";
import Parcels from "../pages/Parcels";

const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/parcels/" element={<ProtectedRoute><Parcels /></ProtectedRoute>}></Route>
			<Route path="/login/" element={<Login />}></Route>
		</Routes>
	)
}

export default AppRoutes;