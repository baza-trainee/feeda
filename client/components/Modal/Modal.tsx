/** @jsxImportSource @emotion/react */
import { useEffect, useRef } from 'react';

import { AnimatePresence } from 'framer-motion';

import { useGlobalState } from '~/hooks/useGlobalState';
import Button from '~components/Button/Button';
import Title from '~components/Title/Title';
import { componentMotionProps } from '~styles/animations';

import { ArrayAgreement } from './ArrayAgreement';
import { Agreement, Content, Overplay, TermsList, TermsWrapper } from './Modal.styles';

export const Modal = ({ isVisible }: { isVisible: boolean }) => {
	const modalContentRef = useRef<HTMLDivElement>(null);
	const { state, setState } = useGlobalState();

	const closeModal = () => {
		setState((prev) => ({ ...prev, visible: false, modal: 'terms' }));
	};

	useEffect(() => {
		const handleClickKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				setState((prev) => ({ ...prev, visible: false }));
			}
		};
		document.addEventListener('keydown', handleClickKey);

		return () => {
			document.removeEventListener('keydown', handleClickKey);
		};
	}, [setState]);

	useEffect(() => {
		const modalContent = modalContentRef.current;

		const handleResize = () => {
			if (modalContent?.scrollHeight && modalContent?.clientHeight) {
				if (modalContent.scrollHeight > modalContent.clientHeight) {
					modalContent.style.overflowY = 'auto';
				} else {
					modalContent.style.overflowY = 'hidden';
					modalContent.style.background = 'white';
				}
			}
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	if (!isVisible) return null;

	const handleClick = () => {
		if (state.modal === 'agreement') {
			setState((prev) => ({
				...prev,
				approved: {
					terms: prev.approved?.terms || false,
					agreement: true,
				},
			}));
			closeModal();
			return;
		} else if (state.location === 'start' && state.modal === 'terms') {
			setState((prev) => ({
				...prev,
				approved: {
					agreement: prev.approved?.agreement || false,
					terms: true,
				},
				modal: 'agreement',
			}));
			return;
		} else if (state.modal === 'terms') {
			setState((prev) => ({
				...prev,
				approved: {
					agreement: prev.approved?.agreement || false,
					terms: true,
				},
			}));
			closeModal();
		}
	};

	return (
		<AnimatePresence>
			{isVisible && (
				<Overplay key="modal" onClick={closeModal} {...componentMotionProps}>
					{state.modal === 'agreement' && (
						<Content agreement ref={modalContentRef} onClick={(e) => e.stopPropagation()}>
							<Title>
								Згода на обробку
								<br /> персональних даних
							</Title>
							<Agreement id="agreement">
								Відповідно до Закону України «Про захист персональних даних» від 1 червня 2010 року № 2297-VІ, шляхом
								підписання цього тексту, даю згоду ГО «Бі Ай Ті» на обробку моїх персональних даних: прізвище,
								ім&apos;я, номер телефону, електронна пошта.
								<br />
								<br />
								Мої персональні дані, на обробку яких я даю цю згоду, можуть бути передані третім особам тільки у
								випадках, передбачених законодавством України.
								<br />
								<br />
								*Для фізичних осіб, які через свої релігійні переконання відмовляються від прийняття реєстраційного
								номера облікової картки платника податків та офіційно повідомили про це відповідний контролюючий орган і
								мають відмітку у паспорті про наявність права здійснювати будь-які платежі за серією та номером паспорта
							</Agreement>
							<Button func={handleClick}>Згодний/на</Button>
						</Content>
					)}
					{state.modal === 'terms' && (
						<Content ref={modalContentRef} onClick={(e) => e.stopPropagation()}>
							<Title>Умови та правила участі в проєкті</Title>
							<TermsWrapper id="terms">
								<TermsList>
									{ArrayAgreement.map((text: string, index: number) => {
										return (
											<li key={index + 1}>
												{text}
												<br />
												<br />
											</li>
										);
									})}
								</TermsList>
								<p>Україна, Київ, квітень 2023</p>
							</TermsWrapper>
							<Button func={handleClick}>Приймаю</Button>
						</Content>
					)}
					<Button func={closeModal} closeButton />
				</Overplay>
			)}
		</AnimatePresence>
	);
};
