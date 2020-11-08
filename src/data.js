/**
 * @description gets a files or folders specified
 * @param {string} path path of the desired file
 * @returns {promise} a promise, outputing an array created with the File class (php)
 */
function getData() {
    return fetch('server/data.php?data').then(res => res.text());
}


getData();