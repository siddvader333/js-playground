import { combineReducers } from "redux";
import bundlesReducer from "./bundlesReducer";
import cellsReducer from "./cellsReducer";

const rootReducer = combineReducers({
  cells: cellsReducer,
  bundles: bundlesReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
