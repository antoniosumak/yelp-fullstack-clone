import * as React from 'react';

interface IInputProps {
  label: string;
  register: any;
}

const Input = ({ label, register }: IInputProps): JSX.Element => {
  return (
    <div className='flex flex-col w-full'>
      <label className='mb-1'>{label}</label>
      <input
        type='text'
        className='border border-gray-300 rounded-md shadow-sm'
        {...register}
      />
    </div>
  );
};

export default Input;
