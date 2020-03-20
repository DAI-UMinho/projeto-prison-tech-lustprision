import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPressProduct, defaultValue } from 'app/shared/model/press-product.model';

export const ACTION_TYPES = {
  FETCH_PRESSPRODUCT_LIST: 'pressProduct/FETCH_PRESSPRODUCT_LIST',
  FETCH_PRESSPRODUCT: 'pressProduct/FETCH_PRESSPRODUCT',
  CREATE_PRESSPRODUCT: 'pressProduct/CREATE_PRESSPRODUCT',
  UPDATE_PRESSPRODUCT: 'pressProduct/UPDATE_PRESSPRODUCT',
  DELETE_PRESSPRODUCT: 'pressProduct/DELETE_PRESSPRODUCT',
  RESET: 'pressProduct/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPressProduct>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type PressProductState = Readonly<typeof initialState>;

// Reducer

export default (state: PressProductState = initialState, action): PressProductState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PRESSPRODUCT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PRESSPRODUCT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PRESSPRODUCT):
    case REQUEST(ACTION_TYPES.UPDATE_PRESSPRODUCT):
    case REQUEST(ACTION_TYPES.DELETE_PRESSPRODUCT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PRESSPRODUCT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PRESSPRODUCT):
    case FAILURE(ACTION_TYPES.CREATE_PRESSPRODUCT):
    case FAILURE(ACTION_TYPES.UPDATE_PRESSPRODUCT):
    case FAILURE(ACTION_TYPES.DELETE_PRESSPRODUCT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PRESSPRODUCT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_PRESSPRODUCT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PRESSPRODUCT):
    case SUCCESS(ACTION_TYPES.UPDATE_PRESSPRODUCT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PRESSPRODUCT):
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

const apiUrl = 'api/press-products';

// Actions

export const getEntities: ICrudGetAllAction<IPressProduct> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PRESSPRODUCT_LIST,
  payload: axios.get<IPressProduct>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IPressProduct> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PRESSPRODUCT,
    payload: axios.get<IPressProduct>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IPressProduct> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PRESSPRODUCT,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPressProduct> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PRESSPRODUCT,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPressProduct> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PRESSPRODUCT,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
