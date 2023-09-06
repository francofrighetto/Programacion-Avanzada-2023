package progAvan.Controller;

import java.util.List;

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
import org.springframework.stereotype.Controller;

import progAvan.Model.Marca;
import progAvan.Service.MarcaService;

@RestController
@RequestMapping(path = "/marca")
public class MarcaController {

    @Autowired
    private MarcaService marcaService;

    @Value("${path_general}")
    String path;

    @CrossOrigin(origins = { "http://localhost:4200" }, maxAge = 3600)
    @PostMapping(value = "/guardar")
    public String guardar(@RequestBody Marca model) {
        marcaService.save(model);
        return "success";
    }

    @GetMapping(value = "/mostrar")
    public List<Marca> mostrar() {
        return marcaService.findAll();
    }

    @PostMapping(value = "/editar/{id}")
    public String actualizar(@PathVariable int id, @RequestBody Marca model) {
        Marca marca = marcaService.findById(id).orElse(null);
        marca.setNombre("Fiat2");
        marcaService.save(marca);

        return "success";
    }

    @PostMapping(value = "/eliminar/{id}")
    public String eliminar(@PathVariable int id) {
        Marca marca = marcaService.findById(id).orElse(null);
        marca.setEstado(false);
        marcaService.save(marca);
        return "success";
    }
}
