import {useState} from "react";
import Table from '../../components/Table/TableAdmin'
import Header from '../../components/Header'

function Admin() {
  const [lastUpdateDateString, setLastUpdateDateString] = useState('');

  return (
    <>
      <Header lastUpdateDateString={lastUpdateDateString} sector="admin" />
      <Table setLastUpdateDateString={setLastUpdateDateString} sector="home" isAdmin={true} urlServer="provider-list" />
    </>
  )
}

export { Admin }
