import { Dispatch } from "react";
import bundle from "../../bundler/bundler";
import { ActionType } from "../action-types/ActionTypes";
import { Action } from "../actions/Actions";
import { Cell } from "../Cell";

export const createBundle = (
  cellId: string,
  fileToRun: string,
  rawCode: { [key: string]: Cell }
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.BUNDLE_START,
      payload: { cellId },
    });

    const result = await bundle(rawCode, fileToRun);

    dispatch({
      type: ActionType.BUNDLE_COMPLETE,
      payload: {
        cellId,
        bundle: result,
      },
    });
  };
};
