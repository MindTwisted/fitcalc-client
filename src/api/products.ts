import axios from './axios'
import { AxiosRequestConfig } from 'axios'
import { getProductsUrl } from './config'
import { Product } from '../types/models'

export interface GetAllProductsParams {
  name?: string
  offset?: number
}

export const getAllProducts = ({ name, offset }: GetAllProductsParams = { name: '', offset: 0 }): Promise<{
  data: {
    data: {
      products: Product[]
    }
  }
}> => {
  const config: AxiosRequestConfig = { params: {} }
  
  if (name) {
    config.params.name = name
  }
  
  if (offset) {
    config.params.offset = offset
  }
  
  return axios.get(`${getProductsUrl()}`, config)
}

export const addProductToFavourites = (id: number): Promise<{
  data: {
    data: {
      message: string
    }
  }
}> => {
  return axios.post(`${getProductsUrl()}/${id}/favourites`)
}

export const removeProductFromFavourites = (id: number): Promise<{
  data: {
    data: {
      message: string
    }
  }
}> => {
  return axios.delete(`${getProductsUrl()}/${id}/favourites`)
}

export const addProduct = (product: Product): Promise<{
  data: {
    data: {
      message: string
      product: Product
    }
  }
}> => {
  return axios.post(`${getProductsUrl()}`, {
    name: product.name,
    proteins: product.proteins,
    carbohydrates: product.carbohydrates,
    fats: product.fats,
    fiber: product.fiber,
    calories: product.calories
  })
}

export const deleteProduct = (product: Product): Promise<{
  data: {
    data: {
      message: string
    }
  }
}> => {
  return axios.delete(`${getProductsUrl()}/${product.id}`)
}