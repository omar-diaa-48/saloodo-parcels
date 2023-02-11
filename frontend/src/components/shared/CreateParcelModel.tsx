import { Modal } from '@mui/material';
import React from 'react';
import { RootState } from '../../store';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { closeModalAction } from '../../store/slices/app';

interface CreateParcelModalProps { }

const CreateParcelModal: React.FC<CreateParcelModalProps> = () => {
	const dispatch = useAppDispatch();
	const { isModalOpen, modal } = useAppSelector((state: RootState) => state.app)

	return (
		<Modal
			open={isModalOpen && modal?.current === "create-parcel-modal"}
			onClose={() => dispatch(closeModalAction())}
		>
			<div>

			</div>
		</Modal>
	)
}

export default CreateParcelModal