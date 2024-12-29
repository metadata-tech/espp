function ModalPermohonanPengisian() {
  
  const className = 'ModalPermohonanPengisian';
  let self = this;
  let classFrom;
  let permohonanId;
  let submitType = '';

  let formValidateMppj;
  this.getValidationDataMppj = function () {
    return [
      {
        field_id: "txtMppjJenisTanaman",
        type: "text",
        name: "Jenis tanaman",
        validator: {}
      },
      {
        field_id: "txtMppjTahunDitanam",
        type: "text",
        name: "Tahun ditanam",
        validator: {
          numeric: true,
          eqLengthDigit: 4,
          max: 2024,
          notEmpty: true
        }
      },
      {
        field_id: "optMppjLokasi",
        type: "select",
        name: "Lokasi",
        validator: {
          notEmpty: true
        }
      },
      {
        field_id: "txtMppjBertanamKeluasan",
        type: "text",
        name: "Kuantiti",
        validator: {
          maxLengthWhole: 10,
          maxLengthDecimal: 4
        }
      }
    ];
  };
  
  this.init = function () {
    formValidateMppj = new MzValidate(false);
    formValidateMppj.registerFields(self.getValidationDataMppj());

    $('#btnMppjSave').on('click', function () {
      if (!formValidateMppj.validateNow()) {
        toastr['error'](_ALERT_MSG_VALIDATION, _ALERT_TITLE_VALIDATION_ERROR);
      } else {
        if (submitType == 'edit') {
          ShowLoader(); setTimeout(function () {
            toastr['success']('Tanaman berjaya dikemaskini!');
            $('#modalPpj').modal('hide');
            HideLoader();
          }, 200);
        } else if (submitType == 'add') {
          ShowLoader(); setTimeout(function () {
            toastr['success']('Tanaman berjaya didaftarkan!');
            $('#modalPpj').modal('hide');
            HideLoader();
          }, 200);
        }
      }
    });
  };
  
  this.add = function () {
    try {
      submitType = 'add';

      formValidateMppj.clearValidation();

      ShowLoader();
      setTimeout(function () {
        $('#h5MppjTitle').html('<i class="fa-solid fa-file-pen mr-2"></i>Daftar Permohonan Pengisian Jawatan');
        $('#modalPpj').modal({backdrop: 'static', keyboard: false}).scrollTop(0);
        HideLoader();
      }, 200);
    } catch (e) {
      toastr['error'](e.message !== '' ? e.message : _ALERT_MSG_ERROR_DEFAULT, _ALERT_TITLE_ERROR);
    }
  };
  
  this.edit = function (_permohonanId) {
    try {
      mzEmptyParams([_permohonanId]);
      permohonanId = _permohonanId;
      submitType = 'edit';

      formValidateMppj.clearValidation();
      
      ShowLoader();
      setTimeout(function () {

        $('#h5MppjTitle').html('<i class="fa-duotone fa-pen-to-square mr-2"></i>Kemaskini Permohonan Pengisian Jawatan');
        $('#modalPpj').modal({backdrop: 'static', keyboard: false}).scrollTop(0);
        HideLoader();
      }, 200);
    } catch (e) {
      toastr['error'](e.message !== '' ? e.message : _ALERT_MSG_ERROR_DEFAULT, _ALERT_TITLE_ERROR);
    }
  };
  
  this.view = function (_permohonanId) {
    try {
      mzEmptyParams([_permohonanId]);
      permohonanId = _permohonanId;
      submitType = 'view';
      
      ShowLoader();
      setTimeout(function () {
        $('#h5MppjTitle').html('<i class="fa-duotone fa-home-user mr-2"></i>Paparan Permohonan Pengisian Jawatan');
        $('#modalPpj').modal({backdrop: 'static', keyboard: false}).scrollTop(0);
        HideLoader();
      }, 200);
    } catch (e) {
      toastr['error'](e.message !== '' ? e.message : _ALERT_MSG_ERROR_DEFAULT, _ALERT_TITLE_ERROR);
    }
  };
  
  this.delete = function (_permohonanId) {
    try {
      mzEmptyParams([_permohonanId]);
      ShowLoader(); setTimeout(function () {
        toastr['success']('Tanaman berjaya dihapus!');
        HideLoader();
      }, 200);
    } catch (e) {
      toastr["error"](_ALERT_MSG_ERROR_DEFAULT, _ALERT_TITLE_ERROR);
    }
  };

  function assignMppj() {
    mzFetch('prosesan/airp_tnm_pnj_kekal/' + tanamanId).then((res) => {
      mzSetValue('txtMppjJenisTanaman', res['airpTnmPnjKekalJenisTanaman'], 'text');
      mzSetValue('optMppjLokasi', res['airpLokasiId'], 'select');
      mzSetValue('txtMppjTahunDitanam', res['airpTnmPnjKekalTahun'], 'text');
      mzSetValue('txtMppjBertanamKeluasan', maGetCurrency(res['airpTnmPnjKekalLuas']), 'text');
    }).catch(() => { toastr['error'](_ALERT_MSG_ERROR_DEFAULT, _ALERT_TITLE_ERROR); });
  }
  
  this.getClassName = function () {
    return className;
  };
  
  this.setClassFrom = function (_classFrom) {
    classFrom = _classFrom;
  };
}