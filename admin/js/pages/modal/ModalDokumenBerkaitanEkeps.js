function ModalDokumenBerkaitanEkeps() {
  
  const className = 'ModalDokumenBerkaitanEkeps';
  let self = this;
  let classFrom;
  let id;
  let submitType = '';

  let formValidateMdbe;
  this.getValidationDataMdbe = function () {
    return [
      {
        field_id: "optMdbeJenisDokumen",
        type: "select",
        name: "Jenis Dokumen",
        validator: {
          notEmpty: true
        }
      },
      {
        field_id: "optMdbeKategoriMesyuarat",
        type: "select",
        name: "Kategori Mesyuarat",
        validator: {
          notEmpty: true
        }
      },
      {
        field_id: "txtMdbeTajukDokumen",
        type: "text",
        name: "Tajuk Dokumen",
        validator: {
          notEmpty: true
        }
      },
      {
        field_id: "txtMdbeBilMesyuaratNo",
        type: "text",
        name: "Bilangan Mesyuarat",
        validator: {
          notEmpty: true
        }
      },
      {
        field_id: "txtMdbeBilMesyuaratBil",
        type: "text",
        name: "Bilangan Mesyuarat",
        validator: {
          notEmpty: true
        }
      },
      {
        field_id: "txtMdbeBilMesyuaratTahun",
        type: "text",
        name: "Bilangan Mesyuarat",
        validator: {
          notEmpty: true
        }
      },
      {
        field_id: "optMdbeMasaJam",
        type: "select",
        name: "Jam",
        validator: {
          notEmpty: true
        }
      },
      {
        field_id: "optMdbeMasaMinit",
        type: "select",
        name: "Minit",
        validator: {
          notEmpty: true
        }
      },
      {
        field_id: "optMdbeMasaMeridiem",
        type: "select",
        name: "Meridiem",
        validator: {
          notEmpty: true
        }
      },
      {
        field_id: "txtMdbeTempat",
        type: "text",
        name: "Tempat",
        validator: {
          notEmpty: true
        }
      },
      {
        field_id: "txtMdbeNoRujukanFail",
        type: "text",
        name: "No. Rujukan Fail",
        validator: {
          notEmpty: true
        }
      },
      {
        field_id: "txtMdbeTarikhMesyuarat",
        type: "text",
        name: "Tarikh Mesyuarat",
        validator: {
          notEmpty: true
        }
      },
      {
        field_id: "txtMdbeTahunMesyuarat",
        type: "text",
        name: "Tahun Mesyuarat",
        validator: {
          notEmpty: true
        }
      },
      {
        field_id: "txtMdbeDokumen",
        type: "file",
        name: "Dokumen Berkaitan",
        validator: {
          notEmptyFile: true,
          pdfType: true
        }
      },
      {
        field_id: "txtMdbeFile",
        type: "text",
        name: "Dokumen",
        validator: {}
      }
    ];
  };
  
  this.init = function () {
    formValidateMdbe = new MzValidate(false);
    formValidateMdbe.registerFields(self.getValidationDataMdbe());

    $('#txtMdbeDokumen').on('change', function () {
      const preview = document.querySelector('embed');
      const file = document.querySelector('input[type=file]').files[0];
      const reader = new FileReader();
      // var filename = file.name;

      if (typeof file == 'object') {
        // console.log(file.type);
        if (file.type == 'application/pdf') {
          reader.addEventListener("load", function () {
            preview.src = reader.result;
          }, false);
      
          if (file) {
            reader.readAsDataURL(file);
          } 
        } else {
          preview.src = '';
        }
      } else {
        preview.src = '';
      }
    });
      
    $('#optMdbeKategoriMesyuarat').on('change', function () {
      if (this.value == 'MSJ') {
        formValidateMdbe.clearValidation('txtMdbeTajukMinit');
        maDisableClear('txtMdbeBilMesyuaratNo', false);
        formValidateMdbe.enableField('txtMdbeBilMesyuaratNo');
      }
      else if (this.value == 'MLRTT') {
        formValidateMdbe.clearValidation('txtMdbeTajukMinit');
        maDisableClear('txtMdbeBilMesyuaratNo', false);
        formValidateMdbe.enableField('txtMdbeBilMesyuaratNo');
      }
      else if (this.value == 'MLRKP') {
        formValidateMdbe.clearValidation('txtMdbeTajukMinit');
        maDisableClear('txtMdbeBilMesyuaratNo', true);
        formValidateMdbe.disableField('txtMdbeBilMesyuaratNo');
      } else {
        formValidateMdbe.enableField('txtMdbeBilMesyuaratNo');
      }
    });
      
    $('#txtMdbeTarikhMesyuarat').on('change', function () {
      if (this.value.substring(6).length > 0) {
        mzSetValue('txtMdbeTahunMesyuarat', this.value.substring(6), 'text');
        mzSetValue('txtMdbeBilMesyuaratTahun', this.value.substring(6), 'text');
      } else {
        mzSetValue('txtMdbeTahunMesyuarat', '', 'text');
        mzSetValue('txtMdbeBilMesyuaratTahun', '', 'text');
      }
    });

    $('#btnMdbeSave').on('click', function () {
      if (!formValidateMdbe.validateNow()) {
        toastr['error'](_ALERT_MSG_VALIDATION, _ALERT_TITLE_VALIDATION_ERROR);
      } else {
        if (submitType == 'edit') {
          ShowLoader(); setTimeout(function () {
            toastr['success']('Maklumat berjaya dikemaskini!');
            $('#modalDokumenBerkaitanEkeps').modal('hide');
            HideLoader();
          }, 200);
        } else if (submitType == 'add') {
          ShowLoader(); setTimeout(function () {
            toastr['success']('Maklumat berjaya ditambah!');
            $('#modalDokumenBerkaitanEkeps').modal('hide');
            HideLoader();
          }, 200);
        }
      }
    });
  };
  
  this.add = function () {
    try {
      submitType = 'add';

      formValidateMdbe.clearValidation();

      ShowLoader();
      setTimeout(function () {
        $('#h5MdbeTitle').html('<i class="fa-duotone fa-circle-plus mr-2"></i>Dokumen Berkaitan');
        $('#modalDokumenBerkaitanEkeps').modal({backdrop: 'static', keyboard: false}).scrollTop(0);
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

      formValidateMdbe.clearValidation();
      
      ShowLoader();
      setTimeout(function () {

        $('#h5MdbeTitle').html('<i class="fa-duotone fa-pen-to-square mr-2"></i>Dokumen Berkaitan');
        $('#modalDokumenBerkaitanEkeps').modal({backdrop: 'static', keyboard: false}).scrollTop(0);
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
        $('#h5MdbeTitle').html('Dokumen Berkaitan');
        $('#modalDokumenBerkaitanEkeps').modal({backdrop: 'static', keyboard: false}).scrollTop(0);
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