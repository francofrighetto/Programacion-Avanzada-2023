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
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import progAvan.Model.Auto;
import progAvan.Model.Modelo;
import progAvan.Service.ModeloService;

@RestController
@RequestMapping(path = "/modelo")
public class ModeloController {

    @Autowired
    private ModeloService modeloService;

    Map<String, String> response = new HashMap<>();

    @CrossOrigin(origins = { "http://localhost:4200" }, maxAge = 3600)
    @PostMapping(value = "/guardar")
    public ResponseEntity guardar(@RequestBody Modelo model) {
        try {
            modeloService.save(model);
            this.response.put("message", "success");
            return new ResponseEntity<>(this.response, HttpStatus.OK);
        } catch (Exception e) {
            this.response.put("message", "error interno");
            return new ResponseEntity<>(this.response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @CrossOrigin(origins = { "http://localhost:4200" }, maxAge = 3600)
    @GetMapping(value = "/mostrar")
    public List<Modelo> mostrar() {
        return modeloService.findAll();
    }

        @CrossOrigin(origins = { "http://localhost:4200" }, maxAge = 3600)
    @GetMapping(value = "/mostrarHabilitados")
    public List<Modelo> mostrarHabilitados() {
        return modeloService.findHabiliitados();
    }

    @CrossOrigin(origins = { "http://localhost:4200" }, maxAge = 3600)
    @PostMapping(value = "/editar/{id}")
    public ResponseEntity actualizar(@PathVariable int id, @RequestBody Modelo model) {
        // Modelo modelo = modeloService.findById(id).orElse(null);
        try {
            modeloService.save(model);
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
            Optional<Modelo> optionalModelo = modeloService.findById(id);

            if (optionalModelo.isPresent()) {
                Modelo modelo = optionalModelo.get();
                modelo.setEstado(!modelo.getEstado());
                modeloService.save(modelo);

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
