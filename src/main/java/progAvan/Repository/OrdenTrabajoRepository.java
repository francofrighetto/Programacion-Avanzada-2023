package progAvan.Repository;

import org.springframework.stereotype.Repository;

import jakarta.transaction.Transactional;
import progAvan.Model.OrdenTrabajo;
import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

@Repository
public interface OrdenTrabajoRepository extends JpaRepository<OrdenTrabajo, Integer> {

    List<OrdenTrabajo> findByHabilitadoIsTrue();

    List<OrdenTrabajo> findByHabilitadoIsTrue(Pageable pageable);

    @Transactional
    @Modifying
    @Query(value = "UPDATE OrdenTrabajo SET habilitado = false WHERE id = :ordenTrabajoId", nativeQuery = true)
    void deshabilitarOrdenTrabajo(Integer ordenTrabajoId);

    @Transactional
    @Modifying
    @Query(value = "SELECT orden_trabajo.fecha_inicio, auto.patente FROM orden_trabajo left join auto on orden_trabajo.vehiculo_id = auto.id left join cliente on auto.cliente_id = :idCliente order by orden_trabajo.fecha_inicio desc limit 1", nativeQuery = true)
    List<Object> ultimaOrdenCliente(int idCliente);

    OrdenTrabajo findFirstByOrderByIdDesc();

    @Transactional
    @Modifying
    @Query(value = "UPDATE public.detalle_orden_trabajo SET orden_id=:idOrden WHERE id=:idDetalle", nativeQuery = true)
    void setOdenId(int idOrden, int idDetalle);

    @Transactional
    @Modifying
    @Query(value = "SELECT orden_trabajo.*, auto.patente, tecnico.nombre FROM orden_trabajo left JOIN auto ON orden_trabajo.vehiculo_id=auto.id left JOIN tecnico ON orden_trabajo.tecnico_id=tecnico.id WHERE ( orden_trabajo.descripcion ILIKE %:descripcion% OR auto.patente ILIKE %:descripcion% OR tecnico.nombre ILIKE %:descripcion% ) and fecha_inicio >= TO_TIMESTAMP(:fechaInferior, 'YYYYMMDD') and fecha_inicio <= TO_TIMESTAMP(:fechaSuperior, 'YYYYMMDD') ;", nativeQuery = true)
    List<OrdenTrabajo> buscarPorAtributo(String descripcion, String fechaInferior, String fechaSuperior);
}