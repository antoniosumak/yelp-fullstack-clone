import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Section from '../../../core/Components/Section';
import ReviewsService, { Review } from '../Services/ReviewsService';
import ReviewCard from '../Components/ReviewCard';

interface IIndexProps {}

const Index = ({}: IIndexProps) => {
  const reviewService = new ReviewsService();
  const { id } = useParams();
  const [reviews, setReviews] = useState<Review[]>();

  const getAllReviews = async () => {
    try {
      setReviews(await reviewService.getReviewsForRestaurant(id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllReviews();
  }, []);

  return (
    <Section>
      {reviews?.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </Section>
  );
};

export default Index;
