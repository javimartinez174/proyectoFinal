<?php

require_once "../_com/DAO.php";


echo json_encode(DAO::usuarioObtenerPorId($_SESSION["id"]));