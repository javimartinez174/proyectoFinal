<?php

require_once "_com/DAO.php";

$id = (int)$_REQUEST["id"];

echo json_encode(DAO::peliculaObtenerPorId($id));