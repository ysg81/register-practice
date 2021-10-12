import React, { useCallback } from "react"
import styles from "./LoginPage.module.css"
import useInput from "../hooks/useInput"
import { loginUserThunk } from "../redux/modules/auth"
import { useDispatch } from "react-redux"

const LoginPage = () => {
	const dispatch = useDispatch()
	const loginUser = useCallback(
		(body) => {
			dispatch(loginUserThunk(body))
		},
		[dispatch],
	)
	const [{ email, password }, onChange] = useInput({
		email: "",
		password: "",
	})

	const onSubmit = (e) => {
		e.preventDefault()
		const body = {
			email,
			password,
		}
		loginUser(body)
	}

	return (
		<div className={styles.container}>
			<form className={styles.form} onSubmit={onSubmit}>
				<label>이메일</label>
				<input type="email" name="email" onChange={onChange} value={email} />
				<label>비밀번호</label>
				<input
					type="password"
					name="password"
					onChange={onChange}
					value={password}
				/>
				<label></label>
				<br />
				<button type="submit">로그인</button>
			</form>
		</div>
	)
}

export default LoginPage
