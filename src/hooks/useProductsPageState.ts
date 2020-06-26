import { useCallback, useReducer } from 'react'
import { Product } from '../types/models'
import {
  APPEND_PRODUCTS,
  DELETE_PRODUCT,
  PREPEND_PRODUCTS,
  RESET_OFFSET,
  RESET_SEARCH,
  SET_ADD_PRODUCT_MODAL_OPEN,
  SET_OFFSET_DONE,
  SET_OFFSET_VALUE,
  SET_PRODUCT_UNDER_EDIT,
  SET_PRODUCT_UNDER_VIEWING,
  SET_PRODUCTS,
  SET_SEARCH,
  UPDATE_PRODUCT
} from '../types/actionTypes'
import {
  AppendProductsAction,
  DeleteProductAction,
  PrependProductsAction,
  ResetOffsetAction,
  ResetSearchAction,
  SetAddProductModalOpen,
  SetOffsetDoneAction,
  SetOffsetValueAction,
  SetProductsAction,
  SetProductUnderEditAction,
  SetProductUnderViewingAction,
  SetSearchAction,
  UpdateProductAction
} from '../types/actions'

type ProductsPageState = {
  products: Product[]
  productUnderEdit: Product | null
  productUnderViewing: Product | null
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
SetProductUnderEditAction |
SetProductUnderViewingAction |
AppendProductsAction |
PrependProductsAction |
UpdateProductAction |
DeleteProductAction |
SetSearchAction |
ResetSearchAction |
SetOffsetValueAction | 
SetOffsetDoneAction |
ResetOffsetAction |
SetAddProductModalOpen

const productsPageInitialState: ProductsPageState = {
  products: [],
  productUnderEdit: null,
  productUnderViewing: null,
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
    case SET_PRODUCT_UNDER_EDIT:
      return {
        ...state,
        productUnderEdit: action.product
      }
    case SET_PRODUCT_UNDER_VIEWING:
      return {
        ...state,
        productUnderViewing: action.product
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
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(product => product.id !== action.product.id)
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
  const setProductUnderEdit = useCallback((product: Product | null) => {
    dispatch({
      type: SET_PRODUCT_UNDER_EDIT,
      product
    })
  }, [dispatch])
  const setProductUnderViewing = useCallback((product: Product | null) => {
    dispatch({
      type: SET_PRODUCT_UNDER_VIEWING,
      product
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
  const deleteProduct = useCallback((product: Product) => {
    dispatch({
      type: DELETE_PRODUCT,
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
    setProductUnderEdit,
    setProductUnderViewing,
    appendProducts,
    prependProducts,
    updateProduct,
    deleteProduct,
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