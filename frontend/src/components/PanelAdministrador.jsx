function PanelAdministrador() {
  return (
    <section className="container my-5">
      <div className="card shadow-sm border-0">
        <div className="card-body">
          <h2 className="fw-bold mb-3">Panel de Administrador</h2>

          <p className="text-muted">
            Desde esta sección el administrador podrá gestionar productos, revisar pedidos,
            actualizar stock y visualizar información relevante de la tienda.
          </p>

          <div className="row g-3 mt-4">
            <div className="col-md-4">
              <div className="card h-100 border-primary">
                <div className="card-body">
                  <h5 className="card-title">Productos</h5>
                  <p className="card-text">
                    Administrar productos disponibles en la tienda.
                  </p>
                  <button className="btn btn-primary">
                    Gestionar productos
                  </button>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 border-success">
                <div className="card-body">
                  <h5 className="card-title">Pedidos</h5>
                  <p className="card-text">
                    Revisar pedidos realizados por los clientes.
                  </p>
                  <button className="btn btn-success">
                    Ver pedidos
                  </button>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 border-warning">
                <div className="card-body">
                  <h5 className="card-title">Stock</h5>
                  <p className="card-text">
                    Controlar disponibilidad y unidades de productos.
                  </p>
                  <button className="btn btn-warning">
                    Revisar stock
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default PanelAdministrador;