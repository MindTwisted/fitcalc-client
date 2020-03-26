import axios from './axios';
import { AxiosRequestConfig } from 'axios';
import { getProductsPrefix } from './config';
import { Product } from '../types/models';

export interface GetAllProductsParams {
  name?: string;
  offset?: number;
}

export const getAllProducts = ({ name, offset }: GetAllProductsParams = { name: '', offset: 0 }): Promise<{
  data: {
    data: {
      products: Product[];
    };
  };
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
    message: string;
  };
}> => {
  return axios.post(`${getProductsPrefix()}/${id}/favourites`);
};

export const removeProductFromFavourites = (id: number): Promise<{
  data: {
    message: string;
  };
}> => {
  return axios.delete(`${getProductsPrefix()}/${id}/favourites`);
};