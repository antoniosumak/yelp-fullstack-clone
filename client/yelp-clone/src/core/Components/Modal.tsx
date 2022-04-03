import * as React from 'react';
import { IoClose } from 'react-icons/io5';

interface IModalProps {
  toggleModal: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  children?: React.ReactNode;
}

const Modal = ({ title, toggleModal, children }: IModalProps): JSX.Element => {
  return (
    <div className='fixed inset-0 bg-overlay z-10 flex items-center justify-center'>
      <div className='bg-white w-10/12 lg:w-6/12 p-6'>
        <div className='flex items-center justify-between'>
          <h2 className='font-bold text-lg'>{title}</h2>
          <IoClose
            className='cursor-pointer hover:text-red-500'
            onClick={() => toggleModal(false)}
          />
        </div>
        <div className='mt-4'>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
