import Airdrop from './components/Airdrop.jsx';
import React, { Suspense, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Routes, Route, useLocation } from 'react-router-dom';
import { PhantomProvider, AddressType } from '@phantom/react-sdk';

// Estilos

// i18n
import { translations } from './i18n';

// Componentes
import Header from './components/Header.jsx';
import Home from './components/Home.jsx';
import Team from './components/Team.jsx';
import LoadingScreen from './components/LoadingScreen.jsx';

const Whitepaper = React.lazy(() => import('./components/Whitepaper.jsx'));
const DaoDashboard = React.lazy(() => import('./components/DaoDashboard.jsx'));
const CreateProposal = React.lazy(() => import('./components/CreateProposal.jsx'));
const Presale = React.lazy(() => import('./components/Presale.jsx'));
import Footer from './components/Footer.jsx';
import MessageBox from './components/MessageBox.jsx';



const App = () => {
	// Estado global sencillo para idioma, forzando inglés y limpiando localStorage
	useEffect(() => {
		localStorage.removeItem('language');
	}, []);
	const [language, setLanguage] = useState('en'); // 'es' | 'en' | 'zh'
	const location = useLocation();

	// Mensajería global (éxito / error)
	const [toast, setToast] = useState({ message: '', type: 'success' });

	const t = translations[language] || translations.es;

	// Helmet: título y metadatos dinámicos por ruta e idioma
	let page = 'home';
	if (location && location.pathname) {
		const path = location.pathname.replace(/^\//, '');
		if (['home', '', undefined].includes(path)) page = 'home';
		else if (['presale', 'whitepaper', 'team', 'dao', 'create-proposal', 'airdrop'].includes(path)) page = path;
	}
	const pageTitleMap = {
		home: t['page-title'] || t['hero-title'],
		presale: t['presale-page-title'],
		whitepaper: t['whitepaper-page-title'],
		team: t['team-page-title'],
		dao: t['dao-page-title'],
		'create-proposal': t['proposal-form-page-title'],
		airdrop: t['airdrop'] || 'Airdrop',
	};
	const metaDescriptionMap = {
		home: t['hero-subtitle'],
		presale: t['presale-disclaimer'] || t['presale-page-title'],
		whitepaper: t['whitepaper-page-subtitle'],
		team: t['team-page-subtitle'],
		dao: t['dao-page-subtitle'],
		'create-proposal': t['proposal-form-page-subtitle'],
		airdrop: t['airdrop-participants-title'] || 'Airdrop',
	};
	const title = pageTitleMap[page] || t['page-title'] || 'Solstice';
	const description = metaDescriptionMap[page] || t['page-title'] || 'Solstice';

	// Eliminada la sincronización con hash/estado: ahora solo React Router gestiona la navegación

	// Helper para mostrar mensajes
	const showMessage = (message, type = 'success') => {
		setToast({ message, type });
		// Ocultar auto después de 3s
		setTimeout(() => setToast({ message: '', type }), 3000);
	};

	// Eliminado el renderizado por estado/hash: solo React Router

	return (
			<PhantomProvider
				config={{
					providerType: 'injected',
					addressTypes: [AddressType.solana],
				}}
			>
			<Helmet>
				<html lang={language || 'es'} />
				<title>{title}</title>
				<meta name="description" content={description} />
				<meta property="og:title" content={title} />
				<meta property="og:description" content={description} />
				<meta name="twitter:title" content={title} />
				<meta name="twitter:description" content={description} />
			</Helmet>
			<div className="min-h-screen flex flex-col items-stretch bg-[#0b0c10] text-[#c5c6c7]">
				{/* Header fijo */}
				<Header
					currentPage={null}
					setCurrentPage={() => {}}
					language={language}
					setLanguage={setLanguage}
					role="banner"
				/>

				{/* Contenedor principal (sin panel global) */}
				<main id="main" role="main" className="mx-auto w-full max-w-[var(--container-max)] mt-8 md:mt-10 mb-12 px-4 md:px-6">
					<Suspense
						fallback={
							<LoadingScreen
								label={
									location.pathname === '/whitepaper' ? (t['whitepaper-page-title'] || 'Whitepaper') + '…' :
									location.pathname === '/presale' ? (t['presale-page-title'] || 'Presale') + '…' :
									location.pathname === '/dao' ? (t['dao-page-title'] || 'DAO') + '…' :
									location.pathname === '/create-proposal' ? (t['proposal-form-page-title'] || 'Create Proposal') + '…' :
									'Cargando…'
								}
							/>
						}
					>
						<Routes>
							<Route path="/" element={<Home language={language} t={t} />} />
							<Route path="/presale" element={<Presale language={language} t={t} />} />
							<Route path="/whitepaper" element={<Whitepaper language={language} showMessage={showMessage} t={t} />} />
							<Route path="/team" element={<Team language={language} t={t} />} />
							<Route path="/dao" element={<DaoDashboard language={language} showMessage={showMessage} t={t} />} />
							<Route path="/create-proposal" element={<CreateProposal language={language} showMessage={showMessage} t={t} />} />
							<Route path="/airdrop" element={<Airdrop t={t} />} />
						</Routes>
					</Suspense>
				</main>

				{/* Footer */}
				<Footer language={language} role="contentinfo" />

				{/* Mensajes */}
				<MessageBox
					message={toast.message}
					type={toast.type}
					onClose={() => setToast({ message: '', type: toast.type })}
				/>
			</div>
		</PhantomProvider>
	);
};

export default App;

