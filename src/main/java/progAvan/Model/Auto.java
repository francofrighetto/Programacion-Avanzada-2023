package progAvan.Model;

import java.util.Date;
import jakarta.persistence.*;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "auto")
@Getter
@Setter
public class Auto {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "tipo_objeto_id_seq")
    @SequenceGenerator(name = "tipo_objeto_id_seq", sequenceName = "tipo_objeto_id_seq", allocationSize = 1)
    private Integer auto_id;

    @ManyToOne
    @JoinColumn(name = "modelo_id", referencedColumnName = "id")
    private Modelo modelo;
    @Column(unique = true)
    @jakarta.validation.constraints.Pattern(regexp = "[A-Z]{2}\\d{3}[A-Z]{2}", message = "El formato de la patente no es válido")
    private String patente;
    private String anio;
    private boolean estado;

    public boolean getEstado() {
        return estado;
    }

    public void setEstado(boolean estado) {
        this.estado = estado;
    }

}
