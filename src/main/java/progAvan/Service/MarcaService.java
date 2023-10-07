package progAvan.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import progAvan.Model.Marca;
import progAvan.Model.Modelo;
import progAvan.Repository.AutoRepository;
import progAvan.Repository.MarcaRepository;
import progAvan.Repository.ModeloRepository;

@Service
public class MarcaService {

    @Autowired
    MarcaRepository marcaRepository;

    @Autowired
    ModeloRepository modeloRepository;

    @Autowired
    AutoRepository autoRepository;

    // public void createMarca() {
    // marcaRepository.
    // }

    public void save(Marca model) {
        marcaRepository.save(model);
    }

    public Optional<Marca> findById(long id) {
        return marcaRepository.findById(id);
    }

    public List<Marca> findAll() {
        return marcaRepository.findAll();
    }

    public List<Marca> findHabiliitados() {
        return marcaRepository.findByEstadoIsTrue();
    }

    public List<Marca> findPaginado(int page, int size) {
        System.out.println(page);
                System.out.println(size);
        Pageable paging = PageRequest.of(page, size);
        Page<Marca> pagedResult = marcaRepository.findAll(paging);
        return pagedResult.toList();
    }

    @Transactional
    public void deshabilitarMarcaYRelacionados(Integer marcaId) {
        marcaRepository.deshabilitarMarca(marcaId);
        modeloRepository.deshabilitarModelosPorMarcaId(marcaId);
        autoRepository.deshabilitarAutosPorMarcaId(marcaId);
    }

    public long longitud(){
        return this.marcaRepository.count();
    }

}
