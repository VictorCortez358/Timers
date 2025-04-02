import { useState } from "react";
import { TablaPedidos } from "./components/TablaPedidos";

let idCounter = 1;

export default function App() {
  const [pedidos, setPedidos] = useState([]);

  // Simula POST /pedidos
  const crearPedido = () => {
    const nuevo = {
      id: idCounter++,
      cliente: `Cliente ${idCounter}`,
      fechaCreacion: new Date().toISOString(),
      fechaAsignacion: null,
      fechaEntrega: null
    };
    setPedidos(prev => [...prev, nuevo]);
  };

  // Simula PATCH /pedidos/:id/asignar
  const asignarPedido = (id) => {
    setPedidos(prev =>
      prev.map(p =>
        p.id === id
          ? { ...p, fechaAsignacion: new Date().toISOString() }
          : p
      )
    );
  };

  // Simula PATCH /pedidos/:id/entregar
  const entregarPedido = (id) => {
    setPedidos(prev =>
      prev.map(p =>
        p.id === id
          ? { ...p, fechaEntrega: new Date().toISOString() }
          : p
      )
    );
  };

  return (
    <div>
      <h1>Pedidos en Cola</h1>
      <button onClick={crearPedido}>Crear Pedido</button>
      <TablaPedidos
        pedidos={pedidos}
        onAsignar={asignarPedido}
        onEntregar={entregarPedido}
      />
    </div>
  );
}
