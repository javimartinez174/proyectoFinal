<?php

require_once "../_com/DAO.php";

$actualContrasenna = $_REQUEST["actualContrasenna"];
$nuevaContrasenna = $_REQUEST["nuevaContrasenna"];

echo json_encode(DAO::usuarioModificarContrasenna($actualContrasenna, $nuevaContrasenna));