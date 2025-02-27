function MpgPindahCalon () {
  
  const className = 'MpgPindahCalon';
  let self = this;
  let dtDisplay;
  let modalConfirmDelete;
  let modalConfirmAction;
  let modalMpgJawatanDipohon;
  let sectionMaklumatEkeps;
  let userId;
  let dtJwt;
  let dtKpk;
  let dtScb;
  let submitType;
  let formValidate;
  let vData = [
    // {
    //   field_id: "txtCmclNoKp",
    //   type: "text",
    //   name: "No. Kad Pengenalan",
    //   validator: {
    //     notEmpty: true,
    //     maxLengthDigit: 12,
    //   }
    // }
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
          $('#sectionMaklumat').hide();
        } else {
          $('#sectionMaklumat').show();
        }
      });
      
      $('#btnCmclClearFilter').on('click', function () {
        formValidate.clearValidation();
        $('#sectionMaklumat').hide();
      });
    
      dtKpk = $('#dtKpk').DataTable({
        bLengthChange: false,
        bFilter: true,
        bPaginate: false,
        bInfo: true,
        autoWidth: false,
        // ordering: false,
        order: [[3, 'desc']],
        language: _DATATABLE_LANGUAGE,
        dom:  "<'d-flex '<'p-0 mr-auto flex-fill 'f>>",
        columnDefs: [
          { className: 'text-center', targets: "_all" },
          { bSortable: false, targets: "_all" },
          { visible: false, targets: [4] },
          //{ className: 'noVis', targets: [] },
        ],
        fnRowCallback : function(nRow, aData, iDisplayIndex){
          const info = $(this).DataTable().page.info();
          let no = info.start + (iDisplayIndex + 1);
          $('td', nRow).eq(0).html(no);
        },
        drawCallback: function () {
          $('[data-toggle="tooltip"]').tooltip();
          $('.btnKpkTambah').on('click', function () {
            // modalMpgJawatanDipohon.add();
          });
          $('.lnkKpkView').off('click').on('click', function () {
            // modalMpgJawatanDipohon.view(123);
          });
          $('.lnkKpkEdit').off('click').on('click', function () {
            // modalMpgJawatanDipohon.edit(123);
          });
          $('.lnkKpkRemove').off('click').on('click', function () {
            modalConfirmDelete.delete(123, modalMpgJawatanDipohon);
          });
        },
        aoColumns: [
          { mData: null},
          { mData: null, mRender: function (data, type, row, meta) {
            return '<div class="form-check p-0 m-0" style="margin-top: -6px !important; margin-bottom: -6px !important;">' +
                '<input type="checkbox" class="form-check-input check chkKotak" name="chkKotak[]" id="chkKotak' + meta.row + '" value="' + meta.row + '">' +
                '<label class="form-check-label" for="chkKotak' + meta.row + '"></label>' +
                '</div>';
              }},
          { mData: 'noKadPengenalan'},
          { mData: 'namaCalon'},
          { mData: null, mRender: function (data, type, row, meta) { 
            return dtDisplay.getActionA(submitType, 'lnkKpk', meta.row, 1); 
          }},
        ]
      });

      dtScb = $('#dtScb').DataTable({
        bLengthChange: false,
        bFilter: true,
        bPaginate: false,
        bInfo: true,
        autoWidth: false,
        // ordering: false,
        order: [[3, 'desc']],
        language: _DATATABLE_LANGUAGE,
        dom: "<'d-flex'<'p-0'><'p-0 d-none d-sm-block ml-auto'>>" +
        "<'d-flex'<'p-0 flex-fill'tr>>",
        columnDefs: [
          { className: 'text-center', targets: "_all" },
          { bSortable: false, targets: "_all" },
          { visible: false, targets: [] },
          //{ className: 'noVis', targets: [] },
        ],
        fnRowCallback : function(nRow, aData, iDisplayIndex){
          const info = $(this).DataTable().page.info();
          let no = info.start + (iDisplayIndex + 1);
          $('td', nRow).eq(0).html(no);
        },
        drawCallback: function () {
          $('[data-toggle="tooltip"]').tooltip();
          $('.btnScbTambah').on('click', function () {
            // modalMpgJawatanDipohon.add();
          });
          $('.lnkScbView').off('click').on('click', function () {
            // modalMpgJawatanDipohon.view(123);
          });
          $('.lnkScbEdit').off('click').on('click', function () {
            // modalMpgJawatanDipohon.edit(123);
          });
          $('.lnkScbRemove').off('click').on('click', function () {
            modalConfirmDelete.delete(123, modalMpgJawatanDipohon);
          });
        },
        aoColumns: [
          { mData: null},
          { mData: 'noPemerolehanAsal'},
          { mData: 'noKadPengenalan'},
          { mData: 'namaCalon'},
          { mData: null, mRender: function (data, type, row, meta) { 
            return dtDisplay.getActionMpgMaklumatPemerolehan(submitType, 'lnkScb', meta.row, 1); 
          }},
        ]
      });


      self.genTableKpk();
      self.genTableScb();

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

  this.genTableKpk = function () {
    try {
      if (submitType == 'add') {
        const dataKpk = [];
        dtKpk.clear().rows.add(dataKpk).draw();
      } else {
        const dataKpk = [{
          noKadPengenalan: '112211221122', 
          namaCalon: 'Hanipah Binti Ahmad', 
          tahunPendidikan: '2011', 
        },{
          noKadPengenalan: '112211221122', 
          namaCalon: 'Azim', 
          tahunPendidikan: '2013', 
        }];
        dtKpk.clear().rows.add(dataKpk).draw();
      }
    } catch (e) { toastr['error'](_ALERT_MSG_ERROR_DEFAULT, _ALERT_TITLE_ERROR); }
  };

  this.genTableScb = function () {
    try {
      if (submitType == 'add') {
        const dataScb = [];
        dtScb.clear().rows.add(dataScb).draw();
      } else {
        const dataScb = [{
          noPemerolehanAsal: '112211221122', 
          noKadPengenalan: '112211221122', 
          namaCalon: 'Hanipah Binti Ahmad', 
          tahunPendidikan: '2011', 
        },{
          noPemerolehanAsal: '112211221122', 
          noKadPengenalan: '112211221122', 
          namaCalon: 'Azim', 
          tahunPendidikan: '2013', 
        }];
        dtScb.clear().rows.add(dataScb).draw();
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