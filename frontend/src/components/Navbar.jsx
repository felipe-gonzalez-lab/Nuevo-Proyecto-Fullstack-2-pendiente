import { Link } from 'react-router-dom'

function Navbar({ usuarioActual }) {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">
            TecnoStore
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#menuPrincipal"
            aria-controls="menuPrincipal"
            aria-expanded="false"
            aria-label="Abrir menú de navegación"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="menuPrincipal">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Inicio
                </Link>
              </li>

              {usuarioActual === 'cliente' && (
                <>
                  <li className="nav-item">
                    <a className="nav-link" href="/#productos">
                      Productos
                    </a>
                  </li>

                  <li className="nav-item">
                    <a className="nav-link" href="/#carrito">
                      Carrito
                    </a>
                  </li>

                  <li className="nav-item">
                    <a className="nav-link" href="/#contacto">
                      Contacto
                    </a>
                  </li>
                </>
              )}

              {usuarioActual === 'admin' && (
                <li className="nav-item">
                  <Link className="nav-link" to="/admin">
                    Panel administrador
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar