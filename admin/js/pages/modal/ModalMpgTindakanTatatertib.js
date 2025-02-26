function ModalMpgTindakanTatatertib() {
  
  const className = 'ModalMpgTindakanTatatertib';
  let self = this;
  let classFrom;
  let id;
  let submitType = '';

  let formValidateMttb;
  this.getValidationDataMttb = function () {
    return [
      {
        field_id: "optMttbSkimPekhidmatan",
        type: "select",
        name: "Jawatan",
        validator: {
          notEmpty: true
        }
      },
      {
        field_id: "txtMttbNoKelompok",
        type: "text",
        name: "No. Kelompok",
        validator: {}
      },
      {
        field_id: "txtMttbNoSiri",
        type: "text",
        name: "No. Siri",
        validator: {}
      },
    ];
  };
  
  this.init = function () {
    formValidateMttb = new MzValidate(false);
    formValidateMttb.registerFields(self.getValidationDataMttb());

    $('#btnMttbSave').on('click', function () {
      if (!formValidateMttb.validateNow()) {
        toastr['error'](_ALERT_MSG_VALIDATION, _ALERT_TITLE_VALIDATION_ERROR);
      } else {
        if (submitType == 'edit') {
          ShowLoader(); setTimeout(function () {
            toastr['success']('Maklumat berjaya dikemaskini!');
            $('#modalMpgTindakanTatatertib').modal('hide');
            HideLoader();
          }, 200);
        } else if (submitType == 'add') {
          ShowLoader(); setTimeout(function () {
            toastr['success']('Maklumat berjaya ditambah!');
            $('#modalMpgTindakanTatatertib').modal('hide');
            HideLoader();
          }, 200);
        }
      }
    });
  };
  
  this.add = function () {
    try {
      submitType = 'add';

      formValidateMttb.clearValidation();

      ShowLoader();
      setTimeout(function () {
        $('#h5MttbTitle').html('<i class="fa-duotone fa-circle-plus mr-2"></i>Tindakan Tatatertib');
        $('#modalMpgTindakanTatatertib').modal({backdrop: 'static', keyboard: false}).scrollTop(0);
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

      formValidateMttb.clearValidation();
      
      ShowLoader();
      setTimeout(function () {
        //self.assignValue();

        $('#h5MttbTitle').html('<i class="fa-duotone fa-pen-to-square mr-2"></i>Tindakan Tatatertib');
        $('#modalMpgTindakanTatatertib').modal({backdrop: 'static', keyboard: false}).scrollTop(0);
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

      formValidateMttb.clearValidation();
      
      ShowLoader();
      setTimeout(function () {
        //self.assignValue();

        $('#h5MttbTitle').html('Maklumat eRulling');
        $('#modalMpgTindakanTatatertib').modal({backdrop: 'static', keyboard: false}).scrollTop(0);
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
    mzSetValue('optMttbJenisDokumen', '01', 'select');
    mzSetValue('txtMttbNoRujukanFail', 'SPP.600-3/1/1 Jld.21(4)(S)', 'text');
    mzSetValue('txtMttbTajukDokumen', 'KERTAS BIL. KM13/2024: PEMAKLUMAN PERINTAH TAHAN KERJA YANG TERHENTI TERHADAP NAMA PEGAWAI, PEGAWAI PENDIDIKAN PENGAJIAN TINGGI (PPPT) GRED DH54, POLITEKNIK NILAI, NEGERI SEMBILAN [NOMBOR FAIL]', 'textarea');
    mzSetValue('txtMttbFile', '3. MLRTT 672 (Image).pdf', 'text');
  };
  
  this.getClassName = function () {
    return className;
  };
  
  this.setClassFrom = function (_classFrom) {
    classFrom = _classFrom;
  };
}