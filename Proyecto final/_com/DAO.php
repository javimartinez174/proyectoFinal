<?php
require_once "Utilidades.php";
require_once "Clases.php";


class DAO
{
    private static ?PDO $pdo = null;

    public static function haySesionRamIniciada(): bool
    {
        return isset($_SESSION["id"]);
    }

    public static function intentarCanjearSesionCookie(): bool
    {
        if ((isset($_COOKIE["identificador"])) && (isset($_COOKIE["codigoCookie"]))) {

            $rs = self::ejecutarConsulta(
                "SELECT * FROM usuario WHERE identificador=? AND BINARY codigoCookie=?",
                [$_COOKIE["identificador"], $_COOKIE["codigoCookie"]]
            );

            $identificador = $rs[0]["identificador"];
            $codigoCookie = $rs[0]["codigoCookie"];

            if ($rs) {
                return true;
            } else {
                setcookie("identificador", $identificador, time() - 3600);
                setcookie("codigoCookie", $codigoCookie, time() - 3600);
                return false;
            }

        }
        return false;

    }

    private static function ejecutarConsulta(string $sql, array $parametros): array
    {
        if (!isset(self::$pdo)) self::$pdo = self::obtenerPdoConexionBd();

        $select = self::$pdo->prepare($sql);
        $select->execute($parametros);
        return $select->fetchAll();
    }

    /* SESION Y COOKIE */

    private static function obtenerPdoConexionBD(): PDO
    {
        $servidor = "localhost";
        $identificador = "root";
        $contrasenna = "";
        $bd = "watchfilmbd";
        $opciones = [
            PDO::ATTR_EMULATE_PREPARES => false,
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ];

        try {
            $pdo = new PDO("mysql:host=$servidor;dbname=$bd;charset=utf8", $identificador, $contrasenna, $opciones);
        } catch (Exception $e) {
            error_log("Error al conectar: " . $e->getMessage());
            exit("Error al conectar" . $e->getMessage());
        }
        return $pdo;
    }



    private static function usuarioCrearDesdeRS(array $usuario): Usuario
    {
        return new Usuario($usuario["id"], $usuario["identificador"], $usuario["nombre"], $usuario["apellidos"], $usuario["email"], $usuario["contrasenna"], $usuario["fotoPerfil"], $usuario["codigoCookie"]);
    }

    public static function obtenerUsuarioPorCookie(string $codigoCookie): ?Usuario
    {
        $rs = self::ejecutarConsulta(
            "SELECT * FROM usuario WHERE codigoCookie=?",
            [$codigoCookie]
        );
        if ($rs) return self::usuarioCrearDesdeRS($rs[0]);
        else return null;
    }

    public static function marcarSesionComoIniciada($usuario)
    {
        $_SESSION["id"] = $usuario->getId();
        $_SESSION["identificador"] = $usuario->getIdentificador();
        $_SESSION["nombre"] = $usuario->getNombre();
        $_SESSION["apellidos"] = $usuario->getApellidos();
        $_SESSION["email"] = $usuario->getEmail();
        $_SESSION["fotoPerfil"] = $usuario->getFotoPerfil();
    }

    public static function generarCookieRecordar()
    {
        $arrayUsuario = DAO::usuarioObtener($_REQUEST["identificador"], $_REQUEST["contrasenna"]);
        $codigoCookie = generarCadenaAleatoria(32);

        self::ejecutarConsulta(
            "UPDATE usuario SET codigoCookie=? WHERE identificador=?",
            [$codigoCookie, $arrayUsuario->getIdentificador()]
        );


        $arrayCookies["identificador"] = setcookie("identificador", $arrayUsuario->getIdentificador(), time() + 60 * 60);
        $arrayCookies["codigoCookie"] = setcookie("codigoCookie", $codigoCookie, time() + 60 * 60);
    }

    public static function usuarioObtener(string $identificador, string $contrasennaSimple): ?Usuario
    {
        $contrasenna_hash = self::ejecutarConsulta(
          "SELECT * FROM usuario WHERE identificador=?",
           [$identificador]
        );

        if($contrasenna_hash){
            if(password_verify($contrasennaSimple, $contrasenna_hash[0]["contrasenna"])){
                $contrasenna = $contrasenna_hash[0]["contrasenna"];
                $rs = self::ejecutarConsulta(
                    "SELECT * FROM usuario WHERE identificador=? AND contrasenna =?",
                    [$identificador, $contrasenna]
                );
            }else{
                $rs = false;
            }
        }else{
            $rs = false;
        }
        if ($rs){
            return self::usuarioCrearDesdeRS($rs[0]);
        } else {
            return null;
        }
    }

    public static function borrarCookieRecordar()
    {
        $arrayUsuario = DAO::usuarioObtener($_REQUEST["identificador"], $_REQUEST["contrasenna"]);

        self::ejecutarConsulta(
            "UPDATE usuario SET codigoCookie=NULL WHERE identificador=?",
            [$arrayUsuario->getIdentificador()]
        );
        $identificador = $arrayUsuario->getIdentificador();
        setcookie("identificador", $identificador, time() - 3600);

        unset($_COOKIE["codigoCookie"]);
        setcookie("codigoCookie", "", time() - 3600);
        unset($_COOKIE["identificador"]);

    }

    /* USUARIO */

    public static function comprobarIdentificadorDisponible(string $identificador): array
    {
        return self::ejecutarConsulta(
            "SELECT identificador FROM usuario WHERE identificador=?",
            [$identificador]
        );
    }

    public static function obtenerusuario(): array
    {
        $datos = [];
        $rs = self::ejecutarConsulta(
            "SELECT * FROM usuario ",
            []
        );

        foreach ($rs as $fila) {
            $usuario = self::usuarioCrearDesdeRS($fila);
            array_push($datos, $usuario);
        }

        return $datos;
    }

    public static function crearUsuario(array $arrayUsuarioNuevo): bool
    {
        return self::ejecutarActualizacion(
            "INSERT INTO usuario (identificador, nombre, apellidos, email, contrasenna, fotoPerfil, codigoCookie) VALUES (?, ?, ?, ?, ?, 'usuario.png', NULL)",
            [$arrayUsuarioNuevo["identificador"], $arrayUsuarioNuevo["nombre"], $arrayUsuarioNuevo["apellidos"], $arrayUsuarioNuevo["email"], password_hash($arrayUsuarioNuevo["contrasenna"], PASSWORD_BCRYPT)]
        );
    }

    public static function usuarioObtenerPorId(int $id): Usuario
    {
        $rs = self::ejecutarConsulta(
            "SELECT * FROM usuario WHERE id=?",
            [$id]
        );
        if ($rs) return self::usuarioCrearDesdeRs($rs[0]);
        else return null;
    }

    public static function usuarioObtenerPorIdentificador(string $identificador): Usuario
    {
        $rs = self::ejecutarConsulta(
            "SELECT * FROM usuario WHERE identificador=?",
            [$identificador]
        );
        if ($rs) return self::usuarioCrearDesdeRs($rs[0]);
        else return null;
    }

    public static function comprobarUsuarioAdmin(int $id)
    {
        $rs = self::ejecutarConsulta(
            "SELECT administrador FROM usuario WHERE id=?",
            [$id]
        );
        if ($rs[0]["administrador"]==1) return true;
        else return false;
    }

    private static function ejecutarActualizacion(string $sql, array $parametros): bool
    {
        if (!isset(self::$pdo)) self::$pdo = self::obtenerPdoConexionBd();

        $actualizacion = self::$pdo->prepare($sql);
        return $actualizacion->execute($parametros);
    }

    public static function usuarioModificar()
    {
        $identificador = $_REQUEST["identificador"];
        $nombre = $_REQUEST["nombre"];
        $apellidos = $_REQUEST["apellidos"];
        $email = $_REQUEST["email"];

        if (!isset(self::$pdo)) self::$pdo = self::obtenerPdoConexionBd();
        self::ejecutarActualizacion("UPDATE usuario SET identificador=?,nombre=?,apellidos=?,email=? WHERE identificador=?", [$identificador, $nombre, $apellidos, $email, $identificador]);
    }

    public static function usuarioModificarDato(string $nuevoDato, string $input): bool
    {
        self::ejecutarActualizacion("UPDATE usuario SET ".$input."=? WHERE identificador=?", [$nuevoDato, $_SESSION["identificador"]]);
        $usuario = self::usuarioObtenerPorId($_SESSION["id"]);
        switch ($input) {
            case "identificador": 
                $_SESSION[$input] = $usuario->getIdentificador();
                break;
            case "nombre":
                $_SESSION[$input] = $usuario->getNombre();
                break;
            case "apellidos":
                $_SESSION[$input] = $usuario->getApellidos();
                break;
            case "email":
                $_SESSION[$input] = $usuario->getEmail();
                break;
        }
        
        return true;
    }

    public static function usuarioModificarContrasenna(string $actualContrasenna, string $nuevaContrasenna): bool
    {
        $contrasenna_hash = self::ejecutarConsulta(
            "SELECT * FROM usuario WHERE identificador=?",
             [$_SESSION["identificador"]]
          );
  
          if($contrasenna_hash){
              if(password_verify($actualContrasenna, $contrasenna_hash[0]["contrasenna"])){
                    self::ejecutarActualizacion("UPDATE usuario SET contrasenna=? WHERE identificador=?", [password_hash($nuevaContrasenna,  PASSWORD_BCRYPT), $_SESSION["identificador"]]);
                    return true;
              }
        }
        
        return false;
    }


    public static function VerFichaUsuario(): array
    {

        $identificador = $_SESSION["identificador"];

        if (!isset(self::$pdo)) self::$pdo = self::obtenerPdoConexionBd();

        return self::ejecutarConsulta("SELECT * FROM usuario WHERE identificador=?", [$identificador]);
    }

    public static function usuarioEliminar(string $identificador)
    {

        if (!isset(Self::$pdo)) Self::$pdo = Self::obtenerPdoConexionBd();

        self::ejecutarActualizacion("DELETE FROM usuario WHERE identificador=?",
            [$identificador]);
    }

    public static function usuarioCambiarFoto(string $archivo, string $identificador)
    {
        self::ejecutarActualizacion("UPDATE usuario SET fotoPerfil=? WHERE identificador=?", [$archivo, $identificador]);
    }

    /*----------------------------PELICULA-------------------------------*/

    public static function peliculaObtener(string $nombre): ?Pelicula
    {
        $rs = self::ejecutarConsulta(
            "SELECT * FROM pelicula WHERE nombre LIKE ?",
            [$nombre]
        );
        if ($rs) return self::peliculaCrearDesdeRS($rs[0]);
        else return null;
    }

    private static function peliculaCrearDesdeRS(array $pelicula): Pelicula
    {
        return new Pelicula($pelicula["id"], $pelicula["nombre"], $pelicula["anio"], $pelicula["puntuacion"], $pelicula["fechaEntrada"], $pelicula["sinopsis"], $pelicula["trailer"], $pelicula["caratula"]);
    }

    public static function peliculaObtenerPorId(int $peliculaId): ?Pelicula
    {
        $rs = self::ejecutarConsulta(
            "SELECT * FROM pelicula WHERE id=?",
            [$peliculaId]
        );
        if ($rs) return self::peliculaCrearDesdeRS($rs[0]);
        else return null;
    }

    public static function PeliculasObtenerPorIdLista(int $listaId): ?array
    {
        $peliculas = [];
        $rs = self::ejecutarConsulta(
            "SELECT pelicula.* FROM pelicula 
            INNER JOIN listausuariopeliculas ON pelicula.id = listausuariopeliculas.peliculaid 
            LEFT JOIN lista ON listausuariopeliculas.listaId = lista.id 
            WHERE lista.id LIKE ?",
            [$listaId]
        );
        foreach ($rs as $fila) {
            $pelicula = self::peliculaCrearDesdeRS($fila);
            array_push($peliculas, $pelicula);
        }

        if ($rs) {
            return $peliculas;
        }else return null;
    }

    public static function peliculaObtenerTodas(): array
    {
        $datos = [];
        $rs = self::ejecutarConsulta(
            "SELECT * FROM pelicula ORDER BY nombre",
            []
        );

        foreach ($rs as $fila) {
            $persona = self::peliculaCrearDesdeRs($fila);
            array_push($datos, $persona);
        }

        return $datos;
    }

    public static function peliculaObtenerNombrePlataforma(int $id): string
    {
        $categoria = self::plataformaObtenerPorId($id);
        return $categoria->getNombre();
    }

    public static function peliculaInsertar(string $nombre, string $director, string $actores, string $generos, string $plataformas, int $anio, int $puntuacion, string $sinopsis, string $trailer, string $caratula)
    {
        //insercción de película
        self::ejecutarActualizacion("INSERT INTO pelicula (nombre, anio, puntuacion, fechaEntrada, sinopsis, trailer, caratula) VALUES (?, ?, ?, ?, ?, ?, ?);",
            [$nombre, $anio, $puntuacion, date("y-m-d"), $sinopsis, $trailer, $caratula]);
        $peliculaInsertada = self::peliculaObtener($nombre);
        
        //insercción de director
        $rs = self::ejecutarConsulta(
            "SELECT * FROM director WHERE nombre LIKE ?",
            [$director]
        );
        if (!$rs) {
        self::ejecutarActualizacion("INSERT INTO director (nombre) VALUES (?);",
            [$director]);
        }
        $directorInsertado = self::directorObtenerPorNombre($director);
        self::ejecutarActualizacion("INSERT INTO directorespeliculas (peliculaId, directorId) VALUES (?, ?);",
            [$peliculaInsertada->getId(), $directorInsertado->getId()]);
        
        //insercción de actores
        $arrayActores = explode(",", $actores);    
        for($i = 0; $i < count($arrayActores); $i++){
            $rs = self::ejecutarConsulta(
                "SELECT * FROM actor WHERE nombre LIKE ?",
                [$arrayActores[$i]]
            );
            if (!$rs) {
                self::ejecutarActualizacion("INSERT INTO actor (nombre) VALUES (?);",
                    [$arrayActores[$i]]);
            }
        }
        $actoresInsertados = array();
        for($i = 0; $i < count($arrayActores); $i++){
            $actorInsertado = self::actorObtenerPorNombre($arrayActores[$i]);
            array_push($actoresInsertados, $actorInsertado);
        }
        for($i = 0; $i < count($actoresInsertados); $i++){
            self::ejecutarActualizacion("INSERT INTO actorespeliculas (peliculaId, actorId) VALUES (?, ?);",
                [$peliculaInsertada->getId(), $actoresInsertados[$i]->getId()]); 
        }

        //insercción de géneros
        $arrayGeneros = explode(",", $generos);    
        /*for($i = 0; $i < count($arrayGeneros); $i++){
            self::ejecutarActualizacion("INSERT INTO genero (nombre) VALUES (?);",
                [$arrayGeneros[$i]]);
        }*/
        $generosInsertados = array();
        for($i = 0; $i < count($arrayGeneros); $i++){
            $generoInsertado = self::generoObtenerPorNombre($arrayGeneros[$i]);
            array_push($generosInsertados, $generoInsertado);
        }
        for($i = 0; $i < count($generosInsertados); $i++){
            self::ejecutarActualizacion("INSERT INTO generospeliculas (peliculaId, generoId) VALUES (?, ?);",
                [$peliculaInsertada->getId(), $generosInsertados[$i]->getId()]); 
        }

        //insercción de plataformas
        $arrayPlataformas = explode(",", $plataformas);    
        /*for($i = 0; $i < count($arrayPlataformas); $i++){
            self::ejecutarActualizacion("INSERT INTO plataforma (nombre) VALUES (?);",
                [$arrayPlataformas[$i]]);
        }*/
        $plataformasInsertados = array();
        for($i = 0; $i < count($arrayPlataformas); $i++){
            $plataformaInsertado = self::plataformaObtenerPorNombre($arrayPlataformas[$i]);
            array_push($plataformasInsertados, $plataformaInsertado);
        }
        for($i = 0; $i < count($plataformasInsertados); $i++){
            self::ejecutarActualizacion("INSERT INTO plataformaspeliculas (peliculaId, plataformaId) VALUES (?, ?);",
                [$peliculaInsertada->getId(), $plataformasInsertados[$i]->getId()]); 
        }
       
    }

/*---------------------------------GENERO---------------------------------------*/

public static function generoObtenerPorId(int $id): ?Genero
{
    $rs = self::ejecutarConsulta(
        "SELECT * FROM genero WHERE id=?",
        [$id]
    );
    if ($rs) return self::generoCrearDesdeRs($rs[0]);
    else return null;
}

private static function generoCrearDesdeRS(array $genero): Genero
{
    return new Genero($genero["id"], $genero["nombre"]);
}

public static function generoObtener(string $nombre): ?Genero
{
    $rs = self::ejecutarConsulta(
        "SELECT * FROM genero WHERE nombre=?",
        [$nombre]
    );
    if ($rs) return self::generoCrearDesdeRS($rs[0]);
    else return null;
}

public static function generoObtenerPorNombre(string $nombre): ?Genero
    {
        $rs = self::ejecutarConsulta(
            "SELECT * FROM genero WHERE nombre LIKE ?",
            [$nombre]
        );
        if ($rs) return self::generoCrearDesdeRS($rs[0]);
        else return null;
    }

public static function generoObtenerPorPeliculaId(int $id): ?array
{

    $generos = [];

    $rs = self::ejecutarConsulta(
        "SELECT genero.* FROM genero 
        INNER JOIN generospeliculas ON genero.id = generospeliculas.generoId 
        LEFT JOIN pelicula ON generospeliculas.peliculaId = pelicula.id 
        WHERE pelicula.id = ?",
        [$id]
    );

    foreach ($rs as $fila) {
        $genero = self::generoCrearDesdeRS($fila);
        array_push($generos, $genero);
    }


    if ($rs) {
        return $generos;
    } else {
        return null;
    }
}


    /*---------------------------------PLATAFORMA---------------------------------------*/

    public static function plataformaObtenerPorId(int $id): ?Plataforma
    {
        $rs = self::ejecutarConsulta(
            "SELECT * FROM plataforma WHERE id=?",
            [$id]
        );
        if ($rs) return self::plataformaCrearDesdeRs($rs[0]);
        else return null;
    }

    private static function plataformaCrearDesdeRS(array $plataforma): Plataforma
    {
        return new Plataforma($plataforma["id"], $plataforma["nombre"], $plataforma["icono"]);
    }

    public static function plataformaObtener(string $nombre): ?Plataforma
    {
        $rs = self::ejecutarConsulta(
            "SELECT * FROM plataforma WHERE nombre=?",
            [$nombre]
        );
        if ($rs) return self::plataformaCrearDesdeRS($rs[0]);
        else return null;
    }

    public static function plataformaObtenerPorNombre(string $nombre): ?Plataforma
    {
        $rs = self::ejecutarConsulta(
            "SELECT * FROM plataforma WHERE nombre LIKE ?",
            [$nombre]
        );
        if ($rs) return self::plataformaCrearDesdeRS($rs[0]);
        else return null;
    }

    public static function plataformaObtenerPorPeliculaId(int $id): ?array
    {

        $plataformas = [];

        $rs = self::ejecutarConsulta(
            "SELECT plataforma.* FROM plataforma 
            INNER JOIN plataformaspeliculas ON plataforma.id = plataformaspeliculas.plataformaId 
            LEFT JOIN pelicula ON plataformaspeliculas.peliculaId = pelicula.id 
            WHERE pelicula.id = ?",
            [$id]
        );

        foreach ($rs as $fila) {
            $plataforma = self::plataformaCrearDesdeRS($fila);
            array_push($plataformas, $plataforma);
        }


        if ($rs) {
            return $plataformas;
        } else {
            return null;
        }
    }


    /*----------------------------LISTA-------------------------------*/

    public static function listasObtener(int $usuarioId): ?array
    {
        $rs = self::ejecutarConsulta(
            "SELECT * FROM lista WHERE usuarioId=?",
            [$usuarioId]
        );
        $arrayListas = array();
        if ($rs) {
            for ($i = 0; $i < count($rs); $i++) {
                $lista = new Lista($rs[$i]["id"], $rs[$i]["nombre"]);
                array_push($arrayListas, $lista);
            }
            return $arrayListas;
        } else return null;
    }

    public static function crearLista(string $nombre, int $usuarioId):bool
    {
        if ($nombre != "")
            $exito=self::ejecutarActualizacion("INSERT INTO lista (nombre, usuarioId) VALUES (?, ?);",
                [$nombre, $usuarioId]);

        if ($exito){
            return true;
        }else{
            return false;
        }
    }

    public static function modificarLista(string $nombre, int $id)
    {
        self::ejecutarActualizacion("UPDATE lista SET nombre=? WHERE id=?;",
            [$nombre, $id]);
    }

    public static function borrarLista(string $id, int $usuarioId): bool
    {
        $exito = self::ejecutarActualizacion("DELETE FROM lista WHERE id=? && usuarioId=? ;",
            [$id, $usuarioId]);

            if ($exito){
                return true;
            }else{
                return false;
            }
    }

    public static function aniadirPeliculaLista(string $idPelicula, string $idListas): bool //insertar peliculas en una lista si no están ya incluídas en dicha lsita
    {
        $idListas = trim($idListas, ',');
        $arrayId= explode(",", $idListas);
        echo $idListas;
        for($i = 0; $i < count($arrayId); $i++){
            $exito = self::ejecutarActualizacion("INSERT INTO listausuariopeliculas (peliculaId, listaId) SELECT ?, ? 
            WHERE NOT EXISTS(SELECT peliculaId, listaId FROM listausuariopeliculas WHERE peliculaId=? && listaId=?)", 
            [$idPelicula, $arrayId[$i], $idPelicula, $arrayId[$i]]);               
        }
        return $exito;
    }

    public static function aniadirPeliculaFavoritos(int $idPelicula, int $idUsuario) //insertar peliculas en una lista si no están ya incluídas en dicha lsita
    {
        $lista = self::ejecutarConsulta("SELECT * FROM lista WHERE nombre='Favoritos' AND usuarioId = ?", [$idUsuario]);

        $idLista = $lista[0]["id"];
        $exito = self::ejecutarActualizacion("INSERT INTO listausuariopeliculas (peliculaId, listaId) SELECT ?, ? 
            WHERE NOT EXISTS(SELECT peliculaId, listaId FROM listausuariopeliculas WHERE peliculaId=? && listaId=?)", 
            [$idPelicula, $idLista, $idPelicula, $idLista]);   
        return $exito;
    }



    public static function borrarPeliculaLista(int $idPelicula, int $idLista): bool
    {
        $filasAfectadas = self::ejecutarActualizacion("DELETE FROM listausuariopeliculas WHERE peliculaId=? && listaId=?", [$idPelicula, $idLista]);

        
        return $filasAfectadas;
    }

    /*--------------------------------BÚSQUEDA---------------------------------*/

    public static function listarGeneros(): array
    {
        return self::ejecutarConsulta("SELECT nombre FROM genero", []);
    }

    public static function buscarPeliculaPorNombre(string $nombre): ?array
    {
        $peliculas = [];
        $nombreDef = "%" . $nombre . "%";
        $rs = self::ejecutarConsulta(
            "SELECT * FROM pelicula WHERE nombre LIKE ?",
            [$nombreDef]
        );


        foreach ($rs as $fila) {
            $pelicula = self::peliculaCrearDesdeRS($fila);
            array_push($peliculas, $pelicula);
        }


        if ($rs) {
            return $peliculas;
        } else {
            return null;
        }
    }

    public static function buscarPeliculaPorGenero(string $generoNombre): ?array
    {
        $peliculas = [];
        
        $generoNombreDef = "%" . $generoNombre . "%";
        $rs = self::ejecutarConsulta(
            "SELECT pelicula.* FROM pelicula 
            INNER JOIN generospeliculas ON pelicula.id = generospeliculas.peliculaid 
            LEFT JOIN genero ON generospeliculas.generoId = genero.id 
            WHERE genero.nombre LIKE ?",
            [$generoNombreDef]
        );


        foreach ($rs as $fila) {
            $pelicula = self::peliculaCrearDesdeRS($fila);
            array_push($peliculas, $pelicula);
        }


        if ($rs) {
            return $peliculas;
        } else {
            return null;
        }
    }

    public static function buscarPeliculaPorPuntuacion(int $puntuacion): ?array
    {
        $peliculas = [];
        $rs = self::ejecutarConsulta(
            "SELECT * FROM pelicula WHERE puntuacion = ?",
            [$puntuacion]
        );


        foreach ($rs as $fila) {
            $pelicula = self::peliculaCrearDesdeRS($fila);
            array_push($peliculas, $pelicula);
        }


        if ($rs) {
            return $peliculas;
        } else {
            return null;
        }
    }


    public static function listarPlataformas(): array
    {
        return self::ejecutarConsulta("SELECT nombre FROM plataforma", []);
    }

    public static function buscarPeliculaPorPlataforma(string $plataformaNombre): ?array
    {
        $peliculas = [];
        $plataformaNombreDef = "%" . $plataformaNombre . "%";
        $rs = self::ejecutarConsulta(
            "SELECT pelicula.* FROM pelicula 
            INNER JOIN plataformaspeliculas ON pelicula.id = plataformaspeliculas.peliculaid 
            LEFT JOIN plataforma ON plataformaspeliculas.plataformaId = plataforma.id 
            WHERE plataforma.nombre LIKE ?",
            [$plataformaNombreDef]
        );


        foreach ($rs as $fila) {
            $pelicula = self::peliculaCrearDesdeRS($fila);
            array_push($peliculas, $pelicula);
        }


        if ($rs) {
            return $peliculas;
        } else {
            return null;
        }
    }

    public static function buscarPeliculaPorDirector(string $directorNombre): ?array
    {
        $peliculas = [];
        $directorNombreDef = "%" . $directorNombre . "%";
        $rs = self::ejecutarConsulta(
            "SELECT pelicula.* FROM pelicula 
            INNER JOIN directorespeliculas ON pelicula.id = directorespeliculas.peliculaid 
            LEFT JOIN director ON directorespeliculas.directorId = director.id 
            WHERE director.nombre LIKE ? ",
            [$directorNombreDef]
        );


        foreach ($rs as $fila) {
            $pelicula = self::peliculaCrearDesdeRS($fila);
            array_push($peliculas, $pelicula);
        }


        if ($rs) {
            return $peliculas;
        } else {
            return null;
        }
    }

    public static function buscarPeliculaPorActor(string $actorNombre): ?array
    {
        $peliculas = [];
        $actorNombreDef = "%" . $actorNombre . "%";
        $rs = self::ejecutarConsulta(
            "SELECT pelicula.* FROM pelicula 
            INNER JOIN actorespeliculas ON pelicula.id = actorespeliculas.peliculaid 
            LEFT JOIN actor ON actorespeliculas.actorId = actor.id 
            WHERE actor.nombre LIKE ?",
            [$actorNombreDef]
        );


        foreach ($rs as $fila) {
            $pelicula = self::peliculaCrearDesdeRS($fila);
            array_push($peliculas, $pelicula);
        }


        if ($rs) {
            return $peliculas;
        } else {
            return null;
        }
    }

    public static function obtenerUltimasPeliculas(): ?array
    {
        $peliculas = array();
        $rs = self::ejecutarConsulta(
            "SELECT * FROM pelicula WHERE fechaEntrada BETWEEN 
            (CURRENT_DATE-10) AND CURRENT_DATE",
            []
        );

        foreach ($rs as $fila) {
        
            $pelicula = self::peliculaCrearDesdeRS($fila);
            array_push($peliculas, $pelicula);
        }

        if ($rs) {
            return $peliculas;
        } else {
            return null;
        }
    }


/*-------------------------------DIRECTOR----------------------------*/

    public static function directorObtenerPorId(int $id): ?Director
    {
        $rs = self::ejecutarConsulta(
            "SELECT * FROM director WHERE id=?",
            [$id]
        );
        if ($rs) return self::directorCrearDesdeRs($rs[0]);
        else return null;
    }

    public static function directorObtenerPorNombre(string $nombre): ?Director
    {
        $rs = self::ejecutarConsulta(
            "SELECT * FROM director WHERE nombre LIKE ?",
            [$nombre]
        );
        if ($rs) return self::directorCrearDesdeRS($rs[0]);
        else return null;
    }

    private static function directorCrearDesdeRS(array $director): Director
    {
        return new Director($director["id"], $director["nombre"]);
    }

    public static function directorObtenerPorPeliculaId(int $id): ?array
    {
        $directores = array();

        $rs = self::ejecutarConsulta(
            "SELECT director.* FROM director 
            INNER JOIN directorespeliculas ON director.id = directorespeliculas.directorId 
            LEFT JOIN pelicula ON directorespeliculas.peliculaId = pelicula.id 
            WHERE pelicula.id = ?",
            [$id]
        );

        foreach ($rs as $fila) {
            $director = self::directorCrearDesdeRS($fila);
            array_push($directores, $director);
        }

        if ($rs) {
            return $directores;
        } else {
            return null;
        }
    }



    /*-------------------------------ACTOR----------------------------*/

public static function actorObtenerPorId(int $id): ?Actor
{
    $rs = self::ejecutarConsulta(
        "SELECT * FROM actor WHERE id=?",
        [$id]
    );
    if ($rs) return self::actorCrearDesdeRs($rs[0]);
    else return null;
}

public static function actorObtenerPorNombre(string $nombre): ?Actor
    {
        $rs = self::ejecutarConsulta(
            "SELECT * FROM actor WHERE nombre LIKE ?",
            [$nombre]
        );
        if ($rs) return self::actorCrearDesdeRS($rs[0]);
        else return null;
    }

private static function actorCrearDesdeRS(array $actor): Actor
{
    return new Actor($actor["id"], $actor["nombre"]);
}

public static function actorObtenerPorPeliculaId(int $id): ?array
{

    $actores = [];

    $rs = self::ejecutarConsulta(
        "SELECT actor.* FROM actor 
        INNER JOIN actorespeliculas ON actor.id = actorespeliculas.actorId 
        LEFT JOIN pelicula ON actorespeliculas.peliculaId = pelicula.id 
        WHERE pelicula.id = ?",
        [$id]
    );

    foreach ($rs as $fila) {
        $actor = self::actorCrearDesdeRS($fila);
        array_push($actores, $actor);
    }

    if ($rs) {
        return $actores;
    } else {
        return null;
    }
}

/*COMENTARIOS*/

private static function comentarioCrearDesdeRS(array $comentario): Comentario
{
    return new Comentario($comentario["id"], $comentario["mensaje"], $comentario["fechaPublicacion"], $comentario["peliculaId"], $comentario["usuarioId"]);
}

public static function comentariosObtener(int $id): ?array
{

    $comentarios = [];

    $rs = self::ejecutarConsulta(
        "SELECT * FROM comentario WHERE peliculaId = ? ORDER BY fechaPublicacion ASC",
        [$id]
    );

    foreach ($rs as $fila) {
        $comentario = self::comentarioCrearDesdeRS($fila);
        array_push($comentarios, $comentario);
    }

    if ($rs) {
        return $comentarios;
    } else {
        return null;
    }
}

public static function comentarioObtenerInsertado(): ?Comentario
{
    $rs = self::ejecutarConsulta(
        "SELECT * FROM comentario WHERE id IN(SELECT MAX(id) AS maximo FROM comentario ) ",
        []
    );

    if ($rs) return self::comentarioCrearDesdeRs($rs[0]);
        else return null;
}



public static function insertarComentario(string $mensaje, int $peliculaId, int $usuarioId): bool
{
    if ($mensaje != "")
        self::ejecutarActualizacion("INSERT INTO comentario (mensaje, fechaPublicacion, peliculaId, usuarioId) VALUES (?, ?, ?, ?);",
            [$mensaje, date("Y-m-d H:i:s"), $peliculaId, $usuarioId]);
      
}


}