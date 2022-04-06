import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Button from '../../../core/Components/Button';
import FormWrapper from '../../../core/Components/FormElements/FormWrapper';
import Input from '../../../core/Components/FormElements/Input';
import Select from '../../../core/Components/FormElements/Select';
import Modal from '../../../core/Components/Modal';
import RestaurantsService, {
  Restaurants,
} from '../Services/RestaurantsService';

interface IEditProps {
  restaurant: Restaurants;
  toggleModal: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  refreshTable: Function;
}

const Edit = ({
  restaurant,
  toggleModal,
  isLoading,
  refreshTable,
}: IEditProps): JSX.Element => {
  const { register, handleSubmit, setValue } = useForm<Restaurants>();
  const restaurantService = new RestaurantsService();
  const [priceRange, setPriceRange] = useState<{ id: number; name: string }[]>([
    { id: 1, name: '$' },
    { id: 2, name: '$$' },
    { id: 3, name: '$$$' },
    { id: 4, name: '$$$$' },
    { id: 5, name: '$$$$$' },
  ]);

  const onSubmit: SubmitHandler<Restaurants> = async (data) => {
    try {
      data.price_range = priceRange.filter(
        (range) => range.name === String(data.price_range)
      )[0].id;
      data.id = restaurant.id;
      await restaurantService.updateRestaurant(data);
      await refreshTable();
      toggleModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal title='Add review' toggleModal={toggleModal}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {!isLoading ? (
          <FormWrapper>
            <Input
              label='Name'
              register={{ ...register('name') }}
              defaultValue={restaurant.name}
            />
            <Input
              label='Location'
              register={{ ...register('location') }}
              defaultValue={restaurant.location}
            />
            <Select
              options={priceRange}
              label='Price range'
              register={{ ...register('price_range') }}
              defaultValue={restaurant.price_range}
            />
          </FormWrapper>
        ) : (
          <h1>Loading...</h1>
        )}
        <div className='flex justify-end mt-4'>
          <Button text='Submit' method={() => {}} />
        </div>
      </form>
    </Modal>
  );
};

export default Edit;
