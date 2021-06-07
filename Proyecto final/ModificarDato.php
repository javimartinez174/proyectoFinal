<?php

require_once "_com/DAO.php";

$modificacion = $_REQUEST["modificacion"];
$input = $_REQUEST["input"];
$exito = 0;

if(strcmp($input, "identificador") == 0){
    if (!DAO::comprobarIdentificadorDisponible($modificacion)){
        DAO::usuarioModificarDato($modificacion, $input);
        $exito = 1;
    }else{
        $exito = 2;
    }
}else{
    if(DAO::usuarioModificarDato($modificacion, $input))
        $exito = 3;
}

echo json_encode($exito);