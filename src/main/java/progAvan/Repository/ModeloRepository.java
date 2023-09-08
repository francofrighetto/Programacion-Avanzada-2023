package progAvan.Repository;

import org.springframework.stereotype.Repository;

import progAvan.Model.Modelo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface ModeloRepository extends JpaRepository<Modelo, Integer> {
    List<Modelo> findByEstadoIsTrue();

}