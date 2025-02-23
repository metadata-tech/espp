function MpgGabunganSkim () {
  
  const className = 'MpgGabunganSkim';
  let self = this;
  let dtDisplay;
  let modalConfirmDelete;
  let modalConfirmAction;
  let modalMpgPengesahanPintasAliran;
  let sectionMpgGabunganSkim;
  let userId;
  let dtGsk;
  let formValidate;
  let vData = [
    {
      field_id: "txtGbsknoPemerolehan",
      type: "text",
      name: "No Pemerolehan",
      validator: {}
    },
    {
      field_id: "txtGbskSkim",
      type: "text",
      name: "Skim",
      validator: {}
    },
    {
      field_id: "txtGbskSuruhanjaya",
      type: "text",
      name: "Suruhanjaya",
      validator: {}
    },
    {
      field_id: "txtGbskTarikhDari",
      type: "text",
      name: "Tarikh Mesyuarat (Dari)",
      validator: {}
    },
    {
      field_id: "txtGbskTarikhTutup",
      type: "text",
      name: "Tarikh (Tutup)",
      validator: {}
    },
    {
      field_id: "txtGbskKelompol",
      type: "text",
      name: "Kelompol",
      validator: {}
    },
    {
      field_id: "optGbskStatus",
      type: "select",
      name: "Status",
      validator: {}
    },
    {
      field_id: "optGbskProses",
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
      
      $('.btnAddGbsk').on('click', function () {
        sectionMpgGabunganSkim.add(123);
      });
      
      $('#btnGbskFilter').on('click', function () {
        if (!formValidate.validateNow()) {
          toastr['error'](_ALERT_MSG_VALIDATION, _ALERT_TITLE_ERROR);
        } else {
          dtGsk.search('').columns().search('').draw();
          if ($('#txtGbsknoPemerolehan').val().length > 0) {
            dtGsk.columns(1).search($('#txtGbsknoPemerolehan').val() ? $('#txtGbsknoPemerolehan').val() : '', false, true, false);
          }
          if ($('#txtGbskSkim').val().length > 0) {
            dtGsk.columns(1).search($('#txtGbskSkim').val() ? $('#txtGbskSkim').val() : '', false, true, false);
          }
          if ($('#txtGbskSuruhanjaya').val().length > 0) {
            dtGsk.columns(1).search($('#txtGbskSuruhanjaya').val() ? $('#txtGbskSuruhanjaya').val() : '', false, true, false);
          }
          if ($('#txtGbskTarikhDari').val().length > 0) {
            moment.locale('ms');
            const tarikhDari = moment($('#txtGbskTarikhDari').val(), 'DD/MM/YYYY').format('YYYY-MM-DD');
            // dtGsk.columns(6).search($('#txtGbskTarikhDari').val() ? tarikhDari : '', false, true, false);
            console.log(tarikhDari);
            dtGsk.columns(6).search((d) => d >= tarikhDari);
          }
          if ($('#txtGbskTarikhTutup').val().length > 0) {
            moment.locale('ms');
            const tarikhDari = moment($('#txtGbskTarikhTutup').val(), 'DD/MM/YYYY').format('YYYY-MM-DD');
            // dtGsk.columns(6).search($('#txtGbskTarikhTutup').val() ? tarikhDari : '', false, true, false);
            console.log(tarikhDari);
            dtGsk.columns(6).search((d) => d >= tarikhDari);
          }
          dtGsk.draw();
        }
      });
      
      $('#btnGbskClearFilter').on('click', function () {
        formValidate.clearValidation();
        $('#lblGbskTarikhDari').addClass('active');
        $('#lblGbskTarikhHingga').addClass('active');
        dtGsk.search('').columns().search('').draw();
      });
    
      dtGsk = $('#dtGsk').DataTable({
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
          { className: 'text-center align-top', targets: [0,1,2,3,4] },
          { className: 'text-left align-top', targets: [1] },
          { bSortable: false, targets: [0,4] },
          { visible: false, targets: [] },
          { className: 'noVis', targets: [0,4] },
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
            modalMpgPengesahanPintasAliran.view(123);
          });
          $('.lnkMplEdit').off('click').on('click', function () {
            modalMpgPengesahanPintasAliran.edit(123);
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
          { mData: 'kod', mRender: function (data, type, row, meta) { 
            return data;
          }},
          { mData: 'diskripsi', mRender: function (data, type, row, meta) { 
            return data;
          }},
            { mData: 'statusId', mRender: function (data, type, row, meta) { 
            if (data == 1) {
              return "YA";
            } else if (data == 2) {
              return "TIDAK";
            }  else {
              return "";
            }
          }},
          { mData: 'statusId' , mRender: function (data, type, row, meta) { 
            return dtDisplay.getActionMpgPengesahanPintasAliran('edit', 'lnkMpl', meta.row, data, row['keputusanId']); 
          }},
       
        ]
      });

      self.genTable();

    } catch (e) { throw new Error(); }
  }
  
  this.genTable = function () {
    try {
      const dataDb = [{
      kod : "011",
      diskripsi : "Logistik",
      statusId : 1,
      },{
        kod : "A11",
        diskripsi : "HR",
        statusId : 1,
      },{
        kod : "B11",
        diskripsi : "Gabungan Pengurusan Pelancongan",
        statusId : 2,
      }];
      dtGsk.clear().rows.add(dataDb).draw();
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
  
  this.setModalMpgPengesahanPintasAliran = function (_modalMpgPengesahanPintasAliran) {
    modalMpgPengesahanPintasAliran = _modalMpgPengesahanPintasAliran;
  };
  
  this.setSectionMaklumatEkeps = function (_sectionMaklumatEkeps) {
    sectionMaklumatEkeps = _sectionMaklumatEkeps;
  };

  this.setSectionMpgGabunganSkim = function (_sectionMpgGabunganSkim) {
    sectionMpgGabunganSkim = _sectionMpgGabunganSkim;
  };

}