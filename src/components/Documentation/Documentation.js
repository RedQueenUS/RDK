import React from 'react'
import styled from 'styled-components';
import { Card, CardHeader, CardContent, Button } from '../RQUI';

const DocumentationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  
`

const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
    justify-content: center;
    margin: 5rem;
`

const Documentation = () => {
  return (
    <DocumentationContainer>
        <CardContainer>
            <h1>Card</h1>
            <Card background="black" width="300px" height="300px"></Card>
            <h1>Card w/ Header & Content Area</h1>
            <Card width="300px" height="300px">
                <CardHeader background="red"></CardHeader>
                <CardContent background="rebeccapurple">Hello I'm some content</CardContent>
            </Card>
            <h1>Card props</h1>
            <ul>
                <li>background : String : style the background of the container same as you would in CSS</li>
                <li>height : String : style the height of the container same as you would in CSS</li>
                <li>width : String : style the width of the container same as you would in CSS</li>
            </ul>
        </CardContainer>
    </DocumentationContainer>
  )
}

export default Documentation
