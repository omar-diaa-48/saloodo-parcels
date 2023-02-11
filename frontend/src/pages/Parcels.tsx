import AddIcon from '@mui/icons-material/Add';
import { useEffect } from "react";
import Parcel from '../components/shared/Parcel';
import { RootState } from "../store";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { openModalAction } from '../store/slices/app';
import { getAllParcelsAction } from "../store/slices/parcels";

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
						<Parcel key={parcel._id} parcel={parcel} />
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