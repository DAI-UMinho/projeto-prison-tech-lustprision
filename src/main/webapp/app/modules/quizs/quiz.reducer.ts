import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IQuiz, defaultValue } from 'app/shared/model/quiz.model';

export const ACTION_TYPES = {
  FETCH_COMPLETED_QUIZ_LIST: 'quiz/FETCH_COMPLETED_QUIZ_LIST',
  FETCH_QUIZ_LIST: 'quiz/FETCH_QUIZ_LIST',
  FETCH_QUIZ_RESULTS: 'quiz/FETCH_QUIZ_RESULTS',
  FETCH_QUIZ: 'quiz/FETCH_QUIZ',
  CREATE_QUIZ: 'quiz/CREATE_QUIZ',
  UPDATE_QUIZ: 'quiz/UPDATE_QUIZ',
  DELETE_QUIZ: 'quiz/DELETE_QUIZ',
  RESET: 'quiz/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IQuiz>,
  completed: [] as ReadonlyArray<IQuiz>,
  quizResults: [] as ReadonlyArray<any>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type QuizState = Readonly<typeof initialState>;

// Reducer

export default (state: QuizState = initialState, action): QuizState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_QUIZ_RESULTS):
    case REQUEST(ACTION_TYPES.FETCH_COMPLETED_QUIZ_LIST):
    case REQUEST(ACTION_TYPES.FETCH_QUIZ_LIST):
    case REQUEST(ACTION_TYPES.FETCH_QUIZ):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_QUIZ):
    case REQUEST(ACTION_TYPES.UPDATE_QUIZ):
    case REQUEST(ACTION_TYPES.DELETE_QUIZ):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_QUIZ_RESULTS):
    case FAILURE(ACTION_TYPES.FETCH_COMPLETED_QUIZ_LIST):
    case FAILURE(ACTION_TYPES.FETCH_QUIZ_LIST):
    case FAILURE(ACTION_TYPES.FETCH_QUIZ):
    case FAILURE(ACTION_TYPES.CREATE_QUIZ):
    case FAILURE(ACTION_TYPES.UPDATE_QUIZ):
    case FAILURE(ACTION_TYPES.DELETE_QUIZ):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_QUIZ_RESULTS):
      return {
        ...state,
        loading: false,
        quizResults: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_COMPLETED_QUIZ_LIST):
      return {
        ...state,
        loading: false,
        completed: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_QUIZ_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_QUIZ):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_QUIZ):
    case SUCCESS(ACTION_TYPES.UPDATE_QUIZ):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_QUIZ):
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

const apiUrl = 'api/quizzes';

// Actions

export const getEntities: ICrudGetAllAction<IQuiz> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_QUIZ_LIST,
  payload: axios.get<IQuiz>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getCompletedQuizzes: ICrudGetAllAction<IQuiz> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_COMPLETED_QUIZ_LIST,
  payload: axios.get<IQuiz>(`${apiUrl}/completed`)
});

export const getEntity: ICrudGetAction<IQuiz> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_QUIZ,
    payload: axios.get<IQuiz>(requestUrl)
  };
};

export const getQuizResults: ICrudGetAction<IQuiz> = id => {
  const requestUrl = `${apiUrl}/${id}/results`;
  return {
    type: ACTION_TYPES.FETCH_QUIZ_RESULTS,
    payload: axios.get<any>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IQuiz> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_QUIZ,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IQuiz> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_QUIZ,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IQuiz> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_QUIZ,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
