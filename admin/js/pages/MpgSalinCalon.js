function MpgSalinCalon () {
  
  const className = 'MpgSalinCalon';
  let self = this;
  let dtDisplay;
  let modalConfirmDelete;
  let modalConfirmAction;
  let modalMpgPengesahanPintasAliran;
  let sectionMpgSalinCalon;
  let userId;
  let dtKcp;
  let formValidate;
  let vData = [
    {
      field_id: "txtSlclnoPemerolehan",
      type: "text",
      name: "No Pemerolehan",
      validator: {}
    },
    {
      field_id: "txtSlclSkim",
      type: "text",
      name: "Skim",
      validator: {}
    },
    {
      field_id: "txtSlclSuruhanjaya",
      type: "text",
      name: "Suruhanjaya",
      validator: {}
    },
    {
      field_id: "txtSlclTarikhDari",
      type: "text",
      name: "Tarikh Mesyuarat (Dari)",
      validator: {}
    },
    {
      field_id: "txtSlclTarikhTutup",
      type: "text",
      name: "Tarikh (Tutup)",
      validator: {}
    },
    {
      field_id: "txtSlclKelompol",
      type: "text",
      name: "Kelompol",
      validator: {}
    },
    {
      field_id: "optSlclStatus",
      type: "select",
      name: "Status",
      validator: {}
    },
    {
      field_id: "optSlclProses",
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
      
      $('.btnAddSlcl').on('click', function () {
        sectionMpgSalinCalon.add(123);
      });
      
      $('#btnSlclFilter').on('click', function () {
        if (!formValidate.validateNow()) {
          toastr['error'](_ALERT_MSG_VALIDATION, _ALERT_TITLE_ERROR);
        } else {
          dtKcp.search('').columns().search('').draw();
          if ($('#txtSlclnoPemerolehan').val().length > 0) {
            dtKcp.columns(1).search($('#txtSlclnoPemerolehan').val() ? $('#txtSlclnoPemerolehan').val() : '', false, true, false);
          }
          if ($('#txtSlclSkim').val().length > 0) {
            dtKcp.columns(1).search($('#txtSlclSkim').val() ? $('#txtSlclSkim').val() : '', false, true, false);
          }
          if ($('#txtSlclSuruhanjaya').val().length > 0) {
            dtKcp.columns(1).search($('#txtSlclSuruhanjaya').val() ? $('#txtSlclSuruhanjaya').val() : '', false, true, false);
          }
          if ($('#txtSlclTarikhDari').val().length > 0) {
            moment.locale('ms');
            const tarikhDari = moment($('#txtSlclTarikhDari').val(), 'DD/MM/YYYY').format('YYYY-MM-DD');
            // dtKcp.columns(6).search($('#txtSlclTarikhDari').val() ? tarikhDari : '', false, true, false);
            console.log(tarikhDari);
            dtKcp.columns(6).search((d) => d >= tarikhDari);
          }
          if ($('#txtSlclTarikhTutup').val().length > 0) {
            moment.locale('ms');
            const tarikhDari = moment($('#txtSlclTarikhTutup').val(), 'DD/MM/YYYY').format('YYYY-MM-DD');
            // dtKcp.columns(6).search($('#txtSlclTarikhTutup').val() ? tarikhDari : '', false, true, false);
            console.log(tarikhDari);
            dtKcp.columns(6).search((d) => d >= tarikhDari);
          }
          dtKcp.draw();
        }
      });
      
      $('#btnSlclClearFilter').on('click', function () {
        formValidate.clearValidation();
        $('#lblSlclTarikhDari').addClass('active');
        $('#lblSlclTarikhHingga').addClass('active');
        dtKcp.search('').columns().search('').draw();
      });
    
      dtKcp = $('#dtKcp').DataTable({
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
          { className: 'text-center align-top', targets: [0,1,2,3,4,5,6,7,8] },
          { className: 'text-left align-top', targets: [1] },
          { bSortable: false, targets: [0,9] },
          { visible: false, targets: [6,7,8] },
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
          { mData: 'skim', mRender: function (data, type, row, meta) { 
            return data;
          }},
          { mData: 'noKadPengenalan', mRender: function (data, type, row, meta) { 
            return data;
          }},
          { mData: 'nama', mRender: function (data, type, row, meta) { 
            return data;
          }},
          { mData: 'noKelompok', mRender: function (data, type, row, meta) { 
            return data;
          }},
            { mData: 'statusId', mRender: function (data, type, row, meta) { 
            if (data == 1) {
              return "LANTIKAN TETAP";
            } else if (data == 2) {
              return "KONTRAK";
            }  else {
              return "";
            }
          }},
          { mData: 'ruling', mRender: function (data, type, row, meta) { 
            return data;
          }},
          { mData: 'suruhanjaya', mRender: function (data, type, row, meta) { 
            return data;
          }}, 
          { mData: 'noPemerolehan', mRender: function (data, type, row, meta) { 
            return data;
          }},
          { mData: 'statusId', mRender: function (data, type, row, meta) { 
            return dtDisplay.getActionMpgMaklumatPemerolehan('edit', 'lnkMpl', meta.row, data, row['keputusanId']); 
          }},
       
        ]
      });

      self.genTable();

    } catch (e) { throw new Error(); }
  }
  
  this.genTable = function () {
    try {
      const dataDb = [{
        noKadPengenalan: "01012020202",
        nama : "AMIRUL",
        noPemerolehan: "1",
        skim: "1111",
        suruhanjaya: "AMIRUL ",
        statusId: 2,
        noKelompok: "555644",
        ruling : "YES",
      },{
        noKadPengenalan: "01012020202",
        nama : "AMMAR",
        noKelompok: "555644",
        ruling : "YES",
        noPemerolehan: "2",
        skim: "2222",
        suruhanjaya: "AMMAR",
        statusId: 1,
      },{
        noKadPengenalan: "01012020202",
        nama : "HAIKAL",
        noKelompok: "555644",
        ruling : "YES",
        noPemerolehan: "3",
        skim: "3333",
        suruhanjaya: "HAIKAL",
        statusId: 1,
      }];
      dtKcp.clear().rows.add(dataDb).draw();
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

  this.setSectionMpgSalinCalon = function (_sectionMpgSalinCalon) {
    sectionMpgSalinCalon = _sectionMpgSalinCalon;
  };

}