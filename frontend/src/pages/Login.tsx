import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from '../schemes/login';
import { Controller, useForm } from 'react-hook-form';
import { useAppDispatch } from '../store/hooks';
import { useNavigate } from 'react-router-dom';
import { signinAction } from '../store/slices/user';
import { ISigninDto } from "../utils/dtos"
import { TextInput, ValidatedInput } from '../components/shared/input';

const Login = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const { control, formState, handleSubmit } = useForm<ISigninDto>({
		mode: "onChange",
		defaultValues: {},
		resolver: yupResolver(loginSchema),
	});

	const { errors, isValid } = formState;

	const loginCallback = (values: ISigninDto) => {
		dispatch(signinAction(values))
			.then((data) => {
				if (data.meta.requestStatus === "fulfilled") {
					navigate('/home')
				}
			})
	};

	return (
		<section className="h-screen">
			<div className="px-6 h-full text-gray-800">
				<div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
					<div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
						<form onSubmit={handleSubmit(loginCallback)}>
							<div className="mb-6">
								<Controller
									name="name"
									control={control}
									render={({ field }) => (
										<ValidatedInput message={errors?.name?.message}>
											<TextInput
												{...field}
												placeholder="name"
												className="w-full mb-4"
											/>
										</ValidatedInput>
									)}
								/>
							</div>
							<div className="text-center lg:text-left">
								<button
									type="submit"
									className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 disabled:bg-blue-200 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
									disabled={!isValid}
								>
									Login
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Login;