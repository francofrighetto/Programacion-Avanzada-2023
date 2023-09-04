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

import progAvan.Model.Auto;
import progAvan.Service.AutoService;

@RestController
@RequestMapping(path = "/auto")
public class AutoController {

    @Autowired
    AutoService autoService;

    @GetMapping(value = "/mostrar")
    public List<Auto> mostrar() {
        return autoService.findAll();
    }

    @GetMapping(value = "/mostrar")
    public Object mostrarPorId(@PathVariable long id) {
        return autoService.findById(id);
    }

}