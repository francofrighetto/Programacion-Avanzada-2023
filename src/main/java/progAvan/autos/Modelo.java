package progAvan.autos;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table (name="modelo") 
public class Modelo {
	@Id @GeneratedValue(strategy=javax.persistence.GenerationType.AUTO)
    private long modelo_id;
    private String nombre;
    private String descripcion;
    private Integer puertas;
    @OneToOne (targetEntity = Marca.class, cascade= CascadeType.ALL,fetch=FetchType.LAZY)
    private Marca marca;
    
    public long getId() {
        return modelo_id;
    }

    public void setId(Integer id) {
        this.modelo_id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Integer getPuertas() {
        return puertas;
    }

    public void setPuertas(Integer puertas) {
        this.puertas = puertas;
    }

    public Marca getIdMarca() {
        return marca;
    }

    public void setIdMarca(Marca idMarca) {
        this.marca = idMarca;
    }
    
}
