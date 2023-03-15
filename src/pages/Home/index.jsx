import Table from '../../components/Table/Table'
import Header from '../../components/Header'

function Home() {
  return (
    <>
      <Header sector="home" />
      <Table sector="home" urlServer="https://domss.netlify.app/api/providers" />
    </>
  )
}

export { Home }
