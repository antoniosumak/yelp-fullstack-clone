import React from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';
type Restaurant = {
  id: number;
  name: string;
  location: string;
  price_range: number;
};

interface IDynamicTableProps {
  restaurants: Restaurant[];
  tableHeaders: any[];
  deleteRestaurant: Function;
}

const DynamicTable = ({
  restaurants,
  tableHeaders,
  deleteRestaurant,
}: IDynamicTableProps): JSX.Element => {
  const priceRangeDollar = '$';
  return (
    <table className='w-full shadow-md rounded-md'>
      <thead>
        <tr className='border border-gray-100 bg-gray-200 '>
          {tableHeaders.map((header: any) =>
            Object.values(header).map((finalHeader: any, index) => (
              <td className='px-6 py-4' key={index}>
                {finalHeader}
              </td>
            ))
          )}
          <th></th>
        </tr>
      </thead>
      <tbody>
        {restaurants.map((restaurant: Restaurant) => (
          <tr className='border border-gray-100 '>
            {Object.entries(restaurant).map((value, index) => (
              <td className='px-6 py-4' key={index}>
                {value[0] === 'price_range'
                  ? priceRangeDollar.repeat(Number(value[1]))
                  : value[1]}
              </td>
            ))}
            <td className='px-6 py-4 flex items-center space-x-2 text-2xl'>
              <MdEdit className='cursor-pointer text-gray-300' />
              <MdDelete
                className='cursor-pointer hover:text-red-500 text-gray-300'
                onClick={() => deleteRestaurant(restaurant.id)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DynamicTable;
