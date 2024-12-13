var profile = {
    "validation_fist_name_required" : "لطفا نام را وارد کنید",
    "logvalidation_last_name_required" : "لطفا نام خانوادگی را وارد کنید",
    "validation_email_required" : "لطفا ایمیل را وارد کنید",
    "validation_email_email" : "ایمیل باید معتبر باشد",

};



$(window).ready(() => {    
    console.log(' i18next is loaded!!');
    i18next.addResourceBundle('lang', 'translation', {profile});
});
