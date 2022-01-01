import { render } from "react-dom";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import App from "./App";
import Pagos from "./routes/Pagos";
import Ingresos from "./routes/FormularioC";
import Servicios from "./routes/Servicios";
import PDFalumno from "./routes/PDFalumno";
const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="Pagos" element={<Pagos />} />
      <Route path="Ingresos" element={<Ingresos />} />
      <Route path="Servicios" element={<Servicios />} />
      <Route path="PDFalumno/:value" element={<PDFalumno />} />
¿    </Routes>
  </BrowserRouter>,
  rootElement
);