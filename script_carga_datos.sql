-- Insertar datos en la tabla Tecnico
INSERT INTO tecnico (dni, nombre, estado) VALUES 
(12345, 'Juan Perez', true),
(54321, 'María Gonzalez', true),
(67890, 'Carlos Gutierrez', true);

-- Insertar datos en la tabla Cliente
INSERT INTO cliente (dni, nombre, direccion, telefono, email, estado, fecha_ultima_actualizacion, observaciones) VALUES 
(43606060, 'Juan Perez', 'Calle 123, Ciudad', '1234567890', 'juan@example.com', true, '2023-01-01 10:00:00', 'Sin observaciones'),
(43606070, 'María Rodriguez', 'Av. Principal, etc.', '9876543210', 'maria@example.com', true, '2023-01-02 15:30:00', 'Cliente preferencial'),
(43606080, 'Carlos Gutierrez', 'Otra dirección', '5555555555', 'carlos@example.com', true, '2023-01-03 10:00:00', 'Sin observaciones');

-- Insertar datos en la tabla Marca
INSERT INTO marca (nombre, estado) VALUES 
('Toyota', true),
('Ford', true),
('Chevrolet', true);

-- Insertar datos en la tabla Modelo
INSERT INTO modelo (nombre, marca_id, estado) VALUES 
('Corolla', 1, true),
('Fiesta', 2, true),
('Cruze', 3, true);

-- Insertar datos en la tabla Auto
INSERT INTO auto (modelo_id, cliente_id, patente, anio, estado) VALUES 
(1, 1, 'ABC123', '2020', true),
(2, 2, 'XYZ987', '2018', true),
(3, 3, 'DEF456', '2022', true);

-- Insertar datos en la tabla Pais
INSERT INTO pais (nombre, estado) VALUES 
('Argentina', 1),
('Estados Unidos', 1),
('España', 1);

-- Insertar datos en la tabla Servicio
INSERT INTO servicio (nombre, precio, estado, minutosestimados) VALUES 
('Limpieza', 50.0, true, null),
('Reparación', 100.0, true, null),
('Instalación', 80.0, true, null);

-- Insertar datos en la tabla OrdenTrabajo
INSERT INTO orden_trabajo (descripcion, fechaInicio, fechaFin, total, tecnico_id, vehiculo_id, estado_id, habilitado) VALUES 
('Reparación de motor', '2023-12-01', '2023-12-05', 500.0, 1, 1, 1, true),
('Instalación de sistema de sonido', '2023-12-10', '2023-12-12', 300.0, 2, 2, 2, true);

-- Insertar datos en la tabla DetalleOrdenTrabajo
INSERT INTO detalle_orden_trabajo (descripcion, cantidad, servicio_id, subtotal, estado, minutosRealizados, orden_id) VALUES 
('Cambio de aceite', 1, 1, 100.0, true, 45, 1),
('Instalación de parlantes', 2, 3, 150.0, true, 60, 2);

-- Insertar datos en la tabla Estado
INSERT INTO estado (descripcion, nombre) VALUES 
('Creacion de orden de trabajo', 'iniciado'),
('El cliente cancela la orden', 'cancelado'),
('Se termina el trabajo de la orden', 'terminado');