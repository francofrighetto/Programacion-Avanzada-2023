package progAvan.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import progAvan.Model.Auto;
import progAvan.Model.Marca;
import progAvan.Model.Modelo;
import progAvan.Repository.AutoRepository;
import progAvan.Repository.ModeloRepository;

@Service
public class AutoService {

    @Autowired
    AutoRepository autoRepository;
    @Autowired
    ModeloRepository modeloRepository;

    public void save(Auto auto) {
        autoRepository.save(auto);
    }

    public Optional<Auto> findById(int id) {
        return autoRepository.findById(id);
    }

    public List<Auto> findAll() {
        return autoRepository.findAll();
    }

    @Transactional
    public void deshabilitarAuto(Integer autoId) {
        autoRepository.deshabilitarAuto(autoId);
    }
}