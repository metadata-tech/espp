function ModalMpgJawatanDipohon() {
  
  const className = 'ModalMpgJawatanDipohon';
  let self = this;
  let classFrom;
  let id;
  let submitType = '';

  let formValidateMjph;
  this.getValidationDataMjph = function () {
    return [
      {
        field_id: "optMjphSkimPekhidmatan",
        type: "select",
        name: "Jawatan",
        validator: {
          notEmpty: true
        }
      },
      {
        field_id: "txtMjphNoKelompok",
        type: "text",
        name: "No. Kelompok",
        validator: {}
      },
      {
        field_id: "txtMjphNoSiri",
        type: "text",
        name: "No. Siri",
        validator: {}
      },
      {
        field_id: "txtMjphJDaftar",
        type: "text",
        name: "J. Daftar",
        validator: {}
      },
      {
        field_id: "txtMjphKeutamaan",
        type: "text",
        name: "Keutamaan",
        validator: {}
      },
      {
        field_id: "txtMjphTarikhSuratPerakuan",
        type: "text",
        name: "Tarikh Surat Perakuan",
        validator: {}
      },
      {
        field_id: "txtMjphTarikhDaftar",
        type: "text",
        name: "Tarikh Daftar",
        validator: {}
      },
    ];
  };
  
  this.init = function () {
    formValidateMjph = new MzValidate(false);
    formValidateMjph.registerFields(self.getValidationDataMjph());

    $('#btnMjphSave').on('click', function () {
      if (!formValidateMjph.validateNow()) {
        toastr['error'](_ALERT_MSG_VALIDATION, _ALERT_TITLE_VALIDATION_ERROR);
      } else {
        if (submitType == 'edit') {
          ShowLoader(); setTimeout(function () {
            toastr['success']('Maklumat berjaya dikemaskini!');
            $('#modalMpgJawatanDipohon').modal('hide');
            HideLoader();
          }, 200);
        } else if (submitType == 'add') {
          ShowLoader(); setTimeout(function () {
            toastr['success']('Maklumat berjaya ditambah!');
            $('#modalMpgJawatanDipohon').modal('hide');
            HideLoader();
          }, 200);
        }
      }
    });
  };
  
  this.add = function () {
    try {
      submitType = 'add';

      formValidateMjph.clearValidation();

      ShowLoader();
      setTimeout(function () {
        $('#h5MjphTitle').html('<i class="fa-duotone fa-circle-plus mr-2"></i>Jawatan-Jawatan Yang Dipohon');
        $('#modalMpgJawatanDipohon').modal({backdrop: 'static', keyboard: false}).scrollTop(0);
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
      console.log(1243565);

      formValidateMjph.clearValidation();
      
      ShowLoader();
      setTimeout(function () {
        //self.assignValue();

        $('#h5MjphTitle').html('<i class="fa-duotone fa-pen-to-square mr-2"></i>Jawatan-Jawatan Yang Dipohon');
        $('#modalMpgJawatanDipohon').modal({backdrop: 'static', keyboard: false}).scrollTop(0);
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

      formValidateMjph.clearValidation();
      
      ShowLoader();
      setTimeout(function () {
        //self.assignValue();

        $('#h5MjphTitle').html('Maklumat eRulling');
        $('#modalMpgJawatanDipohon').modal({backdrop: 'static', keyboard: false}).scrollTop(0);
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

  this.assignValue = function () {
    mzSetValue('optMjphJenisDokumen', '01', 'select');
    mzSetValue('txtMjphNoRujukanFail', 'SPP.600-3/1/1 Jld.21(4)(S)', 'text');
    mzSetValue('txtMjphTajukDokumen', 'KERTAS BIL. KM13/2024: PEMAKLUMAN PERINTAH TAHAN KERJA YANG TERHENTI TERHADAP NAMA PEGAWAI, PEGAWAI PENDIDIKAN PENGAJIAN TINGGI (PPPT) GRED DH54, POLITEKNIK NILAI, NEGERI SEMBILAN [NOMBOR FAIL]', 'textarea');
    mzSetValue('txtMjphFile', '3. MLRTT 672 (Image).pdf', 'text');
  };
  
  this.getClassName = function () {
    return className;
  };
  
  this.setClassFrom = function (_classFrom) {
    classFrom = _classFrom;
  };
}