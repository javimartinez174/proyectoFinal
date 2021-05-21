<?php

require_once "_com/DAO.php";

$rs = DAO::obtenerusuario();

$identificador = $rs[0]->getIdentificador();
$contrasenna = $rs[0]->getContrasenna();

$usuario = DAO::usuarioObtener($identificador, $contrasenna);

if (!DAO::haySesionRamIniciada() && !DAO::intentarCanjearSesionCookie()) redireccionar("html/SesionInicioFormulario.html");

if (!DAO::haySesionRamIniciada() && DAO::intentarCanjearSesionCookie()) DAO::marcarSesionComoIniciada(DAO::obtenerUsuarioPorCookie($_COOKIE["codigoCookie"]));

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

<body>
<header><a href="PaginaPrincipal.php"><img src="_img/logo.png" width="150" height="120" alt=""/> </a></header>

<?php if (isset($_REQUEST["borrado"])) {
    echo '<div class="borrado">
                   <p style="color: limegreen"><img src="_img/exito.png" height="30" width="30" alt=""> &nbsp; Borrado con éxito</p>
              </div>';
} ?>

<?php if (isset($_REQUEST["cambioExito"])) {
    echo '<div class="cambioExito">
                   <p style="color: limegreen"><img src="_img/exito.png" height="30" width="30" alt="">Cambio realizado con éxito</p>
              </div>';
} ?>

<?php pintarInfoSesion(); ?>


<br>
<a href='UsuarioListas.php?id=<?= $_SESSION["id"] ?>'>Ver Mis Listas</a>

<br><br>

<div class="filtroBusqueda">
    <h3><img src="_img/buscar.png" height="30" width="30" alt=''> Buscar por:</h3>

    <form method='post' action='Busqueda.php'>
        <label for="busqueda"></label>
        <select id="busqueda" onchange="mostrarInputsBusqueda()">
            <option value=""> Elige</option>
            <option value="titulo">Título</option>
            <option value="genero">Género</option>
            <option value="puntuacion">Puntuación</option>
            <option value="plataforma">Plataforma</option>
        </select>


        <label for='nombre'></label><input style="display: none" type='text' name='nombre' id='nombre'
                                           placeholder="Buscar por Título"
        />


        <label for="genero"></label>
        <select style="display: none" name='genero' id="genero">
            <option value="-1" selected>Buscar por Género:</option>
            <?php
            foreach ($rsGenero as $filaGeneros) {
                foreach ($filaGeneros as $generoNombre) {
                    echo "<option value = '$generoNombre' >$generoNombre</option>";
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

        <br><br>
        <button type='submit' name='buscar' value='buscar'>Buscar</button>
    </form>
</div>

<br><br>
<?php $peliculas = DAO::peliculaObtenerTodas(); ?>


<?php foreach ($peliculas as $pelicula) { ?>

    <div class="listado">

        <div class="pelicula">
            <div class="imagen">
                <img src="_img/<?= $pelicula->getId() ?>.jpg" height="200" width="160" alt=""/>
            </div>

            <br>

            <div class="info">
                <a href='https://www.google.com/search?q=ver+<?= $pelicula->getNombre() ?>'>
                    <b><?= $pelicula->getNombre() ?></b> - <?= $pelicula->getAnio() ?>
                </a>


                <p>Puntuacion: <?= $pelicula->getPuntuacion() ?></p>

                <p>Añadir a mi lista: <a
                            href='AnnadirPeliculaLista.php?nombre=<?= $pelicula->getNombre() ?>&&id=<?= $pelicula->getId() ?>'><img
                                src="_img/aniadirALista.png" height="30" width="30" alt=''></a></p>

                <a href='_pdf/<?= $pelicula->getNombre() ?>.php'>Más info PDF</a>
                <a href='_pdf/<?= $pelicula->getNombre() ?>.php'>Más info New</a>
            </div>

        </div>
    </div>

<?php } ?>


<br><br><br>


</body>

</html>