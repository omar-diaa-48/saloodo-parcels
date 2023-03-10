import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { parcelSchema } from '../../schemes/parcel';
import { useAppDispatch } from '../../store/hooks';
import { closeModalAction } from '../../store/slices/app';
import { addParcelAction } from '../../store/slices/parcels';
import { IAddParcelDto } from '../../utils/dtos';
import { TextInput, ValidatedInput } from '../shared/input';

const CreateParcelModal = () => {
	const dispatch = useAppDispatch();

	const { control, formState, handleSubmit } = useForm<IAddParcelDto>({
		mode: "onChange",
		defaultValues: {},
		resolver: yupResolver(parcelSchema),
	});

	const { errors, isValid } = formState;

	const addParcelCallback = (values: IAddParcelDto) => {
		dispatch(addParcelAction(values))
			.then((data) => {
				if (data.meta.requestStatus === "fulfilled") {
					dispatch(closeModalAction())
				}
			})
	};

	return (
		<div className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
			<div className="relative w-full h-full mx-auto max-w-2xl md:h-auto">
				<div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
					<div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
						<h3 className="text-xl font-semibold text-gray-900 dark:text-white">
							Send a parcel, we will take care of every thing :)
						</h3>

						<button
							type="button"
							onClick={() => dispatch(closeModalAction())}
							className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
						>
							<svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
							<span className="sr-only">Close modal</span>
						</button>
					</div>
					<div className="p-6 space-y-6">
						<div className="mb-6">
							<Controller
								name="item"
								control={control}
								render={({ field }) => (
									<ValidatedInput message={errors?.item?.message}>
										<TextInput
											{...field}
											placeholder="item"
											className="w-full mb-4"
										/>
									</ValidatedInput>
								)}
							/>
						</div>

						<div className="mb-6">
							<Controller
								name="pickup"
								control={control}
								render={({ field }) => (
									<ValidatedInput message={errors?.pickup?.message}>
										<TextInput
											{...field}
											placeholder="pickup"
											className="w-full mb-4"
										/>
									</ValidatedInput>
								)}
							/>
						</div>

						<div className="mb-6">
							<Controller
								name="dropoff"
								control={control}
								render={({ field }) => (
									<ValidatedInput message={errors?.dropoff?.message}>
										<TextInput
											{...field}
											placeholder="dropoff"
											className="w-full mb-4"
										/>
									</ValidatedInput>
								)}
							/>
						</div>
					</div>
					<div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
						<button
							onClick={handleSubmit(addParcelCallback)}
							type="button"
							className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
							disabled={!isValid}
						>
							Send
						</button>

						<button
							type="button"
							onClick={() => dispatch(closeModalAction())}
							className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
						>
							Cancel
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CreateParcelModal