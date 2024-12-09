var home = {
    "test" : "این یک تست اشت",
    "login" : "شما وارد شده اید",
    "yes-logout" : "شما از پروفایل خارج شده اید",
    "no-logout" : "شما از پروفایل خارج نشده اید",

};



$(window).ready(() => {    
    console.log(' i18next is loaded!!')

    i18next.addResourceBundle('lang', 'translation', {home});
});

