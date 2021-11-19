"use strict";

$(function () {
  var _this2 = this;

  $('#country').on('change', function () {
    $('#phone').val(this.value);
  });
  $(".btn_reg").click(function () {
    var top = $($(_this2).attr("href")).offset().top;
    $("html, body").animate({
      scrollTop: top
    }, 600);
  });
  $(".form_select").on("focus", function () {
    $("#select-labell").addClass("select-label");
  });
  $(".form_select").on("blur", function () {
    if ($(".form_select").val() === '') {
      $("#select-labell").removeClass("select-label");
    }
  });
  $('#form').submit(function (e) {
    e.preventDefault();
    sendForm($(this));
  });

  function validateEmail(email) {
    var regEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regEmail.test(email);
  }

  function validatePassword(password) {
    var regPassword = /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])/g;
    return regPassword.test(password);
  }

  function confirmPassword(confPassword) {
    var password = $("#password").val();
    return password === confPassword;
  }

  function removeErr() {
    $('div.err').remove();
    $('#checkbox_label').removeClass('text_agree2').addClass('text_agree');
  }

  function sendForm($form) {
    var BOT_TOKEN = '1868758005:AAFgwAos7OsqEj3SOED9FgCKKspGO5USmGQ';
    var CHAT_ID = '-1001207500168';
    var text = "Hello";
    var valid = true;
    $("form").find('*[data-required]').each(function () {
      if ($(this).siblings(".err").length) $(this).siblings(".err").remove();

      if ($(this).val() === '') {
        $(this).parent().append($('<div class="err">Fill in the field</div>'));
        valid = false;
      } else {
        if ($(this).attr("name") === "first_name") {
          if ($(this).val().length < 3) {
            $(this).parent().append($('<div class="err">The name must be more than 2 characters</div>'));
            $(this).val('');
            valid = false;
          }
        }

        if ($(this).attr("name") === "second_name") {
          if ($(this).val().length < 3) {
            $(this).parent().append($('<div class="err">The name must be more than 2 characters</div>'));
            $(this).val('');
            valid = false;
          }
        }

        if ($(this).attr("name") === "phone") {
          if (isNaN($(this).val())) {
            $(this).parent().append($('<div class="err">Enter only numbers</div>'));
            $(this).val('');
            valid = false;
          }
        }

        if ($(this).attr("name") === "password") {
          if (!validatePassword($(this).val())) {
            $(this).parent().append($('<div class="err">Password must have 1 letter, 1 number and one symbol</div>'));
            $(this).val('');
            valid = false;
          }
        }

        if ($(this).attr("name") === "conf_pass") {
          if (confirmPassword($(this).val()) === false) {
            $(this).parent().append($('<div class="err">Password does not match</div>'));
            $(this).val('');
            valid = false;
          }
        }

        if ($(this).attr("name") === "email") {
          if (!validateEmail($(this).val())) {
            $(this).parent().append($('<div class="err">Email is not correct</div>'));
            $(this).val('');
            valid = false;
          }
        }

        if ($(this).attr("name") === "checkbox") {
          if (!$(this).is(":checked")) {
            $('#checkbox_label').removeClass('text_agree').addClass('text_agree2');
            valid = false;
          }
        }
      }

      if ($('div.err').length) {
        setTimeout(function () {
          removeErr();
        }, 4000);
      }
    });

    if (valid) {
      axios.get('https://api.telegram.org/bot' + BOT_TOKEN + '/sendMessage?chat_id=' + CHAT_ID + '&text=' + text).then(function (resp) {
        if (resp.data.ok === true) {
          topPanel.success('Ваши данные отправленны', true);
          $("#form").trigger('reset');
        }
      })["catch"](function (err) {
        alert(err);
      });
    }
  }

  var topPanel = {
    success: function success() {
      var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "Some text here";
      var autoclose = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      this.showPanel(text, "success", autoclose);
    },
    showPanel: function showPanel(autoclose) {
      var h = $('<div id="top_panel" class="panel_success"><p>Your data has been successfully sent</p></p></div>');
      $("body").prepend(h);

      if (autoclose) {
        var _this = this;

        setTimeout(function () {
          _this.closePanel();
        }, 3000);
      }
    },
    closePanel: function closePanel() {
      $("top_panel").remove();
    }
  };
  wow = new WOW({
    boxClass: 'wow',
    animateClass: 'animate__animated',
    offset: 20,
    mobile: true,
    live: true
  });
  wow.init();
});