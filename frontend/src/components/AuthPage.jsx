import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRef } from "react"
// import { createPost } from "./api/posts"
import { registerRequest, loginRequest } from "../api/authRequests"
import Restaurants from "./Restaurants"

export function AuthPage({ setCurrentPage }) {
	const usernameRef = useRef()
	const passwordRef = useRef()
	const roleRef = useRef()

	// const queryClient = useQueryClient()
	const authMutation = useMutation({
		mutationFn: loginRequest,
		onSuccess: () => {
			console.log("onSucess | AuthPage")
			localStorage.setItem("role", roleRef.current.value)
			setCurrentPage(<Restaurants setCurrentPage={setCurrentPage} />)
		},
	})

	function handleSubmit(e) {
		e.preventDefault()
		authMutation.mutate({
			name: usernameRef.current.value,
			password: passwordRef.current.value,
			role: roleRef.current.value
		})
	}

	return (
		<div>
			{authMutation.isError && JSON.stringify(authMutation.error)}
			<h1>Please Enter Your Info</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="username">Username</label>
					<input id="username" ref={usernameRef} />
				</div>
				<div>
					<label htmlFor="password">Password</label>
					<input id="password" ref={passwordRef} />
				</div>
				<div>
					<label htmlFor="role">Role</label>
					<input id="role" ref={roleRef} />
				</div>
				<button disabled={authMutation.isLoading}>
					{authMutation.isLoading ? "Loading..." : "Login"}
				</button>
			</form>
		</div>
	)
}
