import PanelAdministrador from '../components/PanelAdministrador'

function AdminPage({
  productos,
  actualizarStock,
  pedidos,
  actualizarEstadoPedido
}) {
  return (
    <main id="admin" className="bg-light py-4">
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