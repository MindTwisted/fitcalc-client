import axios from './axios';
import { AxiosRequestConfig } from 'axios';
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

export interface GetAllProductsParams {
  name?: string
  offset?: number
}

export const getAllProducts = ({ name, offset }: GetAllProductsParams = { name: '', offset: 0 }): Promise<{
  data: {
    data: {
      products: ProductsResponse[]
    }
  }
}> => {
  const config: AxiosRequestConfig = { params: {} };
  
  if (name) {
    config.params.name = name;
  }
  
  if (offset) {
    config.params.offset = offset;
  }
  
  return axios.get(`${getProductsPrefix()}`, config);
};

export const addProductToFavourites = (id: number): Promise<{
  data: {
    message: string
  }
}> => {
  return axios.post(`${getProductsPrefix()}/${id}/favourites`);
};

export const removeProductFromFavourites = (id: number): Promise<{
  data: {
    message: string
  }
}> => {
  return axios.delete(`${getProductsPrefix()}/${id}/favourites`);
};