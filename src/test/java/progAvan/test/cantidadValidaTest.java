
package progAvan.test;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import progAvan.Model.Auto;
import progAvan.Model.DetalleOrdenTrabajo;

import static org.junit.Assert.*;

// @RunWith(SpringRunner.class)
// @SpringBootTest
public class cantidadValidaTest {
    @Autowired
    private DetalleOrdenTrabajo detalle = new DetalleOrdenTrabajo();

    @Test
    public void testCantidadValida() {
        assertTrue(detalle.cantidadValida(0));
        assertTrue(detalle.cantidadValida(2));
    }

    @Test
    public void testCantidadInvalida() {
        assertFalse(detalle.cantidadValida(-1));
        assertFalse(detalle.cantidadValida(-100));
    }
}
