import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ISeller, defaultValue } from 'app/shared/model/seller.model';

export const ACTION_TYPES = {
  FETCH_SELLER_LIST: 'seller/FETCH_SELLER_LIST',
  FETCH_SELLER: 'seller/FETCH_SELLER',
  CREATE_SELLER: 'seller/CREATE_SELLER',
  UPDATE_SELLER: 'seller/UPDATE_SELLER',
  DELETE_SELLER: 'seller/DELETE_SELLER',
  RESET: 'seller/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ISeller>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type SellerState = Readonly<typeof initialState>;

// Reducer

export default (state: SellerState = initialState, action): SellerState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_SELLER_LIST):
    case REQUEST(ACTION_TYPES.FETCH_SELLER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_SELLER):
    case REQUEST(ACTION_TYPES.UPDATE_SELLER):
    case REQUEST(ACTION_TYPES.DELETE_SELLER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_SELLER_LIST):
    case FAILURE(ACTION_TYPES.FETCH_SELLER):
    case FAILURE(ACTION_TYPES.CREATE_SELLER):
    case FAILURE(ACTION_TYPES.UPDATE_SELLER):
    case FAILURE(ACTION_TYPES.DELETE_SELLER):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_SELLER_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_SELLER):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_SELLER):
    case SUCCESS(ACTION_TYPES.UPDATE_SELLER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_SELLER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/sellers';

// Actions

export const getEntities: ICrudGetAllAction<ISeller> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_SELLER_LIST,
  payload: axios.get<ISeller>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ISeller> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_SELLER,
    payload: axios.get<ISeller>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ISeller> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_SELLER,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ISeller> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_SELLER,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ISeller> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_SELLER,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
