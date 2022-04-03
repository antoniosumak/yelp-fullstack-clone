import * as React from 'react';

interface IFormWrapperProps {
  children: React.ReactNode;
}

const FormWrapper = ({ children }: IFormWrapperProps): JSX.Element => {
  return <div className='space-y-4 divide-y divide-gray-200'>{children}</div>;
};

export default FormWrapper;
