import { yupResolver } from "@hookform/resolvers/yup";
import { FormControl, FormControlLabel, FormGroup, Switch } from "@mui/material";
import React from "react";
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { TextInput, ValidatedInput } from '../components/shared/input';
import { loginSchema } from '../schemes/login';
import { useAppDispatch } from '../store/hooks';
import { signinAction } from '../store/slices/user';
import { ISigninDto } from "../utils/dtos";
import { UserType } from "../utils/types";

const Login = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const { control, formState, handleSubmit, getValues, setValue } = useForm<ISigninDto>({
		mode: "onChange",
		defaultValues: {
			type: "sender"
		},
		resolver: yupResolver(loginSchema),
	});

	const { errors, isValid } = formState;

	const loginCallback = (values: ISigninDto) => {
		dispatch(signinAction(values))
			.then((data) => {
				if (data.meta.requestStatus === "fulfilled") {
					navigate('/parcels')
				}
			})
	};

	const handleUserTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const userType = e.target["value"] as UserType;
		setValue("type", userType, { shouldDirty: true, shouldTouch: true, shouldValidate: true })
	}

	return (
		<section className="h-screen">
			<div className="px-6 h-full text-gray-800">
				<div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
					<div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
						<form onSubmit={handleSubmit(loginCallback)}>
							<div className="mb-6">
								<Controller
									name="username"
									control={control}
									render={({ field }) => (
										<ValidatedInput message={errors?.username?.message}>
											<TextInput
												{...field}
												placeholder="username"
												className="w-full mb-4"
											/>
										</ValidatedInput>
									)}
								/>
							</div>
							<div className="mb-6">
								<Controller
									name="password"
									control={control}
									render={({ field }) => (
										<ValidatedInput message={errors?.password?.message}>
											<TextInput
												{...field}
												placeholder="password"
												className="w-full mb-4"
											/>
										</ValidatedInput>
									)}
								/>
							</div>
							<div className="mb-6">
								<FormControl component="fieldset" variant="standard">
									<FormGroup>
										<FormControlLabel
											control={<Switch checked={getValues("type") === "sender"} onChange={handleUserTypeChange} name="type" value="sender" />}
											label="Sender"
										/>
										<FormControlLabel
											control={<Switch checked={getValues("type") === "driver"} onChange={handleUserTypeChange} name="type" value="driver" />}
											label="Driver"
										/>
									</FormGroup>
								</FormControl>
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