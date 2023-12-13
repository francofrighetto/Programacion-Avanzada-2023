package progAvan.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import progAvan.Model.Estado;

@Repository
public interface EstadoRepository extends JpaRepository<Estado, Long> {


}