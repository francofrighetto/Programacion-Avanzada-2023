package progAvan.Repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.batch.BatchProperties.Jdbc;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import jakarta.transaction.Transactional;
import progAvan.Model.Marca;
import progAvan.Model.Modelo;

@Repository
public interface MarcaRepository extends JpaRepository<Marca, Long> {
    List<Marca> findByEstadoIsTrue();

    // boolean existsByNombre();
}