import axios from './axios';
import { getProductsPrefix } from './config';

export interface ProductsResponse {
  id: number
  name: string
  proteins: number
  fats: number
  carbohydrates: number
  fiber: number
  calories: number
  inFavourites?: boolean
}

export const getAllProducts = (): Promise<{
  data: {
    data: {
      products: ProductsResponse[]
    }
  }
}> => {
  return axios.get(`${getProductsPrefix()}`);
};