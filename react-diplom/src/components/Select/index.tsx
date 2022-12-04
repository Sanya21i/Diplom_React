import React, { useState } from 'react';
import './Select.scss';

export interface IOptions {
	label: string;
	value: string
}

export interface ISelectProps {
	options: IOptions[];
	onChange: (item: string) => void;	
}

const Select = ({ options, onChange }: ISelectProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [selectOption, setSelectOption] = useState('');
	const switching = () => setIsOpen(!isOpen);

	const onOptionClicked = (options: IOptions) => {
		setSelectOption(options.label);
		onChange(options.value);
		switching();
	};
	return (

		<>
			<div className='select'>
				<div className='select-wrap s1' onClick={switching}>
					{selectOption || ''}
					{isOpen ? (
						<span className='arrow-up'></span>
					) : (
						<span className='arrow-down'></span>
					)}
				</div>
				{isOpen && (
					<div className='select-dropdown'>
						<div className='select-dropdown-wrap'>
							{options.map((option) => (
								<div
									className='select-dropdown-wrap-item s1'
									onClick={() => onOptionClicked(option)}
									key={option.label}
								>
									{option.label}
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		</>
	)
};

export default Select;