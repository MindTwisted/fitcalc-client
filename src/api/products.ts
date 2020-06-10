import axios from './axios'
import { AxiosRequestConfig } from 'axios'
import { getProductsUrl } from './config'
import { Product } from '../types/models'
import {
  AddProductResponse,
  AddProductToFavouritesResponse, DeleteProductResponse,
  GetAllProductsResponse,
  RemoveProductFromFavouritesResponse
} from './responseTypes'

export const getAllProducts = ({ name = '', offset = 0 } = {}): Promise<GetAllProductsResponse> => {
  const config: AxiosRequestConfig = { params: {} }
  
  if (name) {
    config.params.name = name
  }
  
  if (offset) {
    config.params.offset = offset
  }
  
  return axios.get(`${getProductsUrl()}`, config)
}

export const addProductToFavourites = (id: number): Promise<AddProductToFavouritesResponse> => {
  return axios.post(`${getProductsUrl()}/${id}/favourites`)
}

export const removeProductFromFavourites = (id: number): Promise<RemoveProductFromFavouritesResponse> => {
  return axios.delete(`${getProductsUrl()}/${id}/favourites`)
}

export const addProduct = (product: Product): Promise<AddProductResponse> => {
  return axios.post(`${getProductsUrl()}`, {
    name: product.name,
    proteins: product.proteins,
    carbohydrates: product.carbohydrates,
    fats: product.fats,
    fiber: product.fiber,
    calories: product.calories
  })
}

export const deleteProduct = (product: Product): Promise<DeleteProductResponse> => {
  return axios.delete(`${getProductsUrl()}/${product.id}`)
}