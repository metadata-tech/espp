function MpgCatatanPemerolehan () {
  
  const className = 'MpgCatatanPemerolehan';
  let self = this;
  let dtDisplay;
  let modalConfirmDelete;
  let modalConfirmAction;
  let modalMpgCatatanPemerolehan;
  let sectionMpgGabunganSkim;
  let userId;
  let dtGsk;
  let formValidate;
  let vData = [
    {
      field_id: "txtCtprnoPemerolehan",
      type: "text",
      name: "No Pemerolehan",
      validator: {}
    },
    {
      field_id: "txtCtprSkim1",
      type: "text",
      name: "Skim1",
      validator: {}
    },
    {
      field_id: "txtCtprSkim2",
      type: "text",
      name: "Skim2",
      validator: {}
    },
    {
      field_id: "txtCtprSuruhanjaya",
      type: "text",
      name: "Suruhanjaya",
      validator: {}
    },
    {
      field_id: "txtCtprTarikhDari",
      type: "text",
      name: "Tarikh Mesyuarat (Dari)",
      validator: {}
    },
    {
      field_id: "txtCtprTarikhTutup",
      type: "text",
      name: "Tarikh (Tutup)",
      validator: {}
    },
    {
      field_id: "txtCtprKelompol",
      type: "text",
      name: "Kelompol",
      validator: {}
    },
    {
      field_id: "optCtprStatus",
      type: "select",
      name: "Status",
      validator: {}
    },
    {
      field_id: "optCtprProses",
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
      
      $('.btnAddCtpr').on('click', function () {
        sectionMpgGabunganSkim.add(123);
      });
      
      $('#btnCtprFilter').on('click', function () {
        if (!formValidate.validateNow()) {
          toastr['error'](_ALERT_MSG_VALIDATION, _ALERT_TITLE_ERROR);
        } else {
          dtGsk.search('').columns().search('').draw();
          if ($('#txtCtprnoPemerolehan').val().length > 0) {
            dtGsk.columns(1).search($('#txtCtprnoPemerolehan').val() ? $('#txtCtprnoPemerolehan').val() : '', false, true, false);
          }
          if ($('#txtCtprSkim').val().length > 0) {
            dtGsk.columns(1).search($('#txtCtprSkim').val() ? $('#txtCtprSkim').val() : '', false, true, false);
          }
          if ($('#txtCtprSuruhanjaya').val().length > 0) {
            dtGsk.columns(1).search($('#txtCtprSuruhanjaya').val() ? $('#txtCtprSuruhanjaya').val() : '', false, true, false);
          }
          if ($('#txtCtprTarikhDari').val().length > 0) {
            moment.locale('ms');
            const tarikhDari = moment($('#txtCtprTarikhDari').val(), 'DD/MM/YYYY').format('YYYY-MM-DD');
            // dtGsk.columns(6).search($('#txtCtprTarikhDari').val() ? tarikhDari : '', false, true, false);
            console.log(tarikhDari);
            dtGsk.columns(6).search((d) => d >= tarikhDari);
          }
          if ($('#txtCtprTarikhTutup').val().length > 0) {
            moment.locale('ms');
            const tarikhDari = moment($('#txtCtprTarikhTutup').val(), 'DD/MM/YYYY').format('YYYY-MM-DD');
            // dtGsk.columns(6).search($('#txtCtprTarikhTutup').val() ? tarikhDari : '', false, true, false);
            console.log(tarikhDari);
            dtGsk.columns(6).search((d) => d >= tarikhDari);
          }
          dtGsk.draw();
        }
      });
      
      $('#btnCtprClearFilter').on('click', function () {
        formValidate.clearValidation();
        $('#lblCtprTarikhDari').addClass('active');
        $('#lblCtprTarikhHingga').addClass('active');
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
          { className: 'text-center align-top', targets: [0,1,2,3,4,5,6] },
          { className: 'text-left align-top', targets: [1] },
          { bSortable: false, targets: [0,6] },
          { visible: false, targets: [4,5] },
          { className: 'noVis', targets: [0,6] },
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
            modalMpgCatatanPemerolehan.view(123);
          });
          $('.lnkMplEdit').off('click').on('click', function () {
            modalMpgCatatanPemerolehan.edit(123);
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
          { mData: 'noPemerolehan', mRender: function (data, type, row, meta) { 
            return data;
          }},
          { mData: 'suruhanjaya', mRender: function (data, type, row, meta) { 
            return data;
          }},
          { mData: 'skim', mRender: function (data, type, row, meta) { 
            return data;
          }},
          { mData: 'tarikhDari', mRender: function (data, type, row, meta) { 
            return data;
          }},
          { mData: 'tarikhTutup', mRender: function (data, type, row, meta) { 
            return data;
          }},
          { mData: null , mRender: function (data, type, row, meta) { 
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
        noPemerolehan : "SM122334",
        suruhanjaya : "12 - SURUHANJAYA PERKHIDMATAN PENDIDIKAN",
        skim : "1188 - PEGAWAI PEKHIDMATAN PENDIDIKAN SISWAZAH GRED DG41",
        tarikhDari : "01/01/2023",
        tarikhTutup : "05/01/2024",
      },{
        noPemerolehan : "SM777764",
        suruhanjaya : "12 - SURUHANJAYA PERKHIDMATAN PENDIDIKAN",
        skim : "1188 - PEGAWAI PEKHIDMATAN PENDIDIKAN SISWAZAH GRED DG41",
        tarikhDari : "01/01/2023",
        tarikhTutup : "05/01/2024",
      },{
        noPemerolehan : "SM545454",
        suruhanjaya : "12 - SURUHANJAYA PERKHIDMATAN PENDIDIKAN",
        skim : "1188 - PEGAWAI PEKHIDMATAN PENDIDIKAN SISWAZAH GRED DG41",
        tarikhDari : "01/01/2023",
        tarikhTutup : "05/01/2024",
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
  
  this.setModalMpgCatatanPemerolehan = function (_modalMpgCatatanPemerolehan) {
    modalMpgCatatanPemerolehan = _modalMpgCatatanPemerolehan;
  };
  
  this.setSectionMaklumatEkeps = function (_sectionMaklumatEkeps) {
    sectionMaklumatEkeps = _sectionMaklumatEkeps;
  };

  this.setSectionMpgGabunganSkim = function (_sectionMpgGabunganSkim) {
    sectionMpgGabunganSkim = _sectionMpgGabunganSkim;
  };

}