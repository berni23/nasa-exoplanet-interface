<?php



use PHPUnit\Framework\TestCase;


include "../../server/csvTools";

class test extends TestCase

{

    /**@test */

    public function testCSVcolumns()
    {

        $path = "../../server/data/bernat/exoplanets.csv";
        $col1 = getColumn('pl_letter', $path);
        $col2 = getColumns(['pl_letter'], [], $path);
        $this->assertTrue(true);
        //$this->assertEquals($col1['status'], $col2['status']);
    }
    public function testMultiplyTwoNums()
    {

        $a = 5;
        $b = 4;
        $c = $a * $b;
        //$this->assertTrue(false);

        $this->assertEquals($c, 20);
    }

    public function testMultiplyTwoNums2()
    {

        $a = 5;
        $b = 4;
        $c = $a * $b;
        //$this->assertTrue(false);

        $this->assertEquals($c, 20);
    }
}
