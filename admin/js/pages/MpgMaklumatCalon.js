function MpgMaklumatCalon () {
  
  const className = 'MpgMaklumatCalon';
  let self = this;
  let dtDisplay;
  let modalConfirmDelete;
  let modalConfirmAction;
  let modalMpgJawatanDipohon;
  let sectionMaklumatEkeps;
  let userId;
  let dtJwt;
  let dtKpk;
  let dtKpt;
  let dtPbh;
  let dtBkt;
  let dtSkn;
  let dtPsn;
  let dtRni;
  let dtPro;
  let dtTtt;
  let submitType;
  let formValidate;
  let vData = [
    {
      field_id: "txtCmclNoKp",
      type: "text",
      name: "No. Kad Pengenalan",
      validator: {
        notEmpty: true,
        maxLengthDigit: 12,
      }
    }
  ];

  this.init = function () {
    try {
      console.log('init');
      maScrollTop();
      submitType = 'edit';

      formValidate = new MzValidate(false);
      formValidate.registerFields(vData);

      $('.btnSmclNext').click(function(e) {
        e.preventDefault();
        $('.nav-pills-custom .active').parent().next('li').find('a').trigger('click');
        $(window).scrollTop(0);
      });
  
      $('.btnSmclPrevious').click(function(e) {
        e.preventDefault();
        $('.nav-pills-custom .active').parent().prev('li').find('a').trigger('click');
        $(window).scrollTop(0);
      });
      
      $('#btnCmclFilter').on('click', function () {
        if (!formValidate.validateNow()) {
          toastr['error'](_ALERT_MSG_VALIDATION, _ALERT_TITLE_ERROR);
        } else {
          
        }
      });
      
      $('#btnCmclClearFilter').on('click', function () {
        formValidate.clearValidation();
      });
    
      dtJwt = $('#dtJwt').DataTable({
        bLengthChange: false,
        bFilter: true,
        bPaginate: false,
        bInfo: true,
        autoWidth: false,
        // ordering: false,
        order: [[5, 'asc']],
        language: _DATATABLE_LANGUAGE,
        dom: "<'d-flex'<'p-0'><'p-0 d-none d-sm-block ml-auto'>>" +
        "<'d-flex'<'p-0 flex-fill'tr>>",
        columnDefs: [
          { className: 'text-center', targets: "_all" },
          // { className: 'text-center', targets: [0,2,3,4,5,6,7,8] },
          // { className: 'text-left', targets: [1] },
          { bSortable: false, targets: "_all" },
        ],
        fnRowCallback : function(nRow, aData, iDisplayIndex){
          const info = $(this).DataTable().page.info();
          let no = info.start + (iDisplayIndex + 1);
          $('td', nRow).eq(0).html(no);
        },
        drawCallback: function () {
          $('[data-toggle="tooltip"]').tooltip();
          $('.btnJwtTambah').on('click', function () {
            modalMpgJawatanDipohon.add();
          });
          $('.lnkJwtView').off('click').on('click', function () {
            modalMpgJawatanDipohon.view(123);
          });
          $('.lnkJwtEdit').off('click').on('click', function () {
            modalMpgJawatanDipohon.edit(123);
          });
          $('.lnkJwtRemove').off('click').on('click', function () {
            modalConfirmDelete.delete(123, modalMpgJawatanDipohon);
          });
        },
        aoColumns: [
          { mData: null},
          { mData: 'skimPermohonan'},
          { mData: 'noKelompok'},
          { mData: 'noSiri'},
          { mData: 'jDaftar'},
          { mData: 'keutamaan'},
          { mData: 'tarikhSuratPerakuan'},
          { mData: 'tarikhDaftar'},
          { mData: null, mRender: function (data, type, row, meta) { 
            return dtDisplay.getActionA(submitType, 'lnkJwt', meta.row, 1); 
          }},
        ]
      });
    
      dtKpk = $('#dtKpk').DataTable({
        bLengthChange: false,
        bFilter: true,
        bPaginate: false,
        bInfo: true,
        autoWidth: false,
        // ordering: false,
        order: [[3, 'desc']],
        language: _DATATABLE_LANGUAGE,
        dom: "<'d-flex'<'p-0'><'p-0 d-none d-sm-block ml-auto'>>" +
        "<'d-flex'<'p-0 flex-fill'tr>>",
        columnDefs: [
          { className: 'text-center', targets: "_all" },
          { bSortable: false, targets: "_all" },
        ],
        fnRowCallback : function(nRow, aData, iDisplayIndex){
          const info = $(this).DataTable().page.info();
          let no = info.start + (iDisplayIndex + 1);
          $('td', nRow).eq(0).html(no);
        },
        drawCallback: function () {
          $('[data-toggle="tooltip"]').tooltip();
          $('.btnKpkTambah').on('click', function () {
            // modalMpgJawatanDipohon.add();
          });
          $('.lnkKpkView').off('click').on('click', function () {
            // modalMpgJawatanDipohon.view(123);
          });
          $('.lnkKpkEdit').off('click').on('click', function () {
            // modalMpgJawatanDipohon.edit(123);
          });
          $('.lnkKpkRemove').off('click').on('click', function () {
            modalConfirmDelete.delete(123, modalMpgJawatanDipohon);
          });
        },
        aoColumns: [
          { mData: null},
          { mData: 'tarafPendidikan'},
          { mData: 'keputusanPendidikan'},
          { mData: 'tahunPendidikan'},
          { mData: null, mRender: function (data, type, row, meta) { 
            return dtDisplay.getActionA(submitType, 'lnkKpk', meta.row, 1); 
          }},
        ]
      });
    
      dtKpt = $('#dtKpt').DataTable({
        bLengthChange: false,
        bFilter: true,
        bPaginate: false,
        bInfo: true,
        autoWidth: false,
        // ordering: false,
        order: [[2, 'desc']],
        language: _DATATABLE_LANGUAGE,
        dom: "<'d-flex'<'p-0'><'p-0 d-none d-sm-block ml-auto'>>" +
        "<'d-flex'<'p-0 flex-fill'tr>>",
        columnDefs: [
          { className: 'text-center', targets: "_all" },
          { bSortable: false, targets: "_all" },
        ],
        fnRowCallback : function(nRow, aData, iDisplayIndex){
          const info = $(this).DataTable().page.info();
          let no = info.start + (iDisplayIndex + 1);
          $('td', nRow).eq(0).html(no);
        },
        drawCallback: function () {
          $('[data-toggle="tooltip"]').tooltip();
          $('.btnKptTambah').on('click', function () {
            // modalMpgJawatanDipohon.add();
          });
          $('.lnkKptView').off('click').on('click', function () {
            // modalMpgJawatanDipohon.view(123);
          });
          $('.lnkKptEdit').off('click').on('click', function () {
            // modalMpgJawatanDipohon.edit(123);
          });
          $('.lnkKptRemove').off('click').on('click', function () {
            modalConfirmDelete.delete(123, modalMpgJawatanDipohon);
          });
        },
        aoColumns: [
          { mData: null},
          { mData: 'pusatPengajian', mRender: function (data, type, row, meta) { 
            return data + '<br>' + row['pengkhususan'] + '<br>Major : ' + row['major'] + '<br>Minor : ' + row['minor'] + '<br>Peringkat Kelulusan : ' + row['kelulusan'] + ' (CGPA : ' + row['cgpa'] + ')';
          }},
          { mData: 'tahunKelulusan'},
          { mData: 'tarikhSenat'},
          { mData: 'jenisPeperiksaanBi', mRender: function (data, type, row, meta) { 
            return data + '<br>Tahun : ' + row['tahunPeperiksaanBi'] + '<br>Band : ' + row['tahapPeperiksaanBi'];
          }},
          { mData: null, mRender: function (data, type, row, meta) { 
            return dtDisplay.getActionA(submitType, 'lnkKpt', meta.row, 1); 
          }},
        ]
      });
    
      dtPbh = $('#dtPbh').DataTable({
        bLengthChange: false,
        bFilter: true,
        bPaginate: false,
        bInfo: true,
        autoWidth: false,
        // ordering: false,
        order: [[1, 'desc']],
        language: _DATATABLE_LANGUAGE,
        dom: "<'d-flex'<'p-0'><'p-0 d-none d-sm-block ml-auto'>>" +
        "<'d-flex'<'p-0 flex-fill'tr>>",
        columnDefs: [
          { className: 'text-center', targets: "_all" },
          { bSortable: false, targets: "_all" },
        ],
        fnRowCallback : function(nRow, aData, iDisplayIndex){
          const info = $(this).DataTable().page.info();
          let no = info.start + (iDisplayIndex + 1);
          $('td', nRow).eq(0).html(no);
        },
        drawCallback: function () {
          $('[data-toggle="tooltip"]').tooltip();
          $('.btnPbhTambah').on('click', function () {
            // modalMpgJawatanDipohon.add();
          });
          $('.lnkPbhView').off('click').on('click', function () {
            // modalMpgJawatanDipohon.view(123);
          });
          $('.lnkPbhEdit').off('click').on('click', function () {
            // modalMpgJawatanDipohon.edit(123);
          });
          $('.lnkPbhRemove').off('click').on('click', function () {
            modalConfirmDelete.delete(123, modalMpgJawatanDipohon);
          });
        },
        aoColumns: [
          { mData: null},
          { mData: 'jenisBahasa'},
          { mData: 'penguasaanBahasa'},
          { mData: null, mRender: function (data, type, row, meta) { 
            return dtDisplay.getActionA(submitType, 'lnkPbh', meta.row, 1); 
          }},
        ]
      });
    
      dtBkt = $('#dtBkt').DataTable({
        bLengthChange: false,
        bFilter: true,
        bPaginate: false,
        bInfo: true,
        autoWidth: false,
        // ordering: false,
        order: [[1, 'desc']],
        language: _DATATABLE_LANGUAGE,
        dom: "<'d-flex'<'p-0'><'p-0 d-none d-sm-block ml-auto'>>" +
        "<'d-flex'<'p-0 flex-fill'tr>>",
        columnDefs: [
          { className: 'text-center', targets: "_all" },
          { bSortable: false, targets: "_all" },
        ],
        fnRowCallback : function(nRow, aData, iDisplayIndex){
          const info = $(this).DataTable().page.info();
          let no = info.start + (iDisplayIndex + 1);
          $('td', nRow).eq(0).html(no);
        },
        drawCallback: function () {
          $('[data-toggle="tooltip"]').tooltip();
          $('.btnBktTambah').on('click', function () {
            // modalMpgJawatanDipohon.add();
          });
          $('.lnkBktView').off('click').on('click', function () {
            // modalMpgJawatanDipohon.view(123);
          });
          $('.lnkBktEdit').off('click').on('click', function () {
            // modalMpgJawatanDipohon.edit(123);
          });
          $('.lnkBktRemove').off('click').on('click', function () {
            modalConfirmDelete.delete(123, modalMpgJawatanDipohon);
          });
        },
        aoColumns: [
          { mData: null},
          { mData: 'bakat'},
          { mData: null, mRender: function (data, type, row, meta) { 
            return dtDisplay.getActionA(submitType, 'lnkBkt', meta.row, 1); 
          }},
        ]
      });
    
      dtSkn = $('#dtSkn').DataTable({
        bLengthChange: false,
        bFilter: true,
        bPaginate: false,
        bInfo: true,
        autoWidth: false,
        // ordering: false,
        order: [[1, 'desc']],
        language: _DATATABLE_LANGUAGE,
        dom: "<'d-flex'<'p-0'><'p-0 d-none d-sm-block ml-auto'>>" +
        "<'d-flex'<'p-0 flex-fill'tr>>",
        columnDefs: [
          { className: 'text-center', targets: "_all" },
          { bSortable: false, targets: "_all" },
        ],
        fnRowCallback : function(nRow, aData, iDisplayIndex){
          const info = $(this).DataTable().page.info();
          let no = info.start + (iDisplayIndex + 1);
          $('td', nRow).eq(0).html(no);
        },
        drawCallback: function () {
          $('[data-toggle="tooltip"]').tooltip();
          $('.btnSknTambah').on('click', function () {
            // modalMpgJawatanDipohon.add();
          });
          $('.lnkSknView').off('click').on('click', function () {
            // modalMpgJawatanDipohon.view(123);
          });
          $('.lnkSknEdit').off('click').on('click', function () {
            // modalMpgJawatanDipohon.edit(123);
          });
          $('.lnkSknRemove').off('click').on('click', function () {
            modalConfirmDelete.delete(123, modalMpgJawatanDipohon);
          });
        },
        aoColumns: [
          { mData: null},
          { mData: 'sukan'},
          { mData: 'peringkat'},
          { mData: null, mRender: function (data, type, row, meta) { 
            return dtDisplay.getActionA(submitType, 'lnkSkn', meta.row, 1); 
          }},
        ]
      });
    
      dtPsn = $('#dtPsn').DataTable({
        bLengthChange: false,
        bFilter: true,
        bPaginate: false,
        bInfo: true,
        autoWidth: false,
        // ordering: false,
        order: [[1, 'desc']],
        language: _DATATABLE_LANGUAGE,
        dom: "<'d-flex'<'p-0'><'p-0 d-none d-sm-block ml-auto'>>" +
        "<'d-flex'<'p-0 flex-fill'tr>>",
        columnDefs: [
          { className: 'text-center', targets: "_all" },
          { bSortable: false, targets: "_all" },
        ],
        fnRowCallback : function(nRow, aData, iDisplayIndex){
          const info = $(this).DataTable().page.info();
          let no = info.start + (iDisplayIndex + 1);
          $('td', nRow).eq(0).html(no);
        },
        drawCallback: function () {
          $('[data-toggle="tooltip"]').tooltip();
          $('.btnPsnTambah').on('click', function () {
            // modalMpgJawatanDipohon.add();
          });
          $('.lnkPsnView').off('click').on('click', function () {
            // modalMpgJawatanDipohon.view(123);
          });
          $('.lnkPsnEdit').off('click').on('click', function () {
            // modalMpgJawatanDipohon.edit(123);
          });
          $('.lnkPsnRemove').off('click').on('click', function () {
            modalConfirmDelete.delete(123, modalMpgJawatanDipohon);
          });
        },
        aoColumns: [
          { mData: null},
          { mData: 'namaPersatuan'},
          { mData: 'jawatan'},
          { mData: 'peringkat'},
          { mData: null, mRender: function (data, type, row, meta) { 
            return dtDisplay.getActionA(submitType, 'lnkPsn', meta.row, 1); 
          }},
        ]
      });
    
      dtRni = $('#dtRni').DataTable({
        bLengthChange: false,
        bFilter: true,
        bPaginate: false,
        bInfo: true,
        autoWidth: false,
        // ordering: false,
        order: [[1, 'desc']],
        language: _DATATABLE_LANGUAGE,
        dom: "<'d-flex'<'p-0'><'p-0 d-none d-sm-block ml-auto'>>" +
        "<'d-flex'<'p-0 flex-fill'tr>>",
        columnDefs: [
          { className: 'text-center', targets: "_all" },
          { bSortable: false, targets: "_all" },
        ],
        fnRowCallback : function(nRow, aData, iDisplayIndex){
          const info = $(this).DataTable().page.info();
          let no = info.start + (iDisplayIndex + 1);
          $('td', nRow).eq(0).html(no);
        },
        drawCallback: function () {
          $('[data-toggle="tooltip"]').tooltip();
          $('.btnRniTambah').on('click', function () {
            // modalMpgJawatanDipohon.add();
          });
          $('.lnkRniView').off('click').on('click', function () {
            // modalMpgJawatanDipohon.view(123);
          });
          $('.lnkRniEdit').off('click').on('click', function () {
            // modalMpgJawatanDipohon.edit(123);
          });
          $('.lnkRniRemove').off('click').on('click', function () {
            modalConfirmDelete.delete(123, modalMpgJawatanDipohon);
          });
        },
        aoColumns: [
          { mData: null},
          { mData: 'jenisRekacipta'},
          { mData: 'sumbangan'},
          { mData: 'peringkat'},
          { mData: null, mRender: function (data, type, row, meta) { 
            return dtDisplay.getActionA(submitType, 'lnkRni', meta.row, 1); 
          }},
        ]
      });
    
      dtPro = $('#dtPro').DataTable({
        bLengthChange: false,
        bFilter: true,
        bPaginate: false,
        bInfo: true,
        autoWidth: false,
        // ordering: false,
        order: [[1, 'desc']],
        language: _DATATABLE_LANGUAGE,
        dom: "<'d-flex'<'p-0'><'p-0 d-none d-sm-block ml-auto'>>" +
        "<'d-flex'<'p-0 flex-fill'tr>>",
        columnDefs: [
          { className: 'text-center', targets: "_all" },
          { bSortable: false, targets: "_all" },
        ],
        fnRowCallback : function(nRow, aData, iDisplayIndex){
          const info = $(this).DataTable().page.info();
          let no = info.start + (iDisplayIndex + 1);
          $('td', nRow).eq(0).html(no);
        },
        drawCallback: function () {
          $('[data-toggle="tooltip"]').tooltip();
          $('.btnProTambah').on('click', function () {
            // modalMpgJawatanDipohon.add();
          });
          $('.lnkProView').off('click').on('click', function () {
            // modalMpgJawatanDipohon.view(123);
          });
          $('.lnkProEdit').off('click').on('click', function () {
            // modalMpgJawatanDipohon.edit(123);
          });
          $('.lnkProRemove').off('click').on('click', function () {
            modalConfirmDelete.delete(123, modalMpgJawatanDipohon);
          });
          $('.lnkProPdf').off('click').on('click', function () {
            // modalPreviewPdf.edit(123);
          });
        },
        aoColumns: [
          { mData: null},
          { mData: 'namaSijil'},
          { mData: 'tarikhKeahlian'},
          { mData: 'noKeahlian'},
          { mData: null, mRender: function (data, type, row, meta) { 
            return dtDisplay.getActionA(submitType, 'lnkPro', meta.row, 4); 
          }},
        ]
      });
    
      dtTtt = $('#dtTtt').DataTable({
        bLengthChange: false,
        bFilter: true,
        bPaginate: false,
        bInfo: true,
        autoWidth: false,
        // ordering: false,
        order: [[1, 'desc']],
        language: _DATATABLE_LANGUAGE,
        dom: "<'d-flex'<'p-0'><'p-0 d-none d-sm-block ml-auto'>>" +
        "<'d-flex'<'p-0 flex-fill'tr>>",
        columnDefs: [
          { className: 'text-center', targets: "_all" },
          { bSortable: false, targets: "_all" },
        ],
        fnRowCallback : function(nRow, aData, iDisplayIndex){
          const info = $(this).DataTable().page.info();
          let no = info.start + (iDisplayIndex + 1);
          $('td', nRow).eq(0).html(no);
        },
        drawCallback: function () {
          $('[data-toggle="tooltip"]').tooltip();
          $('.btnTttTambah').on('click', function () {
            // modalMpgJawatanDipohon.add();
          });
          $('.lnkTttView').off('click').on('click', function () {
            // modalMpgJawatanDipohon.view(123);
          });
          $('.lnkTttEdit').off('click').on('click', function () {
            // modalMpgJawatanDipohon.edit(123);
          });
          $('.lnkTttRemove').off('click').on('click', function () {
            modalConfirmDelete.delete(123, modalMpgJawatanDipohon);
          });
        },
        aoColumns: [
          { mData: null},
          { mData: 'tindakanTatatertib'},
          { mData: 'tarikhHukuman'},
          { mData: 'catatan'},
          { mData: null, mRender: function (data, type, row, meta) { 
            return dtDisplay.getActionA(submitType, 'lnkTtt', meta.row, 1); 
          }},
        ]
      });

      self.genTableJwt();
      self.genTableKpk();
      self.genTableKpt();
      self.genTablePbh();
      self.genTableBkt();
      self.genTableSkn();
      self.genTablePsn();
      self.genTableRni();
      self.genTablePro();
      self.genTableTtt();

    } catch (e) { throw new Error(); }
  }
  
  this.delete = function (_id) {
    try {
      mzEmptyParams([_id]);

      toastr['success']('Maklumat PGSPP berjaya dihapus!');
    } catch (e) {
      toastr["error"](_ALERT_MSG_ERROR_DEFAULT, _ALERT_TITLE_ERROR);
    }
  };
  
  this.genTableJwt = function () {
    try {
      if (submitType == 'add') {
        const dataJwt = [];
        dtJwt.clear().rows.add(dataJwt).draw();
      } else {
        const dataJwt = [{
          skimPermohonan: '3235 - PEGAWAI KHIDMAT PELANGGANGRED N19', 
          noKelompok: '2491A039', 
          noSiri: '040', 
          jDaftar: '03', 
          keutamaan: 1, 
          tarikhSuratPerakuan: '14/10/2023', 
          tarikhDaftar: '14/10/2023', 
        },{
          skimPermohonan: '3235 - PEGAWAI KHIDMAT PELANGGANGRED N19', 
          noKelompok: '2491A039', 
          noSiri: '040', 
          jDaftar: '03', 
          keutamaan: 2, 
          tarikhSuratPerakuan: '14/10/2023', 
          tarikhDaftar: '14/10/2023', 
        }];
        dtJwt.clear().rows.add(dataJwt).draw();
      }
    } catch (e) { toastr['error'](_ALERT_MSG_ERROR_DEFAULT, _ALERT_TITLE_ERROR); }
  };
  
  this.genTableKpk = function () {
    try {
      if (submitType == 'add') {
        const dataKpk = [];
        dtKpk.clear().rows.add(dataKpk).draw();
      } else {
        const dataKpk = [{
          tarafPendidikan: 'PENILAIAN MENENGAH RENDAH', 
          keputusanPendidikan: 'KEPUTUSAN TERBAIK', 
          tahunPendidikan: '2011', 
        },{
          tarafPendidikan: ' SIJIL PELAJARAN MALAYSIA', 
          keputusanPendidikan: 'KEPUTUSAN TERBAIK', 
          tahunPendidikan: '2013', 
        }];
        dtKpk.clear().rows.add(dataKpk).draw();
      }
    } catch (e) { toastr['error'](_ALERT_MSG_ERROR_DEFAULT, _ALERT_TITLE_ERROR); }
  };
  
  this.genTableKpt = function () {
    try {
      if (submitType == 'add') {
        const dataKpt = [];
        dtKpt.clear().rows.add(dataKpt).draw();
      } else {
        const dataKpt = [{
          pusatPengajian: 'UNIVERSITI TEKNOLOGI MARA (UITM)', 
          pengkhususan: 'SARJANA MUDA SAINS (KEPUJIAN) (TEKNOLOGI MAKLUMAT) ', 
          major: '', 
          minor: '', 
          kelulusan: 'IJAZAH', 
          cgpa: '3.38', 
          tarikhSenat: '05/05/2018', 
          tahunKelulusan: '2019', 
          jenisPeperiksaanBi: 'MALAYSIAN UNIVERSITY ENGLISH TEST (MUET)', 
          tahunPeperiksaanBi: '2018', 
          tahapPeperiksaanBi: '4', 
        }];
        dtKpt.clear().rows.add(dataKpt).draw();
      }
    } catch (e) { toastr['error'](_ALERT_MSG_ERROR_DEFAULT, _ALERT_TITLE_ERROR); }
  };
  
  this.genTablePbh = function () {
    try {
      if (submitType == 'add') {
        const dataPbh = [];
        dtPbh.clear().rows.add(dataPbh).draw();
      } else {
        const dataPbh = [{
          jenisBahasa: 'BAHASA INGGERIS', 
          penguasaanBahasa: 'BERTUTUR DAN MENULIS', 
        },{
          jenisBahasa: 'BAHASA MELAYU', 
          penguasaanBahasa: 'BERTUTUR DAN MENULIS', 
        }];
        dtPbh.clear().rows.add(dataPbh).draw();
      }
    } catch (e) { toastr['error'](_ALERT_MSG_ERROR_DEFAULT, _ALERT_TITLE_ERROR); }
  };
  
  this.genTableBkt = function () {
    try {
      if (submitType == 'add') {
        const dataBkt = [];
        dtBkt.clear().rows.add(dataBkt).draw();
      } else {
        const dataBkt = [];
        dtBkt.clear().rows.add(dataBkt).draw();
      }
    } catch (e) { toastr['error'](_ALERT_MSG_ERROR_DEFAULT, _ALERT_TITLE_ERROR); }
  };
  
  this.genTableSkn = function () {
    try {
      if (submitType == 'add') {
        const dataSkn = [];
        dtSkn.clear().rows.add(dataSkn).draw();
      } else {
        const dataSkn = [];
        dtSkn.clear().rows.add(dataSkn).draw();
      }
    } catch (e) { toastr['error'](_ALERT_MSG_ERROR_DEFAULT, _ALERT_TITLE_ERROR); }
  };
  
  this.genTablePsn = function () {
    try {
      if (submitType == 'add') {
        const dataPsn = [];
        dtPsn.clear().rows.add(dataPsn).draw();
      } else {
        const dataPsn = [];
        dtPsn.clear().rows.add(dataPsn).draw();
      }
    } catch (e) { toastr['error'](_ALERT_MSG_ERROR_DEFAULT, _ALERT_TITLE_ERROR); }
  };
  
  this.genTableRni = function () {
    try {
      if (submitType == 'add') {
        const dataRni = [];
        dtRni.clear().rows.add(dataRni).draw();
      } else {
        const dataRni = [];
        dtRni.clear().rows.add(dataRni).draw();
      }
    } catch (e) { toastr['error'](_ALERT_MSG_ERROR_DEFAULT, _ALERT_TITLE_ERROR); }
  };
  
  this.genTablePro = function () {
    try {
      if (submitType == 'add') {
        const dataPro = [];
        dtPro.clear().rows.add(dataPro).draw();
      } else {
        const dataPro = [{
          namaSijil : 'AHLI LEMBAGA JURUTERA MALAYSIA',
          tarikhKeahlian : '05/07/2002',
          noKeahlian : 'G1160029A',
        }];
        dtPro.clear().rows.add(dataPro).draw();
      }
    } catch (e) { toastr['error'](_ALERT_MSG_ERROR_DEFAULT, _ALERT_TITLE_ERROR); }
  };
  
  this.genTableTtt = function () {
    try {
      if (submitType == 'add') {
        const dataTtt = [];
        dtTtt.clear().rows.add(dataTtt).draw();
      } else {
        const dataTtt = [{
          tindakanTatatertib : 'TELAH KENA TINDAKAN TATATERTIB',
          tarikhHukuman : '05/07/2002',
          catatan : 'CALON INI TELAH KENA TINDAKAN TATATERTIB PADA 05/07/2002',
        }];
        dtTtt.clear().rows.add(dataTtt).draw();
      }
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
  
  this.setModalMpgJawatanDipohon = function (_modalMpgJawatanDipohon) {
    modalMpgJawatanDipohon = _modalMpgJawatanDipohon;
  };
  
  this.setSectionMaklumatEkeps = function (_sectionMaklumatEkeps) {
    sectionMaklumatEkeps = _sectionMaklumatEkeps;
  };

}