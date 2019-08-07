import {combineReducers, createStore} from "redux";
import {UserReducer} from "./reducers/UserReducer";


const rootReducer = combineReducers({
	user: UserReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer);