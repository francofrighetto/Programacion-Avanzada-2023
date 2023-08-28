package progAvan.Modelos;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "marca")
public class Marca {
    @Id
    @GeneratedValue(strategy = javax.persistence.GenerationType.AUTO)
    private long marca_id;
    private String nombre;

    public long getId() {
        return marca_id;
    }

    public void setId(Integer id) {
        this.marca_id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

}
