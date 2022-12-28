import styles from './Global.module.css'

import Header from './assets/components/Header';

import { Home } from './pages/Home';
import { List } from './pages/List';

import { Routes, Route } from 'react-router-dom';

function App() {
  return (
      <div className={styles.container} >
        <Header />
        <Routes>
          <Route index element={<Home />}/>
          <Route path="list" element={<List />} />
        </Routes>
      </div>
    )
}

export default App
