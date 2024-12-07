
import './styles/Index.css'
import Titulos from '../components/Titulos';
import Parrafo from '../components/Parrafo';
import Subtitulos from '../components/Subtitulos';

export default function Index() {
    return (
        <div className='p-5 '>
            <div className="row">
                <div className="col-3 border-end border-1 border-black d-flex justify-content-center text-center w-25">
                    <img src='src/assets/logo.png' alt="" width={300} height={300} />
                </div>
                <div className="col-6 ps-5 w-75">
                    <Titulos titulo="¿Qué son los bitcoin?" />
                    <Parrafo parrafo="Bitcoin es una criptomoneda digital que se utiliza para comprar y vender criptomonedas.
                    Es una criptomoneda descrita como un activo digital que puede ser comprado, vendido, transferido y almacenado."/>
                    <br />
                    <Subtitulos subtitulo="¿Cómo se adquiere un bitcoin?" />
                    <Parrafo parrafo='Los bitcoin se adquieren mediante la transacción de criptomonedas, 
                    donde se especifica el valor de la moneda y el volumen de transacciones.' />
                    <br />
                    <Subtitulos subtitulo="¿Qué es un blockchain?" />
                    <Parrafo parrafo="Un blockchain es una cadena de bloques, donde cada bloque contiene 
                    información sobre las transacciones anteriores, así como la fecha y hora de creación. " />
                    <br />
                    <Subtitulos subtitulo="¿Qué es una wallet?" />
                    <Parrafo parrafo="Una wallet es un dispositivo que almacena criptomonedas, 
                    permitiendo a los usuarios controlar sus activos digitales. " />
                </div>
            </div>
        </div >

    )
}

