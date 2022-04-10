import * as React from 'react';
import RatingStarts from '../../../core/Components/RatingStarts';
import { Review } from '../Services/ReviewsService';

interface IReviewCardProps {
  review: Review;
}

const ReviewCard = ({ review }: IReviewCardProps) => {
  return (
    <div className='shadow-md'>
      <p>{review.name}</p>
      <RatingStarts numberOfStars={5} rating={review.rating} />
      <p>{review.review}</p>
    </div>
  );
};

export default ReviewCard;
