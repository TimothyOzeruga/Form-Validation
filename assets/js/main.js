$(function(){
    
    $('#country').on('change', function(){
            $('#phone').val(this.value);
    });

    $(".btn_reg").click(() => {
        let top = $($(this).attr("href")).offset().top;
        $("html, body").animate({scrollTop:top}, 600);
    });

    $(".form_select").on("focus", function(){
        $("#select-labell").addClass("select-label");
    });
    $(".form_select").on("blur", function(){
        if($(".form_select").val()===''){
            $("#select-labell").removeClass("select-label");
        }
    });

    $('#form').submit(function(e) {
        e.preventDefault();
        sendForm($(this));
    });

    function validateEmail(email) {
        const regEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regEmail.test(email);
    }  
    function validatePassword(password) {
        const regPassword = /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])/g
        return regPassword.test(password);
    }  
    function confirmPassword(confPassword){
        let password = $("#password").val();
        return password === confPassword
    }
    // function checkboxCheck(checkbox){
    //     if(!checkbox.is(":checked")){
    //         $('#checkbox_label').removeClass('text_agree2').addClass('text_agree');
    //         return true;
    //     }else{
    //         $('#checkbox_label').removeClass('text_agree').addClass('text_agree2');
    //         return false;
    //     }
    // }
    function removeErr(){
        $('div.err').remove();
        $('#checkbox_label').removeClass('text_agree2').addClass('text_agree');
    }

    function sendForm($form){
        const BOT_TOKEN = '1868758005:AAFgwAos7OsqEj3SOED9FgCKKspGO5USmGQ';
        const CHAT_ID = '-1001207500168';
        let text = "Hello"
        let valid = true;

        $("form").find('*[data-required]').each(function(){
            if($(this).siblings(".err").length) $(this).siblings(".err").remove();
            if($(this).val()===''){
                $(this).parent().append($('<div class="err">Fill in the field</div>'));
                valid = false
            }else{
                if($(this).attr("name") === "first_name"){
                    if ($(this).val().length < 3) {
                        $(this).parent().append($('<div class="err">The name must be more than 2 characters</div>'));
                        $(this).val('');
                        valid = false;
                    }
                }
                if($(this).attr("name") === "second_name"){
                    if ($(this).val().length < 3) {
                        $(this).parent().append($('<div class="err">The name must be more than 2 characters</div>'));
                        $(this).val('');
                        valid = false;
                    }
                }
                if($(this).attr("name") === "phone"){
                    if (isNaN($(this).val())) {
                        $(this).parent().append($('<div class="err">Enter only numbers</div>'));
                        $(this).val('');
                        valid = false;
                    }
                }
                if($(this).attr("name") === "password"){
                    if (!validatePassword($(this).val())) {
                        $(this).parent().append($('<div class="err">Password must have 1 letter, 1 number and one symbol</div>'));
                        $(this).val('');
                        valid = false;
                    }
                }
                if($(this).attr("name") === "conf_pass"){
                    if(confirmPassword($(this).val()) === false){
                        $(this).parent().append($('<div class="err">Password does not match</div>'));
                        $(this).val('');
                        valid = false;
                    }
                }
                if($(this).attr("name") === "email"){
                    if(!validateEmail($(this).val())) {
                        $(this).parent().append($('<div class="err">Email is not correct</div>'));
                        $(this).val('');
                        valid = false;
                    }
                }
                if($(this).attr("name") === "checkbox"){
                    if(!$(this).is(":checked")){
                        $('#checkbox_label').removeClass('text_agree').addClass('text_agree2');
                        valid = false;
                    }
                }
            }
            
            if($('div.err').length){
                setTimeout(function () {
                    removeErr();
                }, 4000)
            }
        });
        if(valid){
           axios
           .get('https://api.telegram.org/bot'+BOT_TOKEN+'/sendMessage?chat_id='+CHAT_ID+'&text='+text)
           .then((resp)=>{
               if(resp.data.ok===true){
                   topPanel.success('Ваши данные отправленны', true);
                   $("#form").trigger('reset');
               }
           })
           .catch((err)=>{
               alert(err);
           });
       }
    }

    const topPanel = {
        success(text = "Some text here", autoclose = true) {
            this.showPanel(text, "success", autoclose);
        },
        showPanel(autoclose) {
            let h = $('<div id="top_panel" class="panel_success"><p>Your data has been successfully sent</p></p></div>');
            $("body").prepend(h);
            if (autoclose) {
                const _this = this;
                setTimeout(function () {
                    _this.closePanel();
                }, 3000);
            }
        },
        closePanel() {
            $("top_panel").remove();
        },
    };

    wow = new WOW(
        {
            boxClass: 'wow',    
            animateClass: 'animate__animated', 
            offset: 20,         
            mobile: true,       
            live: true,    
        }
    )
    wow.init();
});
 
