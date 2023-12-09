package progAvan.test;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import progAvan.Model.Auto;

import static org.junit.Assert.*;

// @RunWith(SpringRunner.class)
// @SpringBootTest
public class PatenteValidatorTest {
    @Autowired
    private Auto auto = new Auto();

    @Test
    public void testPatenteValida() {
        assertTrue(auto.validarPatente("AB123CD"));
        assertTrue(auto.validarPatente("XY987ZW"));
    }

    @Test
    public void testPatenteInvalida() {
        assertFalse(auto.validarPatente("123ABC")); // Números en lugar de letras
        assertFalse(auto.validarPatente("AB12CD")); // Longitud incorrecta
        assertFalse(auto.validarPatente("ABC-123")); // Caracteres especiales
    }
}
