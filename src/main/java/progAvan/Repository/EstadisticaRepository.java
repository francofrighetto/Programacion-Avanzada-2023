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

    @Query(value = "SELECT nombre, avg(minutos_realizados) as promedio_minutos_realizados, minutosestimados " +
            "FROM detalle_orden_trabajo as det " +
            "LEFT JOIN servicio as ser ON servicio_id = ser.id " +
            " where servicio_id is not null "+
            "GROUP BY nombre, minutosestimados", nativeQuery = true)
    List<Object> comparacionMinutosServicios();

    @Query(value = "SELECT SUM(CASE WHEN estado = true THEN 1 ELSE 0 END) AS noTerminado, SUM(CASE WHEN estado = false THEN 1 ELSE 0 END) AS terminado,  SUM(total) AS total  FROM orden_trabajo;", nativeQuery = true)
    List<Object> estadisticaOrden();

        @Query(value = "select count(ser.nombre), ser.nombre from detalle_orden_trabajo " + 
                "left join servicio as ser on servicio_id = ser.id " + 
                "where servicio_id is not null " + 
                "group by ser.nombre;", nativeQuery = true)
    List<Object> cantidadServiciosEnDetalleOrden();

}
