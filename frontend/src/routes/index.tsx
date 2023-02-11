import { Route, Routes } from "react-router-dom";
import Layout from "../components/layout";
import ProtectedRoute from "../components/shared/ProtectedRoute";
import Login from "../pages/Login";
import Parcels from "../pages/Parcels";

const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
				<Route path="/parcels/" element={<Parcels />} />
			</Route>

			<Route path="/signin/" element={<Login />}></Route>

			<Route path="*" element={<Parcels />}></Route>
		</Routes>
	)
}

export default AppRoutes;