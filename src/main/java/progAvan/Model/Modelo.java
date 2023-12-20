package progAvan.Model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "modelo")
public class Modelo {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Integer id;

    @Column(unique = true)
    private String nombre;

    @ManyToOne
    @JoinColumn(name = "marca_id", referencedColumnName = "id")
    private Marca marca;

    private boolean estado;

    public boolean getEstado() {
        return estado;
    }

    public void setEstado(boolean estado) {
        this.estado = estado;
    }
}
