import React from 'react';

import Link from 'next/link';

const CheckboxField = ({ label, linkText, isChecked, onChange, name }) => {
	const handleCheckboxChange = (event) => {
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
