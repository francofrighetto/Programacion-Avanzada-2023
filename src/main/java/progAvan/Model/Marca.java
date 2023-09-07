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
public class Marca {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "tipo_objeto_id_seq")
    // @GeneratedValue(strategy = GenerationType.IDENTITY)
    @SequenceGenerator(name = "tipo_objeto_id_seq", sequenceName = "tipo_objeto_id_seq", allocationSize = 1)
    private Integer id;
    private String nombre;
    @Column(columnDefinition = "boolean default true")
    private boolean estado;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public boolean getEstado() {
        return estado;
    }
}