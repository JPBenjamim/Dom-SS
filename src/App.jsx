import { Routes, Route } from "react-router-dom";
import styles from "./Global.module.css";

import "bootstrap/dist/css/bootstrap.min.css";
import { Patrimony } from "./pages/patrimony";
import { CPD } from "./pages/cpd";


function App() {
  return (
    <div className={styles.container}>
      <Routes>
        <Route path="patrimonio" element={<Patrimony />} />
        <Route path="cpd" element={<CPD />} />
        <Route path="conferente" element={<Patrimony />} />
        <Route path="*" element={<>ERROR</>}  />
      </Routes>
    </div>
  );
}

export default App;
