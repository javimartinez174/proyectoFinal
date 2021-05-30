-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 30-05-2021 a las 19:25:14
-- Versión del servidor: 10.4.14-MariaDB
-- Versión de PHP: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `watchfilm`
--
CREATE DATABASE IF NOT EXISTS `watchfilm` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `watchfilm`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `actor`
--

DROP TABLE IF EXISTS `actor`;
CREATE TABLE `actor` (
  `id` int(11) NOT NULL,
  `nombre` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `actor`
--

INSERT INTO `actor` (`id`, `nombre`) VALUES
(12, 'Andy Sёrkis'),
(34, 'Anne Hathaway'),
(17, 'Ashton Kutcher'),
(15, 'Bernard Hill'),
(8, 'Billy Boyd'),
(40, 'Brad Pitt'),
(37, 'Casey Affleck'),
(13, 'Cate Blanchett'),
(41, 'Christoph Waltz'),
(28, 'Connie Nielsen'),
(39, 'Daniel Brühl'),
(30, 'Derek Jacobi'),
(45, 'Diane Kruger'),
(31, 'Djimon Hounsou'),
(7, 'Dominic Monaghan'),
(23, 'Ed Harris'),
(44, 'Eli Roth'),
(1, 'Elijah Wood'),
(16, 'Hugo Weaving'),
(14, 'Ian Holm'),
(3, 'Ian McKellen'),
(20, 'Jennifer Garner'),
(35, 'Jessica Chastain'),
(21, 'Jim Carrey'),
(27, 'Joaquin Phoenix'),
(11, 'John Rhys-Davies'),
(19, 'Kristy Swanson'),
(22, 'Laura Linney'),
(5, 'Liv Tyler'),
(36, 'Mackenzie Foy'),
(32, 'Matt Damon'),
(33, 'Matthew McConaughey'),
(42, 'Mélanie Laurent'),
(38, 'Michael Caine'),
(43, 'Michael Fassbender'),
(10, 'Miranda Otto'),
(25, 'Natascha McElhone'),
(24, 'Noah Emmerich'),
(29, 'Oliver Reed'),
(2, 'Orlando Bloom'),
(26, 'Russell Crowe'),
(6, 'Sean Astin'),
(9, 'Sean Bean'),
(18, 'Seann William Scott'),
(4, 'Viggo Mortensen');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `actorespeliculas`
--

DROP TABLE IF EXISTS `actorespeliculas`;
CREATE TABLE `actorespeliculas` (
  `peliculaId` int(11) NOT NULL,
  `actorId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `actorespeliculas`
--

INSERT INTO `actorespeliculas` (`peliculaId`, `actorId`) VALUES
(1, 17),
(1, 18),
(1, 19),
(1, 20),
(5, 21),
(5, 22),
(5, 23),
(5, 24),
(5, 25),
(6, 26),
(6, 27),
(6, 28),
(6, 29),
(6, 30),
(6, 31),
(7, 39),
(7, 40),
(7, 41),
(7, 42),
(7, 43),
(7, 44),
(7, 45),
(9, 1),
(9, 2),
(9, 3),
(9, 4),
(9, 5),
(9, 6),
(9, 7),
(9, 8),
(9, 9),
(9, 10),
(9, 11),
(9, 12),
(9, 13),
(9, 14),
(9, 15),
(9, 16),
(10, 1),
(10, 2),
(10, 3),
(10, 4),
(10, 5),
(10, 6),
(10, 7),
(10, 8),
(10, 9),
(10, 10),
(10, 11),
(10, 12),
(10, 13),
(10, 14),
(10, 15),
(10, 16),
(11, 1),
(11, 2),
(11, 3),
(11, 4),
(11, 5),
(11, 6),
(11, 7),
(11, 8),
(11, 9),
(11, 10),
(11, 11),
(11, 12),
(11, 13),
(11, 14),
(11, 15),
(11, 16),
(17, 32),
(17, 33),
(17, 34),
(17, 35),
(17, 36),
(17, 37),
(17, 38);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `director`
--

DROP TABLE IF EXISTS `director`;
CREATE TABLE `director` (
  `id` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `director`
--

INSERT INTO `director` (`id`, `nombre`) VALUES
(6, 'Andrés Muschietti'),
(3, 'Christopher Nolan'),
(10, 'Danny Leiner'),
(17, 'David Fincher'),
(12, 'Federico Álvarez'),
(15, 'Guy Ritchie'),
(1, 'James Cameron'),
(11, 'James Wan'),
(4, 'Jon Favreau'),
(14, 'Jonathan Mostow'),
(9, 'Martin Scorsese'),
(2, 'Peter Jackson'),
(7, 'Peter Weir'),
(8, 'Quentin Tarantino'),
(5, 'Ridley Scott'),
(13, 'Steven Spielberg'),
(16, 'Tim Burton');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `directorespeliculas`
--

DROP TABLE IF EXISTS `directorespeliculas`;
CREATE TABLE `directorespeliculas` (
  `peliculaId` int(11) NOT NULL,
  `directorId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `directorespeliculas`
--

INSERT INTO `directorespeliculas` (`peliculaId`, `directorId`) VALUES
(1, 10),
(2, 12),
(3, 6),
(4, 1),
(5, 7),
(6, 5),
(7, 8),
(8, 13),
(9, 2),
(10, 2),
(11, 2),
(12, 4),
(13, 4),
(14, 1),
(15, 1),
(16, 14),
(17, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `genero`
--

DROP TABLE IF EXISTS `genero`;
CREATE TABLE `genero` (
  `id` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `genero`
--

INSERT INTO `genero` (`id`, `nombre`) VALUES
(4, 'Acción'),
(11, 'Animación'),
(5, 'Aventuras'),
(12, 'Bélico'),
(13, 'Biográfico'),
(14, 'Catástrofe'),
(7, 'Ciencia Ficción'),
(1, 'Comedia'),
(21, 'Comedia Negra'),
(19, 'Documental'),
(3, 'Drama'),
(20, 'Épico'),
(18, 'Erótico'),
(8, 'Fantasía'),
(15, 'Histórico'),
(10, 'Musical'),
(16, 'Policíaco'),
(9, 'Romance'),
(6, 'Suspense'),
(2, 'Terror'),
(17, 'Western');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `generospeliculas`
--

DROP TABLE IF EXISTS `generospeliculas`;
CREATE TABLE `generospeliculas` (
  `peliculaId` int(11) NOT NULL,
  `generoId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `generospeliculas`
--

INSERT INTO `generospeliculas` (`peliculaId`, `generoId`) VALUES
(1, 1),
(1, 7),
(2, 2),
(2, 6),
(5, 1),
(5, 3),
(5, 7),
(5, 8),
(6, 3),
(6, 4),
(6, 5),
(6, 20),
(7, 1),
(7, 3),
(7, 4),
(7, 5),
(7, 12),
(7, 21),
(8, 1),
(8, 2),
(8, 3),
(8, 5),
(8, 6),
(9, 5),
(9, 8),
(10, 5),
(10, 8),
(11, 5),
(11, 8),
(17, 3),
(17, 5),
(17, 7),
(17, 20);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lista`
--

DROP TABLE IF EXISTS `lista`;
CREATE TABLE `lista` (
  `id` int(11) NOT NULL,
  `nombre` varchar(40) COLLATE utf8_spanish_ci NOT NULL,
  `usuarioId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `lista`
--

INSERT INTO `lista` (`id`, `nombre`, `usuarioId`) VALUES
(1, 'Favoritos', 1),
(2, 'Favoritos', 2),
(3, 'Favoritos', 3),
(4, 'Pendientes', 1),
(5, 'Pendientes', 2),
(6, 'Pendientes', 3),
(8, 'Vistas', 2),
(9, 'Vistas', 3),
(11, 'Favoritos', 9),
(12, 'Para ver pronto', 9),
(16, 'Ver con Novia', 9),
(17, 'Ver en casa 2', 9);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `listaamigos`
--

DROP TABLE IF EXISTS `listaamigos`;
CREATE TABLE `listaamigos` (
  `usuarioId` int(11) NOT NULL,
  `amigoId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `listaamigos`
--

INSERT INTO `listaamigos` (`usuarioId`, `amigoId`) VALUES
(1, 9);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `listausuariopeliculas`
--

DROP TABLE IF EXISTS `listausuariopeliculas`;
CREATE TABLE `listausuariopeliculas` (
  `peliculaId` int(11) NOT NULL,
  `listaId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `listausuariopeliculas`
--

INSERT INTO `listausuariopeliculas` (`peliculaId`, `listaId`) VALUES
(1, 1),
(1, 2),
(1, 3),
(5, 1),
(11, 1),
(11, 16),
(11, 17),
(12, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pelicula`
--

DROP TABLE IF EXISTS `pelicula`;
CREATE TABLE `pelicula` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `anio` int(4) NOT NULL,
  `puntuacion` int(11) NOT NULL,
  `fechaEntrada` date NOT NULL,
  `sinopsis` text NOT NULL,
  `trailer` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `pelicula`
--

INSERT INTO `pelicula` (`id`, `nombre`, `anio`, `puntuacion`, `fechaEntrada`, `sinopsis`, `trailer`) VALUES
(1, 'Colega dónde está mi coche', 2000, 2, '2021-05-25', '', ''),
(2, 'No respires', 2016, 3, '2021-05-25', '', ''),
(3, 'It', 2017, 3, '2021-05-25', '', ''),
(4, 'Titanic', 1997, 4, '2021-05-25', 'Durante las labores de recuperación de los restos del famoso Titanic, una anciana norteamericana se pone en contacto con la expedición para acudir a una plataforma flotante instalada en el Mar del Norte y asistir \'in situ\' a la recuperación de sus recuerdos. A través de su memoria reviviremos los acontecimientos que marcaron el siniestro más famoso del siglo XX: el hundimiento del trasatlántico más lujoso del mundo, la máquina más sofisticada de su tiempo, considerada «insumergible», que sucumbió a las heladas aguas del Atlántico en abril de 1912, llevándose consigo la vida de mil quinientas personas, más de la mitad del pasaje. En los recueros de la anciana hay cabida para algo más que la tragedia, la historia de amor que vivió con un joven pasajero de tercera clase, un pintor aficionado que había ganado su pasaje en una partida las cartas en una taberna de Southampton.', '<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/FiRVcExwBVA\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>'),
(5, 'El Show de Truman', 1998, 4, '2021-05-25', '', ''),
(6, 'Gladiator', 2000, 5, '2021-05-25', 'En el año 180, el Imperio Romano domina todo el mundo conocido. Tras una gran victoria sobre los bárbaros del norte, el anciano emperador Marco Aurelio decide transferir el poder a Máximo, bravo general de sus ejércitos y hombre de inquebrantable lealtad al imperio. Pero su hijo Cómodo, que aspiraba al trono, no lo acepta y trata de asesinar a Máximo.', '<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/WHh06MLv6-I\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>'),
(7, 'Malditos Bastardos', 2009, 5, '2021-05-25', '', ''),
(8, 'Tiburón', 1975, 3, '2021-05-25', '', ''),
(9, 'El señor de los anillos La comunidad del anillo', 2001, 4, '2021-05-25', '', ''),
(10, 'El señor de los anillos Las dos torres', 2002, 5, '2021-05-25', '', ''),
(11, 'El señor de los anillos el retorno del rey', 2003, 5, '2021-05-25', '', ''),
(12, 'Iron Man', 2008, 3, '2021-05-25', '', ''),
(13, 'Iron Man 2', 2010, 2, '2021-05-25', '', ''),
(14, 'Terminator', 1984, 4, '2021-05-25', '', ''),
(15, 'Terminator 2 El juicio final', 1991, 4, '2021-05-25', '', ''),
(16, 'Terminator 3 La rebelión de las máquinas', 2003, 2, '2021-05-26', '', ''),
(17, 'Interstellar', 2014, 5, '2021-05-26', '', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `plataforma`
--

DROP TABLE IF EXISTS `plataforma`;
CREATE TABLE `plataforma` (
  `id` int(11) NOT NULL,
  `nombre` varchar(45) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `plataforma`
--

INSERT INTO `plataforma` (`id`, `nombre`) VALUES
(3, 'Amazon Prime'),
(2, 'HBO'),
(1, 'Netflix');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `plataformaspeliculas`
--

DROP TABLE IF EXISTS `plataformaspeliculas`;
CREATE TABLE `plataformaspeliculas` (
  `peliculaId` int(11) NOT NULL,
  `plataformaId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `plataformaspeliculas`
--

INSERT INTO `plataformaspeliculas` (`peliculaId`, `plataformaId`) VALUES
(5, 1),
(11, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

DROP TABLE IF EXISTS `usuario`;
CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `identificador` varchar(40) COLLATE utf8_spanish_ci NOT NULL,
  `nombre` varchar(40) COLLATE utf8_spanish_ci NOT NULL,
  `apellidos` varchar(40) COLLATE utf8_spanish_ci NOT NULL,
  `email` varchar(40) COLLATE utf8_spanish_ci NOT NULL,
  `contrasenna` varchar(80) COLLATE utf8_spanish_ci NOT NULL,
  `fotoPerfil` varchar(50) COLLATE utf8_spanish_ci DEFAULT 'usuario.png',
  `codigoCookie` varchar(50) COLLATE utf8_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `identificador`, `nombre`, `apellidos`, `email`, `contrasenna`, `fotoPerfil`, `codigoCookie`) VALUES
(1, 'jlopez', 'Josép', 'Lópep', 'j@cp', 'j', 'estrellaRellena.png', '4MwZHqyrShcqEAJJKCaDfGMiNxfmFbYu'),
(2, 'mgarcia', 'María', 'García', 'm@c', 'm', 'usuario.png', NULL),
(3, 'fpi', 'Felipe', 'Pi', 'f@c', 'f', 'usuario.png', NULL),
(9, 'alainF', 'Alain', 'Fernandez', 'a@fernan', 'a', '60423426.jpg', 'JexlFxiYih2K6j9Kmfn0zzeApKywZarU');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `actor`
--
ALTER TABLE `actor`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `actorespeliculas`
--
ALTER TABLE `actorespeliculas`
  ADD UNIQUE KEY `peliculaId_2` (`peliculaId`,`actorId`),
  ADD KEY `peliculaId` (`peliculaId`,`actorId`),
  ADD KEY `actorId` (`actorId`);

--
-- Indices de la tabla `director`
--
ALTER TABLE `director`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `directorespeliculas`
--
ALTER TABLE `directorespeliculas`
  ADD UNIQUE KEY `peliculaId_2` (`peliculaId`,`directorId`),
  ADD KEY `peliculaId` (`peliculaId`) USING BTREE,
  ADD KEY `directorId` (`directorId`) USING BTREE;

--
-- Indices de la tabla `genero`
--
ALTER TABLE `genero`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `generospeliculas`
--
ALTER TABLE `generospeliculas`
  ADD UNIQUE KEY `peliculaId_2` (`peliculaId`,`generoId`),
  ADD KEY `peliculaId` (`peliculaId`,`generoId`),
  ADD KEY `generoId` (`generoId`);

--
-- Indices de la tabla `lista`
--
ALTER TABLE `lista`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuarioId` (`usuarioId`);

--
-- Indices de la tabla `listaamigos`
--
ALTER TABLE `listaamigos`
  ADD PRIMARY KEY (`usuarioId`,`amigoId`),
  ADD UNIQUE KEY `usuarioId_2` (`usuarioId`,`amigoId`),
  ADD KEY `usuarioId` (`usuarioId`,`amigoId`),
  ADD KEY `amigoId` (`amigoId`);

--
-- Indices de la tabla `listausuariopeliculas`
--
ALTER TABLE `listausuariopeliculas`
  ADD UNIQUE KEY `peliculaId_2` (`peliculaId`,`listaId`),
  ADD KEY `listaId` (`listaId`),
  ADD KEY `peliculaId` (`peliculaId`);

--
-- Indices de la tabla `pelicula`
--
ALTER TABLE `pelicula`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `plataforma`
--
ALTER TABLE `plataforma`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `plataformaspeliculas`
--
ALTER TABLE `plataformaspeliculas`
  ADD UNIQUE KEY `peliculaId_2` (`peliculaId`,`plataformaId`),
  ADD KEY `peliculaId` (`peliculaId`,`plataformaId`),
  ADD KEY `plataformaId` (`plataformaId`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`,`identificador`,`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `actor`
--
ALTER TABLE `actor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT de la tabla `director`
--
ALTER TABLE `director`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `genero`
--
ALTER TABLE `genero`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `lista`
--
ALTER TABLE `lista`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `pelicula`
--
ALTER TABLE `pelicula`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `plataforma`
--
ALTER TABLE `plataforma`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `actorespeliculas`
--
ALTER TABLE `actorespeliculas`
  ADD CONSTRAINT `actorespeliculas_ibfk_1` FOREIGN KEY (`peliculaId`) REFERENCES `pelicula` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `actorespeliculas_ibfk_2` FOREIGN KEY (`actorId`) REFERENCES `actor` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `directorespeliculas`
--
ALTER TABLE `directorespeliculas`
  ADD CONSTRAINT `directorespeliculas_ibfk_1` FOREIGN KEY (`peliculaId`) REFERENCES `pelicula` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `directorespeliculas_ibfk_2` FOREIGN KEY (`directorId`) REFERENCES `director` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `generospeliculas`
--
ALTER TABLE `generospeliculas`
  ADD CONSTRAINT `generospeliculas_ibfk_2` FOREIGN KEY (`peliculaId`) REFERENCES `pelicula` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `generospeliculas_ibfk_3` FOREIGN KEY (`generoId`) REFERENCES `genero` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `lista`
--
ALTER TABLE `lista`
  ADD CONSTRAINT `lista_ibfk_1` FOREIGN KEY (`usuarioId`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `listaamigos`
--
ALTER TABLE `listaamigos`
  ADD CONSTRAINT `listaamigos_ibfk_1` FOREIGN KEY (`usuarioId`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `listaamigos_ibfk_2` FOREIGN KEY (`amigoId`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `listausuariopeliculas`
--
ALTER TABLE `listausuariopeliculas`
  ADD CONSTRAINT `listausuariopeliculas_ibfk_1` FOREIGN KEY (`listaId`) REFERENCES `lista` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `listausuariopeliculas_ibfk_2` FOREIGN KEY (`peliculaId`) REFERENCES `pelicula` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `plataformaspeliculas`
--
ALTER TABLE `plataformaspeliculas`
  ADD CONSTRAINT `plataformaspeliculas_ibfk_1` FOREIGN KEY (`peliculaId`) REFERENCES `pelicula` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `plataformaspeliculas_ibfk_2` FOREIGN KEY (`plataformaId`) REFERENCES `plataforma` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
