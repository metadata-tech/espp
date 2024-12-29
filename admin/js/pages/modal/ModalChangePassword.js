function ModalChangePassword () {

    const className = 'ModalChangePassword';
    let self = this;
    let formValidate;
    let userId;

    this.init = function () {
        const vData = [
            {
                field_id: 'txtMpwOldPassword',
                type: 'text',
                name: 'Kata Laluan Sekarang',
                validator: {
                    notEmpty: true,
                    maxLength: 20,
                    minLength: 8
                }
            },
            {
                field_id: 'txtMpwNewPassword',
                type: 'text',
                name: 'Kata Laluan Baharu',
                validator: {
                    notEmpty: true,
                    maxLength: 15,
                    minLength: 8,
                    password: true
                }
            },
            {
                field_id: 'txtMpwConfirmPassword',
                type: 'text',
                name: 'Sahkan Kata Laluan Baharu',
                validator: {
                    notEmpty: true,
                    maxLength: 15,
                    minLength: 8,
                    similar: {
                        id: "txtMpwNewPassword",
                        label: "Kata Laluan Baharu"
                    },
                    password: true
                }
            }
        ];
        formValidate = new MzValidate(false);
        formValidate.registerFields(vData);

        $('#btnMpwSave').on('click', function () {
            if (!formValidate.validateNow()) {
                toastr['error'](_ALERT_MSG_VALIDATION, _ALERT_TITLE_VALIDATION_ERROR);
            } else {
                ShowLoader(); setTimeout(function () { try {
                    let data = {
                        currentPassword: $('#txtMpwOldPassword').val(),
                        confirmPassword: $('#txtMpwConfirmPassword').val()
                    };
                    mzFetch('main/user/changePassword/' + userId, 'PUT', data).then((res) => {
                        $('#modalChangePassword').modal('hide');
                        HideLoader();
                    }).catch((e) => { toastr['error'](e.message !== '' ? e.message : _ALERT_MSG_ERROR_DEFAULT, _ALERT_TITLE_ERROR); });
                } catch (e) { toastr['error'](_ALERT_MSG_ERROR_DEFAULT, _ALERT_TITLE_ERROR); } HideLoader(); }, 200);
            }
        });

        $('#btnShowOldPassword').on('click', function () {
            var x = document.getElementById("txtMpwOldPassword");
            var y = document.getElementById("icnMpwOldPassword");
            if (x.type === "password") {
                x.type = "text";
                y.classList.remove("fa-eye-slash");
                y.classList.add("fa-eye");
            } else {
                x.type = "password";
                y.classList.remove("fa-eye");
                y.classList.add("fa-eye-slash");
            }
        });

        $('#btnShowNewPassword').on('click', function () {
            var x = document.getElementById("txtMpwNewPassword");
            var y = document.getElementById("icnMpwNewPassword");
            if (x.type === "password") {
                x.type = "text";
                y.classList.remove("fa-eye-slash");
                y.classList.add("fa-eye");
            } else {
                x.type = "password";
                y.classList.remove("fa-eye");
                y.classList.add("fa-eye-slash");
            }
        });

        $('#btnShowConfirmPassword').on('click', function () {
            var x = document.getElementById("txtMpwConfirmPassword");
            var y = document.getElementById("icnMpwConfirmPassword");
            if (x.type === "password") {
                x.type = "text";
                y.classList.remove("fa-eye-slash");
                y.classList.add("fa-eye");
            } else {
                x.type = "password";
                y.classList.remove("fa-eye");
                y.classList.add("fa-eye-slash");
            }
        });
    };

    this.edit = function (_userId) {
        try {
            mzEmptyParams([_userId]);
            userId = _userId;
            formValidate.clearValidation();
            $('#modalChangePassword').modal({backdrop: 'static', keyboard: false}).scrollTop(0);
        } catch (e) { toastr['error'](_ALERT_MSG_ERROR_DEFAULT, _ALERT_TITLE_ERROR); }
    };

    this.init();
}