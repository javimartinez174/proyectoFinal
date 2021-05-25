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

class Usuario extends Dato
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

class Pelicula extends Dato
{
    use Identificable;

    private string $nombre;

    private int $anio;

    private int $puntuacion;

    private string $fechaEntrada;

    public function __construct(int $id, string $nombre, int $anio, int $puntuacion, string $fechaEntrada)
    {
        $this->setId($id);
        $this->setNombre($nombre);
        $this->setAnio($anio);
        $this->setPuntuacion($puntuacion);
        $this->setFechaEntrada($fechaEntrada);
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
class Director extends Dato
{
    use Identificable;

    private string $nombre;
    private String $apellidos;

    public function __construct(int $id, string $nombre, string $apellidos)
    {
        $this->setId($id);
        $this->setNombre($nombre);
        $this->setApellidos($apellidos);
    }

    public function getNombre(): string
    {
        return $this->nombre;
    }

    public function setNombre(string $nombre)
    {
        $this->nombre = $nombre;
    }

    public function getApellidos(): string
    {
        return $this->apellidos;
    }

    public function setApellidos(string $apellidos)
    {
        $this->apellidos = $apellidos;
    }
}


/*----------------------------------LISTA--------------------------------*/
class Actor extends Dato
{
    use Identificable;

    private string $nombre;
    private string $apellidos;

    public function __construct(int $id, string $nombre, string $apellidos)
    {
        $this->setId($id);
        $this->setNombre($nombre);
        $this->setApellidos($apellidos);
    }

    public function getNombre(): string
    {
        return $this->nombre;
    }

    public function setNombre(string $nombre)
    {
        $this->nombre = $nombre;
    }

    public function getApellidos(): string
    {
        return $this->apellidos;
    }

    public function setApellidos(string $apellidos)
    {
        $this->apellidos = $apellidos;
    }
}