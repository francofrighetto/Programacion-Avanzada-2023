package progAvan.Hibernate;

import java.awt.Component;
import java.util.*;
import javax.swing.JOptionPane;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

public class GestorHibernate extends HibernateUtil {

    private Transaction tx;

    public static void main(String[] args) {
        HibernateUtil.inicializar();
    }
    /**
     * Elimina un objeto del repositorio
     * 
     * @param objeto Objeto a eliminar
     */
    // public void eliminarObjeto(Object objeto) {
    // try {
    // Session s = HibernateUtil.getSession();
    // Transaction tx = s.beginTransaction();
    // s.delete(objeto);
    // tx.commit();
    // } catch (Exception ex) {
    // System.out.println("Repositorio.eliminarObjeto(Object objeto)" + ex);
    // ex.printStackTrace();
    // JOptionPane.showMessageDialog((Component) null, "El elemento no se puede
    // eliminar:" + ex.getMessage(),
    // "Error", 0);
    // getTx().rollback();
    // }
    // }

    // public void guardarObjeto(Object objeto) {
    // try {
    // Session s = HibernateUtil.getSession();
    // Transaction tx = s.beginTransaction();
    // s.save(objeto);
    // tx.commit();

    // System.out.println(" guardaractualizarObjeto() " + objeto.getClass() + ": " +
    // objeto.toString());
    // } catch (Exception ex) {
    // System.out.println("error " + ex);
    // System.out.println(
    // "Repositorio.guardarObjeto(Object objeto)" + objeto.getClass() + ": " +
    // objeto.toString() + ex);
    // ex.printStackTrace();
    // getTx().rollback();
    // }
    // }

    // /**
    // * Actualiza un objeto en el repositorio
    // *
    // * @param objeto Objeto a actualizar
    // */
    // public boolean actualizarObjeto(Object objeto) {
    // Session s = HibernateUtil.getSession();
    // Transaction tx = s.beginTransaction();
    // try {
    // s.update(objeto);
    // tx.commit();
    // System.out.println(" actualizarObjeto() " + objeto.getClass() + ": " +
    // objeto.toString());
    // return true;
    // } catch (HibernateException e) {
    // JOptionPane.showMessageDialog(null, e);
    // tx.rollback();
    // JOptionPane.showMessageDialog(null,
    // "No se pueden guardar los datos. \nLos mismos han sido modificados por otra
    // persona.");
    // // this.clearCache(); //puso juan

    // return false;
    // }
    // }

    // public Transaction getTx() {
    // return tx;
    // }

    // public void setTx(Transaction tx) {
    // this.tx = tx;
    // }

    // public List listarClase(Class clase, String atributoOrden, int estado) {
    // Criteria crit =
    // getSession().createCriteria(clase).addOrder(Order.asc(atributoOrden))
    // .add(Restrictions.eq("estado", estado));
    // return crit.list();
    // }

    // public List listarClase(Class clase) {

    // Criteria crit = getSession().createCriteria(clase);
    // CriteriaBuilder builder = getSession().getCriteriaBuilder();
    // System.out.println("Criteria lista: " + crit.list());
    // return crit.list();
    // }

    // // public Integer listarUltimo(Class clase) {
    // // Criteria crit = getSession().createCriteria(clase);
    // // crit.setProjection(Projections.max("codigo"));
    // // return Util.convertirToInteger(crit.uniqueResult());
    // // }

    // public List listarUltimo(Class clase) {
    // Criteria crit = getSession().createCriteria(clase)
    // .addOrder(Order.desc("codigo"));
    // return crit.list();

    // }

    // public List listarClaseCodigo(Class clase, int valor) {
    // Criteria crit = getSession().createCriteria(clase)
    // .add(Restrictions.eq("codigo", valor))
    // .add(Restrictions.eq("estado", 0));
    // return crit.list();
    // }

    // public Object listarClaseCodigoUnique(Class clase, int valor) {
    // Criteria crit = getSession().createCriteria(clase)
    // .add(Restrictions.eq("codigo", valor))
    // .add(Restrictions.eq("estado", 0));
    // return crit.uniqueResult();
    // }

}
