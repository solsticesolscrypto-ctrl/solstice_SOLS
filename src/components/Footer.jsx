import React from 'react';
import { translations } from '../i18n';

const Footer = ({ language = 'es' }) => {
	const t = translations[language] || translations.es;

	return (
		<footer className="w-full flex justify-center px-4 md:px-6 pb-8 footer-glass mt-auto">
			<div className="mx-auto w-full max-w-[var(--container-max)] flex items-center justify-center gap-3 text-sm text-gray-500">
				<p className="text-center">{t['footer-text']}</p>
				{/* Iconos sociales */}
				<div className="flex items-center gap-3 shrink-0">
					<a
						href="https://x.com/SolsticeSols"
						target="_blank"
						rel="noopener noreferrer"
						className="group inline-flex items-center justify-center rounded-full p-2 transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
						aria-label="Twitter"
					>
						{/* Logo oficial de X (Twitter) vía Simple Icons */}
						<img
							src="https://cdn.simpleicons.org/x/ffffff"
							alt="X (Twitter)"
							width={24}
							height={24}
							className="w-5 h-5 md:w-6 md:h-6 select-none"
							loading="lazy"
							decoding="async"
						/>
					</a>
				</div>
			</div>
		</footer>
	);
};

export default Footer;

