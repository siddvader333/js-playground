import { Dispatch } from "react";
import bundle from "../../bundler/bundler";
import { ActionType } from "../action-types/ActionTypes";
import { Action } from "../actions/Actions";

export const createBundle = (cellId: string, content: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.BUNDLE_START,
      payload: { cellId },
    });

    const result = await bundle({ "index.js": content });

    dispatch({
      type: ActionType.BUNDLE_COMPLETE,
      payload: {
        cellId,
        bundle: result,
      },
    });
  };
};
