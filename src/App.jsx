import styles from "./Global.module.css";

import "bootstrap/dist/css/bootstrap.min.css";
import { Home } from "./pages/Home";
import { Patrimony } from "./pages/patrimony";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className={styles.container}>
      <Routes>
        <Route index element={<Home />} />
        <Route path="patrimonio" element={<Patrimony />} />
        <Route path="cpd" element={<Patrimony />} />
        <Route path="conferente" element={<Patrimony />} />
      </Routes>
    </div>
  );
}

export default App;
