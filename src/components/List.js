import React from 'react'
import styled from 'styled-components';

function formatter(numberCost) {
    return numberCost.toLocaleString('ko-KR');
}

export default function List({ title, cost, index, consumeList, setConsumeList }) {
  return (
    <ListItem>
        <ListTxtContent $index={index}>
            <span>{ title ?? '' }</span>
            <span>{ formatter(+cost) ?? 0 }원</span>
        </ListTxtContent>
    </ListItem>
  )
}

const colorArr = ['#17C1B1', '#1792EE', '#596DEA', '#9774EE', '#E679BF'];

const ListItem = styled.div`
    display: block;
    width: 100%;
    height: auto;
    border-bottom: 1px solid var(--grayscale-100);
`;

const ListTxtContent = styled.p`
    position: relative;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: flex-end;
    width: 100%;
    height: auto;
    padding: 12px 8px 12px 16px;

    &::before {
        content: '';
        position: absolute;
        top: 0px;
        bottom: 0px;
        left: 4px;
        display: inline-block;
        width: 4px;
        height: 4px;
        margin: auto 0px;
        border-radius: 50%;
        background-color: ${({ $index }) => colorArr[+$index % colorArr.length]};
    }
    & > span {
        font-size: 16px;
        font-weight: 400;
        color: var(--grayscale-700);
    }
    & > span:first-of-type {word-break: keep-all;}
    & > span:last-of-type {white-space: nowrap;}
`;
