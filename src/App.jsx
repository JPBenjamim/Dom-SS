import styles from './Global.module.css'

import Header from './components/Header'
import { Table } from './components/Table';

import { Home } from './pages/Home';
import { List } from './pages/List';

import { Routes, Route } from 'react-router-dom';
import ModalComponent from './components/Modal';

function App() {
  return (
      <div className={styles.container} >
        <Header />
        <Routes>
          <Route index element={<Home />}/>
          <Route path="list" element={<List />}/>
          
        </Routes>
        < Table />
        <ModalComponent />
      </div>
    )
}

export default App
