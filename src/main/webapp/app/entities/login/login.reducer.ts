import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ILogin, defaultValue } from 'app/shared/model/login.model';

export const ACTION_TYPES = {
  FETCH_LOGIN_LIST: 'login/FETCH_LOGIN_LIST',
  FETCH_LOGIN: 'login/FETCH_LOGIN',
  CREATE_LOGIN: 'login/CREATE_LOGIN',
  UPDATE_LOGIN: 'login/UPDATE_LOGIN',
  DELETE_LOGIN: 'login/DELETE_LOGIN',
  RESET: 'login/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ILogin>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type LoginState = Readonly<typeof initialState>;

// Reducer

export default (state: LoginState = initialState, action): LoginState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_LOGIN_LIST):
    case REQUEST(ACTION_TYPES.FETCH_LOGIN):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_LOGIN):
    case REQUEST(ACTION_TYPES.UPDATE_LOGIN):
    case REQUEST(ACTION_TYPES.DELETE_LOGIN):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_LOGIN_LIST):
    case FAILURE(ACTION_TYPES.FETCH_LOGIN):
    case FAILURE(ACTION_TYPES.CREATE_LOGIN):
    case FAILURE(ACTION_TYPES.UPDATE_LOGIN):
    case FAILURE(ACTION_TYPES.DELETE_LOGIN):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_LOGIN_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_LOGIN):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_LOGIN):
    case SUCCESS(ACTION_TYPES.UPDATE_LOGIN):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_LOGIN):
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

const apiUrl = 'api/logins';

// Actions

export const getEntities: ICrudGetAllAction<ILogin> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_LOGIN_LIST,
  payload: axios.get<ILogin>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ILogin> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_LOGIN,
    payload: axios.get<ILogin>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ILogin> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_LOGIN,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ILogin> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_LOGIN,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ILogin> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_LOGIN,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
