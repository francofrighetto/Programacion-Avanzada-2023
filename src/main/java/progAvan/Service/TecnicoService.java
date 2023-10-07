package progAvan.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import progAvan.Model.Marca;
import progAvan.Model.Modelo;
import progAvan.Model.Tecnico;
import progAvan.Repository.TecnicoRepository;

@Service
public class TecnicoService {

    @Autowired
    TecnicoRepository tecnicoRepository;

    // public void createTecnico() {
    // tecnicoRepository.
    // }

    public void save(Tecnico model) {
        tecnicoRepository.save(model);
    }

    public List<Tecnico> findPaginado(int page, int size) {
        Pageable paging = PageRequest.of(page, size);
        Page<Tecnico> pagedResult = tecnicoRepository.findAll(paging);
        return pagedResult.toList();
    }

     public List<Tecnico> findHabiliitados() {
        return tecnicoRepository.findByEstadoIsTrue();
    }

    public Optional<Tecnico> findById(long id) {
        return tecnicoRepository.findById(id);
    }

    public List<Tecnico> findAll() {
        return tecnicoRepository.findAll();
    }

    // public boolean esUnico(Tecnico tecnico) {
    // return tecnicoRepository.existsByNombre(tecnico);
    // }

}
