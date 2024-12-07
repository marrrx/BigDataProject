

import "./styles/Textos.css"

interface ParrafoProps {
    parrafo: string; // Define el tipo del prop
}


const Parrafo: React.FC<ParrafoProps> = ({ parrafo }) => {
    return <p className="parrafos">{parrafo}</p>
    
};

export default Parrafo; // Exporta el componente
