<?php



include 'server/csvTools.php';

use PHPUnit\Framework\TestCase;


/** 
 * Testing data reliability and csv Tools 
 * @author Bernat
 */



class test extends TestCase
{
    /** @test */

    public function testDataExists()
    {
        $this->assertFileExists('server/data/bernat/exoplanets.csv');
    }


    public function testDataReadable()
    {
        $this->assertIsReadable('server/data/bernat/exoplanets.csv');
    }

    public function testCSVcolumns()
    {

        $path = "server/data/bernat/exoplanets.csv";
        $col1 = getColumn('pl_letter', $path);
        $col2 = getColumns(['pl_letter'], [], $path);
        $this->assertEquals($col1['status'], $col2['status']);
    }
}
