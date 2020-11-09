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
        pJSDom[0].pJS.particles.move.enable = false;
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


    $('#signin').on("click", function (event) {
        event.preventDefault();
        validateLogin();
    })
    // post


    async function checkUser(data) {

        const res = await fetch('server/sign.php?login', {
            method: 'POST',
            body: JSON.stringify(data)
        }).then(res => res.text());

        res = JSON.parse(res);
        if (res['status'] == 400) {

            $('login-form>.username').after("<div class='error-msg col-lg-12 col-md-8'><p> Incorrect username or password</p></div>");

        }
    }


    function hideLogin() {

        pJSDom[0].pJS.particles.move.enable = false;
        sectionLogin.fadeOut(5000);
    }

    function validateLogin() {

        var formData = Object.fromEntries(new FormData(document.querySelector('.login-form')).entries());
        var errName = "username should contain more <br> than three characters";
        var errPassword = "password must contain an uppercase, <br> a number, and 6 characters minimum";
        var inputs = Array.from(loginForm.children());
        inputs.pop();
        var conditions = [/\b.{3,}\b/, /(?=.*\d)(?=.*[A-Z]).{6,}/];
        var errors = [errName, errPassword];
        if (validateLoop(inputs, conditions, errors)) checkUser(formData);
    }


    /* validation */
    function validate(input, condition, errorMsg) {
        let validation = true;
        if (!condition.test($(input).val())) {
            $(input).after("<div class='error-msg col-lg-12 col-md-8'><p>" + errorMsg + "</p></div>");
            validation = false;
        }
        return validation; // true if validation passed, else false
    }

    function validateLoop(inputs, conditions, messages) {
        clearErrors();
        var valid = true;
        inputs.forEach(function (input, i) {

            console.log(input);
            if (!validate(input, conditions[i], messages[i])) valid = false;

        })

        return valid;
    }

    // clear form errors
    function clearErrors() {
        var errorMsg = $(".error-msg");
        for (let div of errorMsg) $(div).remove();
    }

}