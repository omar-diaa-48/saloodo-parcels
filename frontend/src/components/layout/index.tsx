import React from 'react';
import { Outlet } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../navbar';

interface LayoutProps { }

const Layout: React.FC<LayoutProps> = () => {
	return (
		<div className='flex flex-col min-h-screen overflow-hidden'>
			<Navbar />
			<Outlet />
		</div>
	)
}

export default Layout