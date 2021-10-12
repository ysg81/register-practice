import React, { useCallback } from "react"
import { useDispatch } from "react-redux"
import { logoutUserThunk } from "../redux/modules/auth"

import styles from "./LoginPage.module.css"

const Homepage = () => {
	const dispatch = useDispatch()
	const logoutUser = useCallback(() => {
		dispatch(logoutUserThunk())
	}, [dispatch])

	return (
		<div className={styles.container}>
			<button onClick={logoutUser}>로그아웃</button>
		</div>
	)
}

export default Homepage
