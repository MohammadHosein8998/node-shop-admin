var profile = {
    "validation_fist_name_required" : "لطفا نام را وارد کنید",
    "logvalidation_last_name_required" : "لطفا نام خانوادگی را وارد کنید",
    "validation_email_required" : "لطفا ایمیل را وارد کنید",
    "validation_email_email" : "ایمیل باید معتبر باشد",
    "delete" : "حذف",
    "delete_avatar" : "آیا آواتار حذف شود؟",
    "delete_avatare_yes" : "آواتار حذف شد.",
    "delete_avatare_no" : "آواتار حذف نشد.",
    
};



$(window).ready(() => {    
    console.log(' i18next is loaded!!');
    i18next.addResourceBundle('lang', 'translation', {profile});
});
