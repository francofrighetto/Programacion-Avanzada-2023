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
import progAvan.Model.Cliente;
import progAvan.Model.DetalleOrdenTrabajo;
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

            int id = ordenTrabajoService.getLastId().getId();
            List<DetalleOrdenTrabajo> detalles = model.getDetalle();
            model.setId(id);
            for (DetalleOrdenTrabajo detalle : detalles) {
                // detalle.setOrden(orden);
                detalle.setOrden(model);
                ordenTrabajoService.setOrdenId(id, detalle.getId());
            }

            this.response.put("message", "success");
            return new ResponseEntity<>(this.response, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e);
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
    @GetMapping(value = "/mostrar")
    public List<OrdenTrabajo> mostrar() {
        return ordenTrabajoService.findAll();
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
            for (DetalleOrdenTrabajo detalle : model.getDetalle()) {
                // detalle.setOrden(orden);
                detalle.setOrden(model);
                System.out.println(detalle.toString());
                if (detalle.getId() != null) {

                    ordenTrabajoService.setOrdenId(id, detalle.getId());
                }
            }
            this.response.put("message", "success");
            return new ResponseEntity<>(this.response, HttpStatus.OK);
        } catch (Exception e) {
            this.response.put("message", e.toString());
            return new ResponseEntity<>(this.response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @CrossOrigin(origins = { "http://localhost:4200" }, maxAge = 3600)
    @GetMapping(value = "/mostrar/ultima/{idCliente}")
    public List<Object> ultimaOrdenCliente(@PathVariable int idCliente) {
        return ordenTrabajoService.ultimaOrdenCliente(idCliente);
    }

    @CrossOrigin(origins = { "http://localhost:4200" }, maxAge = 3600)
    @PostMapping(value = "/eliminar/{id}")
    public ResponseEntity eliminar(@PathVariable int id) {
        try {
            Optional<OrdenTrabajo> optionalOrden = ordenTrabajoService.findById(id);

            if (optionalOrden.isPresent()) {
                OrdenTrabajo orden = optionalOrden.get();
                orden.setEstado(!orden.getEstado());
                ordenTrabajoService.save(orden);

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
