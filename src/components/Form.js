import React, { useState } from 'react'
import styled from 'styled-components';
import Tooltip from './Tooltip';

export default function Form({ consumeList, setConsumeList }) {

    const [ title, setTitle ] = useState('');
    const [ cost, setCost ] = useState(0);
    const [ isVisible, setIsVisible ] = useState(false);
    const [ isFocused, setIsFocused ] = useState(false);

    const handleTitleInputChange = (e) => setTitle(e.target.value);
    const handleCostInputChange = (e) => setCost(e.target.value);

    const handleIsVisible = () => {
        setIsFocused(true);
        setIsVisible(consumeList.length === 0 && title === '' ? true : false)
    };

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
                    <FormInputContainer $focused={isFocused}>
                        <input 
                            type='text' 
                            placeholder='지출 내역을 입력해주세요'
                            value={title} 
                            onChange={handleTitleInputChange} 
                            onFocus={handleIsVisible} 
                            onBlur={() => {setIsVisible(false); setIsFocused(false)}}
                        />
                        <input 
                            type='number' 
                            value={cost} 
                            onChange={handleCostInputChange} 
                            onFocus={handleIsVisible} 
                            onBlur={() => {setIsVisible(false); setIsFocused(false)}} 
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
    padding: 0px 4px;
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
    padding: 0px 4px; 
    margin: 0px 0px 12px;
    font-size: 16px; 
    font-weight: 400; 
    color: var(--grayscale-500); 
    line-height: 1.4; 
    word-break: keep-all;
`;

const HotKeyBadge = styled.button.attrs({ type: 'submit' })`
    position: absolute; 
    top: 0px; 
    bottom: 0px; 
    right: 12px; 
    display: inline-block; 
    width: auto; 
    height: fit-content; 
    padding: 2px 4px; 
    margin: auto 0px; 
    font-size: 14px; 
    white-space: nowrap; 
    border-radius: 4px; 
    background-color: var(--grayscale-200); 
    visibility: visible; 
    opacity: 1; 
    transition: opacity 0.2s;
`;

const FormInputContainer = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: auto;
    padding: 8px 14px;
    border: 1px solid ${({ $focused }) => $focused ? 'var(--ui-information)' : 'var(--grayscale-200)'};
    border-radius: 6px;
    background-color: ${({ $focused }) => $focused ? 'var(--brand-white)' : 'var(--grayscale-100)'};
    transition: background 0.2s, border 0.2s;

    &::after {
        content: '';
        position: absolute;
        top: 0px;
        bottom: 0px;
        right: 266px;
        display: inline-block;
        margin: 12px 0px;
        width: 1px;
        background-color: var(--grayscale-200);
    }  
    & > input {
        display: block;
        width: 100%;
        min-width: auto;
        height: 30px;
        border-radius: 4px;
        background-color: transparent;
        outline: none;
    }
    & > input:first-of-type {width: calc(100% - 265px);}
    & > input:last-of-type {width: 240px;}
    & ~ ${HotKeyBadge} {
        ${({ $focused }) => $focused ? 'opacity: 0;' : 'opacity: 1;'}
    }
`;