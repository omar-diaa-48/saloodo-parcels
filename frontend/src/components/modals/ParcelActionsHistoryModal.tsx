import CircularProgress from '@mui/material/CircularProgress';
import { useEffect } from 'react';
import { RootState } from '../../store';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { closeModalAction } from '../../store/slices/app';
import { clearParcelDetailsAction, getParcelDetailsAction } from '../../store/slices/parcels';

interface ParcelActionsHistoryModalProps {
	parcelId: string;
}

const ParcelActionsHistoryModal: React.FC<ParcelActionsHistoryModalProps> = ({ parcelId }) => {
	const dispatch = useAppDispatch();
	const { specific, isLoadingSpecific } = useAppSelector((state: RootState) => state.parcels);

	useEffect(() => {
		dispatch(getParcelDetailsAction({ parcelId }))
	}, [parcelId])

	const handleClose = () => {
		dispatch(clearParcelDetailsAction())
		dispatch(closeModalAction())
	}

	return (
		<div className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
			<div className="relative w-full h-full mx-auto max-w-2xl md:h-auto">
				<div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
					<div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
						<h3 className="text-xl font-semibold text-gray-900 dark:text-white">
							{isLoadingSpecific ? <CircularProgress /> : <span>Track your parcel</span>}
						</h3>

						<button
							type="button"
							onClick={() => handleClose()}
							className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
						>
							<svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
							<span className="sr-only">Close modal</span>
						</button>
					</div>
					<div className="p-6 space-y-6">
						{specific?.actions?.map((action) => (
							<p key={action.timestamp}>
								{action.action_taker?.username} - {action?.action_type} - {new Date(action?.timestamp).toDateString()}
							</p>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default ParcelActionsHistoryModal