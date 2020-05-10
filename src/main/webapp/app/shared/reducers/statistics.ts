import axios from 'axios';

import { TranslatorContext, Storage, ICrudSearchAction, ICrudGetAction } from 'react-jhipster';
import { FAILURE, REQUEST, SUCCESS } from 'app/shared/reducers/action-type.util';
import { IProduct } from 'app/shared/model/product.model';
import { IPrisioner } from 'app/shared/model/prisioner.model';
import { IQuestion } from 'app/shared/model/question.model';
import { IWorkStats, defaultValue } from 'app/shared/model/prisoner.work.stats';

export const ACTION_TYPES = {
  FETCH_PRISONER_COMPLETED_WORKS: 'locale/FETCH_PRISONER_COMPLETED_WORKS',
  FETCH_PRISONER_WORK_STATES: 'locale/FETCH_PRISONER_WORK_STATES',
  FETCH_PRODUCT_NUMBER: 'locale/FETCH_PRODUCT_NUMBER',
  FETCH_PURCHASE_NUMBER: 'locale/FETCH_PURCHASE_NUMBER'
};

const initialState = {
  nProducts: 0,
  nSales: 0,
  // nPrisonerCompletedWork: 0,
  prisonerWorkStats: defaultValue,
  loading: false,
  errorMessage: null
};

export type StatisticsState = Readonly<typeof initialState>;

export default (state: StatisticsState = initialState, action): StatisticsState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PRISONER_WORK_STATES):
    case REQUEST(ACTION_TYPES.FETCH_PRODUCT_NUMBER):
    case REQUEST(ACTION_TYPES.FETCH_PURCHASE_NUMBER):
      return {
        ...state,
        errorMessage: null,
        loading: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PRISONER_WORK_STATES):
    case FAILURE(ACTION_TYPES.FETCH_PRODUCT_NUMBER):
    case FAILURE(ACTION_TYPES.FETCH_PURCHASE_NUMBER):
      return {
        ...state,
        loading: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PRISONER_WORK_STATES):
      return {
        ...state,
        loading: false,
        prisonerWorkStats: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_PRODUCT_NUMBER):
      return {
        ...state,
        loading: false,
        nProducts: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_PURCHASE_NUMBER):
      return {
        ...state,
        loading: false,
        nSales: action.payload.data
      };
    default:
      return state;
  }
};

const apiUrl = 'api/stats';

export const getProductTotalNumber: ICrudGetAction<number> = () => ({
  type: ACTION_TYPES.FETCH_PRODUCT_NUMBER,
  payload: axios.get<number>(`${apiUrl}/products-total`)
});

export const getPurchaseTotalNumber: ICrudGetAction<number> = () => ({
  type: ACTION_TYPES.FETCH_PURCHASE_NUMBER,
  payload: axios.get<number>(`${apiUrl}/purchases-total`)
});

export const getPrisonerWorkStates: ICrudGetAction<number> = id => ({
  type: ACTION_TYPES.FETCH_PRISONER_WORK_STATES,
  payload: axios.get<number>(`${apiUrl}/prisoner/${id}/work-stat`)
});
