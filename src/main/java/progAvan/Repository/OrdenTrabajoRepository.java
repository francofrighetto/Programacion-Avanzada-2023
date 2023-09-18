package progAvan.Repository;

import org.springframework.stereotype.Repository;

import jakarta.transaction.Transactional;
import progAvan.Model.OrdenTrabajo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface OrdenTrabajoRepository extends JpaRepository<OrdenTrabajo, Integer> {
    List<OrdenTrabajo> findByEstadoIsTrue();

    @Transactional
    @Modifying
    @Query(value = "UPDATE OrdenTrabajo SET estado = false WHERE id = :ordenTrabajoId", nativeQuery = true)
    void deshabilitarOrdenTrabajo(Integer ordenTrabajoId);

}