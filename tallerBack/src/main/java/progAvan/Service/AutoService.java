package progAvan.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import progAvan.Model.Auto;
import progAvan.Model.Marca;
import progAvan.Repository.AutoRepository;


@Service
public class AutoService {

    @Autowired
    AutoRepository autoRepository;

    public void guardar(Auto auto){
        autoRepository.save(auto);
    }
    
    public Object findById(long id){
        return autoRepository.findById(id);
    }
    public List<Auto> findAll() {
        return autoRepository.findAll();
    }
}
