import {User} from '../../services/UserService'

export const SET_USER = 'SET_USER';

interface SetUserAction {
	type: typeof SET_USER
	payload: User
}

export const setUser = (user: User) => {
	return {
		type: SET_USER,
		payload: user
	}
};

export type UserActionType = SetUserAction