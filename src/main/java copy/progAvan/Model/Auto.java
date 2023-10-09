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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @ManyToOne
    @JoinColumn(name = "modelo_id", referencedColumnName = "id")
    private Modelo modelo;
    @ManyToOne
    @JoinColumn(name = "cliente_id", referencedColumnName = "id")
    private Cliente cliente;
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
