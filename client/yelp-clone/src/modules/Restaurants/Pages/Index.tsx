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
  const [restaurant, setRestaurant] = useState<RestaurantsObject>();
  const restaurantsService = new RestaurantsService();
  const [isLoading, setIsLoading] = useState(false);

  const getAllRestaurants = async () => {
    try {
      const result: RestaurantsObject =
        await restaurantsService.getAllRestaurants();
      setAllRestaurants(result);
    } catch (error) {
      console.log(error);
    }
  };

  const getRestaurantByIdentifier = async (id: number) => {
    setIsLoading(true);
    try {
      const result: RestaurantsObject =
        await restaurantsService.getRestaurantByIdentifier(id);
      setRestaurant(result);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
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

  const openAndFillEditModal = async (id: number) => {
    setIsEditModalOpened(true);
    await getRestaurantByIdentifier(id);
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
          toggleModal={setIsEditModalOpened}
          restaurant={restaurant?.data.restaurants}
          isLoading={isLoading}
          refreshTable={getAllRestaurants}
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
          openAndFillEditModal={openAndFillEditModal}
        />
      </Section>
    </>
  );
};

export default Index;
