import React, { ChangeEvent } from 'react';

import Link from 'next/link';

interface CheckboxFieldProps {
	label: string;
	linkText: string;
	isChecked: boolean;
	onChange: (isChecked: boolean) => void;
	name: string;
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({ label, linkText, isChecked, onChange, name }) => {
	const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
		onChange(event.target.checked);
	};

	return (
		<label>
			<input name={name} type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
			<span>
				{label} <Link href="/">{linkText}</Link>
			</span>
		</label>
	);
};

export default CheckboxField;
