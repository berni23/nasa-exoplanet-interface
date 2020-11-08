// particlesJS.load('particles-js', '../assets/particles.json', function () {


//     $("#nasa-logo").fadeIn(5000);
//     $("#nasa-icon").fadeIn(2000, () => $(".login-panel").fadeIn(3000));


// });


window.onload = function () {


    const API_KEY = 'ZCrKb54pVc2uAAtKJ2lTo7v9hPSKloPXkenCr1X8';
    const ENDPOINT = 'https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?';

    /**
     * @description downloads confirmed planets transiting their host stars
     * @returns {promise} a promise
     */

    async function getData() {
        const res = await fetch(ENDPOINT + '?api_key=' + API_KEY + '&table=exoplanets&format=csv').then(res => res.text());
        return res;
    }



    getData().then(res => console.log(res));

}