import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


/*USUARIOS:
Cliente: cliente@tecnostore.cl / 1234
Administrador: admin@tecnostore.cl / admin123
*/

function LoginPage({ iniciarSesion }) {
  const [correo, setCorreo] = useState('')
  const [clave, setClave] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const manejarLogin = (e) => {
    e.preventDefault()

    const usuario = iniciarSesion(correo, clave)

    if (!usuario) {
      setError('Correo o contraseña incorrectos.')
      return
    }

    setError('')

    if (usuario.rol === 'admin') {
      navigate('/admin')
    } else {
      navigate('/')
    }
  }

  return (
    <main className="container my-5 pt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h2 className="fw-bold mb-3 text-center">
                Iniciar sesión
              </h2>

              <p className="text-muted text-center mb-4">
                Ingresa con una cuenta de cliente o administrador.
              </p>

              {error && (
                <div className="alert alert-danger">
                  {error}
                </div>
              )}

              <form onSubmit={manejarLogin}>
                <div className="mb-3">
                  <label className="form-label">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    placeholder="cliente@tecnostore.cl"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    value={clave}
                    onChange={(e) => setClave(e.target.value)}
                    placeholder="Ingresa tu contraseña"
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Ingresar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default LoginPage