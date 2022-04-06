import React, { useEffect, useState } from 'react';
import Buttom from '../../../core/Components/Button';
import DynamicTable from '../../../core/Components/DynamicTable';
import Modal from '../../../core/Components/Modal';
import Section from '../../../core/Components/Section';
import Create from '../Components/Create';
import Edit from '../Components/Edit';
import RestaurantsService, {
  RestaurantsObject,
} from '../Services/RestaurantsService';

const Index = (): JSX.Element => {
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const [isEditModalOpened, setIsEditModalOpened] = useState<boolean>(false);
  const [allRestaurants, setAllRestaurants] = useState<RestaurantsObject>();
  const restaurantsService = new RestaurantsService();

  const getAllRestaurants = async () => {
    try {
      const result: RestaurantsObject =
        await restaurantsService.getAllRestaurants();
      setAllRestaurants(result);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteRestaurant = async (restaurantId: number) => {
    try {
      await restaurantsService.deleteRestaurant(restaurantId);
      await getAllRestaurants();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllRestaurants();
  }, []);

  const test = (e: number) => {
    setIsEditModalOpened(true);
  };

  return (
    <>
      {isModalOpened && (
        <Create
          toggleModal={setIsModalOpened}
          refreshTable={getAllRestaurants}
        />
      )}
      {isEditModalOpened && (
        <Edit
          toggleModal={setIsModalOpened}
          restaurant={{ name: 'TEST', location: 'VH', id: 1, price_range: 1 }}
        />
      )}
      <Section>
        <div className='w-full flex items-center justify-end mb-4'>
          <Buttom text='Add' method={() => setIsModalOpened(true)} />
        </div>

        <DynamicTable
          tableHeaders={[
            { id: 'ID' },
            { name: 'Name' },
            { location: 'Location' },
            { price_range: 'Price range' },
          ]}
          restaurants={allRestaurants?.data.restaurants}
          deleteRestaurant={deleteRestaurant}
          test={test}
        />
      </Section>
    </>
  );
};

export default Index;
