import Table from '../../components/Table/Table'
import Header from '../../components/Header'

function CPD() {
  return (
    <>
      <Header sector="cpd" />
      <Table sector="cpd" urlServer="provider-list" />
    </> 
  );
}

export { CPD };
