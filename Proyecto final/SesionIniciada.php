<?php

require_once "_com/DAO.php";

if (DAO::haySesionRamIniciada() || DAO::intentarCanjearSesionCookie()){
    $sesionIniciada = true;
}else{
    $sesionIniciada = false;
}

echo json_encode($sesionIniciada);
