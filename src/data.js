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