import {useState} from "react";
import Table from '../../components/Table/Table'
import Header from '../../components/Header'

function CPD() {
  const [lastUpdateDateString, setLastUpdateDateString] = useState('');

  return (
    <>
      <Header lastUpdateDateString={lastUpdateDateString} sector="cpd" />
      <Table setLastUpdateDateString={setLastUpdateDateString} sector="cpd" urlServer="provider-list" />
    </> 
  );
}

export { CPD };
