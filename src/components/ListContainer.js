import React from 'react'
import List from './List'
import styled from 'styled-components'



export default function ListContainer({ consumeList, setConsumeList }) {
  return (
    <div>
        <div className='flex justify-between items-center w-full h-auto px-1 pb-2 border-b border-gray-300'>
            <ContainerTitle>지출 상세내역</ContainerTitle>
            <ModifyBtn><span className='material-icons'>edit</span> 수정하기</ModifyBtn>
        </div>
        <div>
            {consumeList.map((list, idx) => {
                return (
                    <List 
                        key={list.id} 
                        index={idx}
                        title={list.title}
                        cost={list.cost}
                        consumeList={consumeList} 
                        setConsumeList={setConsumeList} 
                    />
                )
            })}
        </div>
    </div>
  )
}

const ContainerTitle = styled.h2`
    display: block;
    width: auto;
    height: auto;
    font-size: 16px;
    font-weight: 500;
    color: var(--gray-scale-700);
`;

const ModifyBtn = styled.button`
    display: inline-flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    width: auto;
    height: auto;
    padding: 4px 12px 4px 8px;
    font-size: 14px;
    font-weight: 400;
    color: var(--grayscale-700);
    border-radius: 16px;
    background-color: var(--grayscale-100);

    & > .material-icons {
        margin-right: 4px;
        font-size: 16px;
        color: var(--grayscale-600);
    }
`;