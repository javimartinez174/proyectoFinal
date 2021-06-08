<?php

require_once "../_com/DAO.php";
if (!DAO::haySesionRamIniciada() && !DAO::intentarCanjearSesionCookie()) redireccionar("html/SesionInicioFormulario.html");
cerrarSesionRamYCookie();

redireccionar("../html/SesionInicioFormulario.html");

