import React from 'react';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';

interface IRatingStartsProps {
  numberOfStars: number;
  rating: number;
}

const RatingStarts = ({
  numberOfStars,
  rating,
}: IRatingStartsProps): JSX.Element => {
  let starArray: any = [];
  {
    [...Array(numberOfStars)].map((value: any, index: number) => {
      let grade = index + 1;
      if (grade <= rating) {
        starArray.push(<BsStarFill color={'#FFB81C'} />);
      } else if (grade === Math.ceil(rating) && !Number.isInteger(rating)) {
        starArray.push(<BsStarHalf color={'#FFB81C'} />);
      } else {
        starArray.push(<BsStar color={grade <= rating ? '#FFB81C' : 'gray'} />);
      }
    });
  }
  return <div className='flex items-center'>{starArray}</div>;
};

export default RatingStarts;
