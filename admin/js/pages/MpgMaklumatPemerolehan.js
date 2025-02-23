function MpgMaklumatPemerolehan () {
  
  const className = 'MpgMaklumatPemerolehan';
  let self = this;
  let dtDisplay;
  let modalConfirmDelete;
  let modalConfirmAction;
  let modalErulling;
  let sectionMaklumatEkeps;
  let userId;
  let dtMpl;
  let formValidate;
  let vData = [
    {
      field_id: "txtLtPnnoPemerolehan",
      type: "text",
      name: "No Pemerolehan",
      validator: {}
    },
    {
      field_id: "txtLtPnSkim",
      type: "text",
      name: "Skim",
      validator: {}
    },
    {
      field_id: "txtLtPnSuruhanjaya",
      type: "text",
      name: "Suruhanjaya",
      validator: {}
    },
    {
      field_id: "txtLtPnTarikhDari",
      type: "text",
      name: "Tarikh Mesyuarat (Dari)",
      validator: {}
    },
    {
      field_id: "txtLtPnTarikhTutup",
      type: "text",
      name: "Tarikh (Tutup)",
      validator: {}
    },
    {
      field_id: "optLtPnStatus",
      type: "select",
      name: "Status",
      validator: {}
    }
  ];

  this.init = function () {
    try {
      console.log('init');

      formValidate = new MzValidate(false);
      formValidate.registerFields(vData);
      
      $('.btnAddMpl').on('click', function () {
        sectionMpgMaklumatPemerolehan.add(123);
      });
      
      $('#btnLtPnFilter').on('click', function () {
        if (!formValidate.validateNow()) {
          toastr['error'](_ALERT_MSG_VALIDATION, _ALERT_TITLE_ERROR);
        } else {
          dtMpl.search('').columns().search('').draw();
          if ($('#txtLtPnnoPemerolehan').val().length > 0) {
            dtMpl.columns(1).search($('#txtLtPnnoPemerolehan').val() ? $('#txtLtPnnoPemerolehan').val() : '', false, true, false);
          }
          if ($('#txtLtPnSkim').val().length > 0) {
            dtMpl.columns(1).search($('#txtLtPnSkim').val() ? $('#txtLtPnSkim').val() : '', false, true, false);
          }
          if ($('#txtLtPnSuruhanjaya').val().length > 0) {
            dtMpl.columns(1).search($('#txtLtPnSuruhanjaya').val() ? $('#txtLtPnSuruhanjaya').val() : '', false, true, false);
          }
          if ($('#txtLtPnTarikhDari').val().length > 0) {
            moment.locale('ms');
            const tarikhDari = moment($('#txtLtPnTarikhDari').val(), 'DD/MM/YYYY').format('YYYY-MM-DD');
            // dtMpl.columns(6).search($('#txtLtPnTarikhDari').val() ? tarikhDari : '', false, true, false);
            console.log(tarikhDari);
            dtMpl.columns(6).search((d) => d >= tarikhDari);
          }
          if ($('#txtLtPnTarikhTutup').val().length > 0) {
            moment.locale('ms');
            const tarikhDari = moment($('#txtLtPnTarikhTutup').val(), 'DD/MM/YYYY').format('YYYY-MM-DD');
            // dtMpl.columns(6).search($('#txtLtPnTarikhTutup').val() ? tarikhDari : '', false, true, false);
            console.log(tarikhDari);
            dtMpl.columns(6).search((d) => d >= tarikhDari);
          }
          dtMpl.draw();
        }
      });
      
      $('#btnLtPnClearFilter').on('click', function () {
        formValidate.clearValidation();
        $('#lblLtPnTarikhDari').addClass('active');
        $('#lblLtPnTarikhHingga').addClass('active');
        dtMpl.search('').columns().search('').draw();
      });
    
      dtMpl = $('#dtMpl').DataTable({
        bLengthChange: true,
        bFilter: true,
        pageLength: 10,
        bPaginate: true,
        bInfo: true,
        autoWidth: false,
        aaSorting: [[6, 'desc']],
        language: _DATATABLE_LANGUAGE,
        // dom: "<'row'<'col-12 col-sm-6 align-bottom'l><'col-sm-6 d-none d-sm-block'f>>" +
        dom:  "<'d-flex align-items-center'<'p-0 align-items-center d-none d-sm-block'B><'p-0 px-2 mt-2 align-items-center d-none d-sm-block'l><'p-0 mr-auto flex-fill 'f>>" +
        "<'d-flex mt-2'<'p-0 flex-fill'tr>>" +
        "<'d-flex align-items-center'<'p-0 flex-fill d-none d-sm-block'i><'p-0 mt-3 mr-auto flex-fill'p>>",
        columnDefs: [
          { className: 'text-center align-top', targets: [0,2,3,4,5,6,7,8,9,10] },
          { className: 'text-left align-top', targets: [1] },
          { bSortable: false, targets: [0,10] },
          { visible: false, targets: [7,8] },
          { className: 'noVis', targets: [0,10] },
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
            modalErulling.view(123);
          });
          $('.lnkMplEdit').off('click').on('click', function () {
            modalErulling.edit(123);
          });
          $('.lnkMplRemove').off('click').on('click', function () {
            // modalConfirmAction.action(123, self);
            modalConfirmDelete.delete(123, self);
          });
          $('.lnkMplLog').off('click').on('click', function () {
            
          });
          // $('.btnAddMpl').off('click').on('click', function () {
          //   sectionMpgMaklumatPemerolehan.add();
          // });
        },
        aoColumns: [
          { mData: null},
          { mData: 'noPemerolehan', mRender: function (data, type, row, meta) { 
            return data;
          }},
          { mData: 'skim', mRender: function (data, type, row, meta) { 
            return data;
          }},
          { mData: 'suruhanjaya', mRender: function (data, type, row, meta) { 
            return data;
          }},
         
          { mData: 'tarikhDari', mRender: function (data) { 
            moment.locale('ms');
            return moment(data, 'DD/MM/YYYY').format('YYYY-MM-DD');
          }},
          { mData: 'tarikhTutup', mRender: function (data) { 
            moment.locale('ms');
            return moment(data, 'DD/MM/YYYY').format('YYYY-MM-DD');
          }},
          { mData: 'pemerolehanInduk', mRender: function (data, type, row, meta) { 
            return data;
          }},
          { mData: 'fasa'},
          { mData: 'bilCalonFasa'},
          { mData: 'statusId', mRender: function (data, type, row, meta) { 
            if (data == 1) {
              return "SELESAI";
            } else if (data == 2) {
              return "BATAL";
            } else if (data == 3) {
              return "DERAF";
            } else if (data == 4) {
              return "SEDANG PROSES";
            } else {
              return "";
            }
          }},
          { mData: 'statusId', mRender: function (data, type, row, meta) { 
            return dtDisplay.getActionRuling('edit', 'lnkMpl', meta.row, data, row['keputusanId']); 
          }},
       
        ]
      });

      self.genTable();

    } catch (e) { throw new Error(); }
  }
  
  this.genTable = function () {
    try {
      const dataDb = [{
        noPemerolehan: "HQ - PUTRAJAYA",
        skim: "NT - NAIK PANGKAT DAN TATATERTIB",
        suruhanjaya: "TEMU DUGA",
        pemerolehanInduk: "MSJ",
        tarikhDari: "10/02/2025",
        tarikhTutup: "10/02/2025",
        fasa: '1209',
        bilCalonFasa: "18",
        statusId: 4,
      },{
        noPemerolehan: "S - SABAH",
        skim: "P - PENGAMBILAN",
        suruhanjaya: "TEMU DUGA",
        pemerolehanInduk: "MSJ",
        tarikhDari: "10/02/2025",
        tarikhTutup: "10/02/2025",
        fasa: '1209',
        bilCalonFasa: "18",
        statusId: 3,
      },{
        noPemerolehan: "Q -SARAWAK",
        skim: "K - PERKHIDMATAN",
        suruhanjaya: "TEMU DUGA",
        pemerolehanInduk: "MSJ",
        tarikhDari: "10/02/2025",
        tarikhTutup: "10/02/2025",
        fasa: '1209',
        bilCalonFasa: "18",
        statusId: 1,
      }];
      dtMpl.clear().rows.add(dataDb).draw();
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
  
  this.setModalErulling = function (_modalErulling) {
    modalErulling = _modalErulling;
  };
  
  this.setSectionMaklumatEkeps = function (_sectionMaklumatEkeps) {
    sectionMaklumatEkeps = _sectionMaklumatEkeps;
  };

  this.setSectionMpgMaklumatPemerolehan = function (_sectionMpgMaklumatPemerolehan) {
    sectionMpgMaklumatPemerolehan = _sectionMpgMaklumatPemerolehan;
  };

}