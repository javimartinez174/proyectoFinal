<?php

require_once "_com/DAO.php";

$nuevoIdentificador = $_REQUEST["nuevoIdentificador"];

$input = $_REQUEST["input"];

echo json_encode(DAO::usuarioModificarIdentificador($nuevoIdentificador, $input));