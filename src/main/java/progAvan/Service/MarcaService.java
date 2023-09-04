package progAvan.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import progAvan.Model.Marca;
import progAvan.Repository.MarcaRepository;

@Service
public class MarcaService {

    @Autowired
    MarcaRepository marcaRepository;

    // public void createMarca() {
    // marcaRepository.
    // }

    public void save(Marca model) {
        marcaRepository.save(model);
    }

    public Object findById(long id) {
        return marcaRepository.findById(id);
    }

    public List<Marca> findAll() {
        return marcaRepository.findAll();
    }

}
