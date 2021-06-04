-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-06-2021 a las 20:25:35
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
-- Base de datos: `watchfilmbd`
--
CREATE DATABASE IF NOT EXISTS `watchfilmbd` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `watchfilmbd`;

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
(68, 'Bill Nighy'),
(8, 'Billy Boyd'),
(40, 'Brad Pitt'),
(49, 'Bryce Dallas Howard'),
(79, 'Cameron Diaz'),
(37, 'Casey Affleck'),
(13, 'Cate Blanchett'),
(70, 'Chow Yun-Fat'),
(48, 'Chris Pratt'),
(41, 'Christoph Waltz'),
(28, 'Connie Nielsen'),
(39, 'Daniel Brühl'),
(30, 'Derek Jacobi'),
(45, 'Diane Kruger'),
(31, 'Djimon Hounsou'),
(7, 'Dominic Monaghan'),
(23, 'Ed Harris'),
(78, 'Eddie Murphy'),
(44, 'Eli Roth'),
(1, 'Elijah Wood'),
(75, 'Elliot Page'),
(65, 'Geoffrey Rush'),
(16, 'Hugo Weaving'),
(14, 'Ian Holm'),
(3, 'Ian McKellen'),
(50, 'Irrfan Khan'),
(66, 'Jack Davenport'),
(20, 'Jennifer Garner'),
(35, 'Jessica Chastain'),
(21, 'Jim Carrey'),
(27, 'Joaquin Phoenix'),
(80, 'John Lithgow'),
(11, 'John Rhys-Davies'),
(63, 'Johnny Depp'),
(73, 'Joseph Gordon-Levitt'),
(64, 'Keira Knightley'),
(72, 'Ken Watanabe'),
(19, 'Kristy Swanson'),
(22, 'Laura Linney'),
(71, 'Leonardo DiCaprio'),
(5, 'Liv Tyler'),
(36, 'Mackenzie Foy'),
(74, 'Marion Cotillard'),
(32, 'Matt Damon'),
(33, 'Matthew McConaughey'),
(42, 'Mélanie Laurent'),
(38, 'Michael Caine'),
(43, 'Michael Fassbender'),
(62, 'Michelle Rodriguez'),
(77, 'Mike Myers'),
(10, 'Miranda Otto'),
(25, 'Natascha McElhone'),
(24, 'Noah Emmerich'),
(29, 'Oliver Reed'),
(2, 'Orlando Bloom'),
(26, 'Russell Crowe'),
(58, 'Sam Worthington'),
(6, 'Sean Astin'),
(9, 'Sean Bean'),
(18, 'Seann William Scott'),
(60, 'Sigourney Weaver'),
(67, 'Stellan Skarsgård'),
(61, 'Stephen Lang'),
(76, 'Tom Hardy'),
(52, 'Ty Simpkins'),
(51, 'Vicent D\'Onofrio'),
(4, 'Viggo Mortensen'),
(81, 'Vincent Cassel'),
(59, 'Zoe Saldana');

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
(17, 38),
(36, 48),
(36, 49),
(36, 50),
(36, 51),
(36, 52),
(43, 58),
(43, 59),
(43, 60),
(43, 61),
(43, 62),
(44, 2),
(44, 63),
(44, 64),
(44, 65),
(44, 66),
(45, 2),
(45, 63),
(45, 64),
(45, 67),
(45, 68),
(46, 2),
(46, 63),
(46, 64),
(46, 65),
(46, 67),
(46, 68),
(46, 70),
(47, 38),
(47, 71),
(47, 72),
(47, 73),
(47, 74),
(47, 75),
(47, 76),
(48, 77),
(48, 78),
(48, 79),
(48, 80),
(48, 81);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentario`
--

DROP TABLE IF EXISTS `comentario`;
CREATE TABLE `comentario` (
  `id` int(11) NOT NULL,
  `mensaje` text NOT NULL,
  `fechaPublicacion` datetime NOT NULL DEFAULT current_timestamp(),
  `peliculaId` int(11) NOT NULL,
  `usuarioId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `comentario`
--

INSERT INTO `comentario` (`id`, `mensaje`, `fechaPublicacion`, `peliculaId`, `usuarioId`) VALUES
(55, 'Vamos a ver esa hora guapa2', '2021-06-04 02:33:14', 6, 1),
(56, 'Vamos a ver esa hora guapa3', '2021-06-04 02:33:21', 6, 1),
(57, 'jaja soy el admin, plebe', '2021-06-04 04:13:41', 43, 5),
(58, 'Perfecto!!', '2021-06-04 04:30:19', 44, 5);

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
(32, 'Andrew Adamson'),
(3, 'Christopher Nolan'),
(24, 'Colin Trevorrow'),
(10, 'Danny Leiner'),
(17, 'David Fincher'),
(12, 'Federico Álvarez'),
(31, 'Gore Verbinski'),
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
(17, 3),
(36, 24),
(43, 1),
(44, 31),
(45, 31),
(46, 31),
(47, 3),
(48, 32);

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
(22, 'Superhéroes'),
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
(3, 2),
(3, 3),
(3, 5),
(3, 6),
(4, 3),
(4, 9),
(4, 14),
(4, 15),
(4, 20),
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
(12, 4),
(12, 5),
(12, 6),
(12, 7),
(12, 12),
(12, 22),
(13, 4),
(13, 5),
(13, 7),
(13, 22),
(14, 2),
(14, 4),
(14, 5),
(14, 6),
(14, 7),
(14, 8),
(15, 4),
(15, 5),
(15, 6),
(15, 7),
(15, 8),
(16, 4),
(16, 6),
(16, 7),
(17, 3),
(17, 5),
(17, 7),
(17, 20),
(36, 4),
(36, 5),
(36, 6),
(36, 7),
(43, 4),
(43, 5),
(43, 7),
(43, 8),
(44, 1),
(44, 4),
(44, 5),
(44, 8),
(45, 4),
(45, 5),
(45, 8),
(46, 1),
(46, 4),
(46, 5),
(46, 8),
(47, 4),
(47, 5),
(47, 6),
(47, 7),
(48, 1),
(48, 8),
(48, 11);

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
(21, 'Favortios', 3),
(22, 'Pendientes', 3),
(23, 'Favoritos', 2),
(24, 'Pendientes', 2),
(25, 'Favoritos', 4),
(26, 'Pendientes', 4),
(28, 'Favoritos', 5),
(35, 'Favoritos', 1),
(36, 'Pendientes', 1),
(39, 'Favoritos', 22);

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
(1, 2),
(1, 3),
(1, 4);

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
(1, 22),
(1, 35),
(1, 36),
(1, 39),
(3, 39),
(5, 22),
(11, 22),
(11, 39),
(43, 22),
(43, 35),
(43, 39);

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
  `trailer` text NOT NULL,
  `caratula` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `pelicula`
--

INSERT INTO `pelicula` (`id`, `nombre`, `anio`, `puntuacion`, `fechaEntrada`, `sinopsis`, `trailer`, `caratula`) VALUES
(1, 'Colega dónde está mi coche', 2000, 2, '2021-05-25', 'Tras un noche de juerga, dos amigos no recuerdan dónde dejaron aparcado su coche. Su búsqueda significará el comienzo de una serie de sorpresas. Todo empieza cuando los jóvenes Jesse y Chester se despiertan una mañana después de una fiesta muy intensa, pero ninguno de los dos puede recordar qué pasó durante la noche anterior. El coche de Jesse desapareció, y todo parece estar fuera de lugar, así que los dos amigos comienzan la búsqueda del auto y de pistas que les permita reconstruir la noche anterior, aunque a medida que profundizan en los acontecimientos de las últimas veinticuatro horas, la situación se convierte en una salvaje historia que parece extraída de la ciencia-ficción.\r\n\r\n', '<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/jH_nkW3QtFg\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>', 'colegadóndeestámicoche.jpg'),
(2, 'No respires', 2016, 3, '2021-05-25', 'Unos jóvenes ladrones creen haber encontrado la oportunidad de cometer el robo perfecto. Su objetivo será un ciego solitario, poseedor de millones de dólares ocultos. Pero tan pronto como entran en su casa serán conscientes de su error, pues se encontrarán atrapados y luchando por sobrevivir contra un psicópata con sus propios y temibles secretos.\r\n\r\n', '<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/mvEetUDCKxE\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>', 'norespires.jpg'),
(3, 'It', 2017, 3, '2021-05-25', 'Remake del clásico de Stephen King en el que un payaso aterroriza a los niños de un vecindario. En un pequeño pueblo de Maine, siete niños conocidos como el Club de los Perdedores se encuentran cara a cara con problemas de la vida, matones y un monstruo que toma la forma de un payaso llamado Pennywise.\r\n\r\n', '<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/_oBZ_zTz0Nw\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>', 'it.jpg'),
(4, 'Titanic', 1997, 4, '2021-05-25', 'Durante las labores de recuperación de los restos del famoso Titanic, una anciana norteamericana se pone en contacto con la expedición para acudir a una plataforma flotante instalada en el Mar del Norte y asistir \'in situ\' a la recuperación de sus recuerdos. A través de su memoria reviviremos los acontecimientos que marcaron el siniestro más famoso del siglo XX: el hundimiento del trasatlántico más lujoso del mundo, la máquina más sofisticada de su tiempo, considerada «insumergible», que sucumbió a las heladas aguas del Atlántico en abril de 1912, llevándose consigo la vida de mil quinientas personas, más de la mitad del pasaje. En los recueros de la anciana hay cabida para algo más que la tragedia, la historia de amor que vivió con un joven pasajero de tercera clase, un pintor aficionado que había ganado su pasaje en una partida las cartas en una taberna de Southampton.', '<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/FiRVcExwBVA\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>', 'titanic.jpg'),
(5, 'El Show de Truman', 1998, 4, '2021-05-25', 'Truman Burbank es un hombre corriente y algo ingenuo que ha vivido toda su vida en uno de esos pueblos donde nunca pasa nada. Sin embargo, de repente, unos extraños sucesos le hacen sospechar que algo anormal está ocurriendo. Todos sus amigos son actores, toda su ciudad es un plató, toda su vida está siendo filmada y emitida como el reality más ambicioso de la historia.\r\n\r\n', '<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/dlnmQbPGuls\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>', 'elshowdetruman.jpg'),
(6, 'Gladiator', 2000, 5, '2021-05-25', 'En el año 180, el Imperio Romano domina todo el mundo conocido. Tras una gran victoria sobre los bárbaros del norte, el anciano emperador Marco Aurelio decide transferir el poder a Máximo, bravo general de sus ejércitos y hombre de inquebrantable lealtad al imperio. Pero su hijo Cómodo, que aspiraba al trono, no lo acepta y trata de asesinar a Máximo.', '<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/WHh06MLv6-I\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>', 'gladiator.jpg'),
(7, 'Malditos Bastardos', 2009, 5, '2021-05-25', 'Segunda Guerra Mundial. Durante la ocupación de Francia por los alemanes, Shosanna Dreyfus presencia la ejecución de su familia por orden del coronel nazi Hans Landa. Ella consigue huir a París, donde adopta una nueva identidad como propietaria de un cine. En otro lugar de Europa, el teniente Aldo Raine adiestra a un grupo de soldados judíos \"Los bastardos\" para atacar objetivos concretos. Los hombres de Raine y una actriz alemana, que trabaja para los aliados, deben llevar a cabo una misión que hará caer a los jefes del Tercer Reich. El destino quiere que todos se encuentren bajo la marquesina de un cine donde Shosanna espera para vengarse.\r\n\r\n', '<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/2jcTRi8D80k\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>', 'malditosbastardos.jpg'),
(8, 'Tiburón', 1975, 3, '2021-05-25', 'En la costa de un pequeño pueblo del Este de Estados Unidos, un enorme tiburón ataca a varias personas. Temiendo las fatales consecuencias que esto puede provocar en el negocio turístico, el alcalde se niega a cerrar las playas y a difundir la noticia. Pero un nuevo ataque del tiburón, en la propia playa, termina con la vida de otro bañista. El terror se ha hecho público, así que un veterano cazador de tiburones, un científico y el jefe de la policía local se unen para dar caza al temible escualo...\r\n\r\n', '<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/JvF0ECpkrqw\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>', 'tiburón.jpg'),
(9, 'El señor de los anillos La comunidad del anillo', 2001, 4, '2021-05-25', 'En la Tierra Media, el Señor Oscuro Saurón creó los Grandes Anillos de Poder, forjados por los herreros Elfos. Tres para los reyes Elfos, siete para los Señores Enanos, y nueve para los Hombres Mortales. Secretamente, Saurón también forjó un anillo maestro, el Anillo Único, que contiene en sí el poder para esclavizar a toda la Tierra Media. Con la ayuda de un grupo de amigos y de valientes aliados, Frodo emprende un peligroso viaje con la misión de destruir el Anillo Único. Pero el Señor Oscuro Sauron, quien creara el Anillo, envía a sus servidores para perseguir al grupo. Si Sauron lograra recuperar el Anillo, sería el final de la Tierra Media.\r\n\r\n', '<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/GuW21RLMndc\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>', 'elseñordelosanilloslacomunidaddelanillo.jpg'),
(10, 'El señor de los anillos Las dos torres', 2002, 5, '2021-05-25', 'La Compañía del Anillo se ha disuelto. El portador del anillo Frodo y su fiel amigo Sam se dirigen hacia Mordor para destruir el Anillo Único y acabar con el poder de Sauron. Mientras, y tras la dura batalla contra los orcos donde cayó Boromir, el hombre Aragorn, el elfo Legolas y el enano Gimli intentan rescatar a los medianos Merry y Pipin, secuestrados por los ogros de Mordor. Por su parte, Saurón y el traidor Sarumán continúan con sus planes en Mordor, en espera de la guerra contra las razas libres de la Tierra Media.\r\n\r\n', '<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/GPAOgWeAU-E\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>', 'elseñordelosanilloslasdostorres.jpg'),
(11, 'El señor de los anillos el retorno del rey', 2003, 5, '2021-05-25', 'Las fuerzas de Saruman han sido destruidas, y su fortaleza sitiada. Ha llegado el momento de que se decida el destino de la Tierra Media, y por primera vez en mucho tiempo, parece que hay una pequeña esperanza. La atención del señor oscuro Sauron se centra ahora en Gondor, el último reducto de los hombres, y del cual Aragorn tendrá que reclamar el trono para ocupar su puesto de rey. Pero las fuerzas de Sauron ya se preparan para lanzar el último y definitivo ataque contra el reino de Gondor, la batalla que decidirá el destino de todos. Mientras tanto, Frodo y Sam continuan su camino hacia Mordor, a la espera de que Sauron no repare en que dos pequeños Hobbits se acercan cada día más al final de su camino, el Monte del Destino.\r\n\r\n', '<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/h-9RYiqyqjk\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>', 'elseñordelosanilloselretornodelrey.jpg'),
(12, 'Iron Man', 2008, 3, '2021-05-25', 'El multimillonario fabricante de armas Tony Stark debe enfrentarse a su turbio pasado después de sufrir un accidente con una de sus armas. Equipado con una armadura de última generación tecnológica, se convierte en \"El hombre de hierro\" para combatir el mal a escala global.\r\n\r\n', '<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/PmAqcdk4d48\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>', 'ironman.jpg'),
(13, 'Iron Man 2', 2010, 2, '2021-05-25', 'El mundo sabe que el multimillonario Tony Stark es Iron Man, el superhéroe enmascarado. Sometido a presiones por parte del gobierno, la prensa y la opinión pública para que comparta su tecnología con el ejército, Tony es reacio a desvelar los secretos de la armadura de Iron Man porque teme que esa información pueda caer en manos indeseables.\r\n\r\n', '<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/Ab_mvS68xng\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>', 'ironman2.jpg'),
(14, 'Terminator', 1984, 4, '2021-05-25', 'Un cyborg ha sido enviado desde el futuro en una misión mortal: eliminar a Sarah Connor, una joven cuya vida tendrá una gran importancia en los próximos años. Sarah tiene sólo un protector —Kyle Reese— también enviado desde el futuro. El Terminator utiliza su inteligencia excepcional y fuerza para encontrar a Sarah, pero ¿hay alguna forma de detener al cyborg aparentemente indestructible?\r\n\r\n', '<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/xWCBs-Ib1Fo\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>', 'terminator.jpg'),
(15, 'Terminator 2 El juicio final', 1991, 4, '2021-05-25', 'Ha pasado once años desde que Sarah Connor fue marcada como objetivo para ser eliminada por un cyborg del futuro. Ahora su hijo John, el futuro líder de la resistencia, es el objetivo de un Terminator más moderno, más mortífero. Una vez más, la resistencia se las ha ingeniado para enviar un protector de vuelta al pasado para intentar salvar a John y a su madre Sarah.\r\n\r\n', '<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/g7sNqH2Asko\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>', 'terminator2eljuiciofinal.jpg'),
(16, 'Terminator 3 La rebelión de las máquinas', 2003, 2, '2021-05-26', 'Ha pasado una década desde que John Connor salvara a la humanidad de la destrucción. En la actualidad John tiene 25 años y vive en la clandestinidad: no hay ninguna prueba documental de su existencia. Así evita ser rastreado por Skynet, la sofisticada corporación de máquinas que una vez intentó acabar con su vida. Pero, ahora, desde el futuro, ha sido enviado el T-X, la máquina destructora cyborg más desarrollada de Skynet. Su misión es completar el trabajo que no pudo terminar su predecesor, el T-1000. El T-X es una máquina tan implacable como bello su aspecto humano. Ahora la única esperanza de sobrevivir para Connnor es Terminator.\r\n\r\n', '<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/4-MDFbhug88\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>', 'terminator3larebelióndelasmáquinas.jpg'),
(17, 'Interstellar', 2014, 5, '2021-05-26', 'Narra las aventuras de un grupo de exploradores que hacen uso de un agujero de gusano recientemente descubierto para superar las limitaciones de los viajes espaciales tripulados y vencer las inmensas distancias que tiene un viaje interestelar.', '<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/UoSSbmD9vqc\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>', 'interstellar.jpg'),
(36, 'Jurassic World', 2015, 3, '2021-06-04', 'Veintidós años después de lo ocurrido en Jurassic Park, la isla Nublar ha sido transformada en un parque temático, Jurassic Wold, con versiones «domesticadas» de algunos de los dinosaurios más conocidos. Cuando todo parece ir a la perfección y ser el negocio del siglo, un nuevo dinosaurio de especie todavía desconocida y que es mucho más inteligente de lo que se pensaba, comienza a causar estragos entre los visitantes del Parque.', '<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/hv9eSCijf6E\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>', 'jurassicworld.jpg'),
(43, 'Avatar', 2009, 4, '2021-06-04', 'Año 2154. Jake Sully, un ex-marine condenado a vivir en una silla de ruedas, sigue siendo un auténtico guerrero. Por ello ha sido designado para ir a Pandora, donde algunas empresas están extrayendo un mineral extraño que podría resolver la crisis energética de la Tierra. Para contrarrestar la toxicidad de la atmósfera de Pandora, se ha creado el programa Avatar, gracias al cual los seres humanos mantienen sus conciencias unidas a un avatar: un cuerpo biológico controlado de forma remota que puede sobrevivir en el aire letal. Esos cuerpos han sido creados con ADN humano mezclado con ADN de los nativos de Pandora, los Na\'vi. Convertido en avatar, Jake puede caminar otra vez. Su misión consiste en infiltrarse entre los Na\'vi, que se han convertido en el mayor obstáculo para la extracción del mineral. Pero cuando Neytiri, una bella Na\'vi, salva la vida de Jake, todo cambia: Jake, tras superar ciertas pruebas, es admitido en su clan.', '<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/Xg8kYk6uHN0\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>', 'avatar.jpg'),
(44, 'Piratas del Caribe: La maldición de la Perla Negra', 2003, 4, '2021-06-04', 'El aventurero capitán Jack Sparrow recorre las aguas caribeñas. Pero su andanzas terminan cuando su enemigo, el capitán Barbossa le roba su barco, la Perla Negra, y ataca la ciudad de Port Royal, secuestrando a Elizabeth Swann, hija del gobernador. Will Turner, el amigo de la infancia de Elizabeth, se une a Jack para rescatarla y recuperar la Perla Negra. Pero el prometido de Elizabeth, comodoro Norrington, les persigue a bordo del HMS Impávido. Además, Barbossa y su tripulación son víctimas de un conjuro por el que están condenados a vivir eternamente, y a transformarse cada noche en esqueletos vivientes, en fantasmas guerreros.', '<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/5Itr2jHuJaw\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>', 'piratasdelcaribelamaldiciondelaperlanegra.jpg'),
(45, 'Piratas del Caribe: El cofre del hombre muerto', 2006, 5, '2021-06-04', 'Will Turner y Elizabeth Swann se van a casar, pero ambos son hechos prisioneros por Lord Cutler Beckett y acusados de haber liberado al capitán Jack Sparrow. Para salvar su vida, Will tendrá que encontrar a Jack y conseguir su misteriosa brújula. Esta esconde un gran poder, además de la clave de una deuda de sangre del pirata con un temible y siniestro Davy Jones, el legendario capitán del barco fantasma Holandés Errante.', '<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/2GJh4ElbEjA\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>', 'piratasdelcaribeelcofredelhombremuerto.jpg'),
(46, 'Piratas del Caribe: En el fin del mundo', 2007, 4, '2021-06-04', 'Siguiendo la estela de lo sucedido en “Piratas del caribe: el cofre del hombre muerto”, encontramos a nuestros héroes Will Turner y Elizabeth Swann aliados con el capitán Barbossa, en una búsqueda desesperada para liberar al capitán Jack Sparrow de las manos de Davy Jones. Mientras, el terrorífico barco fantasma, el Holandés Errante, bajo el control de la Compañía de las Indias Orientales, causa estragos a lo largo de los Siete Mares. Will y Elizabeth, navegando en medio de la traición, la felonía y mares salvajes, deben seguir adelante rumbo a Singapur y enfrentarse al astuto pirata chino Sao Feng. Ahora, en los mismísimos confines de la tierra, todos ellos deben elegir un bando en la batalla final, ya que no sólo sus vidas y fortunas, sino también el futuro de la piratería clásica, pende de un hilo...', '<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/3LioCI-QTPE\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>', 'piratasdelcaribeenelfindelmundo.jpg'),
(47, 'Origen', 2010, 5, '2021-06-04', 'Dom Cobb es un ladrón hábil, el mejor de todos, especializado en el peligroso arte de extracción: el robo de secretos valiosos desde las profundidades del subconsciente durante el estado de sueño cuando la mente está más vulnerable. Esta habilidad excepcional de Cobb le ha hecho un jugador codiciado en el traicionero nuevo mundo de espionaje corporativo, pero al mismo tiempo, le ha convertido en un fugitivo internacional y ha tenido que sacrificar todo que le importaba. Ahora a Cobb se le ofrece una oportunidad para redimirse. Con un último trabajo podría recuperar su vida anterior, pero solamente si logra lo imposible.', '<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/RV9L7ui9Cn8\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>', 'origen.jpg'),
(48, 'Shrek', 2001, 4, '2021-06-04', 'Hace mucho, mucho tiempo, en una lejanísima ciénaga vivía un intratable ogro llamado Shrek. Pero de repente, un día, su absoluta soledad se ve interrumpida por una invasión de sorprendentes personajes de cuento. Hay ratoncitos ciegos en su comida, un enorme y malísimo lobo en su cama, tres cerditos sin hogar y otros muchos seres increíbles que han sido deportados de su reino por el malvado Lord Farquaad. Para conseguir salvar su terreno, y de paso a sí mismo, Shrek hace un pacto con Farquaad y emprende viaje para conseguir que la preciosa princesa Fiona sea la novia del Lord. En tan importante misión le acompañan un burro chistoso, dispuesto a hacer cualquier cosa por Shrek. Todo, menos estarse calladito. Rescatar a la princesa de una dragona enamoradiza que suelta fuego al respirar va a resultar una tontería comparado con lo que ocurre cuando el oscuro secreto que la joven guardaba es revelado.', '<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/qhFPeFv4znA\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>', 'shrek.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `plataforma`
--

DROP TABLE IF EXISTS `plataforma`;
CREATE TABLE `plataforma` (
  `id` int(11) NOT NULL,
  `nombre` varchar(45) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `icono` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `plataforma`
--

INSERT INTO `plataforma` (`id`, `nombre`, `icono`) VALUES
(1, 'Netflix', 'iconNetflix.jpg'),
(2, 'HBO', 'iconHBO.jpg'),
(3, 'Amazon Prime Video', 'iconAmazon.jpg'),
(4, 'Movistar+', 'iconMovistar.jpg'),
(5, 'Disney+', 'iconDisney.jpg'),
(6, 'Rakuten Tv', 'iconRakuten.jpg'),
(7, 'Apple TV+', 'iconApple.jpg'),
(8, 'Mitele', 'iconMitele.jpg'),
(9, 'Youtube Premium', 'iconYoutube.jpg');

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
(6, 3),
(11, 2),
(43, 1),
(43, 2),
(44, 1),
(45, 1),
(46, 1),
(46, 3),
(47, 2),
(48, 1),
(48, 2);

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
  `codigoCookie` varchar(50) COLLATE utf8_spanish_ci DEFAULT NULL,
  `administrador` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `identificador`, `nombre`, `apellidos`, `email`, `contrasenna`, `fotoPerfil`, `codigoCookie`, `administrador`) VALUES
(1, 'jlopez', 'José', 'López', 'j@j', '$2y$10$TqpG.1qj.hi1b60XTcIsKen28LN1uqha4G1OYswrr7Wm5.Z91pzr6', 'usuario.png', 'HtlkhG2DUAr6wcErXayed0d2iW6uJ8iB', NULL),
(2, 'kevinp', 'Kevin', 'Peral', 'k@p', '$2y$10$AvbOMJ0o565c81DZtQjK8e4WZs6JghwZTXeAHSqDnFsYBn4Qh8BCW', 'usuario.png', NULL, NULL),
(3, 'javim', 'Javi', 'Martínez', 'j@m', '$2y$10$IKp4EWRIcWdVgTOiubgwfuiL63M46obgf3TNtcXXT16Ez2xSz7YHO', 'usuario.png', NULL, NULL),
(4, 'alainf', 'Alain', 'Fernández', 'a@f', '$2y$10$gMZ7R6LjDTuU0TptlwUcNOEr3Y4TKrUrSTv5cA2rQNZe6vVUbhThm', 'usuario.png', NULL, NULL),
(5, 'admin', 'Admin', 'Admin', 'a@a', '$2y$10$rPUdd8/ENcxO5SYrlaxwDOl0MwYxKW9iPZiH4HVCzWyQMOe9AfZS.', 'usuario.png', 'bkTehzjYAswV5n6JR0jc2yvsZt7iHMHX', 1),
(22, 'andresp', 'Andres', 'Pacheco', 'andres@andres', '$2y$10$q/5d7rtwgULyyGNzlas8i.dx8NqMoSSDVo/0b4zs0z6mLutkQ43d2', 'usuario.png', 'qPIP1T1AtMahiuiUKglF1Q81HNPktRjc', NULL);

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
-- Indices de la tabla `comentario`
--
ALTER TABLE `comentario`
  ADD PRIMARY KEY (`id`),
  ADD KEY `peliculaId` (`peliculaId`,`usuarioId`),
  ADD KEY `usuarioId` (`usuarioId`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- AUTO_INCREMENT de la tabla `comentario`
--
ALTER TABLE `comentario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT de la tabla `director`
--
ALTER TABLE `director`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT de la tabla `genero`
--
ALTER TABLE `genero`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `lista`
--
ALTER TABLE `lista`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT de la tabla `pelicula`
--
ALTER TABLE `pelicula`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT de la tabla `plataforma`
--
ALTER TABLE `plataforma`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

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
-- Filtros para la tabla `comentario`
--
ALTER TABLE `comentario`
  ADD CONSTRAINT `comentario_ibfk_1` FOREIGN KEY (`peliculaId`) REFERENCES `pelicula` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comentario_ibfk_2` FOREIGN KEY (`usuarioId`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

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
