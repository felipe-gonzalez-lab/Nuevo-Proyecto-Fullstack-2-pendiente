function SelectorUsuario({ usuarioActual, setUsuarioActual }) {
  return (
    <section className="container py-3">
      <div className="alert alert-light border d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-0">
        <div>
          <strong>Usuario actual:</strong>{' '}
          {usuarioActual === 'cliente' ? 'Cliente' : 'Administrador'}
        </div>

        <div className="d-flex gap-2">
          <button
            className={`btn ${
              usuarioActual === 'cliente'
                ? 'btn-primary'
                : 'btn-outline-primary'
            }`}
            onClick={() => setUsuarioActual('cliente')}
          >
            Cliente
          </button>

          <button
            className={`btn ${
              usuarioActual === 'admin'
                ? 'btn-dark'
                : 'btn-outline-dark'
            }`}
            onClick={() => setUsuarioActual('admin')}
          >
            Administrador
          </button>
        </div>
      </div>
    </section>
  )
}

export default SelectorUsuario