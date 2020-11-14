<?php

function test()
{
    return true;
}


function writeCSV($path, $data, $header, $option = 'w')
{

    $fp = fopen($path, $option);
    fputcsv($fp, $header);
    $response = "";

    for ($i = 0; $i < count($data); $i++) {
        fputcsv($fp, $data[$i]);
    }
    if ($data && $fp) $response = 'success';
    else  $response = 'error';
    fclose($fp);
    return $response;
};


//general method for obtaining n columns excluding points where one of the m column is null at that point"
function getColumns($colname, $cols_not_null = [], $path)
{

    if (($fh = fopen($path, "r+")) !== false) {
        $header = fgetcsv($fh, 1000, ",");
        $num_cols = array(); // column numbers ( the ones we want)
        $col_data = array(); // data we want
        $num_cols_not_null = array(); // column numbers we check to be non null

        foreach ($colname as $name) {
            array_push($num_cols, array_search($name, $header));
            $col_data[$name] = array();
        }

        foreach ($cols_not_null as $col)  array_push($num_cols_not_null, array_search($col, $header));
        while (($data = fgetcsv($fh, 1000, ",")) !== false) {

            $push = true;
            $i = 0;
            foreach ($num_cols_not_null as $num) {
                if ($data[$num] == null) {
                    $push = false;
                    break;
                }
            }

            if ($push) {
                foreach ($num_cols as $num) {
                    array_push($col_data[$colname[$i]], $data[$num]);
                    $i++;
                }
            }
        }
        return array("status" => 200, "message" => "data successfully downloaded", "data" => $col_data);
    } else  return array("status" => 400, "message" => "data not found", "data" => null);
}

function getColumn($colname, $path)
{
    if (($fh = fopen($path, "r+")) !== false) {
        $header = fgetcsv($fh, 1000, ",");
        $num_col = array_search($colname, $header);
        $col_data = array();
        while (($data = fgetcsv($fh, 1000, ",")) !== false) {
            array_push($col_data, $data[$num_col]);
        }
    }
    return array("status" => 200, "message" => "data successfully downloaded", "data" => array($colname => $col_data));
}
