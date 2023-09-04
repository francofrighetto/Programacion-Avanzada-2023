package progAvan.Repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.batch.BatchProperties.Jdbc;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import jakarta.transaction.Transactional;
import progAvan.Model.Marca;

@Repository
public interface MarcaRepository extends JpaRepository<Marca, Long> {

}