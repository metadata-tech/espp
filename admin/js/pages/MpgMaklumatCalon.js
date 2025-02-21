function MpgMaklumatCalon () {
  
  const className = 'MpgMaklumatCalon';
  let self = this;
  let dtDisplay;
  let modalConfirmDelete;
  let modalConfirmAction;
  let modalErulling;
  let sectionMaklumatEkeps;
  let userId;
  let dtSer;
  let formValidate;
  let vData = [
    {
      field_id: "txtCmclNoKp",
      type: "text",
      name: "No. Kad Pengenalan",
      validator: {
        notEmpty: true,
        maxLengthDigit: 12,
      }
    }
  ];

  this.init = function () {
    try {
      console.log('init');

      formValidate = new MzValidate(false);
      formValidate.registerFields(vData);
      
      $('.btnAddSer').on('click', function () {
        modalErulling.add();
      });
      
      $('#btnCmclFilter').on('click', function () {
        if (!formValidate.validateNow()) {
          toastr['error'](_ALERT_MSG_VALIDATION, _ALERT_TITLE_ERROR);
        } else {
          
        }
      });
      
      $('#btnCmclClearFilter').on('click', function () {
        formValidate.clearValidation();
      });

    } catch (e) { throw new Error(); }
  }
  
  this.delete = function (_id) {
    try {
      mzEmptyParams([_id]);

      toastr['success']('Maklumat PGSPP berjaya dihapus!');
    } catch (e) {
      toastr["error"](_ALERT_MSG_ERROR_DEFAULT, _ALERT_TITLE_ERROR);
    }
  };

  this.setDtDisplay = function (_dtDisplay) {
    dtDisplay = _dtDisplay;
  };

  this.setModalConfirmAction = function (_modalConfirmAction) {
    modalConfirmAction = _modalConfirmAction;
  };
  
  this.setModalConfirmDelete = function (_modalConfirmDelete) {
    modalConfirmDelete = _modalConfirmDelete;
  };
  
  this.setModalErulling = function (_modalErulling) {
    modalErulling = _modalErulling;
  };
  
  this.setSectionMaklumatEkeps = function (_sectionMaklumatEkeps) {
    sectionMaklumatEkeps = _sectionMaklumatEkeps;
  };

}