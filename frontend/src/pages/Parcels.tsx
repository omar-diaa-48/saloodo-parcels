import AddIcon from '@mui/icons-material/Add';
import { useEffect } from "react";
import LogoSvg from "../assets/logo.svg";
import { RootState } from "../store";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { openModalAction } from '../store/slices/app';
import { assignParcelAction, deliverParcelAction, getAllParcelsAction } from "../store/slices/parcels";

const Parcels = () => {
	const dispatch = useAppDispatch();
	const { data: parcels } = useAppSelector((state: RootState) => state.parcels)
	const { profile } = useAppSelector((state: RootState) => state.user)

	useEffect(() => {
		dispatch(getAllParcelsAction());
	}, [])

	return (
		<div className="bg-white">
			<div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
				<h2 className="text-2xl font-bold tracking-tight text-gray-900">Saloodo parcels</h2>

				<div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">


					{parcels.length ? parcels.map((parcel) => (
						<div key={parcel._id} className="relative">
							<div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80">
								<img src={LogoSvg} alt={parcel.item} className="h-full w-full object-center lg:h-full lg:w-full" />
							</div>
							<div className="mt-4 flex justify-between">
								<div>
									<h3 className="text-sm text-gray-700">
										<p>{parcel.item} by {parcel.sender.username}</p>
									</h3>
									<p className="mt-1 text-sm text-gray-500">From {parcel.pickup}</p>
									<p className="mt-1 text-sm text-gray-500">From {parcel.dropoff}</p>
								</div>

								{parcel.driver ? (
									<div>
										<p className="text-sm font-medium text-gray-900">{parcel.is_delivered ? "Delivered" : "Picked"} by {parcel.driver.username}</p>
										{parcel.is_delivered ? (
											<p className="text-sm font-medium text-green-400">Parcel is delivered 💨</p>
										) : (
											<p onClick={() => dispatch(deliverParcelAction({ parcelId: parcel._id }))} className="text-sm cursor-pointer font-medium text-gray-900">Deliver parcel</p>
										)}
									</div>
								) : (
									profile.type === "driver" ? (
										<p onClick={() => dispatch(assignParcelAction({ parcelId: parcel._id }))} className="text-sm cursor-pointer font-medium text-gray-900">Assign parcel</p>
									) : null
								)}
							</div>
						</div>
					)) : (
						<p>No parcels found</p>
					)}

					{
						profile.type === "sender" && (
							<div className="flex justify-center items-center">
								<div onClick={() => dispatch(openModalAction({ current: "create-parcel-modal", args: {} }))} className='flex cursor-pointer'>
									<h3>Add parcel</h3>
									<AddIcon />
								</div>
							</div>
						)
					}
				</div>
			</div>
		</div>
	)
}

export default Parcels