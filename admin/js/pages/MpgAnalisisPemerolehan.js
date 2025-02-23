function MpgAnalisisPemerolehan () {
  
  const className = 'MpgAnalisisPemerolehan';
  let self = this;
  let dtDisplay;
  let modalConfirmDelete;
  let modalConfirmAction;
  let modalMpgAnalisisPemerolehan;
  let sectionMpgGabunganSkim;
  let userId;
  let dtAna;
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
          dtAna.search('').columns().search('').draw();
          if ($('#txtAnprnoPemerolehan').val().length > 0) {
            dtAna.columns(1).search($('#txtAnprnoPemerolehan').val() ? $('#txtAnprnoPemerolehan').val() : '', false, true, false);
          }
          if ($('#txtAnprSkim').val().length > 0) {
            dtAna.columns(1).search($('#txtAnprSkim').val() ? $('#txtAnprSkim').val() : '', false, true, false);
          }
          if ($('#txtAnprSuruhanjaya').val().length > 0) {
            dtAna.columns(1).search($('#txtAnprSuruhanjaya').val() ? $('#txtAnprSuruhanjaya').val() : '', false, true, false);
          }
          if ($('#txtAnprTarikhDari').val().length > 0) {
            moment.locale('ms');
            const tarikhDari = moment($('#txtAnprTarikhDari').val(), 'DD/MM/YYYY').format('YYYY-MM-DD');
            // dtAna.columns(6).search($('#txtAnprTarikhDari').val() ? tarikhDari : '', false, true, false);
            console.log(tarikhDari);
            dtAna.columns(6).search((d) => d >= tarikhDari);
          }
          if ($('#txtAnprTarikhTutup').val().length > 0) {
            moment.locale('ms');
            const tarikhDari = moment($('#txtAnprTarikhTutup').val(), 'DD/MM/YYYY').format('YYYY-MM-DD');
            // dtAna.columns(6).search($('#txtAnprTarikhTutup').val() ? tarikhDari : '', false, true, false);
            console.log(tarikhDari);
            dtAna.columns(6).search((d) => d >= tarikhDari);
          }
          dtAna.draw();
        }
      });
      
      $('#btnAnprClearFilter').on('click', function () {
        formValidate.clearValidation();
        $('#lblAnprTarikhDari').addClass('active');
        $('#lblAnprTarikhHingga').addClass('active');
        dtAna.search('').columns().search('').draw();
      });
    
      dtAna = $('#dtAna').DataTable({
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
          { className: 'text-center align-top', targets: [0,1,2,3,4,5,6,7,8,9] },
          { className: 'text-left align-top', targets: [1] },
          { bSortable: false, targets: [0,9] },
          { visible: false, targets: [8,7,6] },
          { className: 'noVis', targets: [0,9] },
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
          { mData: 'noPemerolehan', mRender: function (data, type, row, meta) { 
            return data;
          }},
          { mData: 'skim', mRender: function (data, type, row, meta) { 
            return data;
          }}, 
            { mData: 'pengguna', mRender: function (data, type, row, meta) { 
            return data;
          }},
          { mData: 'tarikhDari', mRender: function (data, type, row, meta) { 
            return data;
          }},
          { mData: 'tarikhTutup', mRender: function (data, type, row, meta) { 
            return data;
          }},
          { mData: 'bilR'},
          { mData: 'bilCD'},
          { mData: 'bilCB'},
          { mData: null , mRender: function (data, type, row, meta) { 
            return dtDisplay.getActionMpgAnalisiPemerolehan('edit', 'lnkMpl', meta.row, data, row['keputusanId']); 
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
        pengguna : "AMMAR",
        skim : "1188 - PEGAWAI PEKHIDMATAN PENDIDIKAN SISWAZAH GRED DG41",
        tarikhDari : "01/01/2023",
        tarikhTutup : "05/01/2024",
        bilR : "100",
        bilCD : "100",
        bilCB : "78",
      },{
        noPemerolehan : "SS122334",
        pengguna : "HAIKAL",
        skim : "1188 - PEGAWAI PEKHIDMATAN PENDIDIKAN SISWAZAH GRED DG41",
        tarikhDari : "01/01/2023",
        tarikhTutup : "05/01/2024",
        bilR : "111",
        bilCD : "111",
        bilCB : "66",
      },{
        noPemerolehan : "SK122334",
        pengguna : "AMIRUL",
        skim : "1188 - PEGAWAI PEKHIDMATAN PENDIDIKAN SISWAZAH GRED DG41",
        tarikhDari : "01/01/2023",
        tarikhTutup : "05/01/2024",
        bilR : "121",
        bilCD : "121",
        bilCB : "34",
      }];
      dtAna.clear().rows.add(dataDb).draw();
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