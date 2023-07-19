'use client';

import React, { useState, useEffect, useRef } from 'react';

import Image from 'next/image';

import {
	AcceptBtn,
	Agreement,
	AgreementInput,
	TermsList,
	CloseDiv,
	TermsWrapper,
	Header,
	ModalOverplay,
	ModalContent,
} from './Modal.styles';

import { ArrayAgreement } from './ArrayAgreement';

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
		<ModalOverplay onClick={onClose}>
			<ModalContent ref={modalContentRef} onClick={(e) => e.stopPropagation()}>
				{next ? (
					<>
						<Header>
							Згода на обробку
							<br /> персональних даних
						</Header>
						<Agreement>
							Я,
							<div
								style={{
									width: '100%',
									height: '1rem',
									borderBottom: '1px solid black',
								}}
							>
								<AgreementInput rows={2} />
							</div>
						</Agreement>
					</>
				) : (
					<>
						<Header>Умови та правила участі в проєкті</Header>
						<TermsWrapper>
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
			</ModalContent>
		</ModalOverplay>
	);
};

export default Modal;
