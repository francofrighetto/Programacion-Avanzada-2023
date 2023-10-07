package progAvan.Repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.batch.BatchProperties.Jdbc;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import jakarta.transaction.Transactional;
import progAvan.Model.Servicio;
import progAvan.Model.Tecnico;

@Repository
public interface TecnicoRepository extends JpaRepository<Tecnico, Long> {
    List<Tecnico> findByEstadoIsTrue();

    List<Tecnico> findByEstadoIsTrue(Pageable pageable);

    // boolean existsByNombre();
}