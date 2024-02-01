import React from 'react';
import ListContainer from './ListContainer';
import Chart from './Chart';

export default function Article({ consumeList, setConsumeList }) {
  return (
    <section className=''>
        <ListContainer consumeList={consumeList} setConsumeList={setConsumeList} />
        <Chart consumeList={consumeList} />
    </section>
  )
}