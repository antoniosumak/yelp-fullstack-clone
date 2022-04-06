import * as React from 'react';

interface IInputProps {
  label: string;
  register: any;
  defaultValue?: any;
}

const Input = ({ label, register, defaultValue }: IInputProps): JSX.Element => {
  return (
    <div className='flex flex-col w-full'>
      <label className='mb-1'>{label}</label>
      <input
        type='text'
        className='border border-gray-300 rounded-md shadow-sm'
        {...register}
        defaultValue={defaultValue}
      />
    </div>
  );
};

export default Input;
