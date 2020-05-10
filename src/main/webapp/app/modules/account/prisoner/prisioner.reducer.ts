import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPrisioner, defaultValue } from 'app/shared/model/prisioner.model';
import { IPurchase } from 'app/shared/model/purchase.model';
import { IWorkStats } from 'app/shared/model/prisoner.work.stats';
import { IPurchaseData } from 'app/shared/model/prisoner.purchase.data';
import { IPrisonerQuiz } from 'app/shared/model/prisoner.quiz';
import { IWork } from 'app/shared/model/work.model';

export const ACTION_TYPES = {
  FETCH_PRISIONER_QUIZ_LIST: 'prisioner/FETCH_PRISIONER_QUIZ_LIST',
  FETCH_PRISIONER_WORK_LIST: 'prisioner/FECTCH_PRISIONER_WORK_LIST',
  FETCH_PRISIONER_PURCHASE_LIST: 'prisioner/FETCH_PRISIONER_PURCHASE_LIST',
  FETCH_PRISIONER_LIST: 'prisioner/FETCH_PRISIONER_LIST',
  FETCH_PRISIONER: 'prisioner/FETCH_PRISIONER',
  CREATE_PRISIONER: 'prisioner/CREATE_PRISIONER',
  UPDATE_PRISIONER: 'prisioner/UPDATE_PRISIONER',
  DELETE_PRISIONER: 'prisioner/DELETE_PRISIONER',
  SET_BLOB: 'prisioner/SET_BLOB',
  RESET: 'prisioner/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPrisioner>,
  entity: defaultValue,
  purchases: [] as Array<IPurchaseData>,
  works: [] as Array<IWork>,
  quizzes: [] as Array<IPrisonerQuiz>,
  updating: false,
  updateSuccess: false
};

export type PrisionerState = Readonly<typeof initialState>;

// Reducer

export default (state: PrisionerState = initialState, action): PrisionerState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PRISIONER_QUIZ_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PRISIONER_WORK_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PRISIONER_PURCHASE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PRISIONER_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PRISIONER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PRISIONER):
    case REQUEST(ACTION_TYPES.UPDATE_PRISIONER):
    case REQUEST(ACTION_TYPES.DELETE_PRISIONER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PRISIONER_QUIZ_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PRISIONER_WORK_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PRISIONER_PURCHASE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PRISIONER_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PRISIONER):
    case FAILURE(ACTION_TYPES.CREATE_PRISIONER):
    case FAILURE(ACTION_TYPES.UPDATE_PRISIONER):
    case FAILURE(ACTION_TYPES.DELETE_PRISIONER):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PRISIONER_QUIZ_LIST):
      return {
        ...state,
        loading: false,
        quizzes: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_PRISIONER_WORK_LIST):
      return {
        ...state,
        loading: false,
        works: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_PRISIONER_PURCHASE_LIST):
      return {
        ...state,
        loading: false,
        purchases: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_PRISIONER_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_PRISIONER):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PRISIONER):
    case SUCCESS(ACTION_TYPES.UPDATE_PRISIONER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PRISIONER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.SET_BLOB: {
      const { name, data, contentType } = action.payload;
      return {
        ...state,
        entity: {
          ...state.entity,
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

const apiUrl = 'api/prisioners';

// Actions

export const getEntities: ICrudGetAllAction<IPrisioner> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PRISIONER_LIST,
  payload: axios.get<IPrisioner>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IPrisioner> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PRISIONER,
    payload: axios.get<IPrisioner>(requestUrl)
  };
};

export const getPrisonerPurchases: ICrudGetAction<any> = id => {
  const requestUrl = `${apiUrl}/${id}/purchases`;
  return {
    type: ACTION_TYPES.FETCH_PRISIONER_PURCHASE_LIST,
    payload: axios.get<any>(requestUrl)
  };
};

export const getPrisionerWorks: ICrudGetAction<any> = id => {
  const requestUrl = `${apiUrl}/${id}/work`;
  return {
    type: ACTION_TYPES.FETCH_PRISIONER_WORK_LIST,
    payload: axios.get<any>(requestUrl)
  };
};

export const getPrisionerQuizs: ICrudGetAction<any> = id => {
  const requestUrl = `${apiUrl}/${id}/quizs`;
  return {
    type: ACTION_TYPES.FETCH_PRISIONER_QUIZ_LIST,
    payload: axios.get<any>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IPrisioner> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PRISIONER,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPrisioner> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PRISIONER,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPrisioner> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PRISIONER,
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
