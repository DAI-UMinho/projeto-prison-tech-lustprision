import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IProduto, defaultValue } from 'app/shared/model/produto.model';

export const ACTION_TYPES = {
  FETCH_PRODUTO_LIST: 'produto/FETCH_PRODUTO_LIST',
  FETCH_PRODUTO: 'produto/FETCH_PRODUTO',
  CREATE_PRODUTO: 'produto/CREATE_PRODUTO',
  UPDATE_PRODUTO: 'produto/UPDATE_PRODUTO',
  DELETE_PRODUTO: 'produto/DELETE_PRODUTO',
  RESET: 'produto/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IProduto>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type ProdutoState = Readonly<typeof initialState>;

// Reducer

export default (state: ProdutoState = initialState, action): ProdutoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PRODUTO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PRODUTO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PRODUTO):
    case REQUEST(ACTION_TYPES.UPDATE_PRODUTO):
    case REQUEST(ACTION_TYPES.DELETE_PRODUTO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PRODUTO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PRODUTO):
    case FAILURE(ACTION_TYPES.CREATE_PRODUTO):
    case FAILURE(ACTION_TYPES.UPDATE_PRODUTO):
    case FAILURE(ACTION_TYPES.DELETE_PRODUTO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PRODUTO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_PRODUTO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PRODUTO):
    case SUCCESS(ACTION_TYPES.UPDATE_PRODUTO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PRODUTO):
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

const apiUrl = 'api/produtos';

// Actions

export const getEntities: ICrudGetAllAction<IProduto> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_PRODUTO_LIST,
    payload: axios.get<IProduto>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IProduto> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PRODUTO,
    payload: axios.get<IProduto>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IProduto> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PRODUTO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IProduto> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PRODUTO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IProduto> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PRODUTO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
