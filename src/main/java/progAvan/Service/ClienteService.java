package progAvan.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import progAvan.Model.Cliente;
import progAvan.Repository.ClienteRepository;

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

    public List<Cliente> findAll() {
        return clienteRepository.findAll();
    }

    // public boolean esUnico(Cliente cliente) {
    // return clienteRepository.existsByNombre(cliente);
    // }

}
