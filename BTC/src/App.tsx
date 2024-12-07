import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./views/Index";
import Predicciones from "./views/Predicciones";
import Noticias from "./views/Noticias";
import TradingViewWidget from "./components/TradingViewWidget";
import Navbar from "./components/Navbar";


function App() {

  return (
    <BrowserRouter>
      <TradingViewWidget />
      <Navbar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/prediccion" element={<Predicciones />} />
        <Route path="/noticias" element={<Noticias />} />
      </Routes>
    </BrowserRouter>
  );
}



export default App;
