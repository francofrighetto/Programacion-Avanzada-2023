package progAvan.Repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import progAvan.Model.Servicio;

@Repository
public interface ServicioRepository extends JpaRepository<Servicio, Long> {
    
    List<Servicio> findByEstadoIsTrue();

    List<Servicio> findByEstadoIsTrue(Pageable pageable);

}