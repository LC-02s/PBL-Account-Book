import React from 'react'
import styled from 'styled-components'

export default function StateMessage({ stateMessage, stateMessageVisible }) {
    // stateMessage: { message: '', state: 0 } (initalValue)
    // stateMessageVisible: boolean (initalValue)
    const { message, state } = stateMessage;

    return (
        <MessageWrapper $colorType={state} $visible={stateMessageVisible}>
            <p>{ message }</p>
        </MessageWrapper>
    )
}

// styled components
const MessageWrapper = styled.section`
    position: fixed;
    z-index: 999;
    top: 0px;
    right: 0px;
    display: inline-block;
    pointer-events: none;

    & > p {
        display: inline-block;
        width: auto;
        height: auto;
        padding: 12px 24px;
        margin: 20px 0px;
        font-size: 15px;
        font-weight: 500;
        color: var(--brand-white);
        white-space: nowrap;
        border-radius: 4px 0px 0px 4px;
        background-color: ${
            ({ $colorType }) => (
                $colorType === 0 ? 'var(--ui-success)' : 
                $colorType === 1 ? 'var(--ui-caution)' : 'var(--ui-warning)'
            )
        };
        opacity: ${({ $visible }) => $visible ? 1 : 0};
        transform: translateX(${({ $visible }) => $visible ? 0 : 50}%);
        /* visibility: ${({ $visible }) => $visible ? 'visible' : 'hidden'}; */
        transition: opacity 0.5s, transform 0.3s;
    }
`;
