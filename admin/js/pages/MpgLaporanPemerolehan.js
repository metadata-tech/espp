function MpgLaporanPemerolehan () {
  
  const className = 'MpgLaporanPemerolehan';
  let self = this;
  let dtDisplay;
  let modalConfirmDelete;
  let modalConfirmAction;
  let modalPermohonanPengisian;
  let modalMpgSelesaiPemerolehan;
  let userId;
  let dtPsl;
  let formValidate;
  let vData = [
    {
      field_id: "txtSaspNoPemerolehan",
      type: "text",
      name: "No. Pemerolehan",
      validator: {}
    },
    {
      field_id: "optSaspSkimPerkhidmatan",
      type: "select",
      name: "Skim Perkhidmatan",
      validator: {}
    },
    {
      field_id: "optSaspStatus",
      type: "check",
      name: "Status",
      validator: {}
    },
  ];

  this.init = function () {
    try {
      console.log('init');

      formValidate = new MzValidate(false);
      formValidate.registerFields(vData);
      
      $('.btnAddPpj').on('click', function () {
        modalMpgSelesaiPemerolehan.add();
        // modalPermohonanPengisian.add();
      });
      
      $('#btnSaspFilter').on('click', function () {
        if (!formValidate.validateNow()) {
          toastr['error'](_ALERT_MSG_VALIDATION, _ALERT_TITLE_ERROR);
        } else {
          dtPsl.search('').columns().search('').draw();
          if ($('#txtSaspTahun').val().length > 0) {
            dtPsl.columns(1).search($('#txtSaspTahun').val() ? $('#txtSaspTahun').val() : '', true, false);
          }
          if ($('#optSaspSkimPerkhidmatan').val().length > 0) {
            dtPsl.columns(4).search($('#optSaspSkimPerkhidmatan').val() ? $('#optSaspSkimPerkhidmatan').val() : '', true, false);
          }
          const status = $("input[name='chkSaspStatus[]']:checked").map(function(){
            return '^'+this.value+'$'; 
          }).get().join('|');
          dtPsl.column(7).search(status ? '^'+status+'$' : '', true, false);
          dtPsl.draw();
        }
      });
      
      $('#btnSaspClearFilter').on('click', function () {
        formValidate.clearValidation();
        $('#lblSaspTarikhDari').addClass('active');
        $('#lblSaspTarikhHingga').addClass('active');
        dtPsl.search('').columns().search('').draw();
      });
    
      dtPsl = $('#dtPsl').DataTable({
        bLengthChange: false,
        bFilter: true,
        pageLength: 10,
        bPaginate: true,
        bInfo: true,
        autoWidth: false,
        aaSorting: [[1, 'asc'],[2, 'asc']],
        aaSorting: [[1, 'asc'],[2, 'asc']],
        language: _DATATABLE_LANGUAGE,
        dom: "<'row'<'col-12 col-sm-6'B><'col-sm-6 d-none d-sm-block'f>>" +
        "<'d-flex mt-2'<'p-0 flex-fill'tr>>" +
        "<'d-flex align-items-center'<'p-0 flex-fill d-none d-sm-block'i><'p-0 mt-3 mr-auto flex-fill'p>>",
        columnDefs: [
          { className: 'text-center align-top', targets: [0,1,2] },
          { bSortable: false, targets: [0, 1, 2] },
          // // { visible: false, targets: [3] },
          { className: 'noVis', targets: [0,2] },
        ],
        buttons: [
          { extend: 'colvis', columns: ':not(.noVis)', fade: 400, collectionLayout: 'three-column', text:'<i class="fa-solid fa-columns"></i>', className: 'btn btn-outline-default btn-sm btn-icon z-depth-0', titleAttr: 'Pilihan Kolum'},
          { extend: 'excelHtml5', className: 'btn btn-outline-default btn-sm btn-icon ml-0 z-depth-0', text:'<i class="fa-solid fa-file-excel"></i>', title:'Senarai', titleAttr: 'Excel', exportOptions: mzExportOpt},
          { text: '<i class="fa-solid fa-arrows-rotate"></i>', className: 'btn btn-outline-default btn-sm btn-icon ml-0 z-depth-0', attr: { id: 'btnPpjRefresh' }, titleAttr: 'Muat Semula Senarai'}
        ],
        fnRowCallback : function(nRow, aData, iDisplayIndex){
          const info = $(this).DataTable().page.info();
          $('td', nRow).eq(0).html(info.start + (iDisplayIndex + 1));
        },
        drawCallback: function () {
          $('[data-toggle="tooltip"]').tooltip();
          $('#btnPpjRefresh').off('click').on('click', function () {
            ShowLoader(); setTimeout(function () { try {
              self.genTable();
            } catch (e) { toastr['error'](e.message, _ALERT_TITLE_ERROR); } HideLoader(); }, 100);
          });
          $('.lnkPpjView').off('click').on('click', function () {
            // modalConfirmAction.action(123, self);
            modalMpgSelesaiPemerolehan.view(123);
          });
          // $('.lnkPpjEdit').off('click').on('click', function () {
          //   modalMpgSelesaiPemerolehan.edit(123);
          // });
          $('.lnkPpjRemove').off('click').on('click', function () {
            modalConfirmDelete.delete(123, self);
          });
          $('.lnkPpjLog').off('click').on('click', function () {
            
          });
        },
        aoColumns: [
          { mData: null},
          { mData: 'skimPerkhidmatan', mRender: function (data, type, row, meta) { 
            return data;
          }},
          { mData: 'statusId', mRender: function (data, type, row, meta) { 
            return dtDisplay.getActionMpgPengesahanPintasAliran('edit', 'lnkPpj', meta.row, data); 
          }},
        ]
      });

      self.genTable();

    } catch (e) { throw new Error(); }
  }
  
  this.genTable = function () {
    console.log('gen table');
    try {
      const dataDb = [{
        noPemerolehan: "SM20210002", 
        kementerian: "DOKUMEN PEMEROLEHAN", 
        skimPerkhidmatan: 'DOKUMEN PEMEROLEHAN', 
        tarikhPermohonan: "20/12/2020", 
        bilKekosongan: 789, 
        statusId: 1,
      },{
        noPemerolehan: "SM20200002", 
        kementerian: "SENARAI RULING", 
        skimPerkhidmatan: 'SENARAI RULING', 
        tarikhPermohonan: "20/12/2020", 
        bilKekosongan: 550, 
        statusId: 2,
      },{
        noPemerolehan: "SM20210001", 
        kementerian: "SENARAI CALON MENGIKUT STATUS PEMEROLEHAN", 
        skimPerkhidmatan: 'SENARAI CALON MENGIKUT STATUS PEMEROLEHAN', 
        tarikhPermohonan: "20/12/2021", 
        bilKekosongan: 789, 
        statusId: 2,
      },{
        noPemerolehan: "SM20210002", 
        kementerian: "STATISTIK SELEPAS PEMEROLEHAN", 
        skimPerkhidmatan: 'STATISTIK SELEPAS PEMEROLEHAN', 
        tarikhPermohonan: "20/12/2021", 
        bilKekosongan: 550, 
        statusId: 2,
      },];
      dtPsl.clear().rows.add(dataDb).draw();
    } catch (e) { toastr['error'](_ALERT_MSG_ERROR_DEFAULT, _ALERT_TITLE_ERROR); }
  };
  
  this.delete = function (_id) {
    try {
      mzEmptyParams([_id]);

      toastr['success']('Maklumat PGSPP berjaya dihapus!');
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
  
  this.setModalMpgSelesaiPemerolehan = function (_modalMpgSelesaiPemerolehan) {
    modalMpgSelesaiPemerolehan = _modalMpgSelesaiPemerolehan;
  };

}