import { Modal } from '@mui/material';
import React from 'react';
import { RootState } from '../../store';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { closeModalAction } from '../../store/slices/app';
import CreateParcelModal from '../modals/CreateParcelModal';

interface ModalRendererProps { }

const ModalRenderer: React.FC<ModalRendererProps> = () => {
	const dispatch = useAppDispatch();
	const { modal } = useAppSelector((state: RootState) => state.app)

	const renderModal = () => {
		switch (modal.current) {
			case "create-parcel-modal":
				return (
					<CreateParcelModal />
				)

			default:
				return null
		}

	}

	return (
		<Modal
			open={modal.isOpened}
			onClose={() => dispatch(closeModalAction())}
		>
			<div>
				{renderModal()}
			</div>
		</Modal>
	)
}

export default ModalRenderer