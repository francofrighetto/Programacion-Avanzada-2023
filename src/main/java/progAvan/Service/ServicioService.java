package progAvan.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import progAvan.Model.Servicio;
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

    public Optional<Servicio> findById(long id) {
        return servicioRepository.findById(id);
    }

    public List<Servicio> findAll() {
        return servicioRepository.findAll();
    }

    public List<Servicio> findHabiliitados() {
        return servicioRepository.findByEstadoIsTrue();
    }

    @Transactional
    public void deshabilitarServicioYRelacionados(Integer servicioId) {
        // servicioRepository.deshabilitarServicio(servicioId);

    }

}
