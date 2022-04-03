import ApiService from '../../../core/Axios/ApiService';

export type RestaurantsObject = {
  results: number;
  data: Data;
};

export type Data = {
  restaurants: Restaurants[];
};

export type Restaurants = {
  id?: number;
  name: string;
  location: string;
  price_range: number;
};

export default class RestaurantsService {
  async getAllRestaurants(): Promise<RestaurantsObject> {
    const response = await ApiService.get('/api/v1/restaurants');
    return response.data;
  }

  async createRestaurant(restaurant: Restaurants): Promise<any> {
    await ApiService.post('/api/v1/restaurants', restaurant);
  }

  async deleteRestaurant(id: number): Promise<boolean> {
    try {
      await ApiService.delete(`/api/v1/restaurants/${id}`);
      return true;
    } catch (error) {
      return false;
    }
  }
}
