package progAvan.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import jakarta.transaction.Transactional;
import progAvan.Model.Servicio;
import progAvan.Model.Cliente;
import progAvan.Model.Modelo;
import progAvan.Repository.AutoRepository;
import progAvan.Repository.ServicioRepository;
import progAvan.Repository.ModeloRepository;

@Service
public class ServicioService {

    @Autowired
    ServicioRepository servicioRepository;

    // public void createServicio() {
    // servicioRepository.
    // }

    public void save(Servicio model) {
        servicioRepository.save(model);
    }

    public Page<Servicio> findPaginado(Pageable pageable) {
        return servicioRepository.findAll(pageable);
    }

    public Optional<Servicio> findById(long id) {
        return servicioRepository.findById(id);
    }

    public List<Servicio> findAll() {
        return servicioRepository.findAll();
    }

    public List<Servicio> findHabiliitados() {
        return servicioRepository.findByEstadoIsTrue();
    }

    public List<Servicio> findPaginado(int page, int size) {
        Pageable paging = PageRequest.of(page, size);
        List<Servicio> pagedResult = servicioRepository.findByEstadoIsTrue(paging);
        return pagedResult;
    }

    public long longitud() {
        return this.servicioRepository.count();
    }

    @Transactional
    public void deshabilitarServicioYRelacionados(Integer servicioId) {
        // servicioRepository.deshabilitarServicio(servicioId);

    }

}
