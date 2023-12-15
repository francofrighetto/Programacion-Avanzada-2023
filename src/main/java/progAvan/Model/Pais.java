package progAvan.Model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "pais")
public class Pais implements Comparable {

    @Id
    @GeneratedValue(strategy = javax.persistence.GenerationType.AUTO)
    private long id;

    @Column(columnDefinition = "TEXT")
    private String nombre;
    
    private int estado;

    public int getEstado() {
        return estado;
    }

    public void setEstado(int estado) {
        this.estado = estado;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public void eliminar() {
        this.setEstado(1);
    }

    @Override
    public String toString() {
        return id + "";
    }

    @Override
    public int compareTo(Object o) {
        Pais p = (Pais) o;
        return this.getNombre().compareTo(p.getNombre());
    }
}
