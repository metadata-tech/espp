function SenaraiEkeps () {
  
  const className = 'SenaraiEkeps';
  let self = this;
  let dtDisplay;
  let modalConfirmDelete;
  let modalConfirmAction;
  let modalPermohonanPengisian;
  let sectionMaklumatEkeps;
  let userId;
  let dtSek;
  let formValidate;
  let vData = [
    {
      field_id: "optCtcrKategoriMesyuarat",
      type: "select",
      name: "Kategori Mesyuarat",
      validator: {}
    },
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
      field_id: "txtCtcrTarikhMesyuarat",
      type: "text",
      name: "Tarikh Mesyuarat",
      validator: {}
    },
    {
      field_id: "txtCtcrTarikhPengesahanMinit",
      type: "text",
      name: "Tarikh Pengesahan Minit",
      validator: {}
    },
    {
      field_id: "txtCtcrBilMesyuaratNo",
      type: "text",
      name: "Bilangan Mesyuarat",
      validator: {}
    },
    {
      field_id: "txtCtcrBilMesyuaratBil",
      type: "text",
      name: "Bilangan Mesyuarat",
      validator: {}
    },
    {
      field_id: "txtCtcrBilMesyuaratTahun",
      type: "text",
      name: "Bilangan Mesyuarat",
      validator: {}
    },
    {
      field_id: "txtCtcrNoRujukanFail",
      type: "text",
      name: "No. Rujukan Fail",
      validator: {}
    },
    {
      field_id: "txtCtcrTajukMinit",
      type: "text",
      name: "Tajuk Minit",
      validator: {}
    },
    {
      field_id: "optCtcrJenisDokumen",
      type: "select",
      name: "Jenis Dokumen",
      validator: {}
    },
    {
      field_id: "txtCtcrTajukDokumen",
      type: "text",
      name: "Tajuk Dokumen",
      validator: {}
    },
  ];

  this.init = function () {
    try {
      console.log('init');

      formValidate = new MzValidate(false);
      formValidate.registerFields(vData);
      
      $('.btnAddSek').on('click', function () {
        sectionMaklumatEkeps.add();
        // modalPermohonanPengisian.add();
      });
      
      $('#btnCtcrFilter').on('click', function () {
        if (!formValidate.validateNow()) {
          toastr['error'](_ALERT_MSG_VALIDATION, _ALERT_TITLE_ERROR);
        } else {
          dtSek.search('').columns().search('').draw();
          if ($('#optCtcrKategoriMesyuarat').val().length > 0) {
            dtSek.columns(1).search($('#optCtcrKategoriMesyuarat').val() ? $('#optCtcrKategoriMesyuarat').val() : '', false, true, false);
          }
          if ($('#txtCtcrTahun').val().length > 0) {
            dtSek.columns(2).search($('#txtCtcrTahun').val() ? $('#txtCtcrTahun').val() : '', false, true, false);
          }
          if ($('#txtCtcrTarikhMesyuarat').val().length > 0) {
            dtSek.columns(3).search($('#txtCtcrTarikhMesyuarat').val() ? $('#txtCtcrTarikhMesyuarat').val() : '', false, true, false);
          }
          if ($('#txtCtcrTarikhPengesahanMinit').val().length > 0) {
            dtSek.columns(4).search($('#txtCtcrTarikhPengesahanMinit').val() ? $('#txtCtcrTarikhPengesahanMinit').val() : '', false, true, false);
          }
          if ($('#txtCtcrBilMesyuaratNo').val().length > 0) {
            dtSek.columns(11).search($('#txtCtcrBilMesyuaratNo').val() ? $('#txtCtcrBilMesyuaratNo').val() : '', false, true, false);
          }
          if ($('#txtCtcrBilMesyuaratBil').val().length > 0) {
            dtSek.columns(12).search($('#txtCtcrBilMesyuaratBil').val() ? $('#txtCtcrBilMesyuaratBil').val() : '', false, true, false);
          }
          if ($('#txtCtcrBilMesyuaratTahun').val().length > 0) {
            dtSek.columns(13).search($('#txtCtcrBilMesyuaratTahun').val() ? $('#txtCtcrBilMesyuaratTahun').val() : '', false, true, false);
          }
          if ($('#txtCtcrNoRujukanFail').val().length > 0) {
            dtSek.columns(6).search($('#txtCtcrNoRujukanFail').val() ? $('#txtCtcrNoRujukanFail').val() : '', false, true, false);
          }
          if ($('#txtCtcrTajukMinit').val().length > 0) {
            dtSek.columns(7).search($('#txtCtcrTajukMinit').val() ? $('#txtCtcrTajukMinit').val() : '', false, true, false);
          }
          if ($('#optCtcrJenisDokumen').val().length > 0) {
            dtSek.columns(8).search($('#optCtcrJenisDokumen').val() ? $('#optCtcrJenisDokumen').val() : '', false, true, false);
          }
          if ($('#txtCtcrTajukDokumen').val().length > 0) {
            dtSek.columns(9).search($('#txtCtcrTajukDokumen').val() ? $('#txtCtcrTajukDokumen').val() : '', false, true, false);
          }
          dtSek.draw();
        }
      });
      
      $('#btnCtcrClearFilter').on('click', function () {
        formValidate.clearValidation();
        $('#lblCtcrTarikhDari').addClass('active');
        $('#lblCtcrTarikhHingga').addClass('active');
        dtSek.search('').columns().search('').draw();
      });
    
      dtSek = $('#dtSek').DataTable({
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
          { className: 'text-center align-top', targets: [0,1,2,3,4,5,6,7,10] },
          { bSortable: false, targets: [0,10] },
          { visible: false, targets: [8,9,11,12,13] },
          { className: 'noVis', targets: [0,10,11,12,13] },
        ],
        buttons: [
          { extend: 'colvis', columns: ':not(.noVis)', fade: 400, collectionLayout: 'three-column', text:'<i class="fa-solid fa-columns"></i>', className: 'btn btn-outline-default btn-sm btn-icon z-depth-0', titleAttr: 'Pilihan Kolum'},
          { extend: 'excelHtml5', className: 'btn btn-outline-default btn-sm btn-icon ml-0 z-depth-0', text:'<i class="fa-solid fa-file-excel"></i>', title:'Senarai', titleAttr: 'Excel', exportOptions: mzExportOpt},
          { text: '<i class="fa-solid fa-arrows-rotate"></i>', className: 'btn btn-outline-default btn-sm btn-icon ml-0 z-depth-0', attr: { id: 'btnSekRefresh' }, titleAttr: 'Muat Semula Senarai'}
        ],
        fnRowCallback : function(nRow, aData, iDisplayIndex){
          const info = $(this).DataTable().page.info();
          $('td', nRow).eq(0).html(info.start + (iDisplayIndex + 1));
        },
        drawCallback: function () {
          $('[data-toggle="tooltip"]').tooltip();
          $('#btnSekRefresh').off('click').on('click', function () {
            ShowLoader(); setTimeout(function () { try {
              self.genTable();
            } catch (e) { toastr['error'](e.message, _ALERT_TITLE_ERROR); } HideLoader(); }, 100);
          });
          $('.lnkSekView').off('click').on('click', function () {
            // modalConfirmAction.action(123, self);
            sectionMaklumatEkeps.view(123);
          });
          $('.lnkSekEdit').off('click').on('click', function () {
            sectionMaklumatEkeps.edit(123);
          });
          $('.lnkSekRemove').off('click').on('click', function () {
            // modalConfirmAction.action(123, self);
            modalConfirmDelete.delete(123, self);
          });
          $('.lnkSekLog').off('click').on('click', function () {
            
          });
        },
        aoColumns: [
          { mData: null},
          { mData: 'kategoriMesyuarat', mRender: function (data, type, row, meta) { 
            return data;
          }},
          { mData: 'tahunMesyuarat'},
          { mData: 'tarikhMesyuarat'},
          { mData: 'tarikhPengesahanMinit'},
          { mData: null, mRender: function (data, type, row, meta) { 
            if (row['kategoriMesyuarat'] == 'MLRKP')
              return 'BIL. ' + row['bilMesyuaratBil'] + '/' + row['bilMesyuaratTahun']
            else
              return 'KALI KE-' + row['bilMesyuaratNo'] + ' (BIL. ' + row['bilMesyuaratBil'] + '/' + row['bilMesyuaratTahun'] + ')';
          }},
          { mData: 'noRujukanFail'},
          { mData: 'tajukMinit'},
          { mData: 'jenisDokumen', mRender: function (data, type, row, meta) { 
            var tajuk = "<ol>"
            $.each(data, function(index, value) {
              tajuk += '<li>' + value + '</li>';
            });
            tajuk += '</ol>';
            return tajuk;
          }},
          { mData: 'tajukDokumen', mRender: function (data, type, row, meta) { 
            var tajuk = "<ol>"
            $.each(data, function(index, value) {
              tajuk += '<li>' + value + '</li>';
            });
            tajuk += '</ol>';
            return tajuk;
          }},
          // { mData: 'jenisDokumen'},
          // { mData: 'tajukDokumen'},
          { mData: 'statusId', mRender: function (data, type, row, meta) { 
            return dtDisplay.getActionEkeps('edit', 'lnkSek', meta.row, data); 
          }},
          { mData: 'bilMesyuaratNo'},
          { mData: 'bilMesyuaratBil'},
          { mData: 'bilMesyuaratTahun'},
        ]
      });

      self.genTable();

    } catch (e) { throw new Error(); }
  }
  
  this.genTable = function () {
    console.log('gen table');
    try {
      const dataDb = [{
        kategoriMesyuarat: "MSJ", 
        tahunMesyuarat: "2023", 
        tarikhMesyuarat: "20/12/2023", 
        tarikhPengesahanMinit: "20/12/2023", 
        bilMesyuarat: "KALI KE-1209 (BIL. 18/2023)",
        bilMesyuaratNo: "1209",
        bilMesyuaratBil: "18",
        bilMesyuaratTahun: "2023",
        noRujukanFail: "SPP.600-3/1/1 Jld.21(4)(S)",
        tajukMinit: "MINIT MESYUARAT SURUHANJAYA PERKHIDMATAN PENDIDIKAN KALI KE-1209 (BIL. 18/2023)",
        jenisDokumen: ["MINIT MESYUARAT"],
        tajukDokumen: ["MINT MESYUARAT SURUHANJAYA PERKHIDMATAN PENDIDIKAN KALI KE-2 BIL 1/2025"],
        statusId: 1, 
      },{
        kategoriMesyuarat: "MLRTT", 
        tahunMesyuarat: "2024", 
        tarikhMesyuarat: "20/12/2024", 
        tarikhPengesahanMinit: "20/12/2024", 
        bilMesyuarat: "KALI KE-888 (BIL. 17/2024)",
        bilMesyuaratNo: "888",
        bilMesyuaratBil: "17",
        bilMesyuaratTahun: "2024",
        noRujukanFail: "SPP.600-3/1/9 Jld.10(39)(S)",
        tajukMinit: "MINIT MESYUARAT LEMBAGA RAYUAN TATATERTIB PERKHIDMATAN PENDIDIKAN KALI KE-888 (BIL.17/2024) ",
        // jenisDokumen: "MINT MESYUARAT<br>KERTAS SURUHANJAYA",
        jenisDokumen: ["MINIT MESYUARAT", "KERTAS SURUHANJAYA"],
        tajukDokumen: ["MINT MESYUARAT SURUHANJAYA PERKHIDMATAN PENDIDIKAN KALI KE-2200 BIL 14/2024", "KERTAS SURUHANJAYA LLP"],
        // tajukDokumen: "MINT MESYUARAT SURUHANJAYA PERKHIDMATAN PENDIDIKAN KALI KE-2200 BIL 14/2024 <br>KERTAS SURUHANJAYA LLP <br>KERTAS EDARAN",
        statusId: 2, 
      },{
        kategoriMesyuarat: "MLRKP", 
        tahunMesyuarat: "2024", 
        tarikhMesyuarat: "20/12/2024", 
        tarikhPengesahanMinit: "20/12/2024", 
        bilMesyuarat: "BIL. 2/2024",
        bilMesyuaratNo: null,
        bilMesyuaratBil: "2",
        bilMesyuaratTahun: "2024",
        noRujukanFail: "SPP.600-3/1/9 Jld.15(19)(S)",
        tajukMinit: "MINIT MESYUARAT LEMBAGA RAYUAN KENAIKAN PANGKAT PERKHIDMATAN PENDIDIKAN BIL.2/2024 ",
        jenisDokumen: ["MINIT MESYUARAT", "KERTAS EDARAN"],
        tajukDokumen: ["MINT MESYUARAT SURUHANJAYA PERKHIDMATAN PENDIDIKAN KALI KE-2 BIL 1/2025", "KERTAS EDARAN"],
        statusId: 1, 
      },];
      dtSek.clear().rows.add(dataDb).draw();
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
  
  this.setModalPermohonanPengisian = function (_modalPermohonanPengisian) {
    modalPermohonanPengisian = _modalPermohonanPengisian;
  };
  
  this.setSectionMaklumatEkeps = function (_sectionMaklumatEkeps) {
    sectionMaklumatEkeps = _sectionMaklumatEkeps;
  };

}