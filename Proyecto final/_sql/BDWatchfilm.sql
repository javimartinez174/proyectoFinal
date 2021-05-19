-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-05-2021 a las 17:11:39
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
CREATE TABLE IF NOT EXISTS `actor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(20) NOT NULL,
  `apellidos` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `actorespeliculas`
--

DROP TABLE IF EXISTS `actorespeliculas`;
CREATE TABLE IF NOT EXISTS `actorespeliculas` (
  `peliculaId` int(11) NOT NULL,
  `actorId` int(11) NOT NULL,
  KEY `peliculaId` (`peliculaId`,`actorId`),
  KEY `actorId` (`actorId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `director`
--

DROP TABLE IF EXISTS `director`;
CREATE TABLE IF NOT EXISTS `director` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `apellidos` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `director`
--

INSERT INTO `director` (`id`, `nombre`, `apellidos`) VALUES
(1, 'James', 'Cameron');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `directorespeliculas`
--

DROP TABLE IF EXISTS `directorespeliculas`;
CREATE TABLE IF NOT EXISTS `directorespeliculas` (
  `peliculaId` int(11) NOT NULL,
  `directorId` int(11) NOT NULL,
  KEY `peliculaId` (`peliculaId`) USING BTREE,
  KEY `directorId` (`directorId`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `directorespeliculas`
--

INSERT INTO `directorespeliculas` (`peliculaId`, `directorId`) VALUES
(4, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `genero`
--

DROP TABLE IF EXISTS `genero`;
CREATE TABLE IF NOT EXISTS `genero` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `genero`
--

INSERT INTO `genero` (`id`, `nombre`) VALUES
(1, 'Comedia'),
(2, 'Terror');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `generospeliculas`
--

DROP TABLE IF EXISTS `generospeliculas`;
CREATE TABLE IF NOT EXISTS `generospeliculas` (
  `peliculaId` int(11) NOT NULL,
  `generoId` int(11) NOT NULL,
  KEY `peliculaId` (`peliculaId`,`generoId`),
  KEY `generoId` (`generoId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `generospeliculas`
--

INSERT INTO `generospeliculas` (`peliculaId`, `generoId`) VALUES
(1, 1),
(2, 2),
(5, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lista`
--

DROP TABLE IF EXISTS `lista`;
CREATE TABLE IF NOT EXISTS `lista` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(40) COLLATE utf8_spanish_ci NOT NULL,
  `usuarioId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `usuarioId` (`usuarioId`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

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
CREATE TABLE IF NOT EXISTS `listaamigos` (
  `usuarioId` int(11) NOT NULL,
  `amigoId` int(11) NOT NULL,
  PRIMARY KEY (`usuarioId`,`amigoId`),
  KEY `usuarioId` (`usuarioId`,`amigoId`),
  KEY `amigoId` (`amigoId`)
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
CREATE TABLE IF NOT EXISTS `listausuariopeliculas` (
  `peliculaId` int(11) NOT NULL,
  `listaId` int(11) NOT NULL,
  KEY `listaId` (`listaId`),
  KEY `peliculaId` (`peliculaId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `listausuariopeliculas`
--

INSERT INTO `listausuariopeliculas` (`peliculaId`, `listaId`) VALUES
(1, 1),
(1, 2),
(1, 3),
(12, 1),
(11, 1),
(11, 16),
(11, 17),
(5, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pelicula`
--

DROP TABLE IF EXISTS `pelicula`;
CREATE TABLE IF NOT EXISTS `pelicula` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `anio` int(4) NOT NULL,
  `puntuacion` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `pelicula`
--

INSERT INTO `pelicula` (`id`, `nombre`, `anio`, `puntuacion`) VALUES
(1, 'Colega dónde está mi coche', 2000, 2),
(2, 'No respires', 2016, 3),
(3, 'It', 2017, 3),
(4, 'Titanic', 1997, 4),
(5, 'El Show de Truman', 1998, 4),
(6, 'Gladiator', 2000, 5),
(7, 'Malditos Bastardos', 2009, 5),
(8, 'Tiburón', 1975, 3),
(9, 'El señor de los anillos La comunidad del anillo', 2001, 4),
(10, 'El señor de los anillos Las dos torres', 2002, 5),
(11, 'El señor de los anillos el retorno del rey', 2003, 5),
(12, 'Iron Man', 2008, 3),
(13, 'Iron Man 2', 2010, 2),
(14, 'Terminator', 1984, 4),
(15, 'Terminator 2 El juicio final', 1991, 4),
(16, 'Terminator 3 La rebelión de las máquinas', 2003, 2),
(17, 'Interstellar', 2014, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `plataforma`
--

DROP TABLE IF EXISTS `plataforma`;
CREATE TABLE IF NOT EXISTS `plataforma` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `plataforma`
--

INSERT INTO `plataforma` (`id`, `nombre`) VALUES
(1, 'Netflix'),
(2, 'HBO'),
(3, 'Amazon Prime');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `plataformaspeliculas`
--

DROP TABLE IF EXISTS `plataformaspeliculas`;
CREATE TABLE IF NOT EXISTS `plataformaspeliculas` (
  `peliculaId` int(11) NOT NULL,
  `plataformaId` int(11) NOT NULL,
  KEY `peliculaId` (`peliculaId`,`plataformaId`),
  KEY `plataformaId` (`plataformaId`)
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
CREATE TABLE IF NOT EXISTS `usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `identificador` varchar(40) COLLATE utf8_spanish_ci NOT NULL,
  `nombre` varchar(40) COLLATE utf8_spanish_ci NOT NULL,
  `apellidos` varchar(40) COLLATE utf8_spanish_ci NOT NULL,
  `email` varchar(40) COLLATE utf8_spanish_ci NOT NULL,
  `contrasenna` varchar(80) COLLATE utf8_spanish_ci NOT NULL,
  `fotoPerfil` varchar(50) COLLATE utf8_spanish_ci DEFAULT 'usuario.png',
  `codigoCookie` varchar(50) COLLATE utf8_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `identificador`, `nombre`, `apellidos`, `email`, `contrasenna`, `fotoPerfil`, `codigoCookie`) VALUES
(1, 'jlopez', 'Josép', 'Lópep', 'j@cp', 'j', 'estrellaRellena.png', 'yzOZ460v4FnmHM2dKMSjHoLZv0CdU7rM'),
(2, 'mgarcia', 'María', 'García', 'm@c', 'm', 'usuario.png', NULL),
(3, 'fpi', 'Felipe', 'Pi', 'f@c', 'f', 'usuario.png', NULL),
(9, 'alainF', 'Alain', 'Fernandez', 'a@fernan', 'a', '60423426.jpg', 'UsadCI6uefGzR3ozNzPiD1ESqW6HUH5L');

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
