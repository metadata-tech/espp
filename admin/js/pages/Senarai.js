function Senarai () {
  
  const className = 'Senarai';
  let self = this;
  let dtDisplay;
  let modalConfirmDelete;
  let modalConfirmAction;
  let modalPermohonanPengisian;
  let sectionMaklumat;
  let userId;
  let dtPpj;
  let formValidate;
  let vData = [
    {
      field_id: "optCtcrKementerian",
      type: "select",
      name: "Kementerian",
      validator: {}
    },
    {
      field_id: "optCtcrJawatan",
      type: "select",
      name: "Jawatan",
      validator: {}
    },
    /* {
      field_id: "radCtcrJenisSekolah",
      type: "radio",
      name: "Jenis Sekolah",
      validator: {}
    }, */
    {
      field_id: "chkCtcrStatus[]",
      type: "check",
      name: "Status",
      validator: {}
    },
    {
      field_id: "txtCtcrTahun",
      type: "text",
      name: "Tahun",
      validator: {}
    },
    {
      field_id: "txtCtcrTarikhPermohonan",
      type: "text",
      name: "Tarikh Permohonan",
      validator: {}
    },
    /* {
      field_id: "txtCtcrTarikhDari",
      type: "text",
      name: "Tarikh (Dari)",
      validator: {}
    },
    {
      field_id: "txtCtcrTarikhHingga",
      type: "text",
      name: "Tarikh (Hingga)",
      validator: {}
    } */
  ];

  this.init = function () {
    try {
      console.log('init');

      formValidate = new MzValidate(false);
      formValidate.registerFields(vData);
      
      $('.btnAddPpj').on('click', function () {
        modalPermohonanPengisian.add();
      });
      
      $('#btnCtcrFilter').on('click', function () {
        if (!formValidate.validateNow()) {
          toastr['error'](_ALERT_MSG_VALIDATION, _ALERT_TITLE_ERROR);
        } else {
          dtPpj.search('').columns().search('').draw();
          if ($('#txtCtcrTahun').val().length > 0) {
            dtPpj.columns(1).search($('#txtCtcrTahun').val() ? $('#txtCtcrTahun').val() : '', true, false);
          }
          if ($('#optCtcrKementerian').val().length > 0) {
            dtPpj.columns(3).search($('#optCtcrKementerian').val() ? $('#optCtcrKementerian').val() : '', true, false);
          }
          if ($('#optCtcrJawatan').val().length > 0) {
            dtPpj.columns(4).search($('#optCtcrJawatan').val() ? $('#optCtcrJawatan').val() : '', true, false);
          }
          if ($('#txtCtcrTarikhPermohonan').val().length > 0) {
            dtPpj.columns(5).search($('#txtCtcrTarikhPermohonan').val() ? '^'+$('#txtCtcrTarikhPermohonan').val()+'$' : '', true, false);
          }
          const status = $("input[name='chkCtcrStatus[]']:checked").map(function(){
            return '^'+this.value+'$'; 
          }).get().join('|');
          dtPpj.column(7).search(status ? '^'+status+'$' : '', true, false);
          dtPpj.draw();
        }
      });
      
      $('#btnCtcrClearFilter').on('click', function () {
        formValidate.clearValidation();
        $('#lblCtcrTarikhDari').addClass('active');
        $('#lblCtcrTarikhHingga').addClass('active');
        dtPpj.search('').columns().search('').draw();
      });
    
      dtPpj = $('#dtPpj').DataTable({
        bLengthChange: false,
        bFilter: true,
        pageLength: 10,
        bPaginate: true,
        bInfo: true,
        autoWidth: false,
        aaSorting: [[2, 'asc']],
        language: _DATATABLE_LANGUAGE,
        dom: "<'row'<'col-12 col-sm-6'B><'col-sm-6 d-none d-sm-block'f>>" +
        "<'d-flex mt-2'<'p-0 flex-fill'tr>>" +
        "<'d-flex align-items-center'<'p-0 flex-fill d-none d-sm-block'i><'p-0 mt-3 mr-auto flex-fill'p>>",
        columnDefs: [
          // { className: 'align-top', targets: [3,4] },
          { className: 'text-center align-top', targets: [0,1,2,3,4,5,6,7,8] },
          { bSortable: false, targets: [0, 8] },
          // { visible: false, targets: [3] },
          { className: 'noVis', targets: [0, 8] },
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
            modalConfirmAction.action(123, self);
          });
          $('.lnkPpjEdit').off('click').on('click', function () {
            sectionMaklumat.edit(123);
          });
          $('.lnkPpjRemove').off('click').on('click', function () {
            modalConfirmDelete.delete(123, self);
          });
          $('.lnkPpjLog').off('click').on('click', function () {
            
          });
        },
        aoColumns: [
          { mData: null},
          { mData: 'tahun'},
          { mData: 'noPemerolehan'},
          { mData: 'kementerian', mRender: function (data, type, row, meta) { 
            return data;
          }},
          { mData: 'skimPerkhidmatan', mRender: function (data, type, row, meta) { 
            return data;
          }},
          { mData: 'tarikhPermohonan', mRender: function (data, type, row, meta) { 
            return data;
          }},
          { mData: 'bilKekosongan'},
          { mData: 'statusId', mRender: function (data, type, row, meta) {
            // return row['statusName']; 
            return dtDisplay.getStatusA(row['statusName'], row['statusColor']); 
          }},
          { mData: 'statusId', mRender: function (data, type, row, meta) { 
            return dtDisplay.getActionA('edit', 'lnkPpj', meta.row, data); 
          }},
        ]
      });

      self.genTable();

    } catch (e) { throw new Error(); }
  }
  
  this.genTable = function () {
    try {
      const dataDb = [{
        tahun: '2020', 
        noPemerolehan: "SM20200001", 
        kementerian: "1215 - KEMENTERIAN PENGAJIAN TINGGI", 
        skimPerkhidmatan: '1184 - PEGAWAI PERKHIDMATAN PENDIDIKAN GRED DG41', 
        tarikhPermohonan: "20/12/2020", 
        bilKekosongan: 789, 
        statusId: 1, 
        statusName: "Draf", 
        statusColor: "grey", 
      },{
        tahun: '2020', 
        noPemerolehan: "SM20200002", 
        kementerian: "1216 - KEMENTERIAN PENDIDIKAN MALAYSIA", 
        skimPerkhidmatan: '1188 - PEGAWAI PERKHIDMATAN PENDIDIKAN SISWAZAH GRED DG41', 
        tarikhPermohonan: "20/12/2020", 
        bilKekosongan: 550, 
        statusId: 2, 
        statusName: "Dalam Proses", 
        statusColor: "unique-color", 
      },{
        tahun: '2021', 
        noPemerolehan: "SM20210001", 
        kementerian: "1215 - KEMENTERIAN PENGAJIAN TINGGI", 
        skimPerkhidmatan: '1184 - PEGAWAI PERKHIDMATAN PENDIDIKAN GRED DG41', 
        tarikhPermohonan: "20/12/2021", 
        bilKekosongan: 789, 
        statusId: 3, 
        statusName: "Batal", 
        statusColor: "danger-color", 
      },{
        tahun: '2021', 
        noPemerolehan: "SM20210002", 
        kementerian: "1216 - KEMENTERIAN PENDIDIKAN MALAYSIA", 
        skimPerkhidmatan: '1188 - PEGAWAI PERKHIDMATAN PENDIDIKAN SISWAZAH GRED DG41', 
        tarikhPermohonan: "20/12/2021", 
        bilKekosongan: 550, 
        statusId: 4, 
        statusName: "Selesai", 
        statusColor: "rgba-teal-strong", 
      },{
        tahun: '2022', 
        noPemerolehan: "SM20220001", 
        kementerian: "1215 - KEMENTERIAN PENGAJIAN TINGGI", 
        skimPerkhidmatan: '1184 - PEGAWAI PERKHIDMATAN PENDIDIKAN GRED DG41', 
        tarikhPermohonan: "20/12/2022", 
        bilKekosongan: 789, 
        statusId: 1, 
        statusName: "Draf", 
        statusColor: "grey", 
      },{
        tahun: '2022', 
        noPemerolehan: "SM20220002", 
        kementerian: "1216 - KEMENTERIAN PENDIDIKAN MALAYSIA", 
        skimPerkhidmatan: '1188 - PEGAWAI PERKHIDMATAN PENDIDIKAN SISWAZAH GRED DG41', 
        tarikhPermohonan: "20/12/2022", 
        bilKekosongan: 550, 
        statusId: 2, 
        statusName: "Dalam Proses", 
        statusColor: "unique-color", 
      },{
        tahun: '2023', 
        noPemerolehan: "SM20230001", 
        kementerian: "1215 - KEMENTERIAN PENGAJIAN TINGGI", 
        skimPerkhidmatan: '1184 - PEGAWAI PERKHIDMATAN PENDIDIKAN GRED DG41', 
        tarikhPermohonan: "20/12/2023", 
        bilKekosongan: 789, 
        statusId: 3, 
        statusName: "Batal", 
        statusColor: "danger-color", 
      },{
        tahun: '2023', 
        noPemerolehan: "SM20230002", 
        kementerian: "1216 - KEMENTERIAN PENDIDIKAN MALAYSIA", 
        skimPerkhidmatan: '1188 - PEGAWAI PERKHIDMATAN PENDIDIKAN SISWAZAH GRED DG41', 
        tarikhPermohonan: "20/12/2023", 
        bilKekosongan: 550, 
        statusId: 4, 
        statusName: "Selesai", 
        statusColor: "rgba-teal-strong", 
      },];
      dtPpj.clear().rows.add(dataDb).draw();
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
  
  this.setModalPermohonanPengisian = function (_modalPermohonanPengisian) {
    modalPermohonanPengisian = _modalPermohonanPengisian;
  };
  
  this.setSectionMaklumat = function (_sectionMaklumat) {
    sectionMaklumat = _sectionMaklumat;
  };

}