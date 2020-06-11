import { AccessToken, Product, RefreshToken, User } from '../types/models'

export interface RegisterResponse {
  data: {
    data: {
      user: User
    }
  }
}

export interface LoginResponse {
  data: {
    message: string
    data: {
      access_token: AccessToken
      refresh_token: RefreshToken
      date: string
    }
  }
}

export interface AuthResponse {
  data: {
    data: {
      user: User
    }
  }
}

export interface RefreshResponse {
  data: {
    data: {
      access_token: AccessToken
    }
  }
}

export interface VerifyPasswordResponse {
  data: {
    message: string
  }
}

export interface GetAllProductsResponse {
  data: {
    data: {
      products: Product[]
    }
  }
}

export interface AddProductToFavouritesResponse {
  data: {
    message: string
  }
}

export interface RemoveProductFromFavouritesResponse {
  data: {
    message: string
  }
}

export interface AddProductResponse {
  data: {
    message: string
    data: {
      product: Product
    }
  }
}

export interface UpdateProductResponse {
  data: {
    message: string
    data: {
      product: Product
    }
  }
}

export interface DeleteProductResponse {
  data: {
    message: string
  }
}

export interface DeleteRefreshTokenByIdResponse {
  data: {
    message: string
  }
}

export interface GetAllRefreshTokensResponse {
  data: {
    data: {
      refreshTokens: RefreshToken[]
    }
  }
}

export interface DeleteAllRefreshTokensResponse {
  data: {
    message: string
  }
}

export interface InitiatePasswordRecoveryResponse {
  data: {
    message: string
  }
}

export interface ConfirmPasswordRecoveryResponse {
  data: {
    message: string
  }
}

export interface UpdateCurrentUserResponse {
  data: {
    message: string
    data: {
      user: User
    }
  }
}

export interface UpdateCurrentUserEmailResponse {
  data: {
    message: string
  }
}

export interface UpdateCurrentUserPasswordResponse {
  data: {
    message: string
    data: {
      user: User
    }
  }
}