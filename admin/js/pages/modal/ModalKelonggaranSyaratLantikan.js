function ModalKelonggaranSyaratLantikan() {
  
  const className = 'ModalKelonggaranSyaratLantikan';
  let self = this;
  let classFrom;
  let id;
  let submitType = '';

  let formValidateMksl;
  this.getValidationDataMksl = function () {
    return [
      {
        field_id: "txtMkslTajukLampiran",
        type: "text",
        name: "Tajuk Lampiran",
        validator: {
          notEmpty: true
        }
      },
      {
        field_id: "optMkslJenisLampiran",
        type: "select",
        name: "Jenis Lampiran",
        validator: {
          notEmpty: true
        }
      },
      {
        field_id: "txtMkslDokumen",
        type: "file",
        name: "Dokumen Berkaitan",
        validator: {
          notEmptyFile: true,
          pdfType: true
        }
      },
      {
        field_id: "txtMkslFile",
        type: "text",
        name: "Dokumen",
        validator: {}
      }
    ];
  };
  
  this.init = function () {
    formValidateMksl = new MzValidate(false);
    formValidateMksl.registerFields(self.getValidationDataMksl());

    $('#btnMkslSave').on('click', function () {
      if (!formValidateMksl.validateNow()) {
        toastr['error'](_ALERT_MSG_VALIDATION, _ALERT_TITLE_VALIDATION_ERROR);
      } else {
        if (submitType == 'edit') {
          ShowLoader(); setTimeout(function () {
            toastr['success']('Maklumat berjaya dikemaskini!');
            $('#modalKelonggaranSyaratLantikan').modal('hide');
            HideLoader();
          }, 200);
        } else if (submitType == 'add') {
          ShowLoader(); setTimeout(function () {
            toastr['success']('Maklumat berjaya ditambah!');
            $('#modalKelonggaranSyaratLantikan').modal('hide');
            HideLoader();
          }, 200);
        }
      }
    });
  };
  
  this.add = function () {
    try {
      submitType = 'add';

      formValidateMksl.clearValidation();

      ShowLoader();
      setTimeout(function () {
        $('#h5MkslTitle').html('<i class="fa-duotone fa-circle-plus mr-2"></i>Kelonggaran Syarat Lantikan');
        $('#modalKelonggaranSyaratLantikan').modal({backdrop: 'static', keyboard: false}).scrollTop(0);
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

      formValidateMksl.clearValidation();
      
      ShowLoader();
      setTimeout(function () {
        mzSetValue('txtMkslTajukLampiran', 'Surat Kelulusan JPA', 'text');
        mzSetValue('optMkslJenisLampiran', 'Surat Kelulusan JPA', 'select');
        mzSetValue('txtMkslFile', 'SuratKelulusanJPA.pdf', 'text');

        $('#h5MkslTitle').html('<i class="fa-duotone fa-pen-to-square mr-2"></i>Kelonggaran Syarat Lantikan');
        $('#modalKelonggaranSyaratLantikan').modal({backdrop: 'static', keyboard: false}).scrollTop(0);
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
        $('#h5MkslTitle').html('Kelonggaran Syarat Lantikan');
        $('#modalKelonggaranSyaratLantikan').modal({backdrop: 'static', keyboard: false}).scrollTop(0);
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