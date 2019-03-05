import React from 'react';
import styled from 'styled-components';

const TaskListContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 5rem;
`

const StyledUL = styled.ul`
    list-style-position: outside;
    font-size: 1.5rem;
    margin-top: 2rem;
    list-style-type: square;
` 

const TaskList = () => {
    return (
        <TaskListContainer>
            <h1>Here's some steps to get you going!</h1>
            <StyledUL>
                <li>Step One</li>
                <li>Step Two</li>
                <li>Step Three</li>
            </StyledUL>
        </TaskListContainer>
    )
}

export default TaskList;