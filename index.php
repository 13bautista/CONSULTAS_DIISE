<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

/* MANEJO DE SOLICITUDES */

if (isset($_GET['view'])) {
    $selectedView = $_GET['view'];
    if ($selectedView === "reporte1") {
        $pageTitle = "Reporte 1";
        $formView = "Reportes/reporte1";
        //$data = ;
    } elseif ($selectedView === "reporte2") {
        $pageTitle = "Reporte 2";
        $formView = "Reportes/reporte2";
    } elseif ($selectedView === "reporte3") {
        $pageTitle = "Reporte 3";
        $formView =  "Reportes/reporte3";
    } elseif ($selectedView === "reporte4") {
        $pageTitle = "Reporte 4";
        $formView = "Reportes/reporte4";
    } elseif ($selectedView === "reporte5") {
        $pageTitle = "Reporte 5";
        $formView = "Reportes/reporte5";
    } elseif ($selectedView === "consultas") {
        $pageTitle = "Consultas";
        $breadcrumb = '<ol class="breadcrumb"><li class="breadcrumb-item"><a href="index.php">Inicio</a></li><li class="breadcrumb-item active">Consultas</li></ol>';
        $formView = "form";
    } else {
        // Default to Consultas if no or invalid view is provided
        $pageTitle = "Consultas";
        $breadcrumb = '<ol class="breadcrumb"><li class="breadcrumb-item"><a href="index.php">Inicio</a></li><li class="breadcrumb-item active">Consultas</li></ol>';
        $formView = "form";
    }
} else {
    // Default to Consultas if no view is provided
    $pageTitle = "Consultas";
    $breadcrumb = '<ol class="breadcrumb"><li class="breadcrumb-item"><a href="index.php">Inicio</a></li><li class="breadcrumb-item active">Consultas</li></ol>';
    $formView = "form";
}
$tableView = "tabla";
include "view/template.php";
