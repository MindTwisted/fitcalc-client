import { useCallback, useReducer } from 'react';
import { Product } from '../types/models';
import {
  APPEND_PRODUCTS,
  RESET_OFFSET,
  RESET_SEARCH,
  SET_OFFSET_DONE,
  SET_OFFSET_VALUE,
  SET_PRODUCTS,
  SET_SEARCH,
  UPDATE_PRODUCT
} from '../types/actionTypes';

type ProductsPageState = {
  products: Product[];
  search: string;
  offset: {
    value: number;
    done: boolean;
  };
};

type SetProductsAction = {
  type: typeof SET_PRODUCTS;
  products: Product[];
};

type AppendProductsAction = {
  type: typeof APPEND_PRODUCTS;
  products: Product[];
};

type UpdateProductAction = {
  type: typeof UPDATE_PRODUCT;
  product: Product;
};

type SetSearchAction = {
  type: typeof SET_SEARCH;
  search: string;
};

type ResetSearchAction = {
  type: typeof RESET_SEARCH;
};

type SetOffsetValueAction = {
  type: typeof SET_OFFSET_VALUE;
  value: number;
};

type SetOffsetDoneAction = {
  type: typeof SET_OFFSET_DONE;
  done: boolean;
};

type ResetOffsetAction = {
  type: typeof RESET_OFFSET;
};

type ProductsPageAction = SetProductsAction |
  AppendProductsAction |
  UpdateProductAction |
  SetSearchAction |
  ResetSearchAction |
  SetOffsetValueAction | 
  SetOffsetDoneAction |
  ResetOffsetAction;

const productsPageInitialState: ProductsPageState = {
  products: [],
  search: '',
  offset: {
    value: 0,
    done: false
  }
};

const productsPageReducer = (state: ProductsPageState, action: ProductsPageAction): ProductsPageState => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        products: action.products
      };
    case APPEND_PRODUCTS:
      return {
        ...state,
        products: [...state.products, ...action.products]
      };
    case UPDATE_PRODUCT:
      return {
        ...state,
        products: state.products.map(product => product.id === action.product.id ? action.product : product)
      };
    case SET_SEARCH:
      return {
        ...state,
        search: action.search
      };
    case RESET_SEARCH:
      return {
        ...state,
        search: productsPageInitialState.search
      };
    case SET_OFFSET_VALUE:
      return {
        ...state,
        offset: {
          ...state.offset,
          value: action.value
        }
      };
    case SET_OFFSET_DONE:
      return {
        ...state,
        offset: {
          ...state.offset,
          done: action.done
        }
      };
    case RESET_OFFSET:
      return {
        ...state,
        offset: { ...productsPageInitialState.offset }
      };
    default:
      throw new Error('Unknown action type');
  }
};

const useProductsPageState = () => {
  const [state, dispatch] = useReducer(productsPageReducer, { ...productsPageInitialState });
  
  const setProducts = useCallback((products: Product[]) => {
    dispatch({
      type: SET_PRODUCTS,
      products
    });
  }, [dispatch]);
  const appendProducts = useCallback((products: Product[]) => {
    dispatch({
      type: APPEND_PRODUCTS,
      products
    });
  }, [dispatch]);
  const updateProduct = useCallback((product: Product) => {
    dispatch({
      type: UPDATE_PRODUCT,
      product
    });
  }, [dispatch]);
  const setSearch = useCallback((search: string) => {
    dispatch({
      type: SET_SEARCH,
      search
    });
  }, [dispatch]);
  const resetSearch = useCallback(() => {
    dispatch({
      type: RESET_SEARCH
    });
  }, [dispatch]);
  const setOffsetValue = useCallback((value: number) => {
    dispatch({
      type: SET_OFFSET_VALUE,
      value
    });
  }, [dispatch]);
  const setOffsetDone = useCallback((done: boolean) => {
    dispatch({
      type: SET_OFFSET_DONE,
      done
    });
  }, [dispatch]);
  const resetOffset = useCallback(() => {
    dispatch({
      type: RESET_OFFSET
    });
  }, [dispatch]);
  
  const actionCreators = {
    setProducts,
    appendProducts,
    updateProduct,
    setSearch,
    resetSearch,
    setOffsetValue,
    setOffsetDone,
    resetOffset
  };
  
  return {
    state,
    actionCreators
  };
};

export default useProductsPageState;