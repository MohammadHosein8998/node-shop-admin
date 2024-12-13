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