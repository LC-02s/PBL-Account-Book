import React, { useCallback, useState } from "react"
import Form from "./components/Form";
import Article from "./components/Article";

const getList = localStorage.getItem('consumeList') ?? '[]';
const initialList = JSON.parse(getList);

export default function App() {

  const [ consumeList, setConsumeList ] = useState(initialList);

  const saveList = useCallback((list) => {
    console.log(`Save Target: ${list}`);
    setConsumeList(list);
    localStorage.setItem('consumeList', JSON.stringify(list));
  }, []);

  return (
    <React.Fragment>
      <Form consumeList={consumeList} setConsumeList={saveList} />
      <Article consumeList={consumeList} setConsumeList={saveList} />
    </React.Fragment>
  );
}
