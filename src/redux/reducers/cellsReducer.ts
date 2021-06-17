import produce from "immer";
import { ActionType } from "../action-types/ActionTypes";
import { Action } from "../actions/Actions";
import { Cell } from "../Cell";
import { v4 as uuidv4 } from "uuid";

const showFunction = `
//import _React from 'react';
//import _ReactDOM from 'react-dom';
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

export interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const cellsReducer = produce(
  (state: CellsState = initialState, action: Action): CellsState => {
    switch (action.type) {
      case ActionType.UPDATE_CELL:
        const { id, content } = action.payload;
        state.data[id].content = content;
        return state;

      case ActionType.DELETE_CELL:
        delete state.data[action.payload];
        state.order = state.order.filter((id) => id !== action.payload);
        return state;

      case ActionType.MOVE_CELL:
        const { direction } = action.payload;
        const index = state.order.findIndex((id) => id === action.payload.id);
        const targetIndex = direction === "up" ? index - 1 : index + 1;

        if (targetIndex < 0 || targetIndex > state.order.length - 1) {
          return state;
        }

        state.order[index] = state.order[targetIndex];
        state.order[targetIndex] = action.payload.id;
        return state;

      case ActionType.INSERT_CELL_AFTER:
        const newCell: Cell = {
          id: uuidv4(),
          type: action.payload.type,
          content: "",
          fileName:
            action.payload.type === "code" ? action.payload.fileName : null,
          fileType:
            action.payload.type === "code" ? action.payload.fileType : null,
        };

        state.data[newCell.id] = newCell;
        const idx = state.order.findIndex((id) => id === action.payload.id);
        if (idx < 0) {
          state.order.unshift(newCell.id);
        } else {
          state.order.splice(idx + 1, 0, newCell.id);
        }
        return state;

      case ActionType.JS_BUNDLE_PRE_PROCESS:
        /*Go to every js code cell and append show function */
        console.log("pre-processing");
        for (let cell of Object.values(state.data)) {
          console.log(cell.type, cell.fileType);
          if (cell.type === "code" && cell.fileType === ".js") {
            console.log("found a file to append to", cell.fileName);
            const newCode = [showFunction, cell.content].join("\n");
            cell.content = newCode;
          }
        }
        return state;
      default:
        return state;
    }
  }
);

export default cellsReducer;
