
export var home = {
    "login" : "lohin - login"
}

$(window).on("load" , function() {
    i18next.addResourceBundle("lang" , "translation" , {home});
});