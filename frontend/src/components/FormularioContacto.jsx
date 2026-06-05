function FormularioContacto({
  formulario,
  errores,
  mensajeEnviado,
  manejarCambioFormulario,
  manejarEnvioFormulario
}) {
  return (
    <section id="contacto" className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <h2 className="fw-bold text-center mb-4">Formulario de contacto</h2>

          <form
            className="card shadow-sm p-4"
            onSubmit={manejarEnvioFormulario}
            noValidate
          >
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">
                Nombre completo
              </label>
              <input
                type="text"
                className={`form-control ${errores.nombre ? 'is-invalid' : ''}`}
                id="nombre"
                name="nombre"
                placeholder="Ingresa tu nombre"
                autoComplete="name"
                value={formulario.nombre}
                onChange={manejarCambioFormulario}
              />
              {errores.nombre && (
                <div className="invalid-feedback">
                  {errores.nombre}
                </div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="correo" className="form-label">
                Correo electrónico
              </label>
              <input
                type="email"
                className={`form-control ${errores.correo ? 'is-invalid' : ''}`}
                id="correo"
                name="correo"
                placeholder="nombre@correo.com"
                autoComplete="email"
                value={formulario.correo}
                onChange={manejarCambioFormulario}
              />
              {errores.correo && (
                <div className="invalid-feedback">
                  {errores.correo}
                </div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="mensaje" className="form-label">
                Mensaje
              </label>
              <textarea
                className={`form-control ${errores.mensaje ? 'is-invalid' : ''}`}
                id="mensaje"
                name="mensaje"
                rows="4"
                placeholder="Escribe tu consulta"
                value={formulario.mensaje}
                onChange={manejarCambioFormulario}
              ></textarea>
              {errores.mensaje && (
                <div className="invalid-feedback">
                  {errores.mensaje}
                </div>
              )}
            </div>

            {mensajeEnviado && (
              <div className="alert alert-success" role="alert">
                {mensajeEnviado}
              </div>
            )}

            <button type="submit" className="btn btn-primary">
              Enviar consulta
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default FormularioContacto