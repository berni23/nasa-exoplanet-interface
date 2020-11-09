window.onload = function () {

    var sectionLogin = $('.login');
    var loginTitle = $("#loginTitle");
    var nasaIcon = $("#nasa-icon");
    var loginPanel = $(".login-panel");

    var login = $(".option-login");
    var register = $(".option-register");
    var loginForm = $(".login-form");
    var registerForm = $(".register-form");

    particlesJS.load('particles-js', 'assets/particles.json', function () {

        loginTitle.fadeIn(5000);

        nasaIcon.fadeIn(2000, () => loginPanel.fadeIn(3000));
        // pJSDom[0].pJS.particles.move.enable = false;
    });


    //requestAPI().then(getColumns());




    console.log(login);
    register.on("click", showRegister);
    login.on("click", showLogin)



    function showRegister() {

        register.addClass("option-selected");
        registerForm.removeClass("hidden");

        login.removeClass("option-selected");
        loginForm.addClass("hidden");

    }

    function showLogin() {

        console.log('im clicked bitch!');
        login.addClass("option-selected");
        loginForm.removeClass("hidden");

        register.removeClass("option-selected");
        registerForm.addClass("hidden");

    }

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

    function hideLogin() {

        pJSDom[0].pJS.particles.move.enable = false;

        sectionLogin.fadeOut(5000);

    }



}