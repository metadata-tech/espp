function ModalChangeProfile() {

  const className = "ModalChangeProfile";
  let self = this;
  let formValidate;
  let userId;
  let profile;

  this.init = function () {
    const vData = [
      {
        field_id: "txtMpfName",
        type: "text",
        name: "Nama",
        validator: {
          notEmpty: true,
          maxLength: 200,
        },
      },
      {
        field_id: "txtMpfEmail",
        type: "text",
        name: "Alamat Emel",
        validator: {
          notEmpty: true,
          email: true,
          maxLength: 50,
        },
      },
      {
        field_id: "txtMpfContactNo",
        type: "text",
        name: "No. Telefon",
        validator: {
          notEmpty: true,
          digit: true,
          minLength: 8,
          maxLength: 15,
        },
      },
      {
        field_id: "txtMpfDesignation",
        type: "text",
        name: "Jawatan",
        validator: {
          notEmpty: false,
          maxLength: 200,
        },
      },
    ];
    formValidate = new MzValidate(false);
    formValidate.registerFields(vData);

    $("#btnMpfSave").on("click", function () {
      if (!formValidate.validateNow()) {
        toastr["error"](_ALERT_MSG_VALIDATION, _ALERT_TITLE_VALIDATION_ERROR);
      } else {
        ShowLoader();
        setTimeout(function () {
          try {
            let data = {
              userFullName: $("#txtMpfName").val(),
              userEmail: $("#txtMpfEmail").val(),
              userContactNo: $("#txtMpfContactNo").val(),
              userDesignation: mzNullString("txtMpfDesignation"),
            };
            mzFetch("main/user/updateProfile/" + userId, "PUT", data)
              .then((res) => {
                $("#ModalChangeProfile").modal("hide");
                profile["userFullName"] = data["userFullName"];
                profile["userEmail"] = data["userEmail"];
                profile["userContactNo"] = data["userContactNo"];
                profile["userDesignation"] = data["userDesignation"];
                const rawEncrypted = CryptoJS.AES.encrypt(
                  JSON.stringify(profile),
                  "MyAgriCensus"
                );
                sessionStorage.setItem("userInfo", rawEncrypted);
                HideLoader();
              })
              .catch((e) => {
                toastr["error"](
                  e.message !== "" ? e.message : _ALERT_MSG_ERROR_DEFAULT,
                  _ALERT_TITLE_ERROR
                );
              });
          } catch (e) {
            toastr["error"](_ALERT_MSG_ERROR_DEFAULT, _ALERT_TITLE_ERROR);
          }
          HideLoader();
        }, 200);
      }
    });
  };

  this.edit = function (_userId) {
    try {
      mzEmptyParams([_userId]);
      userId = _userId;
      formValidate.clearValidation();
      // profile = mzGetUserInfo();
      mzSetValue("txtMpfName", 'ABDUL MALIK BIN MANSOR', "text");
      mzSetValue("txtMpfEmail", 'abdmalikmansor@gmail.com', "text");
      mzSetValue("txtMpfContactNo", null, "text");
      mzSetValue("txtMpfDesignation", null, "text");
      $("#ModalChangeProfile").modal({ backdrop: "static", keyboard: false }).scrollTop(0);
    } catch (e) {
      toastr["error"](_ALERT_MSG_ERROR_DEFAULT, _ALERT_TITLE_ERROR);
    }
  };

  this.init();
}
