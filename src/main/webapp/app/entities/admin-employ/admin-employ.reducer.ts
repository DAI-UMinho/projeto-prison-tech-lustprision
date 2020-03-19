import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IAdminEmploy, defaultValue } from 'app/shared/model/admin-employ.model';

export const ACTION_TYPES = {
  FETCH_ADMINEMPLOY_LIST: 'adminEmploy/FETCH_ADMINEMPLOY_LIST',
  FETCH_ADMINEMPLOY: 'adminEmploy/FETCH_ADMINEMPLOY',
  CREATE_ADMINEMPLOY: 'adminEmploy/CREATE_ADMINEMPLOY',
  UPDATE_ADMINEMPLOY: 'adminEmploy/UPDATE_ADMINEMPLOY',
  DELETE_ADMINEMPLOY: 'adminEmploy/DELETE_ADMINEMPLOY',
  RESET: 'adminEmploy/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IAdminEmploy>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type AdminEmployState = Readonly<typeof initialState>;

// Reducer

export default (state: AdminEmployState = initialState, action): AdminEmployState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ADMINEMPLOY_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ADMINEMPLOY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_ADMINEMPLOY):
    case REQUEST(ACTION_TYPES.UPDATE_ADMINEMPLOY):
    case REQUEST(ACTION_TYPES.DELETE_ADMINEMPLOY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_ADMINEMPLOY_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ADMINEMPLOY):
    case FAILURE(ACTION_TYPES.CREATE_ADMINEMPLOY):
    case FAILURE(ACTION_TYPES.UPDATE_ADMINEMPLOY):
    case FAILURE(ACTION_TYPES.DELETE_ADMINEMPLOY):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_ADMINEMPLOY_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_ADMINEMPLOY):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_ADMINEMPLOY):
    case SUCCESS(ACTION_TYPES.UPDATE_ADMINEMPLOY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_ADMINEMPLOY):
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

const apiUrl = 'api/admin-employs';

// Actions

export const getEntities: ICrudGetAllAction<IAdminEmploy> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_ADMINEMPLOY_LIST,
  payload: axios.get<IAdminEmploy>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IAdminEmploy> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ADMINEMPLOY,
    payload: axios.get<IAdminEmploy>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IAdminEmploy> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ADMINEMPLOY,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IAdminEmploy> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ADMINEMPLOY,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IAdminEmploy> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ADMINEMPLOY,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
