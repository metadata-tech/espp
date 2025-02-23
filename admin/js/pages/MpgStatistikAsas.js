function MpgStatistikAsas () {
  
  const className = 'MpgStatistikAsas';
  let self = this;
  let dtDisplay;
  let modalConfirmDelete;
  let modalConfirmAction;
  let modalMpgAnalisisPemerolehan;
  let sectionMpgGabunganSkim;
  let userId;
  let dtSts;
  let formValidate;
  let vData = [
    {
      field_id: "txtAnprnoPemerolehan",
      type: "text",
      name: "No Pemerolehan",
      validator: {}
    },
    {
      field_id: "txtAnprSkim1",
      type: "text",
      name: "Skim1",
      validator: {}
    },
    {
      field_id: "txtAnprSkim2",
      type: "text",
      name: "Skim2",
      validator: {}
    },
    {
      field_id: "txtAnprSuruhanjaya",
      type: "text",
      name: "Suruhanjaya",
      validator: {}
    },
    {
      field_id: "txtAnprTarikhDari",
      type: "text",
      name: "Tarikh Mesyuarat (Dari)",
      validator: {}
    },
    {
      field_id: "txtAnprTarikhTutup",
      type: "text",
      name: "Tarikh (Tutup)",
      validator: {}
    },
    {
      field_id: "txtAnprKelompol",
      type: "text",
      name: "Kelompol",
      validator: {}
    },
    {
      field_id: "optAnprStatus",
      type: "select",
      name: "Status",
      validator: {}
    },
    {
      field_id: "optAnprProses",
      type: "select",
      name: "Proses",
      validator: {}
    }
  ];

  this.init = function () {
    try {
      console.log('init');

      formValidate = new MzValidate(false);
      formValidate.registerFields(vData);
      
      $('.btnAddAnpr').on('click', function () {
        sectionMpgGabunganSkim.add(123);
      });
      
      $('#btnAnprFilter').on('click', function () {
        if (!formValidate.validateNow()) {
          toastr['error'](_ALERT_MSG_VALIDATION, _ALERT_TITLE_ERROR);
        } else {
          dtSts.search('').columns().search('').draw();
          if ($('#txtAnprnoPemerolehan').val().length > 0) {
            dtSts.columns(1).search($('#txtAnprnoPemerolehan').val() ? $('#txtAnprnoPemerolehan').val() : '', false, true, false);
          }
          if ($('#txtAnprSkim').val().length > 0) {
            dtSts.columns(1).search($('#txtAnprSkim').val() ? $('#txtAnprSkim').val() : '', false, true, false);
          }
          if ($('#txtAnprSuruhanjaya').val().length > 0) {
            dtSts.columns(1).search($('#txtAnprSuruhanjaya').val() ? $('#txtAnprSuruhanjaya').val() : '', false, true, false);
          }
          if ($('#txtAnprTarikhDari').val().length > 0) {
            moment.locale('ms');
            const tarikhDari = moment($('#txtAnprTarikhDari').val(), 'DD/MM/YYYY').format('YYYY-MM-DD');
            // dtSts.columns(6).search($('#txtAnprTarikhDari').val() ? tarikhDari : '', false, true, false);
            console.log(tarikhDari);
            dtSts.columns(6).search((d) => d >= tarikhDari);
          }
          if ($('#txtAnprTarikhTutup').val().length > 0) {
            moment.locale('ms');
            const tarikhDari = moment($('#txtAnprTarikhTutup').val(), 'DD/MM/YYYY').format('YYYY-MM-DD');
            // dtSts.columns(6).search($('#txtAnprTarikhTutup').val() ? tarikhDari : '', false, true, false);
            console.log(tarikhDari);
            dtSts.columns(6).search((d) => d >= tarikhDari);
          }
          dtSts.draw();
        }
      });
      
      $('#btnAnprClearFilter').on('click', function () {
        formValidate.clearValidation();
        $('#lblAnprTarikhDari').addClass('active');
        $('#lblAnprTarikhHingga').addClass('active');
        dtSts.search('').columns().search('').draw();
      });
    
      dtSts = $('#dtSts').DataTable({
        bLengthChange: true,
        bFilter: true,
        pageLength: 10,
        bPaginate: true,
        bInfo: true,
        autoWidth: false,
        // aaSorting: [[6, 'desc']],
        language: _DATATABLE_LANGUAGE,
        // dom: "<'row'<'col-12 col-sm-6 align-bottom'l><'col-sm-6 d-none d-sm-block'f>>" +
        dom:  "<'d-flex align-items-center'<'p-0 align-items-center d-none d-sm-block'B><'p-0 px-2 mt-2 align-items-center d-none d-sm-block'l><'p-0 mr-auto flex-fill 'f>>" +
        "<'d-flex mt-2'<'p-0 flex-fill'tr>>" +
        "<'d-flex align-items-center'<'p-0 flex-fill d-none d-sm-block'i><'p-0 mt-3 mr-auto flex-fill'p>>",
        columnDefs: [
          { className: 'text-center align-top', targets: [0,1,2,3,4,5,6,7] },
          { className: 'text-left align-top', targets: [1] },
          { bSortable: false, targets: [0] },
          { visible: false, targets: [] },
          { className: 'noVis', targets: [0] },
        ],
        buttons: [
          { extend: 'colvis', columns: ':not(.noVis)', fade: 400, collectionLayout: 'three-column', text:'<i class="fa-solid fa-columns"></i>', className: 'btn btn-outline-default btn-sm btn-icon z-depth-0', titleAttr: 'Pilihan Kolum'},
          { extend: 'excelHtml5', className: 'btn btn-outline-default btn-sm btn-icon ml-0 z-depth-0', text:'<i class="fa-solid fa-file-excel"></i>', title:'Senarai', titleAttr: 'Excel', exportOptions: mzExportOpt},
          { text: '<i class="fa-solid fa-arrows-rotate"></i>', className: 'btn btn-outline-default btn-sm btn-icon ml-0 z-depth-0', attr: { id: 'btnMplRefresh' }, titleAttr: 'Muat Semula Senarai'}
        ],
        fnRowCallback : function(nRow, aData, iDisplayIndex){
          const info = $(this).DataTable().page.info();
          $('td', nRow).eq(0).html(info.start + (iDisplayIndex + 1));
        },
        drawCallback: function () {
          $('[data-toggle="tooltip"]').tooltip();
          $('#btnMplRefresh').off('click').on('click', function () {
            ShowLoader(); setTimeout(function () { try {
              self.genTable();
            } catch (e) { toastr['error'](e.message, _ALERT_TITLE_ERROR); } HideLoader(); }, 100);
          });
          $('.lnkMplView').off('click').on('click', function () {
            // modalConfirmAction.action(123, self);
            modalMpgAnalisisPemerolehan.view(123);
          });
          $('.lnkMplEdit').off('click').on('click', function () {
            modalMpgAnalisisPemerolehan.edit(123);
          });
          $('.lnkMplRemove').off('click').on('click', function () {
            // modalConfirmAction.action(123, self);
            modalConfirmDelete.delete(123, self);
          });
          $('.lnkMplLog').off('click').on('click', function () {
            
          });
          // $('.btnAddKcp').off('click').on('click', function () {
          //   sectionMpgMaklumatPemerolehan.add();
          // });
        },
        aoColumns: [
          { mData: null},
          { mData: 'tahun'},
          { mData: 'pg'},
          { mData: 'bg'},
          { mData: 'sw'},
          { mData: 'sb'},
          { mData: 'sl'},
          { mData: 'sz'},
        ]
      });

      self.genTable();

    } catch (e) { throw new Error(); }
  }
  
  this.genTable = function () {
    try {
      const dataDb = [{
        tahun : "2025",
        pg : "3",
        bg : "1",
        sw : "2",
        sb : "1",
        sl : "3",
        sz : "2",
      },{
        tahun : "2024",
        pg : "3",
        bg : "1",
        sw : "2",
        sb : "1",
        sl : "3",
        sz : "2",
      },{
        tahun : "2023",
        pg : "3",
        bg : "1",
        sw : "2",
        sb : "1",
        sl : "3",
        sz : "2",
      }];
      dtSts.clear().rows.add(dataDb).draw();
    } catch (e) { toastr['error'](_ALERT_MSG_ERROR_DEFAULT, _ALERT_TITLE_ERROR); }
  };
  
  this.delete = function (_id) {
    try {
      mzEmptyParams([_id]);

      toastr['success']('Maklumat Pemerolehan berjaya dihapus!');
    } catch (e) {
      toastr["error"](_ALERT_MSG_ERROR_DEFAULT, _ALERT_TITLE_ERROR);
    }
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
  
  this.setModalMpgAnalisisPemerolehan = function (_modalMpgAnalisisPemerolehan) {
    modalMpgAnalisisPemerolehan = _modalMpgAnalisisPemerolehan;
  };
  
  this.setSectionMaklumatEkeps = function (_sectionMaklumatEkeps) {
    sectionMaklumatEkeps = _sectionMaklumatEkeps;
  };

  this.setSectionMpgGabunganSkim = function (_sectionMpgGabunganSkim) {
    sectionMpgGabunganSkim = _sectionMpgGabunganSkim;
  };

}