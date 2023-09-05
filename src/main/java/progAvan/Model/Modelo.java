package progAvan.Model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "modelo")
public class Modelo {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "tipo_objeto_id_seq")
    @SequenceGenerator(name = "tipo_objeto_id_seq", sequenceName = "tipo_objeto_id_seq", allocationSize = 1)
    private Integer modelo_id;
    private String nombre;
    @OneToOne(targetEntity = Marca.class, cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "marca_id", referencedColumnName = "id")
    private Marca marca;
    @Column(columnDefinition = "boolean default true")
    private boolean estado;

    public int getId() {
        return modelo_id;
    }

    public void setId(int id) {
        this.modelo_id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Marca getIdMarca() {
        return marca;
    }

    public void setIdMarca(Marca idMarca) {
        this.marca = idMarca;
    }

}
