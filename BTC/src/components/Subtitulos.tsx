import "./styles/Textos.css"
interface SubProps {
    subtitulo: string; 
}


const Subtitulos: React.FC<SubProps> = ({ subtitulo }) => {
    return <h4 className="subtitulo">{subtitulo}</h4>

};

export default Subtitulos;