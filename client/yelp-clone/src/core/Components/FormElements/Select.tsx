import * as React from 'react';

interface ISelectProps {
  options?: { id: number; name: string }[];
  register: any;
  label: string;
  defaultValue?: number;
}

const Select = ({ options, register, label, defaultValue }: ISelectProps) => {
  return (
    <div className='flex flex-col w-full'>
      <label className='mb-1'>{label}</label>
      <select
        {...register}
        className='border w-full border-gray-300 rounded-md shadow-sm'
      >
        {options &&
          options.map((option: { id: number; name: string }, index) => (
            <option key={index} selected={defaultValue === option.id}>
              {option.name}
            </option>
          ))}
      </select>
    </div>
  );
};

export default Select;
