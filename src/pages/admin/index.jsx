import Table from '../../components/Table/TableAdmin'
import Header from '../../components/Header'

function Admin() {
  return (
    <>
      <Header sector="home" />
      <Table sector="home" isAdmin={true} urlServer="provider-list" />
    </>
  )
}

export { Admin }
