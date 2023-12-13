package progAvan.Controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import progAvan.Model.Estadistica;
import progAvan.Model.Marca;
import progAvan.Service.EstadisticaService;

@RestController
@RequestMapping("/estadistica")
@RequiredArgsConstructor
@CrossOrigin(origins = { "http://localhost:4200" }, maxAge = 3600)
public class EstadisticaController {

    @Autowired
    private EstadisticaService estadisticaService;
    Map<String, String> response = new HashMap<>();

    @Value("${path_general}")
    String path;

    @CrossOrigin(origins = { "http://localhost:4200" }, maxAge = 3600)
    @GetMapping(value = "/comparacionMinutos/{fechaInferior}/{fechaSuperior}")
    public List<Object> comparacionMinutosServicios(@PathVariable String fechaInferior, @PathVariable String fechaSuperior) {
        // String whereInferior=" ";
        // String whereConsulta;

        // if (!fechaInferior.equals("no")){
        //     System.out.println("ajsjasjs");
        //     whereInferior= "  fecha_inicio>='"+fechaInferior+"' ";
        // }
        // String whereSuperior=" ";
        // if (!fechaSuperior.equals("no")){
        //     whereSuperior= "  fecha_inicio<='"+fechaSuperior+"' ";
        // }
        // whereConsulta= whereInferior + whereSuperior;
        // if (whereInferior.equals(" ") && whereSuperior.equals(" ")){
        //     whereConsulta = " ";
        // }else{
        //      whereConsulta = " where "+whereConsulta;

        // }
        // System.out.println(whereConsulta);
        //         System.out.println(estadisticaService.comparacionMinutosServicios(whereConsulta));

        return estadisticaService.comparacionMinutosServicios(fechaInferior,fechaSuperior);
    }
    
    @CrossOrigin(origins = { "http://localhost:4200" }, maxAge = 3600)
    @GetMapping(value = "/estadisticaOrden")
    public List<Object> estadisticaOrden() {
        return estadisticaService.estadisticaOrden();
    }

    @CrossOrigin(origins = { "http://localhost:4200" }, maxAge = 3600)
    @GetMapping(value = "/cantidadServiciosDetalle")
    public List<Object> cantidadServiciosEnDetalleOrden() {
        return estadisticaService.cantidadServiciosEnDetalleOrden();
    }
}
