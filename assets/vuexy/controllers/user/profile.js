$(window).ready( function() {
    
    $('#form_profile').validate({
        rules : {
            email : {
                required : true,
                email : true
            },
            first_name : "required",
            last_name : "required"
        },
        messages : {
            email : {
                required : t("profile.validation_email_required"),
                email : t("profile.validation_email_email")
            },
            first_name : t("profile.validation_fist_name_required"),
            last_name : t("profile.logvalidation_last_name_required")
        }
    });
})

function delete_avatar() {
    Swal.fire({
        title: t('profile.delete'),
        text: t('profile.delete_avatar'),
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: t("logout_yes"),
        cancelButtonText: t("logout_no")
      }).then((result) => {
        if (result.isConfirmed) {
            alert(t('profile.delete_avatare_yes'));
            redirect(APP_URL +"user/profile/?del=1")
        }else{
            alert(t("profile.delete_avatare_no"));
        }
      });
}