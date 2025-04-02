import { PedidoRow } from "./PedidoRow";

export function TablaPedidos({ pedidos, onAsignar, onEntregar }) {
    return (
        <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "100%", marginTop: "20px" }}>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Cliente</th>
                    <th>Tiempo hasta asignación</th>
                    <th>Tiempo desde asignación</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {pedidos.map(pedido => (
                    <PedidoRow
                        key={pedido.id}
                        pedido={pedido}
                        onAsignar={() => onAsignar(pedido.id)}
                        onEntregar={() => onEntregar(pedido.id)}
                    />
                ))}
            </tbody>
        </table>
    );
}
