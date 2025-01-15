function ModalKelayakanPeringkatStpm() {
  
  const className = 'ModalKelayakanPeringkatStpm';
  let self = this;
  let classFrom;
  let id;
  let submitType = '';

  let formValidateMkps;
  this.getValidationDataMkps = function () {
    return [
      {
        field_id: "txtMkpsKelayakan",
        type: "text",
        name: "Kelayakan di Peringkat STPM/SPM/PMR",
        validator: {
          notEmpty: true
        }
      },
      {
        field_id: "txtMkpiKeutamaan",
        type: "text",
        name: "Keutamaan",
        validator: {
          notEmpty: true,
          numeric: true
        }
      }
    ];
  };
  
  this.init = function () {
    formValidateMkps = new MzValidate(false);
    formValidateMkps.registerFields(self.getValidationDataMkps());

    $('#btnMkpsSave').on('click', function () {
      if (!formValidateMkps.validateNow()) {
        toastr['error'](_ALERT_MSG_VALIDATION, _ALERT_TITLE_VALIDATION_ERROR);
      } else {
        if (submitType == 'edit') {
          ShowLoader(); setTimeout(function () {
            toastr['success']('Maklumat berjaya dikemaskini!');
            $('#modalKelayakanPeringkatStpm').modal('hide');
            HideLoader();
          }, 200);
        } else if (submitType == 'add') {
          ShowLoader(); setTimeout(function () {
            toastr['success']('Maklumat berjaya ditambah!');
            $('#modalKelayakanPeringkatStpm').modal('hide');
            HideLoader();
          }, 200);
        }
      }
    });
  };
  
  this.add = function () {
    try {
      submitType = 'add';

      formValidateMkps.clearValidation();

      ShowLoader();
      setTimeout(function () {
        $('#h5MkpsTitle').html('<i class="fa-duotone fa-circle-plus mr-2"></i>Keperluan Pengisian Bidang Pengkhususan (Peringkat STPM/SPM/PMR)');
        $('#modalKelayakanPeringkatStpm').modal({backdrop: 'static', keyboard: false}).scrollTop(0);
        HideLoader();
      }, 200);
    } catch (e) {
      toastr['error'](e.message !== '' ? e.message : _ALERT_MSG_ERROR_DEFAULT, _ALERT_TITLE_ERROR);
    }
  };
  
  this.edit = function (_id) {
    try {
      mzEmptyParams([_id]);
      id = _id;
      submitType = 'edit';

      formValidateMkps.clearValidation();
      
      ShowLoader();
      setTimeout(function () {
        mzSetValue('txtMkpsKelayakan', 'SPM dengan kepujian dalam mata pelajaran Matematik', 'text');
        mzSetValue('txtMkpiKeutamaan', 1, 'text');

        $('#h5MkpsTitle').html('<i class="fa-duotone fa-pen-to-square mr-2"></i>Keperluan Pengisian Bidang Pengkhususan (Peringkat STPM/SPM/PMR)');
        $('#modalKelayakanPeringkatStpm').modal({backdrop: 'static', keyboard: false}).scrollTop(0);
        HideLoader();
      }, 200);
    } catch (e) {
      toastr['error'](e.message !== '' ? e.message : _ALERT_MSG_ERROR_DEFAULT, _ALERT_TITLE_ERROR);
    }
  };
  
  this.view = function (_id) {
    try {
      mzEmptyParams([_id]);
      id = _id;
      submitType = 'view';
      
      ShowLoader();
      setTimeout(function () {
        $('#h5MkpsTitle').html('Keperluan Pengisian Bidang Pengkhususan (Peringkat STPM/SPM/PMR)');
        $('#modalKelayakanPeringkatStpm').modal({backdrop: 'static', keyboard: false}).scrollTop(0);
        HideLoader();
      }, 200);
    } catch (e) {
      toastr['error'](e.message !== '' ? e.message : _ALERT_MSG_ERROR_DEFAULT, _ALERT_TITLE_ERROR);
    }
  };
  
  this.delete = function (_id) {
    try {
      mzEmptyParams([_id]);
      ShowLoader(); setTimeout(function () {
        toastr['success']('Maklumat berjaya dihapus!');
        HideLoader();
      }, 200);
    } catch (e) {
      toastr["error"](_ALERT_MSG_ERROR_DEFAULT, _ALERT_TITLE_ERROR);
    }
  };
  
  this.getClassName = function () {
    return className;
  };
  
  this.setClassFrom = function (_classFrom) {
    classFrom = _classFrom;
  };
}