function Carrito({ carrito, totalCarrito }) {
  return (
    <section id="carrito" className="bg-light py-5">
      <div className="container">
        <h2 className="fw-bold text-center mb-4">Carrito de compras</h2>

        {carrito.length === 0 ? (
          <p className="text-center text-muted">Tu carrito está vacío.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered align-middle bg-white">
              <thead className="table-dark">
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio unitario</th>
                  <th>Subtotal</th>
                </tr>
              </thead>

              <tbody>
                {carrito.map((producto) => (
                  <tr key={producto.id}>
                    <td>{producto.nombre}</td>
                    <td>{producto.cantidad}</td>
                    <td>${producto.precio.toLocaleString('es-CL')}</td>
                    <td>
                      ${(producto.precio * producto.cantidad).toLocaleString('es-CL')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="text-end">
              <h3 className="h4">
                Total: ${totalCarrito.toLocaleString('es-CL')}
              </h3>

              <button className="btn btn-success">
                Simular pedido
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Carrito