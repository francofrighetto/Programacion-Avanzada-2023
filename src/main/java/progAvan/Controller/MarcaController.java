package progAvan.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;

import progAvan.Service.MarcaService;

public class MarcaController {

    @Autowired
    private MarcaService marcaService;

    @GetMapping("/createMarca")
    public String createMarca() {
        marcaService.createMarca();
        return "Marca table created";
    }
}
