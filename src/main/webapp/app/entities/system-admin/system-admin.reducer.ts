import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ISystemAdmin, defaultValue } from 'app/shared/model/system-admin.model';

export const ACTION_TYPES = {
  FETCH_SYSTEMADMIN_LIST: 'systemAdmin/FETCH_SYSTEMADMIN_LIST',
  FETCH_SYSTEMADMIN: 'systemAdmin/FETCH_SYSTEMADMIN',
  CREATE_SYSTEMADMIN: 'systemAdmin/CREATE_SYSTEMADMIN',
  UPDATE_SYSTEMADMIN: 'systemAdmin/UPDATE_SYSTEMADMIN',
  DELETE_SYSTEMADMIN: 'systemAdmin/DELETE_SYSTEMADMIN',
  RESET: 'systemAdmin/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ISystemAdmin>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type SystemAdminState = Readonly<typeof initialState>;

// Reducer

export default (state: SystemAdminState = initialState, action): SystemAdminState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_SYSTEMADMIN_LIST):
    case REQUEST(ACTION_TYPES.FETCH_SYSTEMADMIN):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_SYSTEMADMIN):
    case REQUEST(ACTION_TYPES.UPDATE_SYSTEMADMIN):
    case REQUEST(ACTION_TYPES.DELETE_SYSTEMADMIN):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_SYSTEMADMIN_LIST):
    case FAILURE(ACTION_TYPES.FETCH_SYSTEMADMIN):
    case FAILURE(ACTION_TYPES.CREATE_SYSTEMADMIN):
    case FAILURE(ACTION_TYPES.UPDATE_SYSTEMADMIN):
    case FAILURE(ACTION_TYPES.DELETE_SYSTEMADMIN):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_SYSTEMADMIN_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_SYSTEMADMIN):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_SYSTEMADMIN):
    case SUCCESS(ACTION_TYPES.UPDATE_SYSTEMADMIN):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_SYSTEMADMIN):
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

const apiUrl = 'api/system-admins';

// Actions

export const getEntities: ICrudGetAllAction<ISystemAdmin> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_SYSTEMADMIN_LIST,
  payload: axios.get<ISystemAdmin>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ISystemAdmin> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_SYSTEMADMIN,
    payload: axios.get<ISystemAdmin>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ISystemAdmin> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_SYSTEMADMIN,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ISystemAdmin> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_SYSTEMADMIN,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ISystemAdmin> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_SYSTEMADMIN,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
