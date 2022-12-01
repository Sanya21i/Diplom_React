import React, { InputHTMLAttributes} from 'react';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement>{
   value: string;
   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
   fieldName: string;
};

const Input = ({ value, onChange, fieldName, ...rest }: IInputProps) => {
	return (
		<input {...rest} onChange={onChange} value={value} id={fieldName} />
	)
};

export default React.memo(Input);