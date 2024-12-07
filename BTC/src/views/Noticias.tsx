import NewsCard from "../components/NewsCard";
import Titulos from "../components/Titulos";

export default function Noticias() {
  interface NewsProp {
    title: string;
    description: string;
    date: string;
    author: string;
    image_url: string;
  }


  const data: NewsProp[] = [
    {
      "title": "Avance en DeFi: DeBridge introduce su función 'Hooks'",
      "description": "DeBridge ha lanzado 'Hooks', una nueva función diseñada para mejorar la interoperabilidad entre cadenas en DeFi, facilitando transferencias de activos y aumentando la eficiencia en las integraciones de blockchain.",
      "date": "2024-10-23",
      "author": "Crypto News",
      "image_url": "https://example.com/debridge_hooks.jpg"
    },
    {
      "title": "Bitcoin a la baja tras la reciente aprobación de ETFs",
      "description": "Después de un incremento inicial, el precio de Bitcoin se ha estabilizado en torno a los $42,000, con un reciente ajuste debido a la toma de ganancias por parte de los inversores que aprovecharon el lanzamiento de ETFs en el mercado estadounidense.",
      "date": "2024-10-22",
      "author": "Bloomberg Crypto",
      "image_url": "https://example.com/bitcoin_etf.jpg"
    },
    {
      "title": "Crece el juego de ganar dinero: 'Shiba Shootout' gana tracción",
      "description": "La mecánica de jugar para ganar de 'Shiba Shootout' atrae a usuarios al incorporar incentivos financieros, logrando así una novedosa forma de valor para los tokens en el mercado de criptomonedas.",
      "date": "2024-10-20",
      "author": "Coin Telegraph",
      "image_url": "https://example.com/shiba_shootout.jpg"
    },
    {
      "title": "Oráculos de staking de Bitcoin impulsan DeFi",
      "description": "RedStone y Lombard Finance lanzan oráculos de staking de Bitcoin, mejorando la transparencia y optimizando las transacciones de BTC en plataformas de finanzas descentralizadas.",
      "date": "2024-10-18",
      "author": "Decrypt",
      "image_url": "https://example.com/bitcoin_oracles.jpg"
    },
    {
      "title": "MicroStrategy mantiene su posición en Bitcoin",
      "description": "MicroStrategy asegura que es poco probable que venda su inversión en Bitcoin, aun con la volatilidad actual del mercado y las caídas recientes en el precio de BTC.",
      "date": "2024-10-17",
      "author": "CNBC Crypto World",
      "image_url": "https://example.com/microstrategy_bitcoin.jpg"
    }
  ]

  return (
    <div className="container p-5">
      <Titulos titulo="Noticias recientes" />

      <div className="d-flex flex-column mb-3">
        {data.map((item, index) => (
          <div key={index} className="p-2"> <NewsCard key={index} data={item} /></div>
        ))}
      </div>
    </div>
  )
}
