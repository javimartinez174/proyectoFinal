<?php

require_once "_com/DAO.php";

$peliculaId = (int)$_REQUEST["peliculaId"];

echo json_encode(DAO::comentariosObtener($peliculaId));