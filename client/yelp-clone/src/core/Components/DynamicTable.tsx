import React from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';
import RatingStarts from './RatingStarts';
type Restaurant = {
  id: number;
  name: string;
  location: string;
  price_range: number;
};

interface IDynamicTableProps {
  restaurants: Restaurant[];
  tableHeaders: object;
  deleteRestaurant: Function;
  openAndFillEditModal: Function;
}

const DynamicTable = ({
  restaurants,
  tableHeaders,
  deleteRestaurant,
  openAndFillEditModal,
}: IDynamicTableProps): JSX.Element => {
  const formatDataForTableDisplay = (key: string, value: any) => {
    if (key === 'price_range') {
      return priceRangeDollar.repeat(Number(value));
    }

    if (key === 'ratings') {
      return (
        <div className='flex items-center space-x-2'>
          <RatingStarts
            numberOfStars={5}
            rating={Number(value.average_rating)}
          />
          <p>({value.count ? value.count : 0})</p>
        </div>
      );
    }

    return value;
  };

  const checkIfKeyIsInHeaders = (key: string) => {
    if (!(key in tableHeaders)) {
      return;
    }
    return true;
  };

  const priceRangeDollar = '$';
  return (
    <table className='w-full shadow-md rounded-md'>
      <thead>
        <tr className='border border-gray-100 bg-gray-200 '>
          {Object.values(tableHeaders).map((finalHeader: any, index) => (
            <td className='px-6 py-4' key={index}>
              {finalHeader}
            </td>
          ))}
          <th></th>
        </tr>
      </thead>
      <tbody>
        {restaurants ? (
          restaurants.map((restaurant: Restaurant) => (
            <tr className='border border-gray-100 ' key={restaurant.name}>
              {Object.entries(restaurant).map(
                (value, index) =>
                  checkIfKeyIsInHeaders(value[0]) && (
                    <td className='px-6 py-4' key={index}>
                      {formatDataForTableDisplay(value[0], value[1])}
                    </td>
                  )
              )}
              <td className='px-6 py-4 flex items-center space-x-2 text-2xl'>
                <MdEdit
                  className='cursor-pointer text-gray-300'
                  onClick={() => {
                    openAndFillEditModal(restaurant.id);
                  }}
                />
                <MdDelete
                  className='cursor-pointer hover:text-red-500 text-gray-300'
                  onClick={() => deleteRestaurant(restaurant.id)}
                />
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td className='px-6 py-4' colSpan={20}>
              There is no data!
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default DynamicTable;
