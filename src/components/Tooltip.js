import React from 'react'
import styled from 'styled-components'

export default function Tooltip({ isVisible, guide, content }) {
    return (
        <TooltipContainer $active={isVisible}>
            { guide ? <TooltipGuide>{ guide }</TooltipGuide> : '' } 
            { content ?? '' }
        </TooltipContainer>
    )
}

// styled components
const TooltipContainer = styled.p`
    position: absolute; 
    bottom: -32px; 
    left: -4px; 
    padding: 6px 10px 6px 6px; 
    font-size: 15px; 
    color: var(--grayscale-100); 
    white-space: nowrap; 
    border-radius: 8px; 
    background-color: var(--grayscale-700); 
    visibility: ${({ $active }) => $active ? 'visible' : 'hidden'}; 
    opacity: ${({ $active }) => $active ? '0.9' : '0'}; 
    transform: translateY(${({ $active }) => $active ? 0 : 20}%); 
    transition: all 0.5s;

    &::before {
        content: ""; 
        position: absolute; 
        top: -5px; 
        left: 14px; 
        width: 0px; 
        height: 0px; 
        border-bottom: 6px solid var(--grayscale-700); 
        border-left: 5px solid transparent; 
        border-right: 5px solid transparent;
    }
`;

const TooltipGuide = styled.span`
    display: inline-block; 
    padding: 2px 4px; 
    margin-right: 4px; 
    font-size: 14px; 
    font-weight: 400; 
    color: var(--brand-white); 
    border-radius: 4px; 
    background-color: var(--grayscale-600);
`;