package progAvan.modelos;

import java.util.Date;

import javax.persistence.*;

@Entity
@Table(name = "auto")

public class Auto {
    @Id
    @GeneratedValue(strategy = javax.persistence.GenerationType.AUTO)
    private int auto_id;
    @OneToOne(targetEntity = Modelo.class, cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Modelo modelo;
    private String color;
    private String año;

    public int getCodigo() {
        return auto_id;
    }

    public void setCodigo(Integer codigo) {
        this.auto_id = codigo;
    }

    public Modelo getModelo() {
        return modelo;
    }

    public void setModelo(Modelo modelo) {
        this.modelo = modelo;
    }

    public void setModelo(Object modelo) {
        this.modelo = (Modelo) modelo;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getAño() {
        return año;
    }

    public void setAño(String date) {
        this.año = date;
    }

}
