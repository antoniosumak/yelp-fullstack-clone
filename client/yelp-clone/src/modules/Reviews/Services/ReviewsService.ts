import ApiService from '../../../core/Axios/ApiService';

export type Review = {
  id: number;
  name: string;
  review: string;
  rating: number;
};

export default class ReviewsService {
  async getReviewsForRestaurant(id?: string): Promise<Review[]> {
    const response = await ApiService.get(`/api/v1/restaurants/${id}/reviews`);
    return response.data.data.reviews;
  }
}
