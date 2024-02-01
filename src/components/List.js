import React, { useState } from 'react'
import styled from 'styled-components';

export default function List({ title, cost, index, modifying, modifyingList, setModifyingList }) {

    const [ modifiedTitle, setModifiedTitle ] = useState(title);
    const [ modifiedCost, setModifiedCost ] = useState(cost);
    const targetList = [ ...modifyingList ];

    const handleTitleInputChange = (e) => {
        setModifiedTitle(e.target.value);
        targetList[index].title = e.target.value; setModifyingList(targetList);
    }
    const handleCostInputChange = (e) => {
        setModifiedCost(Number(e.target.value));
        targetList[index].cost = Number(e.target.value); setModifyingList(targetList);
    }

    const handleDeleteBtnClick = () => {
        const newList = targetList.filter((_list, idx) => idx !== index);
        setModifyingList(newList);
    }

    return (
        <ListItem>
            <ListTxtContent $index={index} $modifying={modifying}>
                { 
                modifying ?
                    <React.Fragment>
                        <ModifyListInputWrap>
                            <p><input value={modifiedTitle} onChange={handleTitleInputChange} /></p>
                            <p>
                                <input value={modifiedCost} onChange={handleCostInputChange} />
                                <span>원</span>
                            </p>
                        </ModifyListInputWrap>
                        <DeleteBtn onClick={handleDeleteBtnClick}><span className='material-icons'>delete</span></DeleteBtn>
                    </React.Fragment> :
                    <React.Fragment>
                        <p>{ title ?? '' }</p>
                        <p>{ formatter(+cost) ?? 0 }원</p>
                    </React.Fragment>
                }
            </ListTxtContent>
        </ListItem>
    )
}

// formatter
function formatter(numberCost) {
    return numberCost.toLocaleString('ko-KR');
}

// styled components
const colorArr = ['#17C1B1', '#1792EE', '#596DEA', '#9774EE', '#E679BF'];

const ListItem = styled.div`
    display: block;
    width: 100%;
    height: auto;
    border-bottom: 1px solid var(--grayscale-100);
`;

const ListTxtContent = styled.div`
    position: relative;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: ${({ $modifying }) => $modifying ? 'center' : 'flex-end'};
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

const ModifyListInputWrap = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    width: calc(100% - 40px);
    height: auto;

    & p {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        width: calc(100% - 148px);
        height: auto;
    }
    & p:last-of-type {width: 140px;}
    & p input {
        display: block;
        width: 100%;
        min-width: auto;
        height: 36px;
        padding: 4px 8px;
        border: 1px solid var(--grayscale-200);
        border-radius: 4px;
        outline: none;
        transition: border 0.2s;
    }
    & p input:focus {border-color: var(--ui-information);}
    & p:last-of-type > input {margin-right: 4px; text-align: right;}
`;

const DeleteBtn = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: auto;
    height: auto;
    padding: 4px;
    background-color: transparent;

    & > .material-icons {
        color: var(--grayscale-600);
        transition: color 0.2s;
    }
    &:focus > .material-icons,
    &:hover > .material-icons {
        color: var(--ui-warning);
    }
`;
