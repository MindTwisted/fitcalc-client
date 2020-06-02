import { useCallback, useReducer } from 'react'
import { Product } from '../types/models'
import {
  APPEND_PRODUCTS,
  RESET_OFFSET,
  RESET_SEARCH,
  SET_ADD_PRODUCT_MODAL_OPEN,
  SET_OFFSET_DONE,
  SET_OFFSET_VALUE,
  SET_PRODUCTS,
  SET_SEARCH,
  UPDATE_PRODUCT,
  PREPEND_PRODUCTS
} from '../types/actionTypes'
import {
  AppendProductsAction, PrependProductsAction,
  ResetOffsetAction,
  ResetSearchAction,
  SetAddProductModalOpen,
  SetOffsetDoneAction,
  SetOffsetValueAction,
  SetProductsAction,
  SetSearchAction,
  UpdateProductAction
} from '../types/actions'

type ProductsPageState = {
  products: Product[]
  search: string
  offset: {
    value: number
    done: boolean
  }
  actions: {
    addProductModalOpen: boolean
  }
}

type ProductsPageAction = SetProductsAction |
AppendProductsAction |
PrependProductsAction |
UpdateProductAction |
SetSearchAction |
ResetSearchAction |
SetOffsetValueAction | 
SetOffsetDoneAction |
ResetOffsetAction |
SetAddProductModalOpen

const productsPageInitialState: ProductsPageState = {
  products: [],
  search: '',
  offset: {
    value: 0,
    done: false
  },
  actions: {
    addProductModalOpen: false
  }
}

const productsPageReducer = (state: ProductsPageState, action: ProductsPageAction): ProductsPageState => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        products: action.products
      }
    case APPEND_PRODUCTS:
      return {
        ...state,
        products: [...state.products, ...action.products]
      }
    case PREPEND_PRODUCTS:
      return {
        ...state,
        products: [...action.products, ...state.products]
      }
    case UPDATE_PRODUCT:
      return {
        ...state,
        products: state.products.map(product => product.id === action.product.id ? action.product : product)
      }
    case SET_SEARCH:
      return {
        ...state,
        search: action.search
      }
    case RESET_SEARCH:
      return {
        ...state,
        search: productsPageInitialState.search
      }
    case SET_OFFSET_VALUE:
      return {
        ...state,
        offset: {
          ...state.offset,
          value: action.value
        }
      }
    case SET_OFFSET_DONE:
      return {
        ...state,
        offset: {
          ...state.offset,
          done: action.done
        }
      }
    case RESET_OFFSET:
      return {
        ...state,
        offset: { ...productsPageInitialState.offset }
      }
    case SET_ADD_PRODUCT_MODAL_OPEN:
      return {
        ...state,
        actions: {
          ...state.actions,
          addProductModalOpen: action.open
        }
      }
    default:
      throw new Error('Unknown action type')
  }
}

const useProductsPageState = () => {
  const [state, dispatch] = useReducer(productsPageReducer, { ...productsPageInitialState })
  
  const setProducts = useCallback((products: Product[]) => {
    dispatch({
      type: SET_PRODUCTS,
      products
    })
  }, [dispatch])
  const appendProducts = useCallback((products: Product[] | Product) => {
    if (!Array.isArray(products)) {
      products = [products]
    }
    
    dispatch({
      type: APPEND_PRODUCTS,
      products
    })
  }, [dispatch])
  const prependProducts = useCallback((products: Product[] | Product) => {
    if (!Array.isArray(products)) {
      products = [products]
    }
    
    dispatch({
      type: PREPEND_PRODUCTS,
      products
    })
  }, [dispatch])
  const updateProduct = useCallback((product: Product) => {
    dispatch({
      type: UPDATE_PRODUCT,
      product
    })
  }, [dispatch])
  const setSearch = useCallback((search: string) => {
    dispatch({
      type: SET_SEARCH,
      search
    })
  }, [dispatch])
  const resetSearch = useCallback(() => {
    dispatch({
      type: RESET_SEARCH
    })
  }, [dispatch])
  const setOffsetValue = useCallback((value: number) => {
    dispatch({
      type: SET_OFFSET_VALUE,
      value
    })
  }, [dispatch])
  const setOffsetDone = useCallback((done: boolean) => {
    dispatch({
      type: SET_OFFSET_DONE,
      done
    })
  }, [dispatch])
  const resetOffset = useCallback(() => {
    dispatch({
      type: RESET_OFFSET
    })
  }, [dispatch])
  const setAddProductModalOpen = useCallback((open: boolean) => {
    dispatch({
      type: SET_ADD_PRODUCT_MODAL_OPEN,
      open
    })
  }, [dispatch])
  
  const actionCreators = {
    setProducts,
    appendProducts,
    prependProducts,
    updateProduct,
    setSearch,
    resetSearch,
    setOffsetValue,
    setOffsetDone,
    resetOffset,
    setAddProductModalOpen
  }
  
  return {
    state,
    actionCreators
  }
}

export default useProductsPageState