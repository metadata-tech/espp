function SenaraiRuling () {
  
  const className = 'SenaraiRuling';
  let self = this;
  let dtDisplay;
  let modalConfirmDelete;
  let modalConfirmAction;
  let modalPermohonanPengisian;
  let sectionMaklumatEkeps;
  let userId;
  let dtSer;
  let formValidate;
  let vData = [
    {
      field_id: "txtCtcrTajukKertas",
      type: "text",
      name: "Tajuk Kertas",
      validator: {}
    },
    {
      field_id: "optCtcrCawangan",
      type: "select",
      name: "Cawangan",
      validator: {}
    },
    {
      field_id: "optCtcrFungsi",
      type: "select",
      name: "Fungsi/Bahagian",
      validator: {}
    },
    {
      field_id: "optCtcrSubfungsi",
      type: "select",
      name: "Subfungsi/Aktiviti",
      validator: {}
    },
    {
      field_id: "txtCtcrTarikhMesyuaratDari",
      type: "text",
      name: "Tarikh Mesyuarat (Dari)",
      validator: {}
    },
    {
      field_id: "txtCtcrTarikhMesyuaratHingga",
      type: "text",
      name: "Tarikh Mesyuarat (Hingga)",
      validator: {}
    },
    {
      field_id: "txtCtcrTahunMesyuarat",
      type: "text",
      name: "Tahun Mesyuarat",
      validator: {}
    },
    {
      field_id: "optCtcrKategoriMesyuarat",
      type: "select",
      name: "Kategori Mesyuarat",
      validator: {}
    },
    {
      field_id: "optCtcrKeputusan",
      type: "select",
      name: "Keputusan",
      validator: {}
    },
    {
      field_id: "optCtcrStatus",
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
      
      $('.btnAddSer').on('click', function () {
        sectionMaklumatEkeps.add();
        // modalPermohonanPengisian.add();
      });
      
      $('#btnCtcrFilter').on('click', function () {
        if (!formValidate.validateNow()) {
          toastr['error'](_ALERT_MSG_VALIDATION, _ALERT_TITLE_ERROR);
        } else {
          dtSer.search('').columns().search('').draw();
          if ($('#txtCtcrTajukKertas').val().length > 0) {
            dtSer.columns(1).search($('#txtCtcrTajukKertas').val() ? $('#txtCtcrTajukKertas').val() : '', false, true, false);
          }
          if ($('#optCtcrCawangan').val().length > 0) {
            dtSer.columns(2).search($('#optCtcrCawangan').val() ? $('#optCtcrCawangan').val() : '', false, true, false);
          }
          if ($('#optCtcrFungsi').val().length > 0) {
            dtSer.columns(3).search($('#optCtcrFungsi').val() ? $('#optCtcrFungsi').val() : '', false, true, false);
          }
          if ($('#optCtcrSubfungsi').val().length > 0) {
            dtSer.columns(4).search($('#optCtcrSubfungsi').val() ? $('#optCtcrSubfungsi').val() : '', false, true, false);
          }
          if ($('#optCtcrKategoriMesyuarat').val().length > 0) {
            dtSer.columns(5).search($('#optCtcrKategoriMesyuarat').val() ? $('#optCtcrKategoriMesyuarat').val() : '', false, true, false);
          }
          if ($('#txtCtcrTarikhMesyuaratDari').val().length > 0) {
            moment.locale('ms');
            const tarikhDari = moment($('#txtCtcrTarikhMesyuaratDari').val(), 'DD/MM/YYYY').format('YYYY-MM-DD');
            // dtSer.columns(6).search($('#txtCtcrTarikhMesyuaratDari').val() ? tarikhDari : '', false, true, false);
            console.log(tarikhDari);
            dtSer.columns(6).search((d) => d >= tarikhDari);
          }
          dtSer.draw();
        }
      });
      
      $('#btnCtcrClearFilter').on('click', function () {
        formValidate.clearValidation();
        $('#lblCtcrTarikhDari').addClass('active');
        $('#lblCtcrTarikhHingga').addClass('active');
        dtSer.search('').columns().search('').draw();
      });
    
      dtSer = $('#dtSer').DataTable({
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
          { className: 'text-center align-top', targets: [0,2,3,4,5,6,7,8,9,10,11,12] },
          { className: 'text-left align-top', targets: [1] },
          { bSortable: false, targets: [0,12] },
          { visible: false, targets: [7,8,9,13,14,15] },
          { className: 'noVis', targets: [0,12,13,14,15] },
        ],
        buttons: [
          { extend: 'colvis', columns: ':not(.noVis)', fade: 400, collectionLayout: 'three-column', text:'<i class="fa-solid fa-columns"></i>', className: 'btn btn-outline-default btn-sm btn-icon z-depth-0', titleAttr: 'Pilihan Kolum'},
          { extend: 'excelHtml5', className: 'btn btn-outline-default btn-sm btn-icon ml-0 z-depth-0', text:'<i class="fa-solid fa-file-excel"></i>', title:'Senarai', titleAttr: 'Excel', exportOptions: mzExportOpt},
          { text: '<i class="fa-solid fa-arrows-rotate"></i>', className: 'btn btn-outline-default btn-sm btn-icon ml-0 z-depth-0', attr: { id: 'btnSerRefresh' }, titleAttr: 'Muat Semula Senarai'}
        ],
        fnRowCallback : function(nRow, aData, iDisplayIndex){
          const info = $(this).DataTable().page.info();
          $('td', nRow).eq(0).html(info.start + (iDisplayIndex + 1));
        },
        drawCallback: function () {
          $('[data-toggle="tooltip"]').tooltip();
          $('#btnSerRefresh').off('click').on('click', function () {
            ShowLoader(); setTimeout(function () { try {
              self.genTable();
            } catch (e) { toastr['error'](e.message, _ALERT_TITLE_ERROR); } HideLoader(); }, 100);
          });
          $('.lnkSerView').off('click').on('click', function () {
            // modalConfirmAction.action(123, self);
            sectionMaklumatEkeps.view(123);
          });
          $('.lnkSerEdit').off('click').on('click', function () {
            sectionMaklumatEkeps.edit(123);
          });
          $('.lnkSerRemove').off('click').on('click', function () {
            // modalConfirmAction.action(123, self);
            modalConfirmDelete.delete(123, self);
          });
          $('.lnkSerLog').off('click').on('click', function () {
            
          });
        },
        aoColumns: [
          { mData: null},
          { mData: 'tajukKertas'},
          { mData: 'cawangan', mRender: function (data, type, row, meta) { 
            return data;
          }},
          { mData: 'fungsiBahagian', mRender: function (data, type, row, meta) { 
            return data;
          }},
          { mData: 'subfungsiAktiviti', mRender: function (data, type, row, meta) { 
            return data;
          }},
          { mData: 'kategoriMesyuarat', mRender: function (data, type, row, meta) { 
            return data;
          }},
          { mData: 'tarikhMesyuarat', mRender: function (data) { 
            moment.locale('ms');
            return moment(data, 'DD/MM/YYYY').format('YYYY-MM-DD');
          }},
          { mData: null, mRender: function (data, type, row, meta) { 
            if (row['kategoriMesyuarat'] == 'MLRKP')
              return 'BIL. ' + row['bilMesyuaratBil'] + '/' + row['bilMesyuaratTahun']
            else
              return 'KALI KE-' + row['bilMesyuaratNo'] + ' (BIL. ' + row['bilMesyuaratBil'] + '/' + row['bilMesyuaratTahun'] + ')';
          }},
          { mData: 'kumpulanSasaran', mRender: function (data, type, row, meta) { 
            return data;
          }},
          { mData: 'perenggan'},
          { mData: 'keputusanId', mRender: function (data, type, row, meta) { 
            if (data == 1) {
              return "DILULUSKAN";
            } else if (data == 2) {
              return "DITANGGUHKAN";
            } else if (data == 3) {
              return "DIBATALKAN";
            } else {
              return "";
            }
          }},
          { mData: 'statusId', mRender: function (data, type, row, meta) { 
            if (data == 1) {
              return "DERAF";
            } else if (data == 2) {
              return "BARU";
            } else if (data == 3) {
              return "AKTIF";
            } else if (data == 4) {
              return "NYAHAKTIF";
            } else {
              return "";
            }
          }},
          { mData: 'statusId', mRender: function (data, type, row, meta) { 
            return dtDisplay.getActionRuling('edit', 'lnkSer', meta.row, data, row['keputusanId']); 
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
    try {
      const dataDb = [{
        tajukKertas: "PELANTIKAN KE JAWATAN TETAP PEGAWAI PENDIDIKAN PENGAJIAN TINGGI GRED DH41 DAN DH29 BAGI CALON PASARAN TERBUKA DI BAWAH KEMENTERIAN PENGAJIAN TINGGI MALAYSIA TEMU DUGA MULAI 24 HINGGA 25 NOVEMBER 2009 DAN 15 DISEMBER 2009 [SPP.Z.20/19/7-2]",
        cawangan: "HQ - PUTRAJAYA",
        fungsiBahagian: "NT - NAIK PANGKAT DAN TATATERTIB",
        subfungsiAktiviti: "TEMU DUGA",
        kategoriMesyuarat: "MSJ",
        tarikhMesyuarat: "10/02/2025",
        bilMesyuarat: "BIL. 2/2024",
        bilMesyuaratNo: '1209',
        bilMesyuaratBil: "18",
        bilMesyuaratTahun: "2024",
        kumpulanSasaran: "GRED DH41",
        perenggan: "3.1",
        keputusanId: 3,
        statusId: 4,
      },{
        tajukKertas: "PELANTIKAN KE JAWATAN TETAP PEGAWAI PENDIDIKAN PENGAJIAN TINGGI GRED DH41 DAN DH29 BAGI CALON PASARAN TERBUKA DI BAWAH KEMENTERIAN PENGAJIAN TINGGI MALAYSIA TEMU DUGA MULAI 24 HINGGA 25 NOVEMBER 2009 DAN 15 DISEMBER 2009 [SPP.Z.20/19/7-2]",
        cawangan: "S - SABAH",
        fungsiBahagian: "P - PENGAMBILAN",
        subfungsiAktiviti: "TEMU DUGA",
        kategoriMesyuarat: "MSJ",
        tarikhMesyuarat: "11/02/2025",
        bilMesyuarat: "BIL. 2/2024",
        bilMesyuaratNo: '1209',
        bilMesyuaratBil: "18",
        bilMesyuaratTahun: "2024",
        kumpulanSasaran: "GRED DH41",
        perenggan: "3.1",
        keputusanId: 2,
        statusId: 3,
      },{
        tajukKertas: "PELANTIKAN KE JAWATAN TETAP PEGAWAI PENDIDIKAN PENGAJIAN TINGGI GRED DH41 DAN DH29 BAGI CALON PASARAN TERBUKA DI BAWAH KEMENTERIAN PENGAJIAN TINGGI MALAYSIA TEMU DUGA MULAI 24 HINGGA 25 NOVEMBER 2009 DAN 15 DISEMBER 2009 [SPP.Z.20/19/7-2]",
        cawangan: "Q -SARAWAK",
        fungsiBahagian: "K - PERKHIDMATAN",
        subfungsiAktiviti: "TEMU DUGA",
        kategoriMesyuarat: "MSJ",
        tarikhMesyuarat: "12/02/2025",
        bilMesyuarat: "BIL. 2/2024",
        bilMesyuaratNo: '1209',
        bilMesyuaratBil: "18",
        bilMesyuaratTahun: "2024",
        kumpulanSasaran: "GRED DH41",
        perenggan: "3.1",
        keputusanId: null,
        statusId: 1,
      }];
      dtSer.clear().rows.add(dataDb).draw();
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