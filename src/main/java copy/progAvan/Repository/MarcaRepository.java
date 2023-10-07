package progAvan.Repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.batch.BatchProperties.Jdbc;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import jakarta.transaction.Transactional;
import progAvan.Model.Marca;
import progAvan.Model.Modelo;

@Repository
public interface MarcaRepository extends JpaRepository<Marca, Long> {
    List<Marca> findByEstadoIsTrue();

    @Transactional
    @Modifying
    @Query(value = "UPDATE Marca SET estado = false WHERE id = :marcaId", nativeQuery = true)
    void deshabilitarMarca(Integer marcaId);

}