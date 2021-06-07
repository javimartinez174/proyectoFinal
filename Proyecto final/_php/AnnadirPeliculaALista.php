<?php

require_once "_com/DAO.php";

$listaId = $_REQUEST["listaId"];
$idPelicula = $_REQUEST["idPelicula"];


echo json_encode(DAO::aniadirPeliculaLista($idPelicula, $listaId));