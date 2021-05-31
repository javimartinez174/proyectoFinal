<?php

trait Identificable
{
    protected int $id;

    public function getId(): int
    {
        return $this->id;
    }

    public function setId(int $id)
    {
        $this->id = $id;
    }
}

abstract class Dato
{
}

/*--------------------------------USUARIO----------------------------------*/

class Usuario extends Dato implements JsonSerializable
{
    use Identificable;

    private string $identificador;

    private string $nombre;

    private string $apellidos;

    private string $email;

    private string $contrasenna;

    private string $fotoPerfil;

    public function __construct(int $id, string $identificador, string $nombre, string $apellidos, string $email, string $contrasenna, string $fotoPerfil)
    {
        $this->setId($id);
        $this->setIdentificador($identificador);
        $this->setNombre($nombre);
        $this->setApellidos($apellidos);
        $this->setEmail($email);
        $this->setContrasenna($contrasenna);
        $this->setFotoPerfil($fotoPerfil);
    }

    public function jsonSerialize()
    {
        return [
            "id" => $this->id,
            "identificador" => $this->identificador,
            "nombre" => $this->nombre,
            "apellidos" => $this->apellidos,
            "email" => $this->email,
            "contrasenna" => $this->contrasenna,
            "fotoPerfil" => $this->fotoPerfil,
        ];

    }

    public function getNombre(): string
    {
        return $this->nombre;
    }

    public function setNombre(string $nombre)
    {
        $this->nombre = $nombre;
    }

    public function getIdentificador(): string
    {
        return $this->identificador;
    }

    public function setIdentificador(string $identificador)
    {
        $this->identificador = $identificador;
    }

    public function getApellidos(): string
    {
        return $this->apellidos;
    }

    public function setApellidos(string $apellidos)
    {
        $this->apellidos = $apellidos;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function setEmail(string $email)
    {
        $this->email = $email;
    }

    public function getContrasenna(): string
    {
        return $this->contrasenna;
    }

    public function setContrasenna(string $contrasenna)
    {
        $this->contrasenna = $contrasenna;
    }

    public function getFotoPerfil(): string
    {
        return $this->fotoPerfil;
    }

    public function setFotoPerfil(string $fotoPerfil)
    {
        $this->fotoPerfil = $fotoPerfil;
    }
}

/* ------------------------PELÍCULA----------------------------*/

class Pelicula extends Dato implements JsonSerializable
{
    use Identificable;

    private string $nombre;

    private int $anio;

    private int $puntuacion;

    private string $fechaEntrada;
     
    private string $sinopsis;

    private string $trailer;

    public function __construct(int $id, string $nombre, int $anio, int $puntuacion, string $fechaEntrada, string $sinopsis, string $trailer)
    {
        $this->setId($id);
        $this->setNombre($nombre);
        $this->setAnio($anio);
        $this->setPuntuacion($puntuacion);
        $this->setFechaEntrada($fechaEntrada);
        $this->setSinopsis($sinopsis);
        $this->setTrailer($trailer);
    }

    public function jsonSerialize()
    {
        return [
            "id" => $this->id,
            "nombre" => $this->nombre,
            "anio" => $this->anio,
            "puntuacion" => $this->puntuacion,
            "fechaEntrada" => $this->fechaEntrada,
            "sinopsis" => $this->sinopsis,
            "trailer" => $this->trailer,
        ];

        // Esto sería lo mismo:
        //$array["nombre"] = $this->nombre;
        //$array["id"] = $this->id;
        //return $array;
    }

    public function getNombre(): string
    {
        return $this->nombre;
    }

    public function setNombre(string $nombre)
    {
        $this->nombre = $nombre;
    }

    public function getAnio(): int
    {
        return $this->anio;
    }

    public function setAnio(int $anio)
    {
        $this->anio = $anio;
    }

    public function getPuntuacion(): int
    {
        return $this->puntuacion;
    }

    public function setPuntuacion(int $puntuacion)
    {
        $this->puntuacion = $puntuacion;
    }

    public function getFechaEntrada(): string
    {
        return $this->fechaEntrada;
    }

    public function setFechaEntrada(string $fechaEntrada)
    {
        $this->fechaEntrada = $fechaEntrada;
    }

    public function getSinopsis(): string
    {
        return $this->sinopsis;
    }

    public function setSinopsis(string $sinopsis)
    {
        $this->sinopsis = $sinopsis;
    }

    public function getTrailer(): string
    {
        return $this->trailer;
    }

    public function setTrailer(string $trailer)
    {
        $this->trailer = $trailer;
    }

}

/*----------------------------------PLATAFORMA--------------------------------*/

class Plataforma extends Dato
{
    use Identificable;

    private string $nombre;

    public function __construct(int $id, string $nombre)
    {
        $this->setId($id);
        $this->setNombre($nombre);
    }

    public function getNombre(): string
    {
        return $this->nombre;
    }

    public function setNombre(string $nombre)
    {
        $this->nombre = $nombre;
    }
}

/*----------------------------------LISTA--------------------------------*/

class Lista extends Dato
{
    use Identificable;

    private string $nombre;

    public function __construct(int $id, string $nombre)
    {
        $this->setId($id);
        $this->setNombre($nombre);
    }

    public function getNombre(): string
    {
        return $this->nombre;
    }

    public function setNombre(string $nombre)
    {
        $this->nombre = $nombre;
    }
}

/*----------------------------------GENERO--------------------------------*/

class Genero extends Dato
{
    use Identificable;

    private string $nombre;

    public function __construct(int $id, string $nombre)
    {
        $this->setId($id);
        $this->setNombre($nombre);
    }

    public function getNombre(): string
    {
        return $this->nombre;
    }

    public function setNombre(string $nombre)
    {
        $this->nombre = $nombre;
    }
}


/*----------------------------------DIRECTOR--------------------------------*/
class Director extends Dato implements JsonSerializable
{
    use Identificable;

    private string $nombre;

    public function __construct(int $id, string $nombre)
    {
        $this->setId($id);
        $this->setNombre($nombre);
    }

    public function jsonSerialize()
    {
        return [
            "id" => $this->id,
            "nombre" => $this->nombre,
        ];

        // Esto sería lo mismo:
        //$array["nombre"] = $this->nombre;
        //$array["id"] = $this->id;
        //return $array;
    }

    public function getNombre(): string
    {
        return $this->nombre;
    }

    public function setNombre(string $nombre)
    {
        $this->nombre = $nombre;
    }

}


/*----------------------------------ACTOR--------------------------------*/
class Actor extends Dato implements JsonSerializable
{
    use Identificable;

    private string $nombre;

    public function __construct(int $id, string $nombre)
    {
        $this->setId($id);
        $this->setNombre($nombre);
    }

    public function jsonSerialize()
    {
        return [
            "id" => $this->id,
            "nombre" => $this->nombre,
        ];
    }

    public function getNombre(): string
    {
        return $this->nombre;
    }

    public function setNombre(string $nombre)
    {
        $this->nombre = $nombre;
    }

}

/*----------------------------------COMENTARIO/CRITICA--------------------------------*/
class Comentario extends Dato implements JsonSerializable
{
    use Identificable;

    private string $mensaje;

    private string $fechaPublicacion;

    private int $peliculaId;

    private int $usuarioId;

    public function __construct(int $id, string $mensaje, string $fechaPublicacion, int $peliculaId, int $usuarioId)
    {
        $this->setId($id);
        $this->setMensaje($mensaje);
        $this->setFechaPublicacion($fechaPublicacion);
        $this->setPeliculaId($peliculaId);
        $this->setUsuarioId($usuarioId);
    }

    public function jsonSerialize()
    {
        return [
            "id" => $this->id,
            "mensaje" => $this->mensaje,
            "fechaPublicacion" => $this->fechaPublicacion,
            "peliculaId" => $this->peliculaId,
            "usuarioId" => $this->usuarioId,
        ];
    }

    public function getMensaje(): string
    {
        return $this->mensaje;
    }

    public function setMensaje(string $mensaje)
    {
        $this->mensaje = $mensaje;
    }

    public function getFechaPublicacion(): string
    {
        return $this->fechaPublicacion;
    }

    public function setFechaPublicacion(string $fechaPublicacion)
    {
        $this->fechaPublicacion = $fechaPublicacion;
    }

    public function getPeliculaId(): int
    {
        return $this->peliculaId;
    }

    public function setPeliculaId(int $peliculaId)
    {
        $this->peliculaId = $peliculaId;
    }

    public function getUsuarioId(): int
    {
        return $this->usuarioId;
    }

    public function setUsuarioId(int $usuarioId)
    {
        $this->usuarioId = $usuarioId;
    }
}