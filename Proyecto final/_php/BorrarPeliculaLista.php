<?php
require_once "_com/DAO.php";

$peliculaId = $_REQUEST["peliculaId"];
$listaId = $_REQUEST["listaId"];

$resultado = DAO::borrarPeliculaLista($peliculaId, $listaId);

json_encode($resultado);

