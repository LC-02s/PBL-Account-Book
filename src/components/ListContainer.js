import React from 'react'
import List from './List'

export default function ListContainer({ consumeList, setConsumeList }) {
  return (
    <List consumeList={consumeList} setConsumeList={setConsumeList} />
  )
}
