window.onload = function () {

    var sectionLogin = $('.login');
    var loginTitle = $("#loginTitle");
    var nasaIcon = $("#nasa-icon");
    var loginPanel = $(".login-panel")


    particlesJS.load('particles-js', 'assets/particles.json', function () {

        loginTitle.fadeIn(5000);

        nasaIcon.fadeIn(2000, () => loginPanel.fadeIn(3000));
        pJSDom[0].pJS.particles.move.enable = false;
    });


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


    function showLogin() {

    }

    function hideLogin() {

        pJSDom[0].pJS.particles.move.enable = false;

        sectionLogin.fadeOut(5000);

    }



}