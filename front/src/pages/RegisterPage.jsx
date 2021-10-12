import React, { useCallback, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import useInput from "../hooks/useInput"
import { registerUserThunk } from "../redux/modules/auth"
import styles from "./LoginPage.module.css"

const RegisterPage = () => {
	const dispatch = useDispatch()
	const registerUser = useCallback(
		(body) => {
			dispatch(registerUserThunk(body))
		},
		[dispatch],
	)
	const [{ name, email, password, passwordConfirm }, onChange] = useInput({
		name: "",
		email: "",
		password: "",
		passwordConfirm: "",
	})

	const [clickable, setClickable] = useState(false)

	useEffect(() => {
		if (password === passwordConfirm && password.length > 0) {
			setClickable(true)
		} else {
			setClickable(false)
		}
	}, [password, passwordConfirm])

	const onSubmit = (e) => {
		e.preventDefault()
		const body = {
			name,
			email,
			password,
		}
		registerUser(body)
	}
	return (
		<div className={styles.container}>
			<form className={styles.form} onSubmit={onSubmit}>
				<label>이름</label>
				<input type="text" name="name" onChange={onChange} value={name} />
				<label>이메일</label>
				<input type="email" name="email" onChange={onChange} value={email} />
				<label>비밀번호</label>
				<input
					type="password"
					name="password"
					onChange={onChange}
					value={password}
				/>
				<label>비밀번호 확인</label>
				<input
					type="password"
					name="passwordConfirm"
					onChange={onChange}
					value={passwordConfirm}
				/>

				<br />
				<button disabled={!clickable} type="submit">
					회원가입
				</button>
			</form>
		</div>
	)
}

export default RegisterPage
