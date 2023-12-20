package progAvan.Repository;

import org.springframework.stereotype.Repository;

import jakarta.transaction.Transactional;
import progAvan.Model.Estadistica;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

@Repository
public interface EstadisticaRepository extends JpaRepository<Estadistica, Long> {

    @Transactional
    @Modifying
    @Query(value = "SELECT nombre, avg(minutos_realizados) as promedio_minutos_realizados, minutosestimados " +
            " FROM detalle_orden_trabajo as det " +
            " LEFT JOIN servicio as ser ON servicio_id = ser.id " +
            " left join orden_trabajo ON orden_trabajo.id = det.orden_id " +
            " where fecha_inicio >= TO_TIMESTAMP(:fechaInferior, 'YYYYMMDD') and fecha_inicio <= TO_TIMESTAMP(:fechaSuperior, 'YYYYMMDD') " +
            " GROUP BY nombre, minutosestimados;", nativeQuery = true)
    List<Object> comparacionMinutosServicios(String fechaInferior, String fechaSuperior);

    @Query(value = "SELECT SUM(CASE WHEN habilitado = true THEN 1 ELSE 0 END) AS noTerminado, SUM(CASE WHEN habilitado = false THEN 1 ELSE 0 END) AS terminado,  SUM(total) AS total  FROM orden_trabajo "
            + " where fecha_inicio >= TO_TIMESTAMP(:fechaInferior, 'YYYYMMDD') and fecha_inicio <= TO_TIMESTAMP(:fechaSuperior, 'YYYYMMDD'); ", nativeQuery = true)
    List<Object> estadisticaOrden(String fechaInferior, String fechaSuperior);

    @Query(value = "select sum(det.cantidad), ser.nombre from detalle_orden_trabajo as det" +
            " left join servicio as ser on servicio_id = ser.id " +
            " left join orden_trabajo ON orden_trabajo.id = det.orden_id " +
            " where servicio_id is not null and fecha_inicio >= TO_TIMESTAMP(:fechaInferior, 'YYYYMMDD') and fecha_inicio <= TO_TIMESTAMP(:fechaSuperior, 'YYYYMMDD') "
            +
            " group by ser.nombre;", nativeQuery = true)
    List<Object> cantidadServiciosEnDetalleOrden(String fechaInferior, String fechaSuperior);

}
