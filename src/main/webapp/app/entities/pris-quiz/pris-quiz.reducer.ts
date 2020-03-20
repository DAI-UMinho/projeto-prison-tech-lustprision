import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPrisQuiz, defaultValue } from 'app/shared/model/pris-quiz.model';

export const ACTION_TYPES = {
  FETCH_PRISQUIZ_LIST: 'prisQuiz/FETCH_PRISQUIZ_LIST',
  FETCH_PRISQUIZ: 'prisQuiz/FETCH_PRISQUIZ',
  CREATE_PRISQUIZ: 'prisQuiz/CREATE_PRISQUIZ',
  UPDATE_PRISQUIZ: 'prisQuiz/UPDATE_PRISQUIZ',
  DELETE_PRISQUIZ: 'prisQuiz/DELETE_PRISQUIZ',
  RESET: 'prisQuiz/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPrisQuiz>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type PrisQuizState = Readonly<typeof initialState>;

// Reducer

export default (state: PrisQuizState = initialState, action): PrisQuizState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PRISQUIZ_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PRISQUIZ):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PRISQUIZ):
    case REQUEST(ACTION_TYPES.UPDATE_PRISQUIZ):
    case REQUEST(ACTION_TYPES.DELETE_PRISQUIZ):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PRISQUIZ_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PRISQUIZ):
    case FAILURE(ACTION_TYPES.CREATE_PRISQUIZ):
    case FAILURE(ACTION_TYPES.UPDATE_PRISQUIZ):
    case FAILURE(ACTION_TYPES.DELETE_PRISQUIZ):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PRISQUIZ_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_PRISQUIZ):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PRISQUIZ):
    case SUCCESS(ACTION_TYPES.UPDATE_PRISQUIZ):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PRISQUIZ):
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

const apiUrl = 'api/pris-quizs';

// Actions

export const getEntities: ICrudGetAllAction<IPrisQuiz> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PRISQUIZ_LIST,
  payload: axios.get<IPrisQuiz>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IPrisQuiz> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PRISQUIZ,
    payload: axios.get<IPrisQuiz>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IPrisQuiz> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PRISQUIZ,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPrisQuiz> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PRISQUIZ,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPrisQuiz> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PRISQUIZ,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
