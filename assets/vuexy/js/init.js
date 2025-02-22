
$(document).ready(function(){

    i18next.init({
      resources : {
          lang : {
              translation : JS_LANG
          }
      }
    });
    
    i18next.changeLanguage('lang');
    
    if(jQuery.validator){
        jQuery.validator.addMethod("slug", function(value, element) {
            // allow any non-whitespace characters as the host part
            return this.optional( element ) || /^[a-z0-9-]+$/.test( value );
          }, t('validation_slug_invalid'));
    }

});





$(window).on('load', function() {
    if (feather) {
        feather.replace({
            width: 14,
            height: 14
        });
    }
})
    

function t(key, data={}){
    return i18next.t(key, data);
}

function logout(){
    Swal.fire({
        title: t('logout_title'),
        text: t('logout_text'),
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: t("logout_yes"),
        cancelButtonText: t("logout_no")
      }).then((result) => {
        if (result.isConfirmed) {
            alert(t('home.yes-logout'));
            redirect(APP_URL +"user/logout")
        }else{
            alert(t("home.no-logout"));
        }
      });
}


function redirect(url = ''){
    location.href = url;    
}
