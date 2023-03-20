import {useState} from "react";
import Table from '../../components/Table/Table'
import Header from '../../components/Header'
function Home() {
  const [lastUpdateDateString, setLastUpdateDateString] = useState('');

  return (
    <>
      <Header lastUpdateDateString={lastUpdateDateString} sector="home" />
      <Table setLastUpdateDateString={setLastUpdateDateString} sector="home" urlServer="provider-list" />
    </>
  )
}

export { Home }
