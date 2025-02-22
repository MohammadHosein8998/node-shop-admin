var category = {
    "validation_parent_id_required" : "لطفا والد دسته را وارد کنید وارد کنید",
    "validation_title_required" : "لطفا عنوان دسته را وارد کنید",
    "validation_title_seo_required" : "لطفا عنوان دسته SEO را وارد کنید",
    "validation_description_seo_required" : "لطفا توضیحات SEO را انتخاب نمایید"
};



$(window).ready(() => {    
    console.log(' i18next is loaded!!');
    i18next.addResourceBundle('lang', 'translation', {category});
});
