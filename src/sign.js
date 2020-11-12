$(document).ready(function () {

    var sectionLogin = $('.login');
    var loginTitle = $("#loginTitle");
    var nasaIcon = $("#nasa-icon");
    var loginPanel = $(".login-panel");
    var login = $(".option-login");
    var register = $(".option-register");
    var loginForm = $(".login-form");
    var registerForm = $(".register-form");

    particlesJS.load('particles-js', 'assets/particles.json', function () {

        // pJSDom[0].pJS.particles.move.enable = false;
        loginTitle.fadeIn(5000);
        nasaIcon.fadeIn(2000, () => loginPanel.fadeIn(3000));
    })


    register.on("click", showRegister);
    login.on("click", showLogin);

    $('#signin').on("click", function (event) {
        event.preventDefault();
        var data = validate();
        if (data[0] && checkUser(data[1])) hideLogin();

    })

    $('#signup').on("click", function (event) {
        event.preventDefault();
        var data = validateRegister();
        if (data[0] && checkUser(data[1])) hideLogin();


    })

    function showRegister() {
        register.addClass("option-selected");
        registerForm.removeClass("hidden");
        login.removeClass("option-selected");
        loginForm.addClass("hidden");
    }

    function showLogin() {
        login.addClass("option-selected");
        loginForm.removeClass("hidden");
        register.removeClass("option-selected");
        registerForm.addClass("hidden");
    }

    async function checkUser(data) {
        var res = await fetch('server/sign.php', {
            method: 'POST',
            body: JSON.stringify(data)
        }).then(res => res.json());

        if (res['status'] == 400) {
            $('login-form>.username').after(`<div class='error-msg'><p>${res['message']}</p></div>`);
            return false
        } else return true;
    }

    function hideLogin() {
        pJSDom[0].pJS.particles.move.enable = false;
        sectionLogin.fadeOut(3000, () => window.location = "app.html");
    }

    function validate(action = "login") {
        var formData = Object.fromEntries(new FormData(document.querySelector(`.${action}-form`)).entries());
        formData.action = action;
        var errName = "username should contain more <br> than three characters";
        var errPassword = "password must contain an uppercase, <br> a number, and 6 characters minimum";
        var inputs = Array.from(loginForm.children());
        inputs.pop();
        var conditions = [/\b.{3,}\b/, /(?=.*\d)(?=.*[A-Z]).{6,}/];
        var errors = [errName, errPassword];
        return [validateLoop(inputs, conditions, errors), formData];
    }

    function validateRegister() {
        var input = $(".register-form input[name='confirm password']");
        if ($(".register-form input[name='password']").val() != input.val()) {

            $(input).after("<div class='error-msg col-lg-12 col-md-8'><p>passwords must match</p></div>");

            return [false, null];
        } else return validate('register');
    }


});