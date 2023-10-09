package progAvan.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import progAvan.Model.Cliente;
import progAvan.Model.Marca;
import progAvan.Model.Modelo;
import progAvan.Repository.ClienteRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

@Service
public class ClienteService {

    @Autowired
    ClienteRepository clienteRepository;

    // public void createCliente() {
    // clienteRepository.
    // }

    public void save(Cliente model) {
        clienteRepository.save(model);
    }

    public Optional<Cliente> findById(long id) {
        return clienteRepository.findById(id);
    }

    public List<Cliente> findHabilitados() {
        return clienteRepository.findByEstadoIsTrue();
    }

    public List<Cliente> findAll() {
        return clienteRepository.findAll();
    }

    // paginación
    public List<Cliente> findPaginado(int page, int size) {
        Pageable paging = PageRequest.of(page, size);
        List<Cliente> pagedResult = clienteRepository.findByEstadoIsTrue(paging);
        return pagedResult;
    }

    public long longitud() {
        return this.clienteRepository.count();
    }

    public List<Cliente> buscarPorAtributo(String nombre) {
        return clienteRepository.buscarPorAtributo(nombre);
    }

    // public boolean esUnico(Cliente cliente) {
    // return clienteRepository.existsByNombre(cliente);
    // }

}
