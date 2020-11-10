/**
 * @description requests the exoplanet csv data through PHP. If exoplanets.csv exists, nothing is downloaded
 * @returns {promise} a promise, with a string message and a status( 400 or 200)
 */

async function requestAPI() {
    const res = await fetch('server/api_requests.php?data=exoplanets');
    return await res.text();
}


async function getColumns() {
    const res = await fetch('server/viewmodel.php?columns');
    return await res.text();

}

async function getCurrentUser() {
    const res = await fetch('server/sign.php?user');
    return await res.text();

}





function dataScatter(dataX, dataY) {
    var data = dataX.map(function (x, i) {
        return {
            'x': x,
            'y': dataY[i]
        }
    });
    return data;

}

// astronomy constants in international units


function getAstroConstants() {
    return {
        Rearth: 6378000.0,
        Rjup: 71492000.0,
        AU: 149600000000.0,
        Msun: 1.9890000000000002e+30,
        Mearth: 5.974e+24,
        parsec: 3.086e+16,
        Lsun: 3.85e+26,
        Rsun: 696000000.0,
        ly: 9461000000000000.0,
        Tearth: 288
    }
}