package progAvan.Model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Data
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(unique = true)
    private int dni;
    private String nombre;
    private String direccion;
    @Column(unique = true)
    private String telefono;
    @Column(unique = true)
    private String email;
    @Column(columnDefinition = "boolean default true")
    private boolean estado;

    @OneToMany(mappedBy = "cliente",fetch = FetchType.EAGER)
    @JsonIgnore 
    private List<Auto> autos;

    public boolean getEstado() {
        return estado;
    }

    public void setEstado(boolean estado) {
        this.estado = estado;
    }

}