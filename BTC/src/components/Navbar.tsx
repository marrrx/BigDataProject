import { Link, useLocation } from 'react-router-dom';

function Navbar() {
    const location = useLocation(); // Obtener la ubicación actual

    return (
        <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img src='src/assets/logo.png' alt="" width={30} height={30} />
                </Link>
                <div className="navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link 
                                className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} 
                                to="/"
                            >
                                Inicio
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                                className={`nav-link ${location.pathname === '/prediccion' ? 'active' : ''}`} 
                                to="/prediccion"
                            >
                                Predicción
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                                className={`nav-link ${location.pathname === '/noticias' ? 'active' : ''}`} 
                                to="/noticias"
                            >
                                Noticias
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
