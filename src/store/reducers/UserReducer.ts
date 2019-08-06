import {SET_USER, UserActionType} from "../actions/UserAction";
import {User} from "../../services/UserService";

export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>

export type UserState = Omit<User, 'account'>;

const initialState: Partial<UserState> = {};

export const UserReducer = (state = initialState, action: UserActionType) => {
	switch (action.type) {
		case SET_USER:
			return {...action.payload};
		default:
			return state;
	}
};