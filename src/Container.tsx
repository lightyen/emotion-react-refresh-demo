import React from "react"
import styled from "@emotion/styled"
const Container = styled.div`
	color: #007020;
`
export default ({ children }: React.PropsWithChildren<{}>) => <Container>{children}</Container>
