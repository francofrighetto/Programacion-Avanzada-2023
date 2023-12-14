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

    public List<Object> comparacionMinutosServicios(String fechaInferior, String fechaSuperior){
        return this.estadisticaRepository.comparacionMinutosServicios(fechaInferior, fechaSuperior);
    }

    public List<Object> estadisticaOrden(String fechaInferior, String fechaSuperior){
        return this.estadisticaRepository.estadisticaOrden(fechaInferior, fechaSuperior);
    }

    public List<Object> cantidadServiciosEnDetalleOrden(String fechaInferior, String fechaSuperior){
        return this.estadisticaRepository.cantidadServiciosEnDetalleOrden(fechaInferior, fechaSuperior);
    }

}
