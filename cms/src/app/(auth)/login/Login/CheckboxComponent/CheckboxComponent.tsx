'use client';
/** @jsxImportSource @emotion/react */
import { InputHTMLAttributes, forwardRef } from 'react';
import { Label } from '~/src/app/components/Label/Label';
import {
	CheckboxContainer,
	Container,
	LabelText,
	ElementsContainer,
	LabelElement,
	InputElement,
} from './CheckboxComponent.styles';

interface formElementProps extends InputHTMLAttributes<HTMLInputElement> {}

export const CheckboxComponent = forwardRef<HTMLInputElement, formElementProps>(({}, ref) => {
	return (
		<Container>
			<Label state={'default'}>
				<CheckboxContainer>
					<ElementsContainer>
						<LabelElement>
							<InputElement type="checkbox" ref={ref} />
							<LabelText>Запам'ятати пароль</LabelText>
						</LabelElement>
					</ElementsContainer>
				</CheckboxContainer>
			</Label>
		</Container>
	);
});
