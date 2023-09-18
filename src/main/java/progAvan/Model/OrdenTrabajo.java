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
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "tipo_objeto_id_seq")
    // @GeneratedValue(strategy = GenerationType.IDENTITY)

    @SequenceGenerator(name = "tipo_objeto_id_seq", sequenceName = "tipo_objeto_id_seq", allocationSize = 1)
    private Integer id;
    @Column(unique = true)
    private String nombre;
    private Date fecha;
    public Integer total;
    @OneToMany
    @JoinColumn(name = "servicio_id", referencedColumnName = "id")
    private List<Servicio> servicios;
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
