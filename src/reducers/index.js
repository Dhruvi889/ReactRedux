import { combineReducers } from "redux";
import { formReducer } from "./formreducer";

const rootReducer = combineReducers({formReducer});
export default rootReducer;