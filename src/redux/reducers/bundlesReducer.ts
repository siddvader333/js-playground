import produce from "immer";
import { ActionType } from "../action-types/ActionTypes";
import { Action } from "../actions/Actions";

export interface BundlesState {
  [key: string]: {
    loading: boolean;
    code: string;
    error: string;
  };
}

const initialState: BundlesState = {};

const bundlesReducer = produce(
  (state: BundlesState = initialState, action: Action): BundlesState => {
    switch (action.type) {
      case ActionType.BUNDLE_START:
        state[action.payload.cellId] = {
          loading: true,
          code: "",
          error: "",
        };
        return state;
      case ActionType.BUNDLE_COMPLETE:
        state[action.payload.cellId] = {
          loading: false,
          code: action.payload.bundle.code,
          error: action.payload.bundle.error,
        };
        return state;
      default:
        return state;
    }
  }
);

export default bundlesReducer;
