import { Link } from 'react-router-dom'
import PanelAdministrador from '../components/PanelAdministrador'

function AdminPage({
  productos,
  actualizarStock,
  pedidos,
  actualizarEstadoPedido
}) {
  return (
    <main id="admin" className="bg-light py-4">
      <div className="container mb-3">
        <Link to="/" className="btn btn-outline-secondary">
          Volver a la tienda
        </Link>
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