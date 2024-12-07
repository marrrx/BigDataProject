import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface DataPoint {
  Fecha: string;
  Precio: number;
}

interface LineChartProps {
  data: DataPoint[];               // Datos históricos
  prediccionDia: DataPoint[];      // Predicción para 1 día
  prediccionSieteDias: DataPoint[]; // Predicción para 7 días
}

const LineChart: React.FC<LineChartProps> = ({ data, prediccionDia, prediccionSieteDias }) => {
  // Limitar los datos históricos a solo los últimos 365 días para mejorar el rendimiento
  const recentData = useMemo(
    () => data.slice(-365),
    [data]
  );

  // Crear etiquetas únicas para las fechas solo una vez
  const uniqueLabels = useMemo(() => {
    const allLabels = [
      ...recentData.map((item) => new Date(item.Fecha).toLocaleDateString()), 
      ...prediccionDia.map((item) => new Date(item.Fecha).toLocaleDateString()), 
      ...prediccionSieteDias.map((item) => new Date(item.Fecha).toLocaleDateString())
    ];
    return Array.from(new Set(allLabels)).sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime()
    );
  }, [recentData, prediccionDia, prediccionSieteDias]);

  // Alinear los datos con las etiquetas únicas solo una vez
  const alignDataWithLabels = (dataset: DataPoint[]) => 
    useMemo(() => 
      uniqueLabels.map((label) => {
        const point = dataset.find((item) => new Date(item.Fecha).toLocaleDateString() === label);
        return point ? point.Precio : null; // Dejar null si no hay datos para la fecha
      }), 
      [dataset, uniqueLabels]
    );

  const chartData = useMemo(() => ({
    labels: uniqueLabels,
    datasets: [
      {
        label: 'Precio Histórico',
        data: alignDataWithLabels(recentData),
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1,
      },
      {
        label: 'Predicción 1 Día',
        data: alignDataWithLabels(prediccionDia),
        fill: false,
        borderColor: 'rgba(255,99,132,1)',
        tension: 0.1,
        borderDash: [5, 5],
      },
      {
        label: 'Predicción 7 Días',
        data: alignDataWithLabels(prediccionSieteDias),
        fill: false,
        borderColor: 'rgba(54,162,235,1)',
        tension: 0.1,
        borderDash: [5, 5],
      },
    ],
  }), [uniqueLabels, recentData, prediccionDia, prediccionSieteDias]);

  if (!recentData.length && !prediccionDia.length && !prediccionSieteDias.length) {
    return <p>No hay datos para mostrar.</p>;
  }

  return <Line data={chartData} />;
};

export default LineChart;
