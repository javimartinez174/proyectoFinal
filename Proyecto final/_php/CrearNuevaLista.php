<?php

require_once "../_com/DAO.php";

$nombre = $_REQUEST["nombreLista"];


echo json_encode(DAO::crearLista($nombre, $_SESSION["id"]));