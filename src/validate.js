function validateInput(input, condition, errorMsg) {
    let validation = true;
    if (!condition.test($(input).val())) {
        $(input).after("<div class='error-msg'><p>" + errorMsg + "</p></div>");
        validation = false;
    }
    return validation; // true if validation passed, else false
}

function validateLoop(inputs, conditions, messages) {
    clearErrors();
    var valid = true;
    inputs.forEach(function (input, i) {
        if (!validateInput(input, conditions[i], messages[i])) valid = false;
    })

    return valid;
}

// clear form errors
function clearErrors() {
    var errorMsg = $(".error-msg");
    for (let div of errorMsg) $(div).remove();
}