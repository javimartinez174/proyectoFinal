<?php

require_once "../_com/DAO.php";

$id = $_REQUEST["id"];

echo json_encode(DAO::directorObtenerPorPeliculaId($id));