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

import progAvan.Model.Auto;
import progAvan.Model.Marca;
import progAvan.Model.OrdenTrabajo;
import progAvan.Service.OrdenTrabajoService;

@RestController
@RequestMapping(path = "/ordenTrabajo")
public class OrdenTrabajoController {

    @Autowired
    private OrdenTrabajoService ordenTrabajoService;

    Map<String, String> response = new HashMap<>();

    @CrossOrigin(origins = { "http://localhost:4200" }, maxAge = 3600)
    @PostMapping(value = "/guardar")
    public ResponseEntity guardar(@RequestBody OrdenTrabajo model) {
        try {
            ordenTrabajoService.save(model);
            this.response.put("message", "success");
            return new ResponseEntity<>(this.response, HttpStatus.OK);
        } catch (Exception e) {
            this.response.put("message", "error interno");
            return new ResponseEntity<>(this.response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @CrossOrigin(origins = { "http://localhost:4200" }, maxAge = 3600)
    @GetMapping(value = "/mostrarpaginado")
    public List<OrdenTrabajo> mostrarPaginado(@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ordenTrabajoService.findPaginado(page, size);
    }

    @CrossOrigin(origins = { "http://localhost:4200" }, maxAge = 3600)
    @GetMapping(value = "/longitud")
    public long longitud() {
        return ordenTrabajoService.longitud();
    }

    @CrossOrigin(origins = { "http://localhost:4200" }, maxAge = 3600)
    @GetMapping(value = "/mostrarHabilitados")
    public List<OrdenTrabajo> mostrarHabilitados() {
        return ordenTrabajoService.findHabiliitados();
    }

    @CrossOrigin(origins = { "http://localhost:4200" }, maxAge = 3600)
    @PostMapping(value = "/editar/{id}")
    public ResponseEntity actualizar(@PathVariable int id, @RequestBody OrdenTrabajo model) {
        // OrdenTrabajo ordenTrabajo = ordenTrabajoService.findById(id).orElse(null);
        try {
            ordenTrabajoService.save(model);
            this.response.put("message", "success");
            return new ResponseEntity<>(this.response, HttpStatus.OK);
        } catch (Exception e) {
            this.response.put("message", "error interno");
            return new ResponseEntity<>(this.response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @CrossOrigin(origins = { "http://localhost:4200" }, maxAge = 3600)
    @GetMapping(value = "/mostrar/ultima/{idCliente}")
    public List<Object> ultimaOrdenCliente(@PathVariable int  idCliente) {
        return ordenTrabajoService.ultimaOrdenCliente(idCliente);
    }
}
