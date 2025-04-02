import { useEffect, useState } from "react";

function formatDuration(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const h = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
    const s = String(totalSeconds % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
}

export function PedidoRow({ pedido, onAsignar, onEntregar }) {
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    const creacion = new Date(pedido.fechaCreacion);
    const asignacion = pedido.fechaAsignacion ? new Date(pedido.fechaAsignacion) : null;
    const entrega = pedido.fechaEntrega ? new Date(pedido.fechaEntrega) : null;

    let tiempoCreacion = "";
    let tiempoAsignacion = "";

    if (!asignacion) {
        tiempoCreacion = formatDuration(now - creacion);
    } else if (asignacion && !entrega) {
        tiempoCreacion = formatDuration(asignacion - creacion); // fijo
        tiempoAsignacion = formatDuration(now - asignacion);
    } else {
        tiempoCreacion = formatDuration(asignacion - creacion);
        tiempoAsignacion = formatDuration(entrega - asignacion);
    }

    return (
        <tr>
            <td>{pedido.id}</td>
            <td>{pedido.cliente}</td>
            <td>{tiempoCreacion}</td>
            <td>{tiempoAsignacion || "-"}</td>
            <td>
                {!pedido.fechaAsignacion && (
                    <button onClick={onAsignar}>Asignar</button>
                )}
                {pedido.fechaAsignacion && !pedido.fechaEntrega && (
                    <button onClick={onEntregar}>Entregar</button>
                )}
                {pedido.fechaEntrega && "Entregado"}
            </td>
        </tr>
    );
}
