import { useCallback, useState } from "react"

const useInput = (initialState) => {
	const [state, setState] = useState(initialState)
	const onChange = useCallback((e) => {
		const { name, value } = e.target
		setState((prev) => ({
			...prev,
			[name]: value,
		}))
	}, [])
	const onReset = useCallback(() => {
		setState(initialState)
	}, [initialState])
	return [state, onChange, onReset]
}

export default useInput
