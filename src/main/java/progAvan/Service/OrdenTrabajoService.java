package progAvan.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import progAvan.Model.OrdenTrabajo;
import progAvan.Model.Tecnico;
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

    // public void createordenTrabajo() {
    // ordenTrabajoRepository.
    // }

    public void save(OrdenTrabajo ordenTrabajo) {
        ordenTrabajoRepository.save(ordenTrabajo);
        clienteService.actualizarUltimaFechaVisita(ordenTrabajo.getAuto().getCliente().getId());
    }

    public Optional<OrdenTrabajo> findById(int id) {
        return ordenTrabajoRepository.findById(id);
    }

    public List<OrdenTrabajo> findAll() {
        return ordenTrabajoRepository.findAll();
    }

    public List<OrdenTrabajo> findHabiliitados() {
        return ordenTrabajoRepository.findByEstadoIsTrue();
    }

    public List<OrdenTrabajo> findPaginado(int page, int size) {
        Pageable paging = PageRequest.of(page, size);
        List<OrdenTrabajo> pagedResult = ordenTrabajoRepository.findByEstadoIsTrue(paging);
        return pagedResult;
    }

    public long longitud() {
        return this.ordenTrabajoRepository.count();
    }

    @Transactional
    public List<Object> ultimaOrdenCliente(int idCliente) {
        return ordenTrabajoRepository.ultimaOrdenCliente(idCliente);
    }

    public OrdenTrabajo getLastId(){
      return ordenTrabajoRepository.findFirstByOrderByIdDesc();
    }

    public void setOrdenId(int idOrden, int idDetalle){
      ordenTrabajoRepository.setOdenId(idOrden, idDetalle);
    }
}
