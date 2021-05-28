<?php

require_once "_com/DAO.php";


function buscarPor(?array $buscaPor){
    if($buscaPor != null){
        echo json_encode($buscaPor);
    }
}

if(isset($_REQUEST["busqueda"])){
    $plataforma = DAO::buscarPeliculaPorPlataforma($_REQUEST["busqueda"]);
    buscarPor($plataforma);
    $genero = DAO::buscarPeliculaPorGenero($_REQUEST["busqueda"]);
    buscarPor($genero);
    $titulo = DAO::buscarPeliculaPorNombre($_REQUEST["busqueda"]);
    buscarPor($titulo);
}