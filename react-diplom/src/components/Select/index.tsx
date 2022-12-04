import React from 'react';
import './Select.scss';

export interface ISelectProps {
	options: { label: string; value: string }[];
	onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	value: string;
}

const Select = ({ options, onChange, value, ...rest }: ISelectProps) => {
	return (
		<select className='select s1' value={value} onChange={onChange}>
			{options.map(item => {
				return (<option key={item.value} value={item.value}>{item.label}</option>)
			})}
		</select>
	)
};

export default Select;