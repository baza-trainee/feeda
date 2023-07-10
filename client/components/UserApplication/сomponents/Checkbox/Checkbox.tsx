import React, { ChangeEvent } from 'react';

import { AcceptLink, CheckboxContainer, CheckboxText } from './Checkbox.styled';

interface CheckBoxProps {
	labeltxt: string;
	id: string;
	linkText: string;
	href: string;
	checked: boolean;
	onChange: (isChecked: boolean) => void;
}

export const CheckBox: React.FC<CheckBoxProps> = ({ labeltxt, id, linkText, href, checked, onChange }) => {
	const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
		onChange(event.target.checked);
	};

	return (
		<CheckboxContainer>
			<input type="checkbox" id={id} checked={checked} onChange={handleCheckboxChange} />
			<span></span>
			<label htmlFor={id}>
				<CheckboxText>
					{labeltxt}
					<AcceptLink href={href}>{linkText}</AcceptLink>
				</CheckboxText>
			</label>
		</CheckboxContainer>
	);
};
