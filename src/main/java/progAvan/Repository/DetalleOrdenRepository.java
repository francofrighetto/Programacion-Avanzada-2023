package progAvan.Repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

import progAvan.Model.DetalleOrdenTrabajo;
import progAvan.Model.OrdenTrabajo;

@Repository
public interface DetalleOrdenRepository extends JpaRepository<DetalleOrdenTrabajo, Integer> {
    List<DetalleOrdenTrabajo> findByOrden(OrdenTrabajo orden);
}
