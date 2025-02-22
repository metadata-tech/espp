function MpgMaklumatCalon () {
  
  const className = 'MpgMaklumatCalon';
  let self = this;
  let dtDisplay;
  let modalConfirmDelete;
  let modalConfirmAction;
  let modalMpgJawatanDipohon;
  let sectionMaklumatEkeps;
  let userId;
  let dtJwt;
  let submitType;
  let formValidate;
  let vData = [
    {
      field_id: "txtCmclNoKp",
      type: "text",
      name: "No. Kad Pengenalan",
      validator: {
        notEmpty: true,
        maxLengthDigit: 12,
      }
    }
  ];

  this.init = function () {
    try {
      console.log('init');
      maScrollTop();
      submitType = 'edit';

      formValidate = new MzValidate(false);
      formValidate.registerFields(vData);

      $('.btnSmclNext').click(function(e) {
        e.preventDefault();
        $('.nav-pills-custom .active').parent().next('li').find('a').trigger('click');
        $(window).scrollTop(0);
      });
  
      $('.btnSmclPrevious').click(function(e) {
        e.preventDefault();
        $('.nav-pills-custom .active').parent().prev('li').find('a').trigger('click');
        $(window).scrollTop(0);
      });
      
      $('#btnCmclFilter').on('click', function () {
        if (!formValidate.validateNow()) {
          toastr['error'](_ALERT_MSG_VALIDATION, _ALERT_TITLE_ERROR);
        } else {
          
        }
      });
      
      $('#btnCmclClearFilter').on('click', function () {
        formValidate.clearValidation();
      });
    
      dtJwt = $('#dtJwt').DataTable({
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
          // { visible: false, targets: [5] },
          // { className: 'noVis', targets: [4,5] },
        ],
        fnRowCallback : function(nRow, aData, iDisplayIndex){
          const info = $(this).DataTable().page.info();
          let no = info.start + (iDisplayIndex + 1);
          $('td', nRow).eq(0).html(no);
        },
        drawCallback: function () {
          $('[data-toggle="tooltip"]').tooltip();
          $('.btnJwtTambah').on('click', function () {
            modalMpgJawatanDipohon.add();
          });
          $('.lnkJwtView').off('click').on('click', function () {
            modalMpgJawatanDipohon.view(123);
          });
          $('.lnkJwtEdit').off('click').on('click', function () {
            modalMpgJawatanDipohon.edit(123);
          });
          $('.lnkJwtRemove').off('click').on('click', function () {
            modalConfirmDelete.delete(123, modalMpgJawatanDipohon);
          });
        },
        aoColumns: [
          { mData: null},
          { mData: 'skimPermohonan'},
          { mData: 'noKelompok'},
          { mData: 'noSiri'},
          { mData: 'jDaftar'},
          { mData: 'keutamaan'},
          { mData: 'tarikhSuratPerakuan'},
          { mData: 'tarikhDaftar'},
          { mData: null, mRender: function (data, type, row, meta) { 
            return dtDisplay.getActionA(submitType, 'lnkJwt', meta.row, 1); 
          }},
        ]
      });

      self.genTableJwt();

    } catch (e) { throw new Error(); }
  }
  
  this.delete = function (_id) {
    try {
      mzEmptyParams([_id]);

      toastr['success']('Maklumat PGSPP berjaya dihapus!');
    } catch (e) {
      toastr["error"](_ALERT_MSG_ERROR_DEFAULT, _ALERT_TITLE_ERROR);
    }
  };
  
  this.genTableJwt = function () {
    try {
      if (submitType == 'add') {
        const dataJwt = [];
        dtJwt.clear().rows.add(dataJwt).draw();
      } else {
        const dataJwt = [{
          skimPermohonan: '3235 - PEGAWAI KHIDMAT PELANGGANGRED N19', 
          noKelompok: '2491A039', 
          noSiri: '040', 
          jDaftar: '03', 
          keutamaan: 1, 
          tarikhSuratPerakuan: '14/10/2023', 
          tarikhDaftar: '14/10/2023', 
        },{
          skimPermohonan: '3235 - PEGAWAI KHIDMAT PELANGGANGRED N19', 
          noKelompok: '2491A039', 
          noSiri: '040', 
          jDaftar: '03', 
          keutamaan: 2, 
          tarikhSuratPerakuan: '14/10/2023', 
          tarikhDaftar: '14/10/2023', 
        }];
        dtJwt.clear().rows.add(dataJwt).draw();
      }
    } catch (e) { toastr['error'](_ALERT_MSG_ERROR_DEFAULT, _ALERT_TITLE_ERROR); }
  };

  this.setDtDisplay = function (_dtDisplay) {
    dtDisplay = _dtDisplay;
  };

  this.setModalConfirmAction = function (_modalConfirmAction) {
    modalConfirmAction = _modalConfirmAction;
  };
  
  this.setModalConfirmDelete = function (_modalConfirmDelete) {
    modalConfirmDelete = _modalConfirmDelete;
  };
  
  this.setModalMpgJawatanDipohon = function (_modalMpgJawatanDipohon) {
    modalMpgJawatanDipohon = _modalMpgJawatanDipohon;
  };
  
  this.setSectionMaklumatEkeps = function (_sectionMaklumatEkeps) {
    sectionMaklumatEkeps = _sectionMaklumatEkeps;
  };

}