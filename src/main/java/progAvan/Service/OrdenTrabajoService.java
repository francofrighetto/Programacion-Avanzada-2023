package progAvan.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import progAvan.Model.Auto;
import progAvan.Model.OrdenTrabajo;
import progAvan.Repository.AutoRepository;
import progAvan.Repository.MarcaRepository;
import progAvan.Repository.OrdenTrabajoRepository;

@Service
public class OrdenTrabajoService {

    @Autowired
    OrdenTrabajoRepository ordenTrabajoRepository;

    @Autowired
    MarcaRepository marcaRepository;

    @Autowired
    AutoRepository autoRepository;

    @Autowired
    ClienteService clienteService;

    @Autowired
    AutoService autoService;


    public void save(OrdenTrabajo ordenTrabajo) {
        ordenTrabajoRepository.save(ordenTrabajo);
        Optional<Auto> autOptional = autoService.findById(ordenTrabajo.getAuto().getId());
        if (autOptional.isPresent()) {
            Auto auto = autOptional.get();
            clienteService.actualizarUltimaFechaVisita(auto.getCliente().getId());
        }
    }

    public Optional<OrdenTrabajo> findById(int id) {
        return ordenTrabajoRepository.findById(id);
    }

    public List<OrdenTrabajo> findAll() {
        return ordenTrabajoRepository.findAll();
    }

    public List<OrdenTrabajo> findHabiliitados() {
        return ordenTrabajoRepository.findByHabilitadoIsTrue();
    }

    public List<OrdenTrabajo> findPaginado(int page, int size) {
        Pageable paging = PageRequest.of(page, size);
        List<OrdenTrabajo> pagedResult = ordenTrabajoRepository.findByHabilitadoIsTrue(paging);
        return pagedResult;
    }

    public long longitud() {
        return this.ordenTrabajoRepository.count();
    }

    @Transactional
    public List<Object> ultimaOrdenCliente(int idCliente) {
        return ordenTrabajoRepository.ultimaOrdenCliente(idCliente);
    }

    public OrdenTrabajo getLastId() {
        return ordenTrabajoRepository.findFirstByOrderByIdDesc();
    }

    public void setOrdenId(int idOrden, int idDetalle) {
        ordenTrabajoRepository.setOdenId(idOrden, idDetalle);
    }

    public List<OrdenTrabajo> buscarPorAtributo(String nombre, String fechaInferior, String fechaSuperior) {
        return ordenTrabajoRepository.buscarPorAtributo(nombre,fechaInferior, fechaSuperior);
    }
}