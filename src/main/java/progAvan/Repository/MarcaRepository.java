package progAvan.Repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.batch.BatchProperties.Jdbc;
import org.springframework.jdbc.core.JdbcTemplate;

import jakarta.transaction.Transactional;

public class MarcaRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Transactional
    public void createMarca() {
        jdbcTemplate.execute("DROP TABLE marca IF EXISTS");
        jdbcTemplate.execute("CREATE TABLE marca("
                + "marca_id SERIAL, nombre VARCHAR(255))");
    }
}