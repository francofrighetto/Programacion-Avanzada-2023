package progAvan.Model;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.annotation.Nullable;
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
    private String descripcion;
    private Date fechaInicio;
    private Date fechaFin;
    public float total;
    @ManyToOne
    @JoinColumn(name = "tecnico_id", referencedColumnName = "id")
    private Tecnico tecnico;
    @ManyToOne
    @JoinColumn(name = "vehiculo_id", referencedColumnName = "id")
    private Auto auto;
    @ManyToOne
    @JoinColumn(name = "estado_id", referencedColumnName = "id")
    private Estado estado;
    @Nullable()
    private boolean habilitado;


    @OneToMany(mappedBy = "orden", cascade = { CascadeType.PERSIST, CascadeType.MERGE }, orphanRemoval = true)
    @JsonIgnoreProperties("orden")
    private List<DetalleOrdenTrabajo> detalle = new ArrayList<>();

    public Estado getEstado() {
        return estado;
    }

    public void setEstado(Estado estado) {
        this.estado = estado;
    }

    public boolean validarRangoFechas() {
        return fechaInicio != null && fechaFin != null && fechaFin.after(fechaInicio);
    }

    public boolean getHabilitado(){
        return this.habilitado;
    }
}
