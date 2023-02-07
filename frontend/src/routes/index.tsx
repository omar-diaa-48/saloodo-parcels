import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Parcels from "../pages/Parcels";

const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/parcels/" element={<Parcels />}></Route>
			<Route path="/login/" element={<Login />}></Route>
		</Routes>
	)
}

export default AppRoutes;