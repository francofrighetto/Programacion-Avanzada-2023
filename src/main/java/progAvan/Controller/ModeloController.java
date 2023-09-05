package progAvan.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
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

import progAvan.Model.Modelo;
import progAvan.Service.ModeloService;

@RestController
@RequestMapping(path = "/modelo")
public class ModeloController {

    @Autowired
    private ModeloService modeloService;

    @Value("${path_general}")
    String path;

    @PostMapping(value = "/guardar")
    public String guardar(@RequestBody Modelo model) {
        modeloService.save(model);
        return "success";
    }

    @GetMapping(value = "/mostrar")
    public List<Modelo> mostrar() {
        return modeloService.findAll();
    }

    @PostMapping(value = "/editar/{id}")
    public String actualizar(@PathVariable int id, @RequestBody Modelo model) {
        Modelo modelo = modeloService.findById(id).orElse(null);
        modelo.setNombre("Fiat2");
        modeloService.save(modelo);

        return "success";
    }

    @PostMapping(value = "/eliminar/{id}")
    public String eliminar(@PathVariable int id) {
        Modelo modelo = modeloService.findById(id).orElse(null);
        modelo.setEstado(false);
        modeloService.save(modelo);
        return "success";
    }
}
