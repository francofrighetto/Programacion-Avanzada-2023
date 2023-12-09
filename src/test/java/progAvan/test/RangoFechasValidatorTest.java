package progAvan.test;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import progAvan.Model.OrdenTrabajo;

import java.util.Calendar;
import java.util.Date;

import static org.junit.Assert.*;

public class RangoFechasValidatorTest {

    @Autowired
    private OrdenTrabajo validator;

    @Test
    public void testRangoFechasValido() {
        validator = new OrdenTrabajo();
        validator.setFechaInicio(fecha(2023, 1, 1)); // Fecha de inicio: 1 de enero de 2023
        validator.setFechaFin(fecha(2023, 2, 1)); // Fecha de fin: 1 de febrero de 2023
        assertTrue(validator.validarRangoFechas());
    }

    @Test
    public void testRangoFechasInvalido() {
        validator = new OrdenTrabajo();
        validator.setFechaInicio(fecha(2023, 3, 1)); // Fecha de inicio: 1 de marzo de 2023
        validator.setFechaFin(fecha(2023, 2, 1)); // Fecha de fin: 1 de febrero de 2023
        assertFalse(validator.validarRangoFechas());
    }

    public Date fecha(int year, int month, int day) {
        Calendar calendar = Calendar.getInstance();
        calendar.set(year, month - 1, day); // Note: Month is 0-based in Calendar
        return calendar.getTime();
    }
}
