import React from 'react';
import { Outlet } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../navbar';
import CreateParcelModal from '../shared/CreateParcelModel';

interface LayoutProps { }

const Layout: React.FC<LayoutProps> = () => {
	return (
		<div className='flex flex-col min-h-screen overflow-hidden'>
			<Navbar />
			<Outlet />
			<CreateParcelModal />
		</div>
	)
}

export default Layout