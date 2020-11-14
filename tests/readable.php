<?php




use PHPUnit\Framework\TestCase;



final class IsReadableTest extends TestCase
{
    public function testFailure(): void
    {
        $this->assertIsReadable('/server/data/bernat/exoplanets.csv');
    }
}