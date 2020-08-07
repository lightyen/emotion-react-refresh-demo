import React from "react"

// 1. OK.
// import Container from "./Container"

// 2. Failed !!
import styled from "@emotion/styled"
const Container = styled.div`
	color: #e03000;
`

const App = () => {
	return (
		<Container>
			<input type="text" />
			<div>helloworld</div>
		</Container>
	)
}

export default App
