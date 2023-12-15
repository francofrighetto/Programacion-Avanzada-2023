package progAvan.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import progAvan.Model.Modelo;
import progAvan.Repository.AutoRepository;
import progAvan.Repository.MarcaRepository;
import progAvan.Repository.ModeloRepository;

@Service
public class ModeloService {

    @Autowired
    ModeloRepository modeloRepository;

    @Autowired
    MarcaRepository marcaRepository;

    @Autowired
    AutoRepository autoRepository;

    public void save(Modelo modelo) {
        modeloRepository.save(modelo);
    }

    public Optional<Modelo> findById(int id) {
        return modeloRepository.findById(id);
    }

    public List<Modelo> findAll() {
        return modeloRepository.findAll();
    }

    public List<Modelo> findHabiliitados() {
        return modeloRepository.findByEstadoIsTrue();
    }

    public List<Modelo> findModelosXMarca(int id) {
        return modeloRepository.findByMarca(id);

    }

    public Page<Modelo> mostrar(Pageable pageable) {
        return findPaginado(pageable); // Utiliza el método local findPaginado
    }

    public Page<Modelo> findPaginado(Pageable pageable) {
        return modeloRepository.findAll(pageable);
    }

    public List<Modelo> findPaginado(int page, int size) {
        Pageable paging = PageRequest.of(page, size);
        List<Modelo> pagedResult = modeloRepository.findByEstadoIsTrue(paging);
        return pagedResult;
    }

    public long longitud() {
        return this.modeloRepository.count();
    }

    @Transactional
    public void deshabilitarModeloYRelacionados(Integer modeloId) {
        modeloRepository.deshabilitarModelo(modeloId);
        autoRepository.deshabilitarAutosPorModeloId(modeloId);
    }

}
