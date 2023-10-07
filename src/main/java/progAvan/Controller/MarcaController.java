package progAvan.Controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import progAvan.Model.Marca;
import progAvan.Model.Modelo;
import progAvan.Service.MarcaService;

@RestController
@RequestMapping(path = "/marca")
public class MarcaController {

    @Autowired
    private MarcaService marcaService;
    Map<String, String> response = new HashMap<>();

    @Value("${path_general}")
    String path;

    @CrossOrigin(origins = { "http://localhost:4200" }, maxAge = 3600)
    @PostMapping(value = "/guardar")
    public ResponseEntity guardar(@RequestBody Marca model) {
        try {
            marcaService.save(model);
            this.response.put("message", "success");
            return new ResponseEntity<>(this.response, HttpStatus.OK);
        } catch (Exception e) {
            this.response.put("message", "error interno");
            return new ResponseEntity<>(this.response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @CrossOrigin(origins = { "http://localhost:4200" }, maxAge = 3600)
    @GetMapping(value = "/mostrar")
    public List<Marca> mostrar() {
        return marcaService.findAll();
    }

    @CrossOrigin(origins = { "http://localhost:4200" }, maxAge = 3600)
    @GetMapping(value = "/mostrarHabilitados")
    public List<Marca> mostrarHabilitados() {
        return marcaService.findHabiliitados();
    }

    @CrossOrigin(origins = { "http://localhost:4200" }, maxAge = 3600)
    @GetMapping(value = "/mostrarpaginado")
    public List<Marca> mostrarPaginado(@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return marcaService.findPaginado(page, size);
    }

    @CrossOrigin(origins = { "http://localhost:4200" }, maxAge = 3600)
    @GetMapping(value = "/longitud")
    public long longitud() {
        return marcaService.longitud();
    }

    @CrossOrigin(origins = { "http://localhost:4200" }, maxAge = 3600)
    @PostMapping(value = "/editar/{id}")
    public ResponseEntity actualizar(@PathVariable int id, @RequestBody Marca model) {
        // Marca marca = marcaService.findById(id).orElse(null);
        try {
            marcaService.save(model);
            this.response.put("message", "success");
            return new ResponseEntity<>(this.response, HttpStatus.OK);
        } catch (Exception e) {
            this.response.put("message", "error interno");
            return new ResponseEntity<>(this.response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @CrossOrigin(origins = { "http://localhost:4200" }, maxAge = 3600)
    @PostMapping(value = "/eliminar/{id}")
    public ResponseEntity eliminar(@PathVariable int id) {
        try {
            Optional<Marca> optionalMarca = marcaService.findById(id);

            if (optionalMarca.isPresent()) {
                Marca marca = optionalMarca.get();
                // marca.setEstado(!marca.getEstado());
                // marcaService.save(marca);
                marcaService.deshabilitarMarcaYRelacionados(marca.getId());

                this.response.put("message", "success");
                return new ResponseEntity<>(this.response, HttpStatus.OK);
            } else {
                this.response.put("message", "error");
                return new ResponseEntity<>(this.response, HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            this.response.put("message", "error interno");
            return new ResponseEntity<>(this.response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
