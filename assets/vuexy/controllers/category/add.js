
$(window).ready( function() {
    
        $('#form_add').validate({
            rules : {
                parent_id : "required",
                slug : {
                    required : true,
                    slug : true,
                },
                title : "required",
                title_seo : "required",
                description_seo : "required",
            },
            messages : {
                parent_id : t("category.validation_parent_id_required"),
                slug : {
                    required : t('validation_slug_required'),
                    slug :  t('validation_slug_invalid')
                },
                title : t("category.validation_title_required"),
                title_seo : t("category.validation_title_seo_required"),
                description_seo : t("category.validation_description_seo_required"),
            }
        });
    })
    
