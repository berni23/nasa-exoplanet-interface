/**
 * @description requests the exoplanet csv data through PHP. If exoplanets.csv exists, nothing is downloaded
 * @returns {promise} a promise, with a string message and a status( 400 or 200)
 */

async function requestAPI() {
    const res = await fetch('server/api_requests.php?data=exoplanets').then(res => res.text());
    console.log(res);
}


async function getColumns() {
    const res = await fetch('server/viewmodel.php?columns').then(res => res.text());
    console.log(res);
    return JSON.parse(res);
}

async function getCurrentUser() {

    const res = await fetch('server/sign.php?user').then(res => res.text());
    console.log(res);

}