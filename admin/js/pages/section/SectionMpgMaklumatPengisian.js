function SectionMpgMaklumatPengisian () {
  
  const className = 'SectionMpgMaklumatPengisian';
  let self = this;
  let submitType = ''; 
  let classFrom;
  let id;
  let dtDisplay;
  let dtKsl;
  let dtKpi;
  let dtKps;
  let dtPsk;
  let dtPsl;
  let dtPkk;
  let modalKelonggaranSyaratLantikan;
  let modalKelayakanPeringkatIjazah;
  let modalKelayakanPeringkatStpm;
  let modalPegawaiSementaraKontrak;
  let modalPegawaiKpsl;
  let modalPegawaiKader;

  let formValidate;
  this.getValidationData = function () {
    return [
      {
        field_id: "txtSmpTahun",
        type: "text",
        name: "Tahun",
        validator: {
          notEmpty: true,
          numeric : true,
          eqLengthDigit: 4,
          max: 2025
        }
      },
      {
        field_id: "optSmpKementerian",
        type: "select",
        name: "Kementerian/ Jabatan",
        validator: {
          notEmpty: true
        }
      },
      {
        field_id: "optSmpSkimPerkhidmatan",
        type: "select",
        name: "Skim Perkhidmatan",
        validator: {
          notEmpty: true
        }
      },
      {
        field_id: "optSmpKumpulanPerkhidmatan",
        type: "select",
        name: "Kumpulan Perkhidmatan",
        validator: {}
      },
      {
        field_id: "optSmpGredGaji",
        type: "select",
        name: "Gred Gaji",
        validator: {}
      },
      {
        field_id: "txtSmpJadualGajiP",
        type: "text",
        name: "Jadual Gaji P",
        validator: {}
      },
      {
        field_id: "txtSmpJadualGajiT",
        type: "text",
        name: "Jadual Gaji T",
        validator: {}
      },
      {
        field_id: "txtSmpJawatanTahun",
        type: "text",
        name: "Tahun",
        validator: {
          numeric : true,
          eqLengthDigit: 4,
          max: 2025
        }
      },
      {
        field_id: "txtSmpTetap",
        type: "text",
        name: "Tetap",
        validator: {}
      },
      {
        field_id: "txtSmpSementara",
        type: "text",
        name: "Sementara",
        validator: {}
      },
      {
        field_id: "txtSmpKontrak",
        type: "text",
        name: "Kontrak",
        validator: {}
      },
      {
        field_id: "txtSmpKosongDipohon",
        type: "text",
        name: "Bilangan",
        validator: {}
      },
      {
        field_id: "txtSmpKosongMasihAda",
        type: "text",
        name: "Bilangan",
        validator: {}
      },
      {
        field_id: "txtSmpKosongDijangka",
        type: "text",
        name: "Bilangan",
        validator: {}
      },
      {
        field_id: "txtSmpKosongLain",
        type: "text",
        name: "Bilangan",
        validator: {}
      },
      {
        field_id: "txtSmpPecahanSemenanjung",
        type: "text",
        name: "Semenanjung",
        validator: {}
      },
      {
        field_id: "txtSmpPecahanSabah",
        type: "text",
        name: "Sabah",
        validator: {}
      },
      {
        field_id: "txtSmpPecahanSarawak",
        type: "text",
        name: "Sarawak",
        validator: {}
      },
      {
        field_id: "txtSmpBilCalonLelaki",
        type: "text",
        name: "Bilangan",
        validator: {}
      },
      {
        field_id: "txtSmpPeratusCalonLelaki",
        type: "text",
        name: "Peratus",
        validator: {}
      },
      {
        field_id: "txtSmpBilCalonPerempuan",
        type: "text",
        name: "Bilangan",
        validator: {}
      },
      {
        field_id: "txtSmpPeratusCalonPerempuan",
        type: "text",
        name: "Peratus",
        validator: {}
      },
      {
        field_id: "txtSmpJustifikasiJantina",
        type: "textarea",
        name: "Justifikasi",
        validator: {}
      },
      {
        field_id: "txtSmpSenaraiTugasJawatan",
        type: "textarea",
        name: "Senarai tugas jawatan",
        validator: {}
      },
      {
        field_id: "txtSmpDiskripsiTugasJawatan",
        type: "textarea",
        name: "Diskripsi tugas jawatan",
        validator: {}
      },
      {
        field_id: "txtSmpPegawaiNama",
        type: "text",
        name: "Nama Pegawai",
        validator: {
          notEmpty: true
        }
      },
      {
        field_id: "txtSmpPegawaiJawatan",
        type: "text",
        name: "Gelaran Jawatan",
        validator: {
          notEmpty: true
        }
      },
      {
        field_id: "optSmpPegawaiKementerian",
        type: "select",
        name: "Kementerian/ Jabatan",
        validator: {
          notEmpty: true
        }
      },
      {
        field_id: "txtSmpTarikhPohon",
        type: "text",
        name: "Tarikh Pohon",
        validator: {
          notEmpty: true
        }
      },
      {
        field_id: "txtSmpTarikhTerima",
        type: "text",
        name: "Tarikh Terima",
        validator: {
          notEmpty: true
        }
      },
    ];
  };

  this.add = function () {
    try {
      submitType = 'add';
      console.log(submitType);
      id = 123;
  
      formValidate.clearValidation();
      $('.divSmpSave').show();

      ShowLoader();
      setTimeout(function () {
        mzSetValue('txtSmpPegawaiNama', 'SITI AISYAH BINTI ABDUL MALIK', 'text');
        mzSetValue('txtSmpPegawaiJawatan', 'PEGAWAI PSU - PENGAMBILAN', 'text');
        mzSetValue('optSmpPegawaiKementerian', '1215', 'text');

        self.genTableKsl();
        self.genTableKpi();
        self.genTableKps();
        self.genTablePsk();
        self.genTablePsl();
        self.genTablePkk();

        $('#h4SmpTitle').html('<i class="fa-duotone fa-lg fa-file-circle-plus mr-3"></i>Daftar Maklumat PGSPP');
        $('.sectionMain').hide();
        $('.sectionMpgMaklumatPengisian').show();
        maScrollTop();
        
        HideLoader();
      }, 200);
    } catch (e) { toastr['error'](e.message !== '' ? e.message : _ALERT_MSG_ERROR_DEFAULT, _ALERT_TITLE_ERROR); }
  };

  this.edit = function (_id) {
    try {
      mzEmptyParams([_id]);
      id = _id;
      submitType = 'edit';
  
      formValidate.clearValidation();
      $('.divSmpSave').show();

      ShowLoader();
      setTimeout(function () {
        self.assignValue();

        self.genTableKsl();
        self.genTableKpi();
        self.genTableKps();
        self.genTablePsk();
        self.genTablePsl();
        self.genTablePkk();

        $('#h4SmpTitle').html('<i class="fa-duotone fa-lg fa-file-pen mr-3"></i>Kemaskini Maklumat PGSPP');
        $('.sectionMain').hide();
        $('.sectionMpgMaklumatPengisian').show();
        maScrollTop();
        
        HideLoader();
      }, 200);
    } catch (e) { toastr['error'](e.message !== '' ? e.message : _ALERT_MSG_ERROR_DEFAULT, _ALERT_TITLE_ERROR); }
  };

  this.view = function (_id) {
    try {
      mzEmptyParams([_id]);
      id = _id;
      submitType = 'view';
  
      formValidate.clearValidation();
      $('.divSmpSave').hide();

      ShowLoader();
      setTimeout(function () {
        self.assignValue();

        self.genTableKsl();
        self.genTableKpi();
        self.genTableKps();
        self.genTablePsk();
        self.genTablePsl();
        self.genTablePkk();

        $('#h4SmpTitle').html('<i class="fa-duotone fa-lg fa-file mr-3"></i>Paparan Maklumat PGSPP');
        $('.sectionMain').hide();
        $('.sectionMpgMaklumatPengisian').show();
        maScrollTop();
        
        HideLoader();
      }, 200);
    } catch (e) { toastr['error'](e.message !== '' ? e.message : _ALERT_MSG_ERROR_DEFAULT, _ALERT_TITLE_ERROR); }
  };
  
  this.init = function () {    
    console.log('init section');

    formValidate = new MzValidate(false);
    formValidate.registerFields(self.getValidationData());

    $('.btnSmpBack').on('click', function () {
      $('.sectionMain').show();
      $('.sectionMpgMaklumatPengisian').hide();
      maScrollTop();
    });

    $('.btnSmpNext').click(function(e) {
      e.preventDefault();
      $('.nav-pills-custom .active').parent().next('li').find('a').trigger('click');
    });

    $('.btnSmpPrevious').click(function(e) {
      e.preventDefault();
      $('.nav-pills-custom .active').parent().prev('li').find('a').trigger('click');
    });

    $('#btnSmpSave').click(function(e) {
      if (!formValidate.validateNow()) {
        toastr['error'](_ALERT_MSG_VALIDATION, _ALERT_TITLE_VALIDATION_ERROR);
      } else {
        ShowLoader(); setTimeout(function () {
          toastr['success']('Maklumat PGSPP berjaya disimpan!');
          classFrom.genTable();
          // $('.sectionMpgMaklumatPengisian').hide();
          // $('.sectionMain').show();
          HideLoader();
        }, 200);
      }
    });

    $('#btnSmpReset').on('click', function () {
      formValidate.clearValidation();
      if (submitType == 'edit' || submitType == 'view') {
        self.assignValue();
      } else {
        mzSetValue('txtSmpPegawaiNama', 'SITI AISYAH BINTI ABDUL MALIK', 'text');
        mzSetValue('txtSmpPegawaiJawatan', 'PEGAWAI PSU - PENGAMBILAN', 'text');
        mzSetValue('optSmpPegawaiKementerian', '1215', 'text');
      }
    });

    $('.btnKslTambah').click(function(e) {
      modalKelonggaranSyaratLantikan.add();
    });

    $('.btnKpiTambah').click(function(e) {
      modalKelayakanPeringkatIjazah.add();
    });

    $('.btnKpsTambah').click(function(e) {
      modalKelayakanPeringkatStpm.add();
    });

    $('.btnPskTambah').click(function(e) {
      modalPegawaiSementaraKontrak.add();
    });

    $('.btnPslTambah').click(function(e) {
      modalPegawaiKpsl.add();
    });

    $('.btnPkkTambah').click(function(e) {
      modalPegawaiKader.add();
    });
    
    dtKsl = $('#dtKsl').DataTable({
      bLengthChange: false,
      bFilter: true,
      bPaginate: false,
      bInfo: true,
      autoWidth: false,
      ordering: false,
      language: _DATATABLE_LANGUAGE,
      dom: "<'d-flex'<'p-0 flex-fill'tr>>",
      columnDefs: [
        { className: 'text-center', targets: [0,2,3] },
        { className: 'text-left', targets: [1] },
      ],
      fnRowCallback : function(nRow, aData, iDisplayIndex){
        const info = $(this).DataTable().page.info();
        let no = info.start + (iDisplayIndex + 1);
        $('td', nRow).eq(0).html(no);
      },
      drawCallback: function () {
        $('[data-toggle="tooltip"]').tooltip();
        $('.lnkKslView').off('click').on('click', function () {
          modalKelonggaranSyaratLantikan.view(123);
        });
        $('.lnkKslEdit').off('click').on('click', function () {
          modalKelonggaranSyaratLantikan.edit(123);
        });
        $('.lnkKslRemove').off('click').on('click', function () {
          modalConfirmDelete.delete(123, modalKelonggaranSyaratLantikan);
        });
      },
      aoColumns: [
        { mData: null},
        { mData: 'tajukLampiran'},
        { mData: 'jenisLampiran'},
        { mData: null, mRender: function (data, type, row, meta) { return dtDisplay.getActionA(submitType, 'lnkKsl', meta.row, 1); }},
      ]
    });
    
    dtKpi = $('#dtKpi').DataTable({
      bLengthChange: false,
      bFilter: true,
      bPaginate: false,
      bInfo: true,
      autoWidth: false,
      ordering: false,
      language: _DATATABLE_LANGUAGE,
      dom: "<'d-flex'<'p-0 flex-fill'tr>>",
      columnDefs: [
        { className: 'text-center', targets: [0,2,3] },
        { className: 'text-left', targets: [1] },
      ],
      fnRowCallback : function(nRow, aData, iDisplayIndex){
        const info = $(this).DataTable().page.info();
        let no = info.start + (iDisplayIndex + 1);
        $('td', nRow).eq(0).html(no);
      },
      drawCallback: function () {
        $('[data-toggle="tooltip"]').tooltip();
        $('.lnkKpiView').off('click').on('click', function () {
          modalKelayakanPeringkatIjazah.view(123);
        });
        $('.lnkKpiEdit').off('click').on('click', function () {
          modalKelayakanPeringkatIjazah.edit(123);
        });
        $('.lnkKpiRemove').off('click').on('click', function () {
          modalConfirmDelete.delete(123, modalKelayakanPeringkatIjazah);
        });
      },
      aoColumns: [
        { mData: null},
        { mData: 'kelayakan'},
        { mData: 'bilCalon'},
        { mData: null, mRender: function (data, type, row, meta) { return dtDisplay.getActionA(submitType, 'lnkKpi', meta.row, 1); }},
      ]
    });
    
    dtKps = $('#dtKps').DataTable({
      bLengthChange: false,
      bFilter: true,
      bPaginate: false,
      bInfo: true,
      autoWidth: false,
      ordering: false,
      aaSorting: [[2, 'asc']],
      language: _DATATABLE_LANGUAGE,
      dom: "<'d-flex'<'p-0 flex-fill'tr>>",
      columnDefs: [
        { className: 'text-center', targets: [0,2,3] },
        { className: 'text-left', targets: [1] },
      ],
      fnRowCallback : function(nRow, aData, iDisplayIndex){
        const info = $(this).DataTable().page.info();
        let no = info.start + (iDisplayIndex + 1);
        $('td', nRow).eq(0).html(no);
      },
      drawCallback: function () {
        $('[data-toggle="tooltip"]').tooltip();
        $('.lnkKpsView').off('click').on('click', function () {
          modalKelayakanPeringkatStpm.view(123);
        });
        $('.lnkKpsEdit').off('click').on('click', function () {
          modalKelayakanPeringkatStpm.edit(123);
          
        });
        $('.lnkKpsRemove').off('click').on('click', function () {
          modalConfirmDelete.delete(123, modalKelayakanPeringkatStpm);
        });
      },
      aoColumns: [
        { mData: null},
        { mData: 'kelayakan'},
        { mData: 'keutamaan'},
        { mData: null, mRender: function (data, type, row, meta) { return dtDisplay.getActionA(submitType, 'lnkKps', meta.row, 1); }},
      ]
    });
    
    dtPsk = $('#dtPsk').DataTable({
      bLengthChange: false,
      bFilter: true,
      bPaginate: false,
      bInfo: true,
      autoWidth: false,
      ordering: false,
      language: _DATATABLE_LANGUAGE,
      dom: "<'d-flex'<'p-0 flex-fill'tr>>",
      columnDefs: [
        { className: 'text-center', targets: [0,2,3,4,5] },
        { className: 'text-left', targets: [1] },
      ],
      fnRowCallback : function(nRow, aData, iDisplayIndex){
        const info = $(this).DataTable().page.info();
        let no = info.start + (iDisplayIndex + 1);
        $('td', nRow).eq(0).html(no);
      },
      drawCallback: function () {
        $('[data-toggle="tooltip"]').tooltip();
        $('.lnkPskView').off('click').on('click', function () {
          modalPegawaiSementaraKontrak.view(123);
        });
        $('.lnkPskEdit').off('click').on('click', function () {
          modalPegawaiSementaraKontrak.edit(123);
        });
        $('.lnkPskRemove').off('click').on('click', function () {
          modalConfirmDelete.delete(123, modalPegawaiSementaraKontrak);
        });
      },
      aoColumns: [
        { mData: null},
        { mData: 'nama'},
        { mData: 'noKp'},
        { mData: 'bidangPengkhususan'},
        { mData: 'tarikhLantikan'},
        { mData: null, mRender: function (data, type, row, meta) { return dtDisplay.getActionA(submitType, 'lnkPsk', meta.row, 1); }},
      ]
    });
      
    dtPsl = $('#dtPsl').DataTable({
      bLengthChange: false,
      bFilter: true,
      bPaginate: false,
      bInfo: true,
      autoWidth: false,
      ordering: false,
      language: _DATATABLE_LANGUAGE,
      dom: "<'d-flex'<'p-0 flex-fill'tr>>",
      columnDefs: [
        { className: 'text-center', targets: [0,2,3,4,5] },
        { className: 'text-left', targets: [1] },
      ],
      fnRowCallback : function(nRow, aData, iDisplayIndex){
        const info = $(this).DataTable().page.info();
        let no = info.start + (iDisplayIndex + 1);
        $('td', nRow).eq(0).html(no);
      },
      drawCallback: function () {
        $('[data-toggle="tooltip"]').tooltip();
        $('.lnkPslView').off('click').on('click', function () {
          modalPegawaiKpsl.view(123);
        });
        $('.lnkPslEdit').off('click').on('click', function () {
          modalPegawaiKpsl.edit(123);
        });
        $('.lnkPslRemove').off('click').on('click', function () {
          modalConfirmDelete.delete(123, modalPegawaiKpsl);
        });
      },
      aoColumns: [
        { mData: null},
        { mData: 'nama'},
        { mData: 'noKp'},
        { mData: 'bidangPengkhususan'},
        { mData: 'tarikhLantikan'},
        { mData: null, mRender: function (data, type, row, meta) { return dtDisplay.getActionA(submitType, 'lnkPsl', meta.row, 1); }},
      ]
    });
      
    dtPkk = $('#dtPkk').DataTable({
      bLengthChange: false,
      bFilter: true,
      bPaginate: false,
      bInfo: true,
      autoWidth: false,
      ordering: false,
      language: _DATATABLE_LANGUAGE,
      dom: "<'d-flex'<'p-0 flex-fill'tr>>",
      columnDefs: [
        { className: 'text-center', targets: [0,2,3,4] },
        { className: 'text-left', targets: [1] },
      ],
      fnRowCallback : function(nRow, aData, iDisplayIndex){
        const info = $(this).DataTable().page.info();
        let no = info.start + (iDisplayIndex + 1);
        $('td', nRow).eq(0).html(no);
      },
      drawCallback: function () {
        $('[data-toggle="tooltip"]').tooltip();
        $('.lnkPkkView').off('click').on('click', function () {
          modalPegawaiKader.view(123);
        });
        $('.lnkPkkEdit').off('click').on('click', function () {
          modalPegawaiKader.edit(123);
        });
        $('.lnkPkkRemove').off('click').on('click', function () {
          modalConfirmDelete.delete(123, modalPegawaiKader);
        });
      },
      aoColumns: [
        { mData: null},
        { mData: 'nama'},
        { mData: 'noKp'},
        { mData: 'kementerianJabatan'},
        { mData: null, mRender: function (data, type, row, meta) { return dtDisplay.getActionA(submitType, 'lnkPkk', meta.row, 1); }},
      ]
    });
  };

  this.assignValue = function () {
    mzSetValue('txtSmpTahun', '2020', 'text');
    mzSetValue('optSmpKementerian', '1215', 'select');
    mzSetValue('optSmpSkimPerkhidmatan', '1042', 'select');
    mzSetValue('optSmpKlasifikasiPerkhidmatan', null, 'select');
    mzSetValue('optSmpKumpulanPerkhidmatan', 'A', 'select');
    mzSetValue('optSmpGredGaji', 'DG44', 'select');
    mzSetValue('optSmpGredGaji', 'DG44', 'select');
    mzSetValue('txtSmpJadualGajiP', '1', 'text');
    mzSetValue('txtSmpJadualGajiT', '2', 'text');
    mzSetValue('txtSmpJawatanTahun', '2020', 'text');
    mzSetValue('txtSmpTetap', '10', 'text');
    mzSetValue('txtSmpSementara', '0', 'text');
    mzSetValue('txtSmpKontrak', '30', 'text');
    mzSetValue('txtSmpPegawaiNama', 'SITI AISYAH BINTI ABDUL MALIK', 'text');
    mzSetValue('txtSmpPegawaiJawatan', 'PEGAWAI PSU - PENGAMBILAN', 'text');
    mzSetValue('optSmpPegawaiKementerian', '1215', 'select');
    mzSetValue('txtSmpTarikhPohon', '20/05/2024', 'text');
    mzSetValue('txtSmpTarikhTerima', '20/05/2024', 'text');
  };
  
  this.genTableKsl = function () {
    try {
      if (submitType == 'add') {
        const dataKsl = [];
        dtKsl.clear().rows.add(dataKsl).draw();
      } else {
        const dataKsl = [{
          tajukLampiran: 'Surat Kelulusan JPA', 
          jenisLampiran: 'Surat Kelulusan JPA', 
        }];
        dtKsl.clear().rows.add(dataKsl).draw();
      }
    } catch (e) { toastr['error'](_ALERT_MSG_ERROR_DEFAULT, _ALERT_TITLE_ERROR); }
  };
  
  this.genTableKpi = function () {
    try {
      if (submitType == 'add') {
        const dataKpi = [];
        dtKpi.clear().rows.add(dataKpi).draw();
      } else {
        const dataKpi = [{
          kelayakan: 'Ijazah Sarjana Muda Kejuteraan dalam bidang Mekanikal', 
          bilCalon: 13, 
        }];
        dtKpi.clear().rows.add(dataKpi).draw();
      }
    } catch (e) { toastr['error'](_ALERT_MSG_ERROR_DEFAULT, _ALERT_TITLE_ERROR); }
  };
  
  this.genTableKps = function () {
    try {
      if (submitType == 'add') {
        const dataKps = [];
        dtKps.clear().rows.add(dataKps).draw();
      } else {
        const dataKps = [{
          kelayakan: 'SPM dengan kepujian dalam mata pelajaran Matematik', 
          keutamaan: 1
        },
        {
          kelayakan: 'SPM dengan kepujian dalam mata pelajaran Sains',
          keutamaan: 2
        }];
        dtKps.clear().rows.add(dataKps).draw();
      }
    } catch (e) { toastr['error'](_ALERT_MSG_ERROR_DEFAULT, _ALERT_TITLE_ERROR); }
  };
  
  this.genTablePsk = function () {
    try {
      if (submitType == 'add') {
        const dataPsk = [];
        dtPsk.clear().rows.add(dataPsk).draw();
      } else {
        const dataPsk = [{
          nama: 'SITI AISYAH BINTI ABDUL MALIK', 
          noKp: '900530105544',
          bidangPengkhususan: '00001 - BACHELOR OF SCIENCE IN AEROSPACE ENGINEERING',
          tarikhLantikan : '20/05/2024'
        }];
        dtPsk.clear().rows.add(dataPsk).draw();
      }
    } catch (e) { toastr['error'](_ALERT_MSG_ERROR_DEFAULT, _ALERT_TITLE_ERROR); }
  };
  
  this.genTablePsl = function () {
    try {
      if (submitType == 'add') {
        const dataPsl = [];
        dtPsl.clear().rows.add(dataPsl).draw();
      } else {
        const dataPsl = [{
          nama: 'SITI AISYAH BINTI ABDUL MALIK', 
          noKp: '900530105544',
          bidangPengkhususan: '00001 - BACHELOR OF SCIENCE IN AEROSPACE ENGINEERING',
          tarikhLantikan : '20/05/2024'
        }];
        dtPsl.clear().rows.add(dataPsl).draw();
      }
    } catch (e) { toastr['error'](_ALERT_MSG_ERROR_DEFAULT, _ALERT_TITLE_ERROR); }
  };
  
  this.genTablePkk = function () {
    try {
      if (submitType == 'add') {
        const dataPkk = [];
        dtPkk.clear().rows.add(dataPkk).draw();
      } else {
        const dataPkk = [{
          nama: 'SITI AISYAH BINTI ABDUL MALIK', 
          noKp: '900530105544',
          kementerianJabatan: '1215 - KEMENTERIAN PENGAJIAN TINGGI'
        }];
        dtPkk.clear().rows.add(dataPkk).draw();
      }
    } catch (e) { toastr['error'](_ALERT_MSG_ERROR_DEFAULT, _ALERT_TITLE_ERROR); }
  };
  
  this.setOptionNegeri = function (_refNegeri) {
    try {
      mzOptionStop('optSmpAlTkNegeri', _refNegeri, 'display');
    } catch (e) { toastr['error'](_ALERT_MSG_ERROR_DEFAULT, _ALERT_TITLE_ERROR); }
  };
  
  this.getClassName = function () {
    return className;
  };

  this.setClassFrom = function (_classFrom) {
    classFrom = _classFrom;
  };
  
  this.setDtDisplay = function (_dtDisplay) {
    dtDisplay = _dtDisplay;
  };
  
  this.setModalKelonggaranSyaratLantikan = function (_modalKelonggaranSyaratLantikan) {
    modalKelonggaranSyaratLantikan = _modalKelonggaranSyaratLantikan;
  };
  
  this.setModalKelayakanPeringkatIjazah = function (_modalKelayakanPeringkatIjazah) {
    modalKelayakanPeringkatIjazah = _modalKelayakanPeringkatIjazah;
  };
  
  this.setModalKelayakanPeringkatStpm = function (_modalKelayakanPeringkatStpm) {
    modalKelayakanPeringkatStpm = _modalKelayakanPeringkatStpm;
  };
  
  this.setModalPegawaiSementaraKontrak = function (_modalPegawaiSementaraKontrak) {
    modalPegawaiSementaraKontrak = _modalPegawaiSementaraKontrak;
  };
  
  this.setModalPegawaiKpsl = function (_modalPegawaiKpsl) {
    modalPegawaiKpsl = _modalPegawaiKpsl;
  };
  
  this.setModalPegawaiKader = function (_modalPegawaiKader) {
    modalPegawaiKader = _modalPegawaiKader;
  };

  this.setRefNegeri = function (_refNegeri) {
    refNegeri = _refNegeri;
  };
}

