import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPressWork, defaultValue } from 'app/shared/model/press-work.model';

export const ACTION_TYPES = {
  FETCH_PRESSWORK_LIST: 'pressWork/FETCH_PRESSWORK_LIST',
  FETCH_PRESSWORK: 'pressWork/FETCH_PRESSWORK',
  CREATE_PRESSWORK: 'pressWork/CREATE_PRESSWORK',
  UPDATE_PRESSWORK_CANCEL: 'pressWork/UPDATE_PRESSWORK_CANCEL',
  UPDATE_PRESSWORK: 'pressWork/UPDATE_PRESSWORK',
  DELETE_PRESSWORK: 'pressWork/DELETE_PRESSWORK',
  RESET: 'pressWork/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPressWork>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type PressWorkState = Readonly<typeof initialState>;

// Reducer

export default (state: PressWorkState = initialState, action): PressWorkState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PRESSWORK_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PRESSWORK):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.UPDATE_PRESSWORK_CANCEL):
    case REQUEST(ACTION_TYPES.CREATE_PRESSWORK):
    case REQUEST(ACTION_TYPES.UPDATE_PRESSWORK):
    case REQUEST(ACTION_TYPES.DELETE_PRESSWORK):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.UPDATE_PRESSWORK_CANCEL):
    case FAILURE(ACTION_TYPES.FETCH_PRESSWORK_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PRESSWORK):
    case FAILURE(ACTION_TYPES.CREATE_PRESSWORK):
    case FAILURE(ACTION_TYPES.UPDATE_PRESSWORK):
    case FAILURE(ACTION_TYPES.DELETE_PRESSWORK):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PRESSWORK_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_PRESSWORK):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.UPDATE_PRESSWORK_CANCEL):
    case SUCCESS(ACTION_TYPES.CREATE_PRESSWORK):
    case SUCCESS(ACTION_TYPES.UPDATE_PRESSWORK):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PRESSWORK):
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

const apiUrl = 'api/press-works';

// Actions

export const getEntities: ICrudGetAllAction<IPressWork> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PRESSWORK_LIST,
  payload: axios.get<IPressWork>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IPressWork> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PRESSWORK,
    payload: axios.get<IPressWork>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IPressWork> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PRESSWORK,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPressWork> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PRESSWORK,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const getCancel: ICrudGetAction<IPressWork> = id => {
  const requestUrl = `${apiUrl}/${id}/cancel`;
  return {
    type: ACTION_TYPES.UPDATE_PRESSWORK_CANCEL,
    payload: axios.get<IPressWork>(requestUrl)
  };
};

export const cancelPressProduct: ICrudPutAction<IPressWork> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}/cancel`;
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PRESSWORK_CANCEL,
    payload: axios.put(requestUrl)
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPressWork> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PRESSWORK,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
