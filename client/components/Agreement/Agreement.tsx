'use client';

import React, { useState, useEffect, useRef } from 'react';

import Image from 'next/image';

import { AcceptBtn, CloseDiv, Container, Header, InfoP, ModalOverplay, ModalContent } from './Agreement.styles';

import { ArrayAgreement } from './arrayAgreement';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const Agreement: React.FC<ModalProps> = ({ isOpen, onClose }) => {
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
		<>
			<ModalOverplay onClick={onClose}>
				<ModalContent ref={modalContentRef} onClick={(e) => e.stopPropagation()}>
					{next ? (
						<Header>Умови та правила участі на проєкті</Header>
					) : (
						<Header>Згода на обробку персональних даних</Header>
					)}
					<Container>
						<ol className="">
							{ArrayAgreement.map((text: string, index: number) => {
								return (
									<li key={index}>
										<InfoP>{text}</InfoP>
									</li>
								);
							})}
						</ol>
						<p>Україна, Київ, квітень 2023</p>
					</Container>
					<AcceptBtn onClick={handleClick}>Приймаю</AcceptBtn>
					<CloseDiv>
						<Image src="/close.svg" width={24} height={24} alt="Close" onClick={onClose} />
					</CloseDiv>
				</ModalContent>
			</ModalOverplay>
		</>
	);
};

export default Agreement;

{
}
