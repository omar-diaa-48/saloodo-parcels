import React from 'react';
import LogoSvg from "../../assets/logo.svg";
import { RootState } from '../../store';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { assignParcelAction, deliverParcelAction } from '../../store/slices/parcels';
import { IParcel } from '../../utils/responses';

interface ParcelProps {
	parcel: IParcel
}

const Parcel: React.FC<ParcelProps> = ({ parcel }) => {
	const dispatch = useAppDispatch();
	const { profile } = useAppSelector((state: RootState) => state.user)

	return (
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
	)
}

export default Parcel