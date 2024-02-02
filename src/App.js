import React, { useCallback, useState } from "react"
import Form from "./components/Form";
import ListContainer from './components/ListContainer';
import Chart from './components/Chart';
import styled from 'styled-components';

const getList = localStorage.getItem('consumeList') ?? '[]';
const initialList = JSON.parse(getList);

export default function App() {

    const [ consumeList, setConsumeList ] = useState(initialList);
    const [ modifying, setModifying ] = useState(false);

    const saveList = useCallback((list) => {
        console.log('Save Target:', list);
        setConsumeList(list);
        localStorage.setItem('consumeList', JSON.stringify(list));
    }, []);

    return (
        <React.Fragment>
            <Form consumeList={consumeList} setConsumeList={saveList} modifying={modifying} />
            {
            consumeList.length > 0 && 
                <AreaArticle>
                    <Chart consumeList={consumeList} setConsumeList={saveList}  modifying={modifying} />
                    <ListContainer consumeList={consumeList} setConsumeList={saveList} modifying={modifying} setModifying={setModifying} />
                </AreaArticle>
            }
        </React.Fragment>
    );
}

// styled components
const AreaArticle = styled.article`
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

    & > section:first-of-type {display: block; width: 320px; height: auto;}
    & > section:last-of-type {display: block; width: calc(100% - 344px); height: auto;}
`;
