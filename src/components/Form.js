import React, { useState } from 'react'
import styled from 'styled-components';
import Tooltip from './Tooltip';

export default function Form({ consumeList, setConsumeList }) {

    const [ title, setTitle ] = useState('');
    const [ cost, setCost ] = useState(0);
    const [ isVisible, setIsVisible ] = useState(false);

    const handleTitleInputChange = (e) => setTitle(e.target.value);
    const handleCostInputChange = (e) => setCost(e.target.value);

    const handleIsVisible = () => setIsVisible(consumeList.length === 0 && title === '' ? true : false);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (title === '' || cost === '0') return alert(`${title === '' ? '제목' : '비용'}을 입력해주세요`);
        
        const newListItem = { id: new Date().getTime(), title: title, cost: Number(cost) };
        setConsumeList([ ...consumeList, newListItem ]); // save list
        setTitle(''); setCost(0); // init value
    }

    return (
        <FormContainer>
            <form className='block w-full h-auto' onSubmit={handleSubmit}>
                <FormTitle>My Account Book</FormTitle>
                <FormDescription>Enter consumption details to make the list</FormDescription>
                <div className='relative'>
                    <FormInputContainer>
                        <input 
                            type='text' 
                            placeholder='지출 내역을 입력해주세요'
                            value={title} 
                            onChange={handleTitleInputChange} 
                            onFocus={handleIsVisible} 
                            onBlur={() => setIsVisible(false)} 
                        />
                        <input 
                            type='number' 
                            value={cost} 
                            onChange={handleCostInputChange} 
                            onFocus={handleIsVisible} 
                            onBlur={() => setIsVisible(false)} 
                        />
                    </FormInputContainer>
                    <HotKeyBadge>⌘↩︎</HotKeyBadge>
                    <Tooltip isVisible={isVisible} guide='Enter' content='리스트 추가' />
                </div>
            </form>
        </FormContainer>
    )
}

const FormContainer = styled.section`
    display: block; 
    width: 100%; 
    height: auto; 
    padding: 16px; 
    margin: 0px 0px 12px; 
    border: 1px solid var(--grayscale-200); 
    border-radius: 12px; 
    background-color: var(--brand-white);
`;

const FormTitle = styled.h1`
    display: block;
    width: 100%; 
    height: auto; 
    margin: 0px 0px 4px;
    font-size: 24px; 
    font-weight: 700; 
    color: var(--grayscale-900); 
    line-height: 1.2; 
    word-break: keep-all;
`;

const FormDescription = styled.p`
    display: block; 
    width: 100%; 
    height: auto; 
    padding: 0px; 
    font-size: 16px; 
    font-weight: 400; 
    color: var(--grayscale-500); 
    line-height: 1.4; 
    word-break: keep-all;
`;

const FormInputContainer = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: auto;

    input: {
        flex: 1;
        display: block;
        width: 100%;
        height: 48px;
    }
`;

const HotKeyBadge = styled.button.attrs({ type: 'submit' })`
    position: absolute; 
    top: 0px; 
    bottom: 0px; 
    right: 14px; 
    display: inline-block; 
    width: auto; 
    height: fit-content; 
    padding: 4px; 
    margin: auto 0px; 
    font-size: 14px; 
    white-space: nowrap; 
    border-radius: 4px; 
    background-color: var(--grayscale-200); 
    visibility: visible; 
    opacity: 1; 
    transition: opacity 0.2s;
`