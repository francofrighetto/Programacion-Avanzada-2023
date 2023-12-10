package progAvan.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import progAvan.Model.Estadistica;
import progAvan.Repository.EstadisticaRepository;

@Service
public class EstadisticaService {

    @Autowired 
    private EstadisticaRepository estadisticaRepository;

    public List<Object> comparacionMinutosServicios(){
        return this.estadisticaRepository.comparacionMinutosServicios();
    }

    public List<Object> estadisticaOrden(){
        return this.estadisticaRepository.estadisticaOrden();
    }

    public List<Object> cantidadServiciosEnDetalleOrden(){
        return this.estadisticaRepository.cantidadServiciosEnDetalleOrden();
    }

}
