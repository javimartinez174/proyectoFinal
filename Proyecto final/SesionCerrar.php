<?php

require_once "_com/DAO.php";
if (!DAO::haySesionRamIniciada() && !DAO::intentarCanjearSesionCookie()) redireccionar("SesionInicioFormulario.html");
cerrarSesionRamYCookie();

redireccionar("html/SesionInicioFormulario.html");

