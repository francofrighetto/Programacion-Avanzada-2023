package progAvan.Repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.batch.BatchProperties.Jdbc;
import org.springframework.data.domain.Pageable;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import jakarta.transaction.Transactional;
import progAvan.Model.Cliente;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    List<Cliente> findByEstadoIsTrue();

    List<Cliente> findByEstadoIsTrue(Pageable pageable);
    // boolean existsByNombre();

    @Transactional
    @Modifying
    @Query(value = "SELECT * FROM Cliente where nombre ILIKE %:nombre% ", nativeQuery = true)
    List<Cliente> buscarPorAtributo(String nombre);
}