package progAvan.Repository;

import progAvan.Model.Auto;
import progAvan.Model.Modelo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AutoRepository extends JpaRepository<Auto, Integer> {
    List<Auto> findByEstadoIsTrue();
}