<?php


session_start();

include "utils.php";

$path = "data/bernat/exoplanets.csv";
if (isset($_GET['user'])) echo $_SESSION['username'];

if (isset($_GET['distance_rad'])) {
    $data = distanceVSradius();
    echo json_encode($data);
}

if (isset($_GET['columns'])) {
    $data = json_decode(file_get_contents('php://input'), true);
    $columns = getColumns($data['name'], $data['levelWith']);
    echo json_encode($columns);
}



function distanceVSradius()
{
    if (($fh = fopen("data/bernat/exoplanets.csv", "r+")) !== false) {
        $header = fgetcsv($fh, 1000, ",");
        $num_colAxis = array_search('pl_orbsmax', $header);
        $num_radius = array_search('pl_radj', $header);
        $num_pl_name = array_search('pl_name', $header);
        $a_AU = array();
        $rad_Rjup = array();
        $pl_name = array();

        while (($data = fgetcsv($fh, 1000, ",")) !== false) {
            if ($data[$num_colAxis] && $data[$num_radius]) {
                array_push($a_AU, $data[$num_colAxis]);
                array_push($rad_Rjup, $data[$num_radius]);
                array_push($pl_name, $data[$num_pl_name]);
            }
        }
        return array("status" => 200, "message" => "data successfully downloaded", "data" => array("pl_orbsmax" => $a_AU, "pl_radj" => $rad_Rjup, "pl_name" => $pl_name));
    } else  return array("status" => 400, "message" => "data not found", "data" => null);
}
