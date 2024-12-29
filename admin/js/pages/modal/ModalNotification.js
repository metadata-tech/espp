function ModalNotification() {

  const className = "ModalNotification";
  let self = this;
  let formValidate;
  let userId;
  let profile;

  this.init = function () {
    
  };

  this.edit = function (_userId) {
    try {
      mzEmptyParams([_userId]);
      userId = _userId;
      $("#ModalNotification").modal({ backdrop: "static", keyboard: false }).scrollTop(0);
    } catch (e) {
      toastr["error"](_ALERT_MSG_ERROR_DEFAULT, _ALERT_TITLE_ERROR);
    }
  };

  this.init();
}
