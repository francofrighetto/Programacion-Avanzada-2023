import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class GeneradorPdfService {

  constructor() { }

  generarFactura(datos:any) {
    // Datos de ejemplo para la factura
    const factura = {
      numero: 'FAC-001',
      fecha: this.obtenerFechaActual(),
      cliente: {
        nombre: datos.cliente.nombre,
        direccion: datos.cliente.direccion,
        telefono: datos.cliente.telefono,
      },
      auto: {
        patente: datos.auto.patente,
        marca: datos.auto.modelo.marca.nombre,
        modelo: datos.auto.modelo.nombre,
        anio: datos.auto.anio,
      },
      servicios: datos.servicios,
    };
  
    // Definir el contenido del documento
    const content = [];
  
    // Información de la factura en forma de tabla
    const facturaInfo = [
      [
        { text: 'Número de Factura:', bold: true },
        { text: factura.numero },
        { text: 'Fecha:', bold: true },
        { text: factura.fecha },
      ],
      [
        { text: 'Cliente:', bold: true },
        { text: factura.cliente.nombre },
        { text: 'Teléfono:', bold: true },
        { text: factura.cliente.telefono },
      ],
      [
        { text: 'Dirección:', bold: true },
        { text: factura.cliente.direccion, colSpan: 3 },
      ],
      [
        { text: ' ', bold: true },
        { text: '', colSpan: 3, alignment: 'center' }, // Centrar el texto en esta celda
      ],
      [
        { text: 'Patente:', bold: true },
        { text: factura.auto.patente },
        { text: 'Año:', bold: true },
        { text: factura.auto.anio },
      ],
      [
        { text: 'Marca:', bold: true },
        { text: factura.auto.marca },
        { text: 'Modelo:', bold: true },
        { text: factura.auto.modelo },
      ],
    ];
    
    
  
    content.push(
      {
        text: 'Factura',
        style: 'header',
        margin: [0, 0, 0, 20] // Asegurar que el formato de margen sea correcto
      },
      {
        table: {
          widths: ['*', '*', '*', '*'], // Ancho de las columnas
          body: facturaInfo,
        },
        layout: 'noBorders',
      },
      '\n',
      {
        text: 'Detalle de orden',
        style: 'subheader',
        margin: [0, 0, 0, 10] // Asegurar que el formato de margen sea correcto
      },
      {
        table: {
          headerRows: 1,
          widths: ['auto', '*', 'auto'], // Ancho de las columnas
          body: [
            [
              { text: 'Nombre', bold: true },
              { text: 'Cantidad', bold: true },
              { text: 'Precio', bold: true },
            ],
            ...factura.servicios.map((servicio: any) => [
              servicio.servicio.nombre,
              servicio.cantidad,
              `$${servicio.servicio.precio * servicio.cantidad}`,
            ]),
          ],
        },
        layout: 'lightHorizontalLines', // Se agrega el estilo de línea horizontal
        margin: [0, 5, 0, 15], // Márgenes superior, derecho, inferior e izquierdo
      },
      '\n',
      {
        text: `Total: $${factura.servicios.reduce((total:any, servicio:any) => total + servicio.servicio.precio, 0)}`,
        style: 'subheader',
        margin: [0, 0, 0, 10] // Asegurar que el formato de margen sea correcto
      }
    );
  
    // Estilos del documento
    const styles = {
      header: {
        fontSize: 22,
        bold: true,
      },
      subheader: {
        fontSize: 14,
        bold: true,
      },
    };
  
    // Configuración del documento PDF
    const docDefinition = {
      content: content as any[], // Convertir a any[] para evitar problemas de tipo
      styles,
    };
  
    // Generar el PDF
    const pdfDoc = pdfMake.createPdf(docDefinition);
    pdfDoc.open();
  }
  

  obtenerFechaActual = () => {
    const fecha = new Date();
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Se suma 1 ya que los meses comienzan desde 0
    const año = fecha.getFullYear();
  
    const fechaFormateada = `${dia}/${mes}/${año}`;
    return fechaFormateada;
  };
}