package progAvan;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import progAvan.Hibernate.HibernateUtil;

@SpringBootApplication
public class AutosApplication {

	public static void main(String[] args) {
		SpringApplication.run(AutosApplication.class, args);
		HibernateUtil.inicializar();
	}

}
