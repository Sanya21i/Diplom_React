import React from 'react';

interface IButtonProps extends React.ComponentProps<'button'>{
   text: string;
};

const Button = ({text, ...rest}: IButtonProps) => {
   return (
      <button {...rest}>{text}</button>
   )
};

export default React.memo(Button);