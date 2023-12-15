package progAvan.Model;

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
    
    private int minutosRealizados;

    @ManyToOne
    @JoinColumn(name = "orden_id", referencedColumnName = "id")
    private OrdenTrabajo orden;

    public boolean getEstado() {
        return estado;
    }

    public void setEstado(boolean estado) {
        this.estado = estado;
    }

    public boolean cantidadValida(int cantidad) {
        if (cantidad < 0) {
            return false;
        }

        return true;
    }

    @Override
    public String toString() {
        return "DetalleOrdenTrabajo [id=" + id + ", cantidad=" + cantidad + ", servicio=" + servicio + ", subtotal="
                + subtotal + ", estado=" + estado + ", orden=" + orden + "]";
    }
}
