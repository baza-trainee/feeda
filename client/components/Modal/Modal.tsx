'use client';

import React, { useEffect, useRef, useState } from 'react';

import Image from 'next/image';

import { ArrayAgreement } from './ArrayAgreement';
import {
	AcceptBtn,
	Agreement,
	Background,
	CloseDiv,
	Content,
	Header,
	Overplay,
	TermsList,
	TermsWrapper,
} from './Modal.styles';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
	const [next, setNext] = useState(false);
	const modalContentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose();
			}
		};
		document.addEventListener('keydown', handleClickKey);

		return () => {
			document.removeEventListener('keydown', handleClickKey);
		};
	}, [onClose]);

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

	if (!isOpen) {
		return null;
	}

	const handleClick = () => {
		setNext((prev) => !prev);
		if (next) {
			onClose();
		}
	};

	return (
		<Overplay onClick={onClose}>
			<Background />
			<Content ref={modalContentRef} onClick={(e) => e.stopPropagation()}>
				{next ? (
					<>
						<Header>
							Згода на обробку
							<br /> персональних даних
						</Header>
						<Agreement id="agreement">
							Відповідно до Закону України «Про захист персональних даних» від 1 червня 2010 року № 2297-VІ, шляхом
							підписання цього тексту, даю згоду ГО «Бі Ай Ті» на обробку моїх персональних даних: прізвище, ім&apos;я,
							номер телефону, електронна пошта.
							<br />
							<br />
							Мої персональні дані, на обробку яких я даю цю згоду, можуть бути передані третім особам тільки у
							випадках, передбачених законодавством України.
							<br />
							<br />
							*Для фізичних осіб, які через свої релігійні переконання відмовляються від прийняття реєстраційного номера
							облікової картки платника податків та офіційно повідомили про це відповідний контролюючий орган і мають
							відмітку у паспорті про наявність права здійснювати будь-які платежі за серією та номером паспорта
						</Agreement>
					</>
				) : (
					<>
						<Header>Умови та правила участі в проєкті</Header>
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
					</>
				)}
				<AcceptBtn onClick={handleClick}>Приймаю</AcceptBtn>
				<CloseDiv>
					<Image src="/close.svg" width={24} height={24} alt="Close" onClick={onClose} />
				</CloseDiv>
			</Content>
		</Overplay>
	);
};

export default Modal;
