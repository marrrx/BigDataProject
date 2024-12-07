import "./styles/Textos.css"
interface TituloProps {
    titulo: string; // Define el tipo del prop
}


const Titulos: React.FC<TituloProps> = ({ titulo }) => {
    return <h2 className="sub_and_titles">{titulo}</h2>

};

export default Titulos;