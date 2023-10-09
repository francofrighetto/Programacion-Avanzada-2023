package progAvan.Model;

import java.util.Date;
import java.util.List;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "ordenTrabajo")
public class OrdenTrabajo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(unique = true)
    private String descripcion;
    private Date fechaInicio;
    private Date fechaFin;
    public Integer total;
    @ManyToOne
    @JoinColumn(name = "tecnico_id", referencedColumnName = "id")
    private Tecnico tecnico;
    @ManyToOne
    @JoinColumn(name = "vehiculo_id", referencedColumnName = "id")
    private Auto auto;
    private boolean estado;

    public boolean getEstado() {
        return estado;
    }

    public void setEstado(boolean estado) {
        this.estado = estado;
    }
}
