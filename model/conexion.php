<?php
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

define('HOST', 'localhost');
define('USER', 'root');
define('PASSWORD', '');
define('DBNAME', 'diise');
define('TBLNAME', 'bd'); //SOLO TABLA

try {
    $conexion = mysqli_connect(HOST, USER, PASSWORD, DBNAME);
    if (!$conexion) {
        throw new Exception("Error de conexión: " . mysqli_connect_error());
    }
    // Establecer la codificación a UTF-8
    mysqli_set_charset($conexion, 'utf8');
} catch (Exception $e) {
    error_log($e->getMessage());
    exit('Error conectando a la base de datos');
}
