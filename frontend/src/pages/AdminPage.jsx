import { Link } from 'react-router-dom'
import PanelAdministrador from '../components/PanelAdministrador'

function AdminPage({
  productos,
  actualizarStock,
  pedidos,
  actualizarEstadoPedido,
  restablecerDatos
}) {
  return (
    <main id="admin" className="bg-light py-4">
      <div className="container mb-3 d-flex justify-content-between align-items-center">
        <Link to="/" className="btn btn-outline-secondary">
          Volver a la tienda
        </Link>

        <button
          className="btn btn-outline-danger"
          onClick={restablecerDatos}
        >
          Restablecer datos de prueba
        </button>
      </div>

      <PanelAdministrador
        productos={productos}
        actualizarStock={actualizarStock}
        pedidos={pedidos}
        actualizarEstadoPedido={actualizarEstadoPedido}
      />
    </main>
  )
}

export default AdminPage