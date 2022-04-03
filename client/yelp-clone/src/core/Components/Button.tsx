import * as React from 'react';

interface IButtomProps {
  text: string;
  method?: Function;
}

const Button = ({ text, method }: IButtomProps): JSX.Element => {
  return (
    <button
      className='bg-blue-500 h-full px-5 py-2.5 rounded-md outline-none border border-blue-500 text-white cursor-pointer'
      onClick={(e) => method?.(e)}
    >
      {text}
    </button>
  );
};

export default Button;
