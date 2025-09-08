import React from 'react';

const LoadingScreen = ({ label = 'Cargando…' }) => {
	return (
		<div className="flex flex-col items-center justify-center py-16 gap-4">
			<div className="inline-flex items-center gap-3 text-[#66fcf1]">
				<span className="animate-spin h-5 w-5 rounded-full border-2 border-[#66fcf1] border-t-transparent"></span>
				<span className="text-sm opacity-80">{label}</span>
			</div>
			<div className="w-full max-w-md">
				<div className="h-2 w-full bg-white/5 rounded overflow-hidden">
					<div className="h-full w-1/3 bg-[#66fcf1]/50 animate-[loading_1.2s_ease_infinite]"></div>
				</div>
			</div>
			<style>{`@keyframes loading { 0% { transform: translateX(-100%);} 100% { transform: translateX(300%);} }`}</style>
		</div>
	);
};

export default LoadingScreen;
