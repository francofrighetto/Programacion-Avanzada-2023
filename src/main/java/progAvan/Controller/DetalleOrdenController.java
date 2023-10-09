package progAvan.Controller;

import java.text.SimpleDateFormat;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import progAvan.Model.Cliente;
import progAvan.Model.DetalleOrdenTrabajo;
import progAvan.Model.OrdenTrabajo;
import progAvan.Service.DetalleOrdenService;

@RestController
@RequestMapping(path = "/detalleOrden")
public class DetalleOrdenController {
    @Autowired
    DetalleOrdenService detalleOrdenService;

    @CrossOrigin(origins = { "http://localhost:4200" }, maxAge = 3600)
    @GetMapping(value = "/mostrar/{idOrden}")
    public List<DetalleOrdenTrabajo> mostrar(@PathVariable int idOrden) {
        OrdenTrabajo orden = new OrdenTrabajo();
        orden.setId(idOrden);
        return detalleOrdenService.buscarPorOrden(orden);
    }


    
}
