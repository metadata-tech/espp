function ModalPegawaiKader() {
  
  const className = 'ModalPegawaiKader';
  let self = this;
  let classFrom;
  let id;
  let submitType = '';

  let formValidateMpkk;
  this.getValidationDataMpkk = function () {
    return [
      {
        field_id: "txtMpkkNama",
        type: "text",
        name: "Nama",
        validator: {
          notEmpty: true
        }
      },
      {
        field_id: "txtMpkkNoKp",
        type: "text",
        name: "No. Kad Pengenalan",
        validator: {
          notEmpty: true
        }
      },
      {
        field_id: "optMpkkKementerian",
        type: "select",
        name: "Kementerian/ Jabatan",
        validator: {
          notEmpty: true
        }
      },
    ];
  };
  
  this.init = function () {
    formValidateMpkk = new MzValidate(false);
    formValidateMpkk.registerFields(self.getValidationDataMpkk());

    $('#btnMpkkSave').on('click', function () {
      if (!formValidateMpkk.validateNow()) {
        toastr['error'](_ALERT_MSG_VALIDATION, _ALERT_TITLE_VALIDATION_ERROR);
      } else {
        if (submitType == 'edit') {
          ShowLoader(); setTimeout(function () {
            toastr['success']('Maklumat berjaya dikemaskini!');
            $('#modalPegawaiKader').modal('hide');
            HideLoader();
          }, 200);
        } else if (submitType == 'add') {
          ShowLoader(); setTimeout(function () {
            toastr['success']('Maklumat berjaya ditambah!');
            $('#modalPegawaiKader').modal('hide');
            HideLoader();
          }, 200);
        }
      }
    });
  };
  
  this.add = function () {
    try {
      submitType = 'add';

      formValidateMpkk.clearValidation();

      ShowLoader();
      setTimeout(function () {
        $('#h5MpkkTitle').html('<i class="fa-duotone fa-circle-plus mr-2"></i>Pegawai Kader Yang Ditempatkan Di Kementerian/Jabatan');
        $('#modalPegawaiKader').modal({backdrop: 'static', keyboard: false}).scrollTop(0);
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

      formValidateMpkk.clearValidation();
      
      ShowLoader();
      setTimeout(function () {
        mzSetValue('txtMpkkNama', 'SITI AISYAH BINTI ABDUL MALIK', 'text');
        mzSetValue('txtMpkkNoKp', '900530105544', 'text');
        mzSetValue('optMpkkKementerian', '1215', 'select');

        $('#h5MpkkTitle').html('<i class="fa-duotone fa-pen-to-square mr-2"></i>Pegawai Kader Yang Ditempatkan Di Kementerian/Jabatan');
        $('#modalPegawaiKader').modal({backdrop: 'static', keyboard: false}).scrollTop(0);
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
        $('#h5MpkkTitle').html('Pegawai Kader Yang Ditempatkan Di Kementerian/Jabatan');
        $('#modalPegawaiKader').modal({backdrop: 'static', keyboard: false}).scrollTop(0);
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