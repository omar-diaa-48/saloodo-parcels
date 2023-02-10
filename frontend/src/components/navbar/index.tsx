import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LogoSvg from "../../assets/logo.svg";
import { RootState } from "../../store";
import { signoutAction } from "../../store/slices/user";

const Navbar = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector((state: RootState) => state.user);

	return (
		<nav className="relative px-4 py-4 flex justify-between items-center bg-white">
			<a className="text-3xl font-bold leading-none bg-white" href="#">
				<img src={LogoSvg} alt="salodoo logo" width={100} height={60} />
			</a>

			{
				user.isAuthenticated ? (
					<p onClick={() => dispatch(signoutAction())}
						className="cursor-pointer lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold  rounded-xl transition duration-200">
						Hi, {user.profile.username}, do you want to Sign out?
					</p>
				) : (
					<p onClick={() => navigate('/signin')}
						className="cursor-pointer lg:inline-block py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200">
						Sign in
					</p>
				)
			}
		</nav>
	)
}

export default Navbar