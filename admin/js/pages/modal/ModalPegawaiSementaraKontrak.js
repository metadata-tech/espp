function ModalPegawaiSementaraKontrak() {
  
  const className = 'ModalPegawaiSementaraKontrak';
  let self = this;
  let classFrom;
  let id;
  let submitType = '';

  let formValidateMpsk;
  this.getValidationDataMpsk = function () {
    return [
      {
        field_id: "txtMpskNama",
        type: "text",
        name: "Nama",
        validator: {
          notEmpty: true
        }
      },
      {
        field_id: "txtMpskNoKp",
        type: "text",
        name: "No. Kad Pengenalan",
        validator: {
          notEmpty: true
        }
      },
      {
        field_id: "optMpskBidang",
        type: "select",
        name: "Bidang Pengkhususan",
        validator: {
          notEmpty: true
        }
      },
      {
        field_id: "txtMpskTarikhLantikan",
        type: "text",
        name: "Tarikh Lantikan",
        validator: {
          notEmpty: true
        }
      },
    ];
  };
  
  this.init = function () {
    formValidateMpsk = new MzValidate(false);
    formValidateMpsk.registerFields(self.getValidationDataMpsk());

    $('#btnMpskSave').on('click', function () {
      if (!formValidateMpsk.validateNow()) {
        toastr['error'](_ALERT_MSG_VALIDATION, _ALERT_TITLE_VALIDATION_ERROR);
      } else {
        if (submitType == 'edit') {
          ShowLoader(); setTimeout(function () {
            toastr['success']('Maklumat berjaya dikemaskini!');
            $('#modalPegawaiSementaraKontrak').modal('hide');
            HideLoader();
          }, 200);
        } else if (submitType == 'add') {
          ShowLoader(); setTimeout(function () {
            toastr['success']('Maklumat berjaya ditambah!');
            $('#modalPegawaiSementaraKontrak').modal('hide');
            HideLoader();
          }, 200);
        }
      }
    });
  };
  
  this.add = function () {
    try {
      submitType = 'add';

      formValidateMpsk.clearValidation();

      ShowLoader();
      setTimeout(function () {
        $('#h5MpskTitle').html('<i class="fa-duotone fa-circle-plus mr-2"></i>Pegawai Yang Telah Dilantik Secara Sementara Dan Kontrak Dalam Jawatan Perkhidmatan Yang Sama');
        $('#modalPegawaiSementaraKontrak').modal({backdrop: 'static', keyboard: false}).scrollTop(0);
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

      formValidateMpsk.clearValidation();
      
      ShowLoader();
      setTimeout(function () {
        mzSetValue('txtMpskNama', 'SITI AISYAH BINTI ABDUL MALIK', 'text');
        mzSetValue('txtMpskNoKp', '900530105544', 'text');
        mzSetValue('optMpskBidang', '00001', 'select');
        mzSetValue('txtMpskTarikhLantikan', '20/05/2024', 'text');

        $('#h5MpskTitle').html('<i class="fa-duotone fa-pen-to-square mr-2"></i>Pegawai Yang Telah Dilantik Secara Sementara Dan Kontrak Dalam Jawatan Perkhidmatan Yang Sama');
        $('#modalPegawaiSementaraKontrak').modal({backdrop: 'static', keyboard: false}).scrollTop(0);
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
        $('#h5MpskTitle').html('Pegawai Yang Telah Dilantik Secara Sementara Dan Kontrak Dalam Jawatan Perkhidmatan Yang Sama');
        $('#modalPegawaiSementaraKontrak').modal({backdrop: 'static', keyboard: false}).scrollTop(0);
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