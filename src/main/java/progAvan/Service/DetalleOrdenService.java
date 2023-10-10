package progAvan.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import progAvan.Model.DetalleOrdenTrabajo;
import progAvan.Model.OrdenTrabajo;
import progAvan.Repository.DetalleOrdenRepository;

@Service
public class DetalleOrdenService {

    @Autowired
    DetalleOrdenRepository detalleOrdenRepository;

    public List<DetalleOrdenTrabajo> buscarPorOrden(OrdenTrabajo orden){
        return detalleOrdenRepository.findByOrden(orden);
    }
}
 