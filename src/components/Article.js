import React from 'react';
import ListContainer from './ListContainer';
import Chart from './Chart';
import styled from 'styled-components';

export default function Article({ consumeList, setConsumeList }) {
  return (
    <AreaArticle>
        <Chart consumeList={consumeList} setConsumeList={setConsumeList} />
        <ListContainer consumeList={consumeList} setConsumeList={setConsumeList} />
    </AreaArticle>
  )
}

const AreaArticle = styled.section`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    height: auto;
    padding: 16px; 
    border: 1px solid var(--grayscale-200); 
    border-radius: 12px; 
    background-color: var(--brand-white);

    & > div:first-of-type {display: block; width: 320px; height: auto;}
    & > div:last-of-type {display: block; width: calc(100% - 344px); height: auto;}
`;