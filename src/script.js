// particlesJS.load('particles-js', '../assets/particles.json', function () {


//     $("#nasa-logo").fadeIn(5000);
//     $("#nasa-icon").fadeIn(2000, () => $(".login-panel").fadeIn(3000));


// });


window.onload = function () {


    particlesJS.load('particles-js', '../assets/particles.json', function () {


        $("#nasa-logo").fadeIn(5000);
        $("#nasa-icon").fadeIn(2000, () => $(".login-panel").fadeIn(3000));


    });


    async function requestAPI() {
        const res = await fetch('server/api_requests.php?data=exoplanets').then(res => res.text());
        console.log(res);
    }


    async function getColumns() {
        const res = await fetch('server/viewmodel.php?columns').then(res => res.text());
        console.log(res);
    }


    requestAPI().then(getColumns())









    // post

    /*

    async function editFile(path, newName) {
        var data = {
            path: path,
            newname: newName
        }
        const res = await fetch('src/server/files.php?edit', {
            method: 'POST',
            body: JSON.stringify(data)
        });
        return await res.text();
    }
    */
}