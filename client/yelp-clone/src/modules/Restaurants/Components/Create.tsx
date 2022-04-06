import React, { FormEvent, useState } from 'react';
import Button from '../../../core/Components/Button';
import FormWrapper from '../../../core/Components/FormElements/FormWrapper';
import Input from '../../../core/Components/FormElements/Input';
import Select from '../../../core/Components/FormElements/Select';
import Modal from '../../../core/Components/Modal';

import { useForm, SubmitHandler } from 'react-hook-form';
import RestaurantsService from '../Services/RestaurantsService';

type Inputs = {
  name: string;
  location: string;
  price_range: number;
};

interface ICreateProps {
  toggleModal: React.Dispatch<React.SetStateAction<boolean>>;
  refreshTable: Function;
}

const Create = ({ toggleModal, refreshTable }: ICreateProps): JSX.Element => {
  const restaurantService = new RestaurantsService();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      data.price_range = priceRange.filter(
        (range) => range.name === String(data.price_range)
      )[0].id;
      await restaurantService.createRestaurant(data);
      await refreshTable();
      toggleModal(false);
    } catch (error) {
      console.log(error);
    }
  };
  const [name, setName] = useState<string>('');
  const [priceRange, setPriceRange] = useState<{ id: number; name: string }[]>([
    { id: 1, name: '$' },
    { id: 2, name: '$$' },
    { id: 3, name: '$$$' },
    { id: 4, name: '$$$$' },
    { id: 5, name: '$$$$$' },
  ]);

  return (
    <Modal title='Add review' toggleModal={toggleModal}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormWrapper>
          <Input label='Name' register={{ ...register('name') }} />
          <Input label='Location' register={{ ...register('location') }} />
          <Select
            options={priceRange}
            label='Price range'
            register={{ ...register('price_range') }}
          />
        </FormWrapper>
        <div className='flex justify-end mt-4'>
          <Button text='Submit' method={() => {}} />
        </div>
      </form>
    </Modal>
  );
};

export default Create;
