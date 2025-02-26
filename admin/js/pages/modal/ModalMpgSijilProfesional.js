function ModalMpgSijilProfesional() {
  
  const className = 'ModalMpgSijilProfesional';
  let self = this;
  let classFrom;
  let id;
  let submitType = '';

  let formValidateMsjp;
  this.getValidationDataMsjp = function () {
    return [
      {
        field_id: "optMsjpSkimPekhidmatan",
        type: "select",
        name: "Jawatan",
        validator: {
          notEmpty: true
        }
      },
      {
        field_id: "txtMsjpNoKelompok",
        type: "text",
        name: "No. Kelompok",
        validator: {}
      },
      {
        field_id: "txtMsjpNoSiri",
        type: "text",
        name: "No. Siri",
        validator: {}
      },
    ];
  };
  
  this.init = function () {
    formValidateMsjp = new MzValidate(false);
    formValidateMsjp.registerFields(self.getValidationDataMsjp());

    $('#btnMsjpSave').on('click', function () {
      if (!formValidateMsjp.validateNow()) {
        toastr['error'](_ALERT_MSG_VALIDATION, _ALERT_TITLE_VALIDATION_ERROR);
      } else {
        if (submitType == 'edit') {
          ShowLoader(); setTimeout(function () {
            toastr['success']('Maklumat berjaya dikemaskini!');
            $('#modalMpgSijilProfesional').modal('hide');
            HideLoader();
          }, 200);
        } else if (submitType == 'add') {
          ShowLoader(); setTimeout(function () {
            toastr['success']('Maklumat berjaya ditambah!');
            $('#modalMpgSijilProfesional').modal('hide');
            HideLoader();
          }, 200);
        }
      }
    });
  };
  
  this.add = function () {
    try {
      submitType = 'add';

      formValidateMsjp.clearValidation();

      ShowLoader();
      setTimeout(function () {
        $('#h5MsjpTitle').html('<i class="fa-duotone fa-circle-plus mr-2"></i>Sijil/Profesional');
        $('#modalMpgSijilProfesional').modal({backdrop: 'static', keyboard: false}).scrollTop(0);
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

      formValidateMsjp.clearValidation();
      
      ShowLoader();
      setTimeout(function () {
        //self.assignValue();

        $('#h5MsjpTitle').html('<i class="fa-duotone fa-pen-to-square mr-2"></i>Sijil/Profesional');
        $('#modalMpgSijilProfesional').modal({backdrop: 'static', keyboard: false}).scrollTop(0);
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

      formValidateMsjp.clearValidation();
      
      ShowLoader();
      setTimeout(function () {
        //self.assignValue();

        $('#h5MsjpTitle').html('Maklumat eRulling');
        $('#modalMpgSijilProfesional').modal({backdrop: 'static', keyboard: false}).scrollTop(0);
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
    mzSetValue('optMsjpJenisDokumen', '01', 'select');
    mzSetValue('txtMsjpNoRujukanFail', 'SPP.600-3/1/1 Jld.21(4)(S)', 'text');
    mzSetValue('txtMsjpTajukDokumen', 'KERTAS BIL. KM13/2024: PEMAKLUMAN PERINTAH TAHAN KERJA YANG TERHENTI TERHADAP NAMA PEGAWAI, PEGAWAI PENDIDIKAN PENGAJIAN TINGGI (PPPT) GRED DH54, POLITEKNIK NILAI, NEGERI SEMBILAN [NOMBOR FAIL]', 'textarea');
    mzSetValue('txtMsjpFile', '3. MLRTT 672 (Image).pdf', 'text');
  };
  
  this.getClassName = function () {
    return className;
  };
  
  this.setClassFrom = function (_classFrom) {
    classFrom = _classFrom;
  };
}