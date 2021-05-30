<?php

require_once "_com/DAO.php";

$pelicula = DAO::peliculaObtenerPorId($_REQUEST["id"]); 
echo json_encode($pelicula);