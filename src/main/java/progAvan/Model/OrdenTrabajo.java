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
    private String nombre;
    private Date fecha;
    public Integer total;
    @OneToOne
    @JoinColumn(name = "tecnico_id", referencedColumnName = "id")
    private Tecnico tecnico;
    @OneToOne
    @JoinColumn(name = "vehiculo_id", referencedColumnName = "id")
    private Auto vehiculo;
    private boolean estado;

    public boolean getEstado() {
        return estado;
    }

    public void setEstado(boolean estado) {
        this.estado = estado;
    }
}