// particlesJS.load('particles-js', '../assets/particles.json', function () {


//     $("#nasa-logo").fadeIn(5000);
//     $("#nasa-icon").fadeIn(2000, () => $(".login-panel").fadeIn(3000));


// });


window.onload = function () {

    async function getData() {
        const res = await fetch('server/api_requests.php?data=exoplanets').then(res => res.text());
        console.log(res);
    }



    getData();

}