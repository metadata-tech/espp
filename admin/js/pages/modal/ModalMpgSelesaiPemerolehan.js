function ModalMpgSelesaiPemerolehan() {
  
  const className = 'ModalMpgSelesaiPemerolehan';
  let self = this;
  let classFrom;
  let id;
  let submitType = '';

  let formValidateMspe;
  this.getValidationDataMspe = function () {
    return [
      {
        field_id: "optMspeJenisDokumen",
        type: "select",
        name: "Jenis Dokumen",
        validator: {
          notEmpty: true
        }
      },
      {
        field_id: "txtMspeTajukDokumen",
        type: "text",
        name: "Tajuk Dokumen",
        validator: {
          notEmpty: true
        }
      },
      {
        field_id: "txtMspeNoRujukanFail",
        type: "text",
        name: "No. Rujukan Fail",
        validator: {
          notEmpty: true
        }
      },
      {
        field_id: "txtMspeDokumen",
        type: "file",
        name: "Dokumen Berkaitan",
        validator: {
          // notEmptyFile: true,
          pdfType: true
        }
      },
      {
        field_id: "txtMspeFile",
        type: "text",
        name: "Dokumen",
        validator: {
          notEmpty: true
        }
      },
      {
        field_id: "txtMspeIsiDokumen",
        type: "text",
        name: "Teks PDF",
        validator: {
          notEmpty: true,
          notEqual: 'Sila tunggu...'
        }
      },
    ];
  };
  
  this.init = function () {
    formValidateMspe = new MzValidate(false);
    formValidateMspe.registerFields(self.getValidationDataMspe());
    
    $('#btnMspeClose').on('click', function () {
      console.log('close');
      // $('#modalMpgSelesaiPemerolehan').modal('hide');
      // worker.terminate();
    });

    $('#btnMspeSave').on('click', function () {
      if (!formValidateMspe.validateNow()) {
        toastr['error'](_ALERT_MSG_VALIDATION, _ALERT_TITLE_VALIDATION_ERROR);
      } else {
        if (submitType == 'edit') {
          ShowLoader(); setTimeout(function () {
            toastr['success']('Maklumat berjaya dikemaskini!');
            $('#modalMpgSelesaiPemerolehan').modal('hide');
            HideLoader();
          }, 200);
        } else if (submitType == 'add') {
          ShowLoader(); setTimeout(function () {
            toastr['success']('Maklumat berjaya ditambah!');
            $('#modalMpgSelesaiPemerolehan').modal('hide');
            HideLoader();
          }, 200);
        }
      }
    });
  };
  
  this.add = function () {
    try {
      submitType = 'add';

      formValidateMspe.clearValidation();

      dtSep = $('#dtSep').DataTable({
        bLengthChange: false,
        bFilter: true,
        bPaginate: false,
        bInfo: true,
        autoWidth: false,
        ordering: false,
        aaSorting: [[5, 'asc']],
        language: _DATATABLE_LANGUAGE,
        dom: "<'d-flex'<'p-0'><'p-0 d-none d-sm-block ml-auto'>>" +
        "<'d-flex'<'p-0 flex-fill'tr>>",
        columnDefs: [
          { className: 'text-center', targets: "_all" },
          // { className: 'text-center', targets: [0,2,3,4,5,6,7,8] },
          // { className: 'text-left', targets: [1] },
          { bSortable: false, targets: [0,8] },
        ],
        fnRowCallback : function(nRow, aData, iDisplayIndex){
          const info = $(this).DataTable().page.info();
          let no = info.start + (iDisplayIndex + 1);
          $('td', nRow).eq(0).html(no);
        },
        drawCallback: function () {
          $('[data-toggle="tooltip"]').tooltip();
          $('.btnSepTambah').on('click', function () {
            modalMpgJawatanDipohon.add();
          });
          $('.lnkSepView').off('click').on('click', function () {
            modalMpgJawatanDipohon.view(123);
          });
          $('.lnkSepEdit').off('click').on('click', function () {
            modalMpgJawatanDipohon.edit(123);
          });
          $('.lnkSepRemove').off('click').on('click', function () {
            modalConfirmDelete.delete(123, modalMpgJawatanDipohon);
          });
        },
        aoColumns: [
          { mData: null},
          { mData: 'skimPermohonan'},
          { mData: 'noKelompok'},
        ]
      });

      ShowLoader();
      setTimeout(function () {
        $('#h5MspeTitle').html('<i class="fa-duotone fa-regular fa-cloud-check fa-lg mr-2"></i>Pengesahan Selesai');
        $('#modalMpgSelesaiPemerolehan').modal({backdrop: 'static', keyboard: false}).scrollTop(0);
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

      formValidateMspe.clearValidation();
      
      ShowLoader();
      setTimeout(function () {
        //self.assignValue();

        $('#h5MspeTitle').html('<i class="fa-duotone fa-pen-to-square mr-2"></i>Pengesahan Selesai');
        $('#modalMpgSelesaiPemerolehan').modal({backdrop: 'static', keyboard: false}).scrollTop(0);
        HideLoader();
      }, 200);

      
      self.genTableSep();

    } catch (e) {
      toastr['error'](e.message !== '' ? e.message : _ALERT_MSG_ERROR_DEFAULT, _ALERT_TITLE_ERROR);
    }
  };
  
  this.view = function (_id) {
    try {
      mzEmptyParams([_id]);
      id = _id;
      submitType = 'view';

      formValidateMspe.clearValidation();
      
      ShowLoader();
      setTimeout(function () {
        //self.assignValue();

        $('#h5MspeTitle').html('Pengesahan Selesai');
        $('#modalMpgSelesaiPemerolehan').modal({backdrop: 'static', keyboard: false}).scrollTop(0);
        HideLoader();
      }, 200);
    } catch (e) {
      toastr['error'](e.message !== '' ? e.message : _ALERT_MSG_ERROR_DEFAULT, _ALERT_TITLE_ERROR);
    }
  };
  

  this.genTableSep = function () {
    try {
      if (submitType == 'add') {
        const dataSep = [];
        dtSep.clear().rows.add(dataSep).draw();
      } else {
        const dataSep = [{
          skimPermohonan: '3235 - PEGAWAI KHIDMAT PELANGGANGRED N19', 
          noKelompok: '2491A039',
        },{
          skimPermohonan: '3235 - PEGAWAI KHIDMAT PELANGGANGRED N19', 
          noKelompok: '2491A039',
        }];
        dtSep.clear().rows.add(dataSep).draw();
      }
    } catch (e) { toastr['error'](_ALERT_MSG_ERROR_DEFAULT, _ALERT_TITLE_ERROR); }
  };
  
  this.getClassName = function () {
    return className;
  };
  
  this.setClassFrom = function (_classFrom) {
    classFrom = _classFrom;
  };
}