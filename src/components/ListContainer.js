import React, { useEffect, useState } from 'react'
import List from './List'
import styled, { css } from 'styled-components'



export default function ListContainer({ consumeList, setConsumeList, modifying, setModifying }) {

    const [ modifyingList, setModifyingList ] = useState([ ...consumeList ]);

    useEffect(() => { setModifyingList([ ...consumeList ]) }, [consumeList]);
    
    const handleCancelBtnClick = () => { setModifyingList([ ...consumeList ]); setModifying(false); }

    const handleSaveBtnClick = () => { setConsumeList(modifyingList); setModifying(false); }

    return (
        <section>
            <div className='flex justify-between items-center w-full h-auto px-1 pb-2' style={{borderBottom: '1px solid var(--grayscale-200)'}}>
                <ContainerTitle>지출 상세내역</ContainerTitle>
                {
                modifying ? 
                    <div>
                        <CommonBtn onClick={handleCancelBtnClick}><span className='material-icons'>cancel</span> 취소하기</CommonBtn>
                        <CommonBtn $save={true} onClick={handleSaveBtnClick}><span className='material-icons'>save</span> 저장하기</CommonBtn>    
                    </div> : 
                    <CommonBtn $modify={true} onClick={() => setModifying(true)}><span className='material-icons'>edit</span> 수정하기</CommonBtn>
                }
            </div>
            <div className='block w-full h-auto'>
                {modifyingList.map((list, idx) => {
                    return (
                        <List 
                            key={list.id} 
                            index={idx}
                            title={list.title}
                            cost={list.cost}
                            modifying={modifying}
                            modifyingList={modifyingList}
                            setModifyingList={setModifyingList}
                        />
                    )
                })}
            </div>
        </section>
    )
}

// styled components
const ContainerTitle = styled.h2`
    display: block;
    width: auto;
    height: auto;
    font-size: 16px;
    font-weight: 500;
    color: var(--gray-scale-700);
`;

const CommonBtn = styled.button`
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
    transition: background 0.2s, color 0.2s;

    & + & {margin-left: 6px;}

    &:hover {
        background-color: var(--grayscale-200);
        ${({ $modify }) => $modify && css`
            background-color: var(--ui-caution);
            color: var(--brand-white);
        `}
        ${({ $save }) => $save && css`
            background-color: var(--ui-success);
            color: var(--brand-white);
        `}
    }

    & > .material-icons {
        margin-right: 4px;
        font-size: 16px;
        color: inherit;
    }
`;