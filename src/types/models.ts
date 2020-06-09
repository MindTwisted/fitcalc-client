export enum Languages {
  English = 'en',
  Russian = 'ru'
}

export enum Themes {
  Light = 'light',
  Dark = 'dark'
}

export interface AccessToken {
  expires_at: string
  token: string
}

export interface RefreshToken {
  id: number
  expires_at: string
  token?: string
  device?: string
}

export interface User {
  id: number
  name: string
  email: string
  roles: string[]
}

export interface Product {
  id?: number
  name: string
  proteins: number
  fats: number
  carbohydrates: number
  fiber: number
  calories: number
  inFavourites?: boolean
  user?: User
}