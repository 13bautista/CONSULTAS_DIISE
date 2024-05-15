<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
require_once 'conexion.php'; // Verificar y corregir la ruta del archivo de conexión

class ReportesModel
{
    private $conexion;

    // Utilizar el tipo de dato correcto para la conexión en el constructor
    public function __construct(mysqli $conexion)
    {
        $this->conexion = $conexion;
    }

    // Método para ejecutar consultas preparadas de forma segura y reutilizable
    private function ejecutarConsulta($query, $params = array())
    {
        $stmt = mysqli_prepare($this->conexion, $query);

        if ($stmt) {
            $types = ''; // Initialize the string for types
            $bindParams = []; // Array to store references to the types and parameters

            if (!empty($params)) {
                foreach ($params as $param) {
                    if (is_int($param)) {
                        $types .= 'i';
                    } elseif (is_float($param)) {
                        $types .= 'd';
                    } elseif (is_string($param)) {
                        $types .= 's';
                    } else {
                        $types .= 'b';
                    }
                }
                // Prepare the parameters for binding
                $bindParams[] = &$types;
                foreach ($params as $key => &$value) {
                    $bindParams[] = &$value;
                }

                // Call user_func_array with a reference to the method's arguments
                $func = 'mysqli_stmt_bind_param';
                if (!call_user_func_array($func, array_merge([$stmt], $bindParams))) {
                    throw new Exception('Binding parameters failed: ' . mysqli_error($this->conexion));
                }
            }

            mysqli_stmt_execute($stmt);
            $result = mysqli_stmt_get_result($stmt);

            if (!$result) {
                throw new Exception('Consulta fallida: ' . mysqli_error($this->conexion));
            }
            mysqli_stmt_close($stmt);
            return $result;
        } else {
            throw new Exception('Error al preparar la consulta: ' . mysqli_error($this->conexion));
        }
    }

    // Método para obtener los atributos de la tabla bdv52
    public function obtenerAtributos()
    {
        // Consulta SQL para obtener los nombres de las columnas, excluyendo los atributos mencionados
        $query = "SELECT COLUMN_NAME 
        FROM INFORMATION_SCHEMA.COLUMNS 
        WHERE TABLE_SCHEMA = ? 
        AND TABLE_NAME = ? 
        AND COLUMN_NAME NOT IN ('NUMERO_REGISTRO', 'ORDINARIO_DUPLICADO', 'ID_ARCHIVO', 'ID')";

        // Parámetros para la consulta preparada
        $params = [DBNAME, TBLNAME];

        // Ejecutar la consulta
        $result = $this->ejecutarConsulta($query, $params);

        // Obtener y devolver los nombres de las columnas
        $atributos = mysqli_fetch_all($result, MYSQLI_ASSOC);
        return array_column($atributos, 'COLUMN_NAME');
    }

    // Método para obtener registros por contrato
    public function obtenerRegistrosPorContrato($contrato)
    {
        $query = "SELECT * FROM " . TBLNAME . " WHERE CONTRATO = ?";
        $params = [$contrato];
        $result = $this->ejecutarConsulta($query, $params);
        return mysqli_fetch_all($result, MYSQLI_ASSOC);
    }

    // Método para obtener opciones de filtros seguros
    public function obtenerOpcionesFiltros($atributo)
    {
        $query = "SELECT DISTINCT $atributo FROM " . TBLNAME;
        $result = $this->ejecutarConsulta($query, []);
        return mysqli_fetch_all($result, MYSQLI_ASSOC);
    }
    public function obtenerOpcionesCarteras()
    {
        $query = "SELECT DISTINCT ID_CARTERA_INVERSION FROM " . TBLNAME;
        $result = $this->ejecutarConsulta($query, []);
        return mysqli_fetch_all($result, MYSQLI_ASSOC);
    }
    public function obtenerOpcionesProyectos()
    {
        $query = "SELECT DISTINCT PROYECTO FROM " . TBLNAME;
        $result = $this->ejecutarConsulta($query, []);
        return mysqli_fetch_all($result, MYSQLI_ASSOC);
    }
    public function obtenerOpcionesEntidades()
    {
        $query = "SELECT DISTINCT ENTIDAD_FEDERATIVA FROM " . TBLNAME;
        $result = $this->ejecutarConsulta($query, []);
        return mysqli_fetch_all($result, MYSQLI_ASSOC);
    }
    public function obtenerOpcionesVueltas()
    {
        $query = "SELECT DISTINCT VUELTA_PROCEDIMIENTO FROM " . TBLNAME;
        $result = $this->ejecutarConsulta($query, []);
        return mysqli_fetch_all($result, MYSQLI_ASSOC);
    }
    public function obtenerOpcionesNumeros()
    {
        $query = "SELECT DISTINCT NUMERO_PARTIDA FROM " . TBLNAME;
        $result = $this->ejecutarConsulta($query, []);
        return mysqli_fetch_all($result, MYSQLI_ASSOC);
    }
    public function obtenerOpcionesDescripciones()
    {
        $query = "SELECT DISTINCT DESCRIPCION_DETALLE_BIEN FROM " . TBLNAME;
        $result = $this->ejecutarConsulta($query, []);
        return mysqli_fetch_all($result, MYSQLI_ASSOC);
    }
    public function obtenerOpcionesAdjudicados()
    {
        $query = "SELECT DISTINCT ADJUDICADO FROM " . TBLNAME;
        $result = $this->ejecutarConsulta($query, []);
        return mysqli_fetch_all($result, MYSQLI_ASSOC);
    }
    public function obtenerOpcionesProveedores()
    {
        $query = "SELECT DISTINCT PROVEEDOR FROM " . TBLNAME;
        $result = $this->ejecutarConsulta($query, []);
        return mysqli_fetch_all($result, MYSQLI_ASSOC);
    }
    public function obtenerOpcionesContratos()
    {
        $query = "SELECT DISTINCT CONTRATO FROM " . TBLNAME;
        $result = $this->ejecutarConsulta($query, []);
        return mysqli_fetch_all($result, MYSQLI_ASSOC);
    }
    public function obtenerOpcionesPrecios()
    {
        $query = "SELECT DISTINCT PRECIO_UNITARIO_CON_IVA FROM " . TBLNAME;
        $result = $this->ejecutarConsulta($query, []);
        return mysqli_fetch_all($result, MYSQLI_ASSOC);
    }
    public function obtenerOpcionesCantidades()
    {
        $query = "SELECT DISTINCT CANTIDAD_DEMANDA FROM " . TBLNAME;
        $result = $this->ejecutarConsulta($query, []);
        return mysqli_fetch_all($result, MYSQLI_ASSOC);
    }
    public function obtenerOpcionesSubpartidas()
    {
        $query = "SELECT DISTINCT NUMERO_SUBPARTIDA_BLOQUE FROM " . TBLNAME;
        $result = $this->ejecutarConsulta($query, []);
        return mysqli_fetch_all($result, MYSQLI_ASSOC);
    }
    public function obtenerOpcionesMarcas()
    {
        $query = "SELECT DISTINCT MARCA FROM " . TBLNAME;
        $result = $this->ejecutarConsulta($query, []);
        return mysqli_fetch_all($result, MYSQLI_ASSOC);
    }
    public function obtenerOpcionesModelos()
    {
        $query = "SELECT DISTINCT MODELO FROM " . TBLNAME;
        $result = $this->ejecutarConsulta($query, []);
        return mysqli_fetch_all($result, MYSQLI_ASSOC);
    }
    public function obtenerOpcionesSeries()
    {
        $query = "SELECT DISTINCT NUM_SERIE FROM " . TBLNAME;
        $result = $this->ejecutarConsulta($query, []);
        return mysqli_fetch_all($result, MYSQLI_ASSOC);
    }
    public function obtenerOpcionesClueses()
    {
        $query = "SELECT DISTINCT CLUES_SOLICITUD FROM " . TBLNAME;
        $result = $this->ejecutarConsulta($query, []);
        return mysqli_fetch_all($result, MYSQLI_ASSOC);
    }
    public function obtenerOpcionesSolicitudes()
    {
        $query = "SELECT DISTINCT NOMBRE_CLUES_SOLICITUD FROM " . TBLNAME;
        $result = $this->ejecutarConsulta($query, []);
        return mysqli_fetch_all($result, MYSQLI_ASSOC);
    }
    public function obtenerOpcionesEstatuss()
    {
        $query = "SELECT DISTINCT ESTATUS FROM " . TBLNAME;
        $result = $this->ejecutarConsulta($query, []);
        return mysqli_fetch_all($result, MYSQLI_ASSOC);
    }
    public function obtenerOpcionesAdquisiciones()
    {
        $query = "SELECT DISTINCT OBSERVACIONES_ADQUISICION FROM " . TBLNAME;
        $result = $this->ejecutarConsulta($query, []);
        return mysqli_fetch_all($result, MYSQLI_ASSOC);
    }
    public function obtenerOpcionesAdquiridas()
    {
        $query = "SELECT DISTINCT CANTIDAD_ADQUIRIDA FROM " . TBLNAME;
        $result = $this->ejecutarConsulta($query, []);
        return mysqli_fetch_all($result, MYSQLI_ASSOC);
    }
    // Método para obtener opciones de filtros seguros
    public function obtenerConsultaFiltros($datos)
    {
        // Decodificar los datos JSON recibidos
        $datos = json_decode($datos, true);
        echo $datos;

        // Obtener columnas seleccionadas
        $columnas = array_keys($datos['columnas']);

        // Construir la parte SELECT de la consulta
        $select = implode(', ', $columnas);

        // Construir la parte WHERE de la consulta
        $filtro = $datos['filtro'];
        $opcionesFiltro = implode("', '", $datos['opcionesFiltro']);
        $where = "$filtro IN ('$opcionesFiltro')";

        // Construir la consulta SQL completa
        $query = "SELECT $select FROM TBLNAME WHERE $where";

        // Ejecutar la consulta
        $result = $this->ejecutarConsulta($query, []);

        // Obtener y devolver los resultados de la consulta
        return mysqli_fetch_all($result, MYSQLI_ASSOC);
    }

    public function obtenerConsulta($atributos)
    {
        // Decodificar el JSON en un array asociativo
        $datos = json_decode($atributos, true);

        // Verificar si se decodificó correctamente el JSON
        if ($datos !== null) {
            // Obtener las columnas seleccionadas
            $columnas = implode(', ', $datos['columnas']);

            // Inicializar array para almacenar las condiciones de filtro
            $condiciones = [];

            // Inicializar array asociativo para agrupar valores por propiedad
            $valoresPorPropiedad = [];

            // Recorrer los filtros seleccionados
            foreach ($datos['filtro'] as $filtro) {
                // Obtener el nombre del filtro y su valor
                preg_match('/\[([^\]]+)\]:([^;]+)/', $filtro, $matches);
                $nombreFiltro = trim($matches[1]);
                $valorFiltro = trim($matches[2]);

                // Eliminar la llave al final del valor del filtro
                $valorFiltro = rtrim($valorFiltro, '}');

                // Agregar el valor al array asociativo por propiedad
                $valoresPorPropiedad[$nombreFiltro][] = $valorFiltro;
            }

            // Construir las condiciones de filtro para cada propiedad
            foreach ($valoresPorPropiedad as $propiedad => $valores) {
                $condiciones[] = "$propiedad IN ('" . implode("','", $valores) . "')";
            }

            // Construir la consulta SQL completa
            $whereClause = implode(' AND ', $condiciones);

            $query = "SELECT DISTINCT " . $columnas . " FROM " . TBLNAME . " WHERE " . $whereClause;

            // Retornar la consulta SQL en lugar de imprimirla
            $result = $this->ejecutarConsulta($query, []);

            return mysqli_fetch_all($result, MYSQLI_ASSOC);
        } else {
            // Retornar un mensaje de error si no se recibieron los parámetros GET
            return "Error: No se recibieron los parámetros GET.";
        }
    }
}
