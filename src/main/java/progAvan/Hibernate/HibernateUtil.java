package progAvan.Hibernate;

import java.awt.HeadlessException;

import javax.swing.JOptionPane;
import org.hibernate.*;
import org.hibernate.cfg.*;

public class HibernateUtil {
    public static SessionFactory sessionFactory;
    public static Session session;

    public static void inicializar() {
        try {
            Configuration conf = new Configuration();
            try {
                conf.setProperty("hibernate.connection.driver_class", "org.postgresql.Driver");
                conf.setProperty("hibernate.dialect", "org.hibernate.dialect.PostgreSQLDialect");
                // nombre db
                conf.setProperty("hibernate.connection.url", "jdbc:postgresql://localhost:5432/taller");
            } catch (Exception e) {
                JOptionPane.showMessageDialog(null, "Error de Base de Datos Nº 2001");
            }

            // Datos conexion db
            conf.setProperty("hibernate.connection.username", "postgres");
            conf.setProperty("hibernate.connection.password", "postgres");

            conf.setProperty("hibernate.connection.pool_size", "10");
            conf.setProperty("hibernate.hbm2ddl.auto", "update");

            conf.addPackage("progAvan.Modelos");
            conf.addAnnotatedClass(progAvan.Model.Auto.class);
            conf.addAnnotatedClass(progAvan.Model.Marca.class);
            conf.addAnnotatedClass(progAvan.Model.Modelo.class);

            try {
                sessionFactory = conf.buildSessionFactory();
                session = sessionFactory.openSession();
            } catch (HibernateException e) {
                JOptionPane.showMessageDialog(null, e);
            }
        } catch (HeadlessException ex) {
            throw new ExceptionInInitializerError(ex);
        } catch (MappingException ex) {
            throw new ExceptionInInitializerError(ex);
        }
    }

    public static Session getSession() {
        try {
            return sessionFactory.openSession();
        } catch (Throwable ex) {
            System.err.println(
                    "Failed to create sessionFactory object."
                            + ex);
            throw new ExceptionInInitializerError(ex);
        }

    }
}
