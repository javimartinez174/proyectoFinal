<?php

require_once "_com/DAO.php";

$mensaje = $_REQUEST["mensaje"];
$peliculaId = $_REQUEST["peliculaId"];
$usuarioId = $_SESSION["id"];

echo json_encode(DAO::insertarComentario($mensaje, $peliculaId, $usuarioId));