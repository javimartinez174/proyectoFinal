<?php

require_once "_com/DAO.php";

$listaId = $_REQUEST["listaId"];


echo json_encode(DAO::borrarLista($listaId, $_SESSION["id"]));