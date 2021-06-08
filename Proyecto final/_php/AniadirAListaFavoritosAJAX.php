<?php

require_once "../_com/DAO.php";

$idPelicula = $_REQUEST["peliculaId"];


echo json_encode(DAO::aniadirPeliculaFavoritos($idPelicula, $_SESSION["id"]));