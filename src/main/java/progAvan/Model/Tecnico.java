package progAvan.Model;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Data
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public class Tecnico {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "tipo_objeto_id_seq")
    // @GeneratedValue(strategy = GenerationType.IDENTITY)
    @SequenceGenerator(name = "tipo_objeto_id_seq", sequenceName = "tipo_objeto_id_seq", allocationSize = 1)
    private Integer id;
    @Column(unique = true)
    private int dni;
    private String nombre;
    @Column(columnDefinition = "boolean default true")
    private boolean estado;

    public boolean getEstado() {
        return estado;
    }

    public void setEstado(boolean estado) {
        this.estado = estado;
    }

}