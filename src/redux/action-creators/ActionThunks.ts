import { Dispatch } from "react";
import bundle from "../../bundler/bundler";
import { ActionType } from "../action-types/ActionTypes";
import { Action } from "../actions/Actions";
import { Cell } from "../Cell";

const showFunction = `
import _React from 'react';
import _ReactDOM from 'react-dom';
var show = (value) =>{
  const root = document.querySelector("#root");
  if(typeof value === 'object'){
    if(value.$$typeof && value.props){
      ReactDOM.render(value, root);
    }else{         
      root.innerHTML = JSON.stringify(value);
    }
  }else {
    root.innerHTML = value;
  }
}`;

export const createBundle = (
  cellId: string,
  fileToRun: string,
  rawCode: { [key: string]: Cell }
) => {
  return async (dispatch: Dispatch<Action>) => {
    /*dispatch({
      type: ActionType.JS_BUNDLE_PRE_PROCESS,
      payload: {},
    });*/

    /*const processedCode: { [key: string]: Cell } = JSON.parse(
      JSON.stringify(rawCode)
    );
    for (let cell of Object.values(processedCode)) {
      console.log(cell.type, cell.fileType);
      if (cell.type === "code" && cell.fileType === ".js") {
        console.log("found a file to append to", cell.fileName);
        const newCode = [showFunction, cell.content].join("\n");
        cell.content = newCode;
      }
    }*/

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
