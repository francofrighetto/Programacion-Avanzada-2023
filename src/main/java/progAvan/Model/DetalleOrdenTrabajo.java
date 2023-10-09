package progAvan.Model;

import java.util.Date;
import java.util.List;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "detalleOrdenTrabajo")
public class DetalleOrdenTrabajo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String descripcion;    
    public Integer cantidad;
    @ManyToOne
    @JoinColumn(name = "servicio_id", referencedColumnName = "id")
    private Servicio servicio;
    private double subtotal;
    private boolean estado;

    @ManyToOne
    @JoinColumn(name = "orden_id", referencedColumnName = "id")
    private OrdenTrabajo orden;

    public boolean getEstado() {
        return estado;
    }

    public void setEstado(boolean estado) {
        this.estado = estado;
    }
}
