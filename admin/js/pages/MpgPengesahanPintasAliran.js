function MpgPengesahanPintasAliran () {
  
  const className = 'MpgPengesahanPintasAliran';
  let self = this;
  let dtDisplay;
  let modalConfirmDelete;
  let modalConfirmAction;
  let modalMpgPengesahanPintasAliran;
  // let modalMpgProsesPemerolehan2;
  let sectionMaklumatEkeps;
  let userId;
  let dtPpl;
  let formValidate;
  let vData = [
    {
      field_id: "txtPpalnoPemerolehan",
      type: "text",
      name: "No Pemerolehan",
      validator: {}
    },
    {
      field_id: "txtPpalSkim",
      type: "text",
      name: "Skim",
      validator: {}
    },
    {
      field_id: "txtPpalSuruhanjaya",
      type: "text",
      name: "Suruhanjaya",
      validator: {}
    },
    {
      field_id: "txtPpalTarikhDari",
      type: "text",
      name: "Tarikh Mesyuarat (Dari)",
      validator: {}
    },
    {
      field_id: "txtPpalTarikhTutup",
      type: "text",
      name: "Tarikh (Tutup)",
      validator: {}
    },
    {
      field_id: "optPpalStatus",
      type: "select",
      name: "Status",
      validator: {}
    },
    {
      field_id: "optPpalProses",
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
      
      $('.btnAddPpl').on('click', function () {
        sectionMpgMaklumatPemerolehan.add(123);
      });
      
      $('#btnPpalFilter').on('click', function () {
        if (!formValidate.validateNow()) {
          toastr['error'](_ALERT_MSG_VALIDATION, _ALERT_TITLE_ERROR);
        } else {
          dtPpl.search('').columns().search('').draw();
          if ($('#txtPpalnoPemerolehan').val().length > 0) {
            dtPpl.columns(1).search($('#txtPpalnoPemerolehan').val() ? $('#txtPpalnoPemerolehan').val() : '', false, true, false);
          }
          if ($('#txtPpalSkim').val().length > 0) {
            dtPpl.columns(1).search($('#txtPpalSkim').val() ? $('#txtPpalSkim').val() : '', false, true, false);
          }
          if ($('#txtPpalSuruhanjaya').val().length > 0) {
            dtPpl.columns(1).search($('#txtPpalSuruhanjaya').val() ? $('#txtPpalSuruhanjaya').val() : '', false, true, false);
          }
          if ($('#txtPpalTarikhDari').val().length > 0) {
            moment.locale('ms');
            const tarikhDari = moment($('#txtPpalTarikhDari').val(), 'DD/MM/YYYY').format('YYYY-MM-DD');
            // dtPpl.columns(6).search($('#txtPpalTarikhDari').val() ? tarikhDari : '', false, true, false);
            console.log(tarikhDari);
            dtPpl.columns(6).search((d) => d >= tarikhDari);
          }
          if ($('#txtPpalTarikhTutup').val().length > 0) {
            moment.locale('ms');
            const tarikhDari = moment($('#txtPpalTarikhTutup').val(), 'DD/MM/YYYY').format('YYYY-MM-DD');
            // dtPpl.columns(6).search($('#txtPpalTarikhTutup').val() ? tarikhDari : '', false, true, false);
            console.log(tarikhDari);
            dtPpl.columns(6).search((d) => d >= tarikhDari);
          }
          dtPpl.draw();
        }
      });
      
      $('#btnPpalClearFilter').on('click', function () {
        formValidate.clearValidation();
        $('#lblPpalTarikhDari').addClass('active');
        $('#lblPpalTarikhHingga').addClass('active');
        dtPpl.search('').columns().search('').draw();
      });
    
      dtPpl = $('#dtPpl').DataTable({
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
          { visible: false, targets: [] },
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
          // $('.btnAddPpl').off('click').on('click', function () {
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
          { mData: 'statusId', mRender: function (data, type, row, meta) { 
            if (data == 1) {
              return "SELESAI";
            } else if (data == 2) {
              return "SEDANG PROSES";
            }  else {
              return "";
            }
          }},
          { mData: 'suruhanjaya', mRender: function (data, type, row, meta) { 
            return data;
          }},
          {
            mData: 'ProsesId',
            mRender: function (data, type, row, meta) {
                if (Array.isArray(data)) {  
                    return data.map(id => {  
                        if (id === 1) {
                            return "TAPISAN";
                        } else if (id === 2) {
                            return "KLUSTER MATA PELAJARAN";
                        } else if (id === 3) {
                            return "TEMUDUGA";
                        } else if (id === 4) {
                            return "ANALISIS TEMUDUGA";
                        } else if (id === 5) {
                            return "TAWARAN LANTIK";
                        } else {
                            return "";
                        }
                    }).join(",<br> ");  
                } else {  
                    if (data === 1) {
                        return "TAPISAN";
                    } else if (data === 2) {
                        return "KLUSTER MATA PELAJARAN";
                    } else if (data === 3) {
                        return "TEMUDUGA";
                    } else if (data === 4) {
                        return "ANALISIS TEMUDUGA";
                    } else if (data === 5) {
                        return "TAWARAN LANTIK";
                    } else {
                        return "";
                    }
                }
            }
        },
          { mData: 'statusId', mRender: function (data, type, row, meta) { 
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
        noPemerolehan: "1",
        skim: "001",
        suruhanjaya: "AMIRUL ",
        statusId: 2,
        ProsesId:[1,2,3],
      },{
        noPemerolehan: "2",
        skim: "002",
        suruhanjaya: "AMMAR",
        statusId: 1,
        ProsesId:[1,2],
      },{
        noPemerolehan: "3",
        skim: "003",
        suruhanjaya: "HAIKAL",
        statusId: 1,
        ProsesId:[3,4],
      }];
      dtPpl.clear().rows.add(dataDb).draw();
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

  // this.setModalMpgProsesPemerolehan2 = function (_modalMpgProsesPemerolehan2) {
  //   modalMpgProsesPemerolehan2 = _modalMpgProsesPemerolehan2;
  // };
  
  this.setSectionMaklumatEkeps = function (_sectionMaklumatEkeps) {
    sectionMaklumatEkeps = _sectionMaklumatEkeps;
  };

  this.setSectionMpgMaklumatPemerolehan = function (_sectionMpgMaklumatPemerolehan) {
    sectionMpgMaklumatPemerolehan = _sectionMpgMaklumatPemerolehan;
  };

}