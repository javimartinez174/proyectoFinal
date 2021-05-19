<?php
require_once "_com/DAO.php";
if (!DAO::haySesionRamIniciada() && !DAO::intentarCanjearSesionCookie()) redireccionar("SesionInicioFormulario.php");

$nombre = $_REQUEST["nombre"];
$genero = $_REQUEST["genero"];
$plataforma = $_REQUEST["plataforma"];
$puntuacion = (int)$_REQUEST["puntuacion"];

if ($genero == -1 && $puntuacion == -1 && $plataforma == -1) {
    $peliculas = DAO::buscarPeliculaPorNombre($nombre);

} else if ($puntuacion != -1 && $plataforma == -1 && $genero == -1) {
    $peliculas = DAO::buscarPeliculaPorPuntuacion($puntuacion);

} else if ($genero != -1 && $puntuacion == -1 && $plataforma == -1) {
    $peliculas = DAO::buscarPeliculaPorGenero($genero);

} else if ($plataforma != -1 && $puntuacion == -1 && $genero == -1) {
    $peliculas = DAO::buscarPeliculaPorPlataforma($plataforma);

} else {
    $peliculas = 0;
}
$rsGenero = DAO:: listarGeneros();
$rsPlataformas = DAO:: listarPlataformas();
$tema = comprobarTema();

?>


<html lang=''>

<head>
    <meta charset='UTF-8'>
    <title></title>
    <script src="_js/script.js"></script>
    <?php if ($tema) { ?>
        <link rel="stylesheet" href="_styles/styleBlack.css">
    <?php } else { ?>
        <link rel="stylesheet" href="_styles/style.css">
    <?php } ?>
</head>

<body class='<?= $tema ?>'>

<header><a href="PaginaPrincipal.php"><img src="_img/logo.png" width="150" height="120" alt=""/> </a></header>

<?php pintarInfoSesion(); ?>

<?php if (DAO::buscarPeliculaPorNombre($nombre) != null || DAO::buscarPeliculaPorGenero($genero) != null) { ?>
    <div class="filtroBusqueda">
        <h3><img src="_img/buscar.png" height="30" width="30" alt=''> Buscar por:</h3>

        <form method='post' action='Busqueda.php'>
            <label for="busqueda"></label><select id="busqueda" onchange="mostrarInputsBusqueda()">
                <option value=""> Elige</option>
                <option value="titulo">Título</option>
                <option value="genero">Género</option>
                <option value="puntuacion">Puntuación</option>
                <option value="plataforma">Plataforma</option>
            </select>


            <label for='nombre'></label><input style="display: none" type='text' name='nombre' id='nombre'
                                               placeholder="Buscar por Título"
            />


            <label for="genero"></label><select style="display: none" name='genero' id="genero">
                <option value="-1" selected>Buscar por Género:</option>
                <?php
                foreach ($rsGenero as $filaGeneros) {
                    foreach ($filaGeneros as $generoNombre) {
                        echo "<option value = '$generoNombre' >$generoNombre</option>";
                    }
                } ?>

            </select>

            <label for="plataforma"></label>
            <select style="display: none" name='plataforma' id="plataforma">
                <option value="-1" selected>Buscar por Plataforma:</option>
                <?php
                foreach ($rsPlataformas as $filaPlataformas) {
                    foreach ($filaPlataformas as $plataformaNombre) {
                        echo "<option value = '$plataformaNombre' >$plataformaNombre</option>";
                    }
                } ?>
            </select>

            <label for="puntuacion"></label><select id="puntuacion" name='puntuacion' style="display: none">
                <option value="-1" selected>Buscar por Puntuacion:</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>

            <br><br>
            <button type='submit' name='buscar' value='buscar'>Buscar</button>
        </form>
    </div>
    <h1>Resultados encontrados: </h1>


            <?php
        foreach ($peliculas as $pelicula) { ?>


            <div class="listado">

                <div class="pelicula">
                    <div class="imagen">
                        <img src="_img/<?=$pelicula->getId()?>.jpg"  height="200" width="160" alt=""/>
                    </div>

                    <br>

                    <div class="info">
                        <a href='https://www.google.com/search?q=ver+<?= $pelicula->getNombre() ?>'>
                            <b><?= $pelicula->getNombre() ?></b> - <?= $pelicula->getAnio() ?>
                        </a>

                        <p>Puntuacion: <?= $pelicula->getPuntuacion() ?></p>

                        <p>Añadir a mi lista: <a href='AnnadirPeliculaLista.php?nombre=<?= $pelicula->getNombre() ?>&&id=<?= $pelicula->getId() ?>'><img
                                        src="_img/aniadirALista.png" height="30" width="30" alt=''></a></p>
                        <a href='_pdf/<?= $pelicula->getNombre() ?>.php'>Más info</a>
                    </div>

                </div>
            </div>

        <?php } ?>



<?php } else { ?>

    <h1>No se han encontrado resultados</h1>

<?php } ?>


</body>

</html>