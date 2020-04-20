import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IState, defaultValue } from 'app/shared/model/state.model';

export const ACTION_TYPES = {
  FETCH_STATE_LIST: 'state/FETCH_STATE_LIST',
  FETCH_STATE: 'state/FETCH_STATE',
  RESET: 'state/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IState>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type StateState = Readonly<typeof initialState>;

// Reducer

export default (state: StateState = initialState, action): StateState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_STATE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_STATE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case FAILURE(ACTION_TYPES.FETCH_STATE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_STATE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_STATE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_STATE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/states';

// Actions

export const getEntities: ICrudGetAllAction<IState> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_STATE_LIST,
  payload: axios.get<IState>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IState> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_STATE,
    payload: axios.get<IState>(requestUrl)
  };
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
