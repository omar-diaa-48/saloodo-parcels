import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import ModalRenderer from './components/shared/CreateParcelModel';
import AppRoutes from './routes';
import { useAppDispatch } from './store/hooks';
import { refreshTokenAction, signoutAction } from './store/slices/user';

function App() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(refreshTokenAction())
			.then((data) => {
				if (data.meta.requestStatus === "rejected") {
					dispatch(signoutAction())
				}
			})
	}, [])

	return (
		<div>
			<AppRoutes />
			<ToastContainer />
			<ModalRenderer />
		</div>
	)
}

export default App
