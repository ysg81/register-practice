import axios from "axios"

const prefix = "register-practice/auth"
const PENDING = `${prefix}/PENDING`
const SUCCESS = `${prefix}/SUCCESS`
const FAIL = `${prefix}/FAIL`

const initialState = {
	loading: false,
	data: [],
	error: null,
}

export function pending() {
	return {
		type: PENDING,
	}
}
export function success(data) {
	return {
		type: SUCCESS,
		payload: data,
	}
}
export function fail(error) {
	return {
		type: FAIL,
		payload: error,
	}
}

export function loginUserThunk(body, token) {
	return async (dispatch, getState, { history }) => {
		try {
			dispatch(pending())
			const res = await axios.post("/api/user/login", body, {
				Authorization: "Bearer " + token,
			})
			dispatch(success(res.data))
			history.push("/")
		} catch (error) {
			dispatch(fail(error))
		}
	}
}

export function registerUserThunk(body) {
	return async (dispatch, getState, { history }) => {
		try {
			dispatch(pending())
			const res = await axios.post("/api/user/register", body)
			dispatch(success(res.data))
			history.push("/login")
		} catch (error) {
			dispatch(fail(error))
		}
	}
}

export function logoutUserThunk() {
	return async (dispatch, getState, { history }) => {
		try {
			dispatch(pending())
			const res = await axios.get("/api/user/logout")
			dispatch(success(res.data))
			history.push("/login")
		} catch (error) {
			dispatch(fail(error))
		}
	}
}

export default function reducer(state = initialState, action) {
	if (action.type === PENDING) {
		return {
			...state,
			loading: true,
		}
	}
	if (action.type === SUCCESS) {
		return {
			...state,
			loading: false,
			data: action.payload,
			error: null,
		}
	}
	if (action.type === FAIL) {
		return {
			...state,
			loading: false,
			error: action.payload,
		}
	}
	return state
}
