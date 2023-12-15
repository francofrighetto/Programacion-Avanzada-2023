package progAvan.Repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import progAvan.Model.Tecnico;

@Repository
public interface TecnicoRepository extends JpaRepository<Tecnico, Long> {
    
    List<Tecnico> findByEstadoIsTrue();

    List<Tecnico> findByEstadoIsTrue(Pageable pageable);

    // boolean existsByNombre();
}