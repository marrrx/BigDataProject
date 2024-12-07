import axios from "axios";
import { useEffect, useState } from "react";
import LineChart from "../components/LineChart";

export default function Predicciones() {
  interface DataPoint {
    Fecha: string;
    Precio: number;
  }

  const [historico, setHistorico] = useState<DataPoint[]>([]);
  const [prediccionDia, setPrediccionDia] = useState<DataPoint[]>([]);
  const [prediccionSieteDias, setPrediccionSieteDias] = useState<DataPoint[]>([]);
  const [graficaSeleccionada, setGraficaSeleccionada] = useState<string>("historico");

  const obtenerDatos = async () => {
    try {
      const [historicoResponse, prediccionDiaResponse, prediccionSieteDiasResponse] = await Promise.all([
        axios.get('http://127.0.0.1:5000/historico'),
        axios.get('http://127.0.0.1:5000/predecir_1_dia'),
        axios.get('http://127.0.0.1:5000/predecir_7_dias')
      ]);

      console.log('Datos históricos:', historicoResponse.data.historico);
      setHistorico(historicoResponse.data.historico);

      console.log('Predicción de 1 día:', prediccionDiaResponse.data.prediccion1);
      setPrediccionDia([{
        Fecha: prediccionDiaResponse.data.prediccion1.fecha,
        Precio: prediccionDiaResponse.data.prediccion1.precio
      }]);
      console.log('Estado de prediccionDia:', prediccionDia);  // Verifica el estado

      console.log('Predicción de 7 días:', prediccionSieteDiasResponse.data.prediccion7);
      setPrediccionSieteDias(prediccionSieteDiasResponse.data.prediccion7);
      console.log('Estado de prediccionSieteDias:', prediccionSieteDias);  // Verifica el estado

    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };

  useEffect(() => {
    obtenerDatos();
  }, []);

  const handleGraficaChange = (grafica: string) => {
    setGraficaSeleccionada(grafica);
  };

  return (
    <div className="container p-5">
      <h2>Predicciones</h2>

      {/* Botones para cambiar entre gráficas */}
      <div>
          <button
            onClick={() => handleGraficaChange("historico")}
            className={`btn ${graficaSeleccionada === "historico" ? "btn-primary" : "btn-secondary"}`}
          >
            Gráfico Histórico
          </button>
          <button
            onClick={() => handleGraficaChange("prediccionDia")}
            className={`btn ${graficaSeleccionada === "prediccionDia" ? "btn-primary" : "btn-secondary"} m-2`}
          >
            Predicción 1 Día
          </button>
          <button
            onClick={() => handleGraficaChange("prediccionSieteDias")}
            className={`btn ${graficaSeleccionada === "prediccionSieteDias" ? "btn-primary" : "btn-secondary"}`}
          >
            Predicción 7 Días
          </button>
      </div>

      {/* Mostrar la gráfica seleccionada */}
      {graficaSeleccionada === "historico" && historico.length > 0 && (
        <LineChart data={historico} prediccionDia={[]} prediccionSieteDias={[]} />
      )}
      {graficaSeleccionada === "prediccionDia" && prediccionDia.length > 0 && (
        <LineChart data={[]} prediccionDia={prediccionDia} prediccionSieteDias={[]} />
      )}
      {graficaSeleccionada === "prediccionSieteDias" && prediccionSieteDias.length > 0 && (
        <LineChart data={[]} prediccionDia={[]} prediccionSieteDias={prediccionSieteDias} />
      )}

      {/* Mostrar mensaje de carga si no hay datos */}
      {(historico.length === 0 || prediccionDia.length === 0 || prediccionSieteDias.length === 0) ? (
        <p>Cargando...</p>
      ) : null}
    </div>
  );
}
