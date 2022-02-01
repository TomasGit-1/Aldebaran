-- CREATE TABLE Usuarios(
-- 	idUsers int Primary Key, 
-- 	users varchar,
-- 	pass    varchar
-- );

-- CREATE TABLE Permisos(
-- 	idPermiso serial Primary Key, 
-- 	idUsersFK int references Usuarios(idUsers),
-- 	name_Permiso varchar
-- );

CREATE TABLE SERVICIOEDUCATIVO(
	idServiciosEdu serial primary key,
	Registro_Academico varchar,
	Tipo_Evento varchar,
	Programa_Academico varchar,
	Modalidad varchar,
	cuota varchar,
	Habilitado bool,
	numModulo varchar,
	numHoras varchar
);

CREATE TABLE Personas(
	idPersona  serial,
	Curp varchar Primary Key,
	email varchar, 
	Nombre varchar,
	AppPat varchar,
	AppMat varchar,
	Sexo varchar,
	FechaNacimiento Date,
	Edad int,
	TelPar varchar,
	TelCel varchar,
	Calle varchar,
	Colonia varchar,
	CodigoPostal varchar,
	Municipio varchar,
	numDomicilio varchar
);

CREATE TABLE FilesPersona(
	idFile  serial,
	idCurpFK varchar references Personas(Curp),
	FotografiaImg varchar,
	CurpPdf varchar,
	EvidenciaipnPdf varchar
);

CREATE TABLE ContactoEmergencia(
	idContacto serial Primary key,
	idCurpFK varchar references Personas(Curp),
	Nombre varchar,
	AppPat varchar,
	AppMat varchar,
	Telefono_contacto varchar,
	email varchar
);

CREATE TABLE FormacionAcademica(
	idFormacion serial primary key ,
	idCurpFK varchar references Personas(Curp),
	N_Max_Estudios varchar,
	S_Academica_Actual varchar,
	InstEducativa varchar,
	AnioEgreso varchar
);

CREATE TABLE DATOSLABORALES(
	idDatosLaborales serial primary key ,
	idCurpFK varchar references Personas(Curp),
	Nombre_Institucion varchar,
	Direccion varchar,
	Puesto varchar ,
	Telefono varchar
);

CREATE TABLE PAGOS(
	idPAgos serial primary key ,
	idServiciosEduFk int references SERVICIOEDUCATIVO(idServiciosEdu),
	idCurpFK varchar references Personas(Curp),
	comprobantePath  varchar,
	modalidad varchar(30),
	referencia varchar,
	FechaHoraTicket  timestamp,
	fechaHoraRegistro timestamp,
	FECHA_INICIO timestamp,
	FECHA_TERMINO timestamp
);



-- INSERT INTO  SERVICIOEDUCATIVO  (Nombre_Servicio , Habilitado) VALUES 
-- 								('Curso de Excel' , true),
-- 								('Curso de Computacion' , true),
-- 								('Curso de Ingles' , true),
-- 								('Curso de Word' , true),
-- 								('Curso de BD' , true);
-- select * from SERVICIOEDUCATIVO;
-- delete  from SERVICIOEDUCATIVO;

-- SELECT * FROM servicioeducativo;
-- INSERT INTO servicioeducativo (nombre_servicio , habilitado) VALUES('Curso programacion' , True);


-- UPDATE SERVICIOEDUCATIVO
-- SET nombre_servicio = 'CURSO MATEMATICAS'
-- WHERE idServiciosEdu = 23 ;

-- select * from SERVICIOEDUCATIVO;


-- INSERT INTO personas 
-- 		(curp , nombre , apppat , appmat, fotografia ,  sexo , fechanacimiento , edad , telpar , telcel , calle , colonia , codigopostal , municipio) 
-- 		VALUES (
-- 				'LOPT980219HOCPRM07'
-- 				, 'Tomas'
-- 				, 'Lopez'
-- 				, 'Perez'
-- 				, 'pathde la fotografia'
-- 				, 'hombre'
-- 				, TO_DATE('06/05/2015', 'DD/MM/YYYY') ,
-- 				23, 
-- 				'951233323',
-- 				'951232132',
-- 				'calle',
-- 				'colonia',
-- 				68263,
-- 				'municipio');
				
-- SELECT * FROM PERSONAS;