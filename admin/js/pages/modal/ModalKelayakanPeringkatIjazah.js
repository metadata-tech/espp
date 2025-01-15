function ModalKelayakanPeringkatIjazah() {
  
  const className = 'ModalKelayakanPeringkatIjazah';
  let self = this;
  let classFrom;
  let id;
  let submitType = '';

  let formValidateMkpi;
  this.getValidationDataMkpi = function () {
    return [
      {
        field_id: "optMkpiKelayakan",
        type: "select",
        name: "Kelayakan di Peringkat Ijazah/Diploma",
        validator: {
          notEmpty: true
        }
      },
      {
        field_id: "optMkpiBidang",
        type: "select",
        name: "Bidang",
        validator: {
          notEmpty: true
        }
      },
      {
        field_id: "txtMkpiBilCalon",
        type: "text",
        name: "Bilangan Calon",
        validator: {
          notEmpty: true
        }
      },
    ];
  };
  
  this.init = function () {
    formValidateMkpi = new MzValidate(false);
    formValidateMkpi.registerFields(self.getValidationDataMkpi());

    $('#btnMkpiSave').on('click', function () {
      if (!formValidateMkpi.validateNow()) {
        toastr['error'](_ALERT_MSG_VALIDATION, _ALERT_TITLE_VALIDATION_ERROR);
      } else {
        if (submitType == 'edit') {
          ShowLoader(); setTimeout(function () {
            toastr['success']('Maklumat berjaya dikemaskini!');
            $('#modalKelayakanPeringkatIjazah').modal('hide');
            HideLoader();
          }, 200);
        } else if (submitType == 'add') {
          ShowLoader(); setTimeout(function () {
            toastr['success']('Maklumat berjaya ditambah!');
            $('#modalKelayakanPeringkatIjazah').modal('hide');
            HideLoader();
          }, 200);
        }
      }
    });
  };
  
  this.add = function () {
    try {
      submitType = 'add';

      formValidateMkpi.clearValidation();

      ShowLoader();
      setTimeout(function () {
        $('#h5MkpiTitle').html('<i class="fa-duotone fa-circle-plus mr-2"></i>Keperluan Pengisian Bidang Pengkhususan (Peringkat Ijazah/Diploma)');
        $('#modalKelayakanPeringkatIjazah').modal({backdrop: 'static', keyboard: false}).scrollTop(0);
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

      formValidateMkpi.clearValidation();
      
      ShowLoader();
      setTimeout(function () {
        mzSetValue('optMkpiKelayakan', 'Ijazah', 'select');
        mzSetValue('optMkpiBidang', 'Ijazah Sarjana Muda Kejuteraan dalam bidang Mekanikal', 'select');
        mzSetValue('txtMkpiBilCalon', 13, 'text');

        $('#h5MkpiTitle').html('<i class="fa-duotone fa-pen-to-square mr-2"></i>Keperluan Pengisian Bidang Pengkhususan (Peringkat Ijazah/Diploma)');
        $('#modalKelayakanPeringkatIjazah').modal({backdrop: 'static', keyboard: false}).scrollTop(0);
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
        $('#h5MkpiTitle').html('Keperluan Pengisian Bidang Pengkhususan (Peringkat Ijazah/Diploma)');
        $('#modalKelayakanPeringkatIjazah').modal({backdrop: 'static', keyboard: false}).scrollTop(0);
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