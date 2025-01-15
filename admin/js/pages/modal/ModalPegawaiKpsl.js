function ModalPegawaiKpsl() {
  
  const className = 'ModalPegawaiKpsl';
  let self = this;
  let classFrom;
  let id;
  let submitType = '';

  let formValidateMpsl;
  this.getValidationDataMpsl = function () {
    return [
      {
        field_id: "txtMpslNama",
        type: "text",
        name: "Nama",
        validator: {
          notEmpty: true
        }
      },
      {
        field_id: "txtMpslNoKp",
        type: "text",
        name: "No. Kad Pengenalan",
        validator: {
          notEmpty: true
        }
      },
      {
        field_id: "optMpslBidang",
        type: "select",
        name: "Bidang Pengkhususan",
        validator: {
          notEmpty: true
        }
      },
      {
        field_id: "txtMpslTarikhLantikan",
        type: "text",
        name: "Tarikh Lantikan",
        validator: {
          notEmpty: true
        }
      },
    ];
  };
  
  this.init = function () {
    formValidateMpsl = new MzValidate(false);
    formValidateMpsl.registerFields(self.getValidationDataMpsl());

    $('#btnMpslSave').on('click', function () {
      if (!formValidateMpsl.validateNow()) {
        toastr['error'](_ALERT_MSG_VALIDATION, _ALERT_TITLE_VALIDATION_ERROR);
      } else {
        if (submitType == 'edit') {
          ShowLoader(); setTimeout(function () {
            toastr['success']('Maklumat berjaya dikemaskini!');
            $('#modalPegawaiKpsl').modal('hide');
            HideLoader();
          }, 200);
        } else if (submitType == 'add') {
          ShowLoader(); setTimeout(function () {
            toastr['success']('Maklumat berjaya ditambah!');
            $('#modalPegawaiKpsl').modal('hide');
            HideLoader();
          }, 200);
        }
      }
    });
  };
  
  this.add = function () {
    try {
      submitType = 'add';

      formValidateMpsl.clearValidation();

      ShowLoader();
      setTimeout(function () {
        $('#h5MpslTitle').html('<i class="fa-duotone fa-circle-plus mr-2"></i>Pegawai Yang Layak Di Bawah Perbekalan Kenaikan Pangkat Secara Lantikan (KPSL)');
        $('#modalPegawaiKpsl').modal({backdrop: 'static', keyboard: false}).scrollTop(0);
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

      formValidateMpsl.clearValidation();
      
      ShowLoader();
      setTimeout(function () {
        mzSetValue('txtMpslNama', 'SITI AISYAH BINTI ABDUL MALIK', 'text');
        mzSetValue('txtMpslNoKp', '900530105544', 'text');
        mzSetValue('optMpslBidang', '00001', 'select');
        mzSetValue('txtMpslTarikhLantikan', '20/05/2024', 'text');

        $('#h5MpslTitle').html('<i class="fa-duotone fa-pen-to-square mr-2"></i>Pegawai Yang Layak Di Bawah Perbekalan Kenaikan Pangkat Secara Lantikan (KPSL)');
        $('#modalPegawaiKpsl').modal({backdrop: 'static', keyboard: false}).scrollTop(0);
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
        $('#h5MpslTitle').html('Pegawai Yang Layak Di Bawah Perbekalan Kenaikan Pangkat Secara Lantikan (KPSL)');
        $('#modalPegawaiKpsl').modal({backdrop: 'static', keyboard: false}).scrollTop(0);
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