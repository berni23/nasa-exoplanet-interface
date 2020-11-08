<?php


session_start();

include "utils.php";

if (isset($_GET['columns'])) {

    //$data = json_decode(file_get_contents('php://input'), true);

    //chmod($destination, 0777);

    echo (json_encode(distanceVSradius()));
}

function distanceVSradius()
{

    if (($fh = fopen('data/exoplanets.csv', 'r+')) != false) {
        $header = fgetcsv($fh, 1000, ",");
        $num_colAxis = array_search('pl_orbsmax', $header);
        $num_radius = array_search('pl_radj', $header);
        $a_AU = array();
        $rad_Rjup = array();

        while (($data = fgetcsv($fh, 1000, ",")) !== false) {

            if ($data[$num_colAxis] && $data[$num_radius]) {
                array_push($a_AU, $data[$num_colAxis]);
                array_push($rad_Rjup, $data[$num_radius]);
            }
        }
        return array(array($a_AU, $rad_Rjup), array("status" => 200, "message" => "data successfully downloaded"));
    } else  array(array(null), array("status" => 400, "message" => "data not found"));
}
