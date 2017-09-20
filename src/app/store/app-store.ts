import { Store, combineReducers, createStore } from "redux";
import { ApplicationState, ROOT_REDUCER } from "./root-reducer";

export function appStoreFactory(): Store<ApplicationState> {
  return createStore(combineReducers<ApplicationState>(ROOT_REDUCER));
}
