import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction, ICrudSearchAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IProduct, defaultValue } from 'app/shared/model/product.model';
import { IPrisioner } from 'app/shared/model/prisioner.model';
import { IUser } from 'app/shared/model/user.model';
import { IPayload } from 'react-jhipster/src/type/redux-action.type';

export const ACTION_TYPES = {
  FETCH_PRODUCT_PAGE_LIST: 'product/FETCH_PRODUCT_PAGE_LIST',
  FETCH_PRODUCT_RANGE_LIST: 'product/FETCH_PRODUCT_NAME_LIST',
  FETCH_PRODUCT_NAME_LIST: 'product/FETCH_PRODUCT_NAME_LIST',
  FETCH_PRODUCT_SALES_LIST: 'product/FETCH_PRODUCT_SALES_LIST',
  FETCH_PRODUCT_LIST: 'product/FETCH_PRODUCT_LIST',
  FETCH_PRODUCT: 'product/FETCH_PRODUCT',
  CREATE_PRODUCT: 'product/CREATE_PRODUCT',
  UPDATE_PRODUCT: 'product/UPDATE_PRODUCT',
  DELETE_PRODUCT: 'product/DELETE_PRODUCT',
  SET_BLOB: 'product/SET_BLOB',
  RESET: 'product/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IProduct>,
  productsPage: [] as ReadonlyArray<IProduct>,
  productsByName: [] as ReadonlyArray<IProduct>,
  productSales: [] as Array<any>,
  product: defaultValue,
  updating: false,
  updateSuccess: false,
  totalItems: 0
};

export type ProductState = Readonly<typeof initialState>;

// Reducer

export default (state: ProductState = initialState, action): ProductState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PRODUCT_SALES_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PRODUCT_PAGE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PRODUCT_RANGE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PRODUCT_NAME_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PRODUCT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PRODUCT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PRODUCT):
    case REQUEST(ACTION_TYPES.UPDATE_PRODUCT):
    case REQUEST(ACTION_TYPES.DELETE_PRODUCT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };

    case FAILURE(ACTION_TYPES.FETCH_PRODUCT_SALES_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PRODUCT_PAGE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PRODUCT_RANGE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PRODUCT_NAME_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PRODUCT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PRODUCT):
    case FAILURE(ACTION_TYPES.CREATE_PRODUCT):
    case FAILURE(ACTION_TYPES.UPDATE_PRODUCT):
    case FAILURE(ACTION_TYPES.DELETE_PRODUCT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PRODUCT_SALES_LIST):
      return {
        ...state,
        loading: false,
        productSales: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_PRODUCT_PAGE_LIST):
      return {
        ...state,
        loading: false,
        productsPage: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_PRODUCT_RANGE_LIST):
    case SUCCESS(ACTION_TYPES.FETCH_PRODUCT_NAME_LIST):
      return {
        ...state,
        loading: false,
        productsByName: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_PRODUCT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_PRODUCT):
      return {
        ...state,
        loading: false,
        product: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PRODUCT):
    case SUCCESS(ACTION_TYPES.UPDATE_PRODUCT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        product: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PRODUCT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        product: {}
      };
    case ACTION_TYPES.SET_BLOB: {
      const { name, data, contentType } = action.payload;
      return {
        ...state,
        product: {
          ...state.product,
          [name]: data,
          [name + 'ContentType']: contentType
        }
      };
    }
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/products';

// Actions

export const getEntities: ICrudGetAllAction<IProduct> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PRODUCT_LIST,
  payload: axios.get<IProduct>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getProductSales: ICrudGetAction<IProduct> = id => {
  const requestUrl = `${apiUrl}/${id}/sales`;
  return {
    type: ACTION_TYPES.FETCH_PRODUCT_SALES_LIST,
    payload: axios.get<IProduct>(requestUrl)
  };
};

export const getProductsByPage: ICrudGetAllAction<IProduct> = (page, size, sort) => {
  const requestUrl = `${apiUrl}/bypage${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_PRODUCT_PAGE_LIST,
    payload: axios.get<IProduct>(requestUrl)
  };
};

export const getProductsByPageName: ICrudSearchBetweenAction<IProduct> = (name, low, high, page, size, sort) => {
  const requestUrl = `${apiUrl}/byname${sort ? `?page=${page}&size=${size}&sort=${sort}&name=${name}&low=${low}&high=${high}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_PRODUCT_PAGE_LIST,
    payload: axios.get<IProduct>(requestUrl)
  };
};

export const getProductsByPagePriceRange: ICrudSearchBetweenAction<IProduct> = (low, high, page, size, sort) => {
  const requestUrl = `${apiUrl}/byrange${sort ? `?page=${page}&size=${size}&sort=${sort}&low=${low}&high=${high}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_PRODUCT_PAGE_LIST,
    payload: axios.get<IProduct>(requestUrl)
  };
};

/*export const getProductsByName: ICrudSearchAction<IProduct> = (name: string) => ({
  type: ACTION_TYPES.FETCH_PRODUCT_NAME_LIST,
  payload: axios.get<IPrisioner>(`${apiUrl}/byname`, { params: { name: name } })
});

export const getProductsByPriceRange: ICrudSearchAction<IProduct> = (low, high: number) => ({
  type: ACTION_TYPES.FETCH_PRODUCT_RANGE_LIST,
  payload: axios.get<IPrisioner>(`${apiUrl}/byrange`, { params: { low: low, high: high } })
});*/

export const getEntity: ICrudGetAction<IProduct> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PRODUCT,
    payload: axios.get<IProduct>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IProduct> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PRODUCT,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IProduct> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PRODUCT,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IProduct> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PRODUCT,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const setBlob = (name, data, contentType?) => ({
  type: ACTION_TYPES.SET_BLOB,
  payload: {
    name,
    data,
    contentType
  }
});

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export type ICrudSearchBetweenAction<T> = (
  name?: string,
  low?: number,
  high?: number,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);
