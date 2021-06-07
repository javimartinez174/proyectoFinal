<?php

require_once "_com/DAO.php";

$nombre = $_REQUEST["nombre"];
$director = $_REQUEST["director"];
$actores = $_REQUEST["actores"];
$generos = $_REQUEST["generos"];
$plataformas = $_REQUEST["plataformas"];
$anio = $_REQUEST["anio"];
$puntuacion = $_REQUEST["puntuacion"];
$sinopsis = $_REQUEST["sinopsis"];
$trailer = $_REQUEST["trailer"];
$caratula = $_REQUEST["caratula"];

echo json_encode(DAO::peliculaInsertar($nombre, $director, $actores, $generos, $plataformas, $anio, $puntuacion, $sinopsis, $trailer, $caratula));