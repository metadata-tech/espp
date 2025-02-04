function SectionMaklumatEkeps () {
  
  const className = 'SectionMaklumatEkeps';
  let self = this;
  let submitType = ''; 
  let classFrom;
  let id;
  let dtDisplay;
  let dtDbm;
  let modalDokumenBerkaitanEkeps;
  let modalPreviewPdf;

  let formValidate;
  this.getValidationData = function () {
    return [
      {
        field_id: "optSmeKategoriMesyuarat",
        type: "select",
        name: "Kategori Mesyuarat",
        validator: {
          notEmpty: true
        }
      },
      {
        field_id: "txtSmeTajukMinit",
        type: "text",
        name: "Tajuk Minit",
        validator: {
          notEmpty: true
        }
      },
      {
        field_id: "txtSmeTarikhMesyuarat",
        type: "text",
        name: "Tarikh Mesyuarat",
        validator: {
          notEmpty: true,
        }
      },
      {
        field_id: "txtSmeTarikhPengesahanMinit",
        type: "text",
        name: "Tarikh Pengesahan Minit",
        validator: {
          notEmpty: true,
        }
      },
      {
        field_id: "txtSmeBilMesyuaratNo",
        type: "text",
        name: "Bilangan Mesyuarat",
        validator: {
          notEmpty: true,
        }
      },
      {
        field_id: "txtSmeBilMesyuaratBil",
        type: "text",
        name: "Bilangan Mesyuarat",
        validator: {
          notEmpty: true,
        }
      },
      {
        field_id: "txtSmeBilMesyuaratTahun",
        type: "text",
        name: "Bilangan Mesyuarat",
        validator: {
          notEmpty: true,
        }
      },
      {
        field_id: "txtSmeNoRujukanFail",
        type: "text",
        name: "No. Rujukan Fail",
        validator: {
          notEmpty: true,
        }
      },
      {
        field_id: "txtSmeTajukMinit",
        type: "text",
        name: "Tajuk Minit",
        validator: {
          notEmpty: true,
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
      $('.divSmeSave').show();
      $('.divTab').hide();

      ShowLoader();
      setTimeout(function () {
        self.genTableDbm();

        $('#h4SmeTitle').html('<i class="fa-duotone fa-lg fa-file-circle-plus mr-3"></i>Daftar Maklumat eKEPS');
        $('.sectionMain').hide();
        $('.sectionMaklumatEkeps').show();
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
      $('.divSmeSave').show();
      $('.divTab').show();

      ShowLoader();
      setTimeout(function () {
        self.assignValue();

        self.genTableDbm();

        $('#h4SmeTitle').html('<i class="fa-duotone fa-lg fa-file-pen mr-3"></i>Kemaskini Maklumat eKEPS');
        $('.sectionMain').hide();
        $('.sectionMaklumatEkeps').show();
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
      $('.divSmeSave').hide();
      $('.divTab').show();

      ShowLoader();
      setTimeout(function () {
        self.assignValue();

        self.genTableDbm();

        $('#h4SmeTitle').html('<i class="fa-duotone fa-lg fa-file mr-3"></i>Paparan Maklumat eKEPS');
        $('.sectionMain').hide();
        $('.sectionMaklumatEkeps').show();
        maScrollTop();
        
        HideLoader();
      }, 200);
    } catch (e) { toastr['error'](e.message !== '' ? e.message : _ALERT_MSG_ERROR_DEFAULT, _ALERT_TITLE_ERROR); }
  };
  
  this.init = function () {    
    console.log('init section');

    formValidate = new MzValidate(false);
    formValidate.registerFields(self.getValidationData());
      
    /* $('input[type="radio"][name="radSmeKategoriMesyuarat"]').change(function() {
      if ($('#txtSmeTajukMinit').val().length == 0 || ($('#txtSmeTajukMinit').val() == 'MINIT MESYUARAT SURUHANJAYA PERKHIDMATAN PENDIDIKAN' || $('#txtSmeTajukMinit').val() == 'MINIT MESYUARAT LEMBAGA RAYUAN TATATERTIB PERKHIDMATAN PENDIDIKAN' || $('#txtSmeTajukMinit').val() == 'MINIT MESYUARAT LEMBAGA RAYUAN KENAIKAN PANGKAT PERKHIDMATAN PENDIDIKAN')) {
        if (this.value == 'MSJ') {
          formValidate.clearValidation('txtSmeTajukMinit');
          mzSetValue('txtSmeTajukMinit', 'MINIT MESYUARAT SURUHANJAYA PERKHIDMATAN PENDIDIKAN', 'text');
          maDisableClear('txtSmeBilMesyuaratNo', false);
        }
        else if (this.value == 'MLRTT') {
          formValidate.clearValidation('txtSmeTajukMinit');
          mzSetValue('txtSmeTajukMinit', 'MINIT MESYUARAT LEMBAGA RAYUAN TATATERTIB PERKHIDMATAN PENDIDIKAN', 'text');
          maDisableClear('txtSmeBilMesyuaratNo', false);
        }
        else if (this.value == 'MLRKP') {
          formValidate.clearValidation('txtSmeTajukMinit');
          mzSetValue('txtSmeTajukMinit', 'MINIT MESYUARAT LEMBAGA RAYUAN KENAIKAN PANGKAT PERKHIDMATAN PENDIDIKAN', 'text');
          maDisableClear('txtSmeBilMesyuaratNo', true);
        } else {
          mzSetValue('txtSmeTajukMinit', '', 'text');
        }
      }
    }); */
      
    $('#optSmeKategoriMesyuarat').on('change', function () {
      if (this.value == 'MSJ') {
        formValidate.clearValidation('txtSmeTajukMinit');
        mzSetValue('txtSmeTajukMinit', 'MINIT MESYUARAT SURUHANJAYA PERKHIDMATAN PENDIDIKAN', 'text');
        maDisableClear('txtSmeBilMesyuaratNo', false);
        formValidate.enableField('txtSmeBilMesyuaratNo');
      }
      else if (this.value == 'MLRTT') {
        formValidate.clearValidation('txtSmeTajukMinit');
        mzSetValue('txtSmeTajukMinit', 'MINIT MESYUARAT LEMBAGA RAYUAN TATATERTIB PERKHIDMATAN PENDIDIKAN', 'text');
        maDisableClear('txtSmeBilMesyuaratNo', false);
        formValidate.enableField('txtSmeBilMesyuaratNo');
      }
      else if (this.value == 'MLRKP') {
        formValidate.clearValidation('txtSmeTajukMinit');
        mzSetValue('txtSmeTajukMinit', 'MINIT MESYUARAT LEMBAGA RAYUAN KENAIKAN PANGKAT PERKHIDMATAN PENDIDIKAN', 'text');
        maDisableClear('txtSmeBilMesyuaratNo', true);
        formValidate.disableField('txtSmeBilMesyuaratNo');
      } else {
        mzSetValue('txtSmeTajukMinit', '', 'text');
      }
    });
      
    $('#txtSmeTarikhMesyuarat').on('change', function () {
      if (this.value.substring(6).length > 0) {
        mzSetValue('txtSmeBilMesyuaratTahun', this.value.substring(6), 'text');
      } else {
        mzSetValue('txtSmeBilMesyuaratTahun', '', 'text');
      }
    });

    $('.btnSmeBack').on('click', function () {
      $('.sectionMain').show();
      $('.sectionMaklumatEkeps').hide();
      maScrollTop();
    });

    $('.btnSmeNext').click(function(e) {
      e.preventDefault();
      $('.nav-pills-custom .active').parent().next('li').find('a').trigger('click');
    });

    $('.btnSmePrevious').click(function(e) {
      e.preventDefault();
      $('.nav-pills-custom .active').parent().prev('li').find('a').trigger('click');
    });

    $('#btnSmeSave').click(function(e) {
      if (!formValidate.validateNow()) {
        toastr['error'](_ALERT_MSG_VALIDATION, _ALERT_TITLE_VALIDATION_ERROR);
      } else {
        ShowLoader(); setTimeout(function () {
          toastr['success']('Maklumat eKEPS berjaya disimpan!');
          classFrom.genTable();
          $('.divTab').show();
          // $('.sectionMaklumatEkeps').hide();
          // $('.sectionMain').show();
          HideLoader();
        }, 200);
      }
    });

    $('#btnSmeReset').on('click', function () {
      formValidate.clearValidation();
      if (submitType == 'edit' || submitType == 'view') {
        self.assignValue();
      } else {
        mzSetValue('txtSmePegawaiNama', 'SITI AISYAH BINTI ABDUL MALIK', 'text');
        mzSetValue('txtSmePegawaiJawatan', 'PEGAWAI PSU - PENGAMBILAN', 'text');
        mzSetValue('optSmePegawaiKementerian', '1215', 'text');
      }
    });

    $('.btnDbmTambah').click(function(e) {
      modalDokumenBerkaitanEkeps.add();
    });
    
    dtDbm = $('#dtDbm').DataTable({
      bLengthChange: false,
      bFilter: true,
      bPaginate: false,
      bInfo: true,
      autoWidth: false,
      ordering: false,
      language: _DATATABLE_LANGUAGE,
      dom: "<'d-flex'<'p-0'f><'p-0 d-none d-sm-block ml-auto'>>" +
      "<'d-flex'<'p-0 flex-fill'tr>>",
      columnDefs: [
        { className: 'text-center', targets: [0,2,3,4] },
        { className: 'text-left', targets: [1] },
        { visible: false, targets: [5] },
        { className: 'noVis', targets: [4, 5] },
      ],
      fnRowCallback : function(nRow, aData, iDisplayIndex){
        const info = $(this).DataTable().page.info();
        let no = info.start + (iDisplayIndex + 1);
        $('td', nRow).eq(0).html(no);
      },
      drawCallback: function () {
        $('[data-toggle="tooltip"]').tooltip();
        $('.lnkDbmView').off('click').on('click', function () {
          modalDokumenBerkaitanEkeps.view(123);
        });
        $('.lnkDbmEdit').off('click').on('click', function () {
          modalDokumenBerkaitanEkeps.edit(123);
        });
        $('.lnkDbmRemove').off('click').on('click', function () {
          modalConfirmDelete.delete(123, modalDokumenBerkaitanEkeps);
        });
        $('.lnkDbmPdf').off('click').on('click', function () {
          modalPreviewPdf.view(123);
        });
      },
      aoColumns: [
        { mData: null},
        { mData: 'tajukDokumen'},
        { mData: 'jenisDokumen'},
        { mData: 'noRujukanFail'},
        { mData: null, mRender: function (data, type, row, meta) { 
          return dtDisplay.getActionDokumenEkeps(submitType, 'lnkDbm', meta.row, 1); 
        }},
        { mData: 'isiDokumen'},
      ]
    });
  };

  this.assignValue = function () {
    const kategoriMesyuarat = 'MSJ';
    mzSetValue('optSmeKategoriMesyuarat', 'MSJ', 'select');
    if (kategoriMesyuarat == 'MSJ') {
      maDisableInput('txtSmeBilMesyuaratNo', false);
      formValidate.enableField('txtSmeBilMesyuaratNo');
    }
    else if (kategoriMesyuarat == 'MLRTT') {
      maDisableInput('txtSmeBilMesyuaratNo', false);
      formValidate.enableField('txtSmeBilMesyuaratNo');
    }
    else if (kategoriMesyuarat == 'MLRKP') {
      maDisableInput('txtSmeBilMesyuaratNo', true);
      formValidate.disableField('txtSmeBilMesyuaratNo');
    } else {
      maDisableInput('txtSmeBilMesyuaratNo', false);
      formValidate.enableField('txtSmeBilMesyuaratNo');
    }
    mzSetValue('txtSmeTarikhMesyuarat', '20/12/2023', 'text');
    mzSetValue('txtSmeTarikhPengesahanMinit', '20/12/2023', 'text');
    mzSetValue('txtSmeBilMesyuaratNo', '1209', 'text');
    mzSetValue('txtSmeBilMesyuaratBil', '18', 'text');
    mzSetValue('txtSmeBilMesyuaratTahun', '2023', 'text');
    mzSetValue('txtSmeNoRujukanFail', 'SPP.600-3/1/1 Jld.21(4)(S)', 'text');
    mzSetValue('txtSmeTajukMinit', 'MINIT MESYUARAT SURUHANJAYA PERKHIDMATAN PENDIDIKAN KALI KE-1209 (BIL. 18/2023)', 'text');
  };
  
  this.genTableDbm = function () {
    try {
      if (submitType == 'add') {
        const dataDbm = [];
        dtDbm.clear().rows.add(dataDbm).draw();
      } else {
        const dataDbm = [{
          tajukDokumen: 'KERTAS BIL. KM13/2024: PEMAKLUMAN PERINTAH TAHAN KERJA YANG TERHENTI TERHADAP NAMA PEGAWAI, PEGAWAI PENDIDIKAN PENGAJIAN TINGGI (PPPT) GRED DH54, POLITEKNIK NILAI, NEGERI SEMBILAN [NOMBOR FAIL]', 
          jenisDokumen: 'KERTAS SURUHANJAYA', 
          noRujukanFail: 'SPP.600-3/1/1 Jld.18(4)(S)', 
          tajukDokumen: ["MINT MESYUARAT SURUHANJAYA PERKHIDMATAN PENDIDIKAN KALI KE-2 BIL 1/2025"],
          isiDokumen: ['SULIT\nSURUHANJAYA PERKHIDMATAN PENDIDIKAN\nRujukan Fail: SPP.600-3/25 JLD2 (7) (S)\nBilangan Mesyuarat: 1198 Kertas Bil.:\nTarikh: 2 April 2024\nPENGESAHAN\nLAPORAN LEMBAGA PERMULAAN\nURUSAN PENGAMBILAN ANGGOTA KUMPULAN PELAKSANA DI\nSEMENANJUNG TAHUN 2024 BAGI PENGISIAN DI\nKEMENTERIAN PENDIDIKAN MALAYSIA\n1. TUJUAN\nKertas ini bertujuan untuk mendapatkan pengesahan Suruhanjaya\nke atas kelulusan Pengerusi Suruhanjaya Perkhidmatan Pendidikan\nbagi Laporan Lembaga Permulaan urusan pengambilan Anggota\nKumpulan Pelaksana (AKP) Gred 11 dan Gred 19 tahun 2024 untuk\nmengisi 2,132 kekosongan jawatan di Semenanjung Malaysia.\n2. LATAR BELAKANG\n2.1 Punca Kuasa\n2.1.1 Salah satu fungsi utama Suruhanjaya Perkhidmatan\nPendidikan (SPP) selaku Pihak Berkuasa Melantik\nadalah untuk melantik calon-calon yang layak ke jawatan\ntetap, kontrak atau sementara dalam perkhidmatan\npendidikan.\n1\nSULIT\n\n2.1.2 Kaedah-Kaedah Suruhanjaya Perkhidmatan Pelajaran\n(Pindaan) 2009 menyatakan bagi maksud penapisan\nsenarai calon-calon untuk temu duga, suatu Lembaga\nPermulaan hendaklah dilantik di bawah perkiraan\npentadbiran yang dibuat oleh Pengerusi. Selain itu,\nLembaga Permulaan hendaklah menjalankan penapisan\nsenarai calon-calon untuk lantikan kali pertama ke dalam\nSkim Perkhidmatan Pendidikan mengikut prinsip-prinsip\nyang ditetapkan oleh Suruhanjaya dan hendaklah\nmenyediakan suatu Laporan Penapisan.\n\n2.1.3 Bahagian Pengambilan yang dilantik sebagai Lembaga\nPermulaan bertanggungjawab menyediakan kertas\nLaporan Lembaga Permulaan (LLP) bagi mendapat\nkelulusan Pengerusi/ Timbalan Pengerusi dan\npengesahan Suruhanjaya sebelum sesuatu temu duga\ndijalankan.\n\n2.2 Permohonan Kementerian Pendidikan Malaysia\n\n2.2.1 Kementerian Pendidikan Malaysia (KPM) melalui emel\nbertarikh 14 Disember 2023 seperti di Lampiran A, emel\nbertarikh 21 Disember 2023 seperti di Lampiran B dan\nemel bertarikh 20 Februari 2024 seperti di Lampiran C\ntelah memohon supaya Suruhanjaya Perkhidmatan\nPendidikan (SPP) melaksanakan pengambilan Anggota\nKumpulan Pelaksana (AKP) pelbagai skim dan gred di\nSemenanjung, Sabah dan Sarawak.\n\n2\nSULIT\n2.2.2 KPM memaklumkan melalui emel bertarikh 20 Februari\n2024 bahawa unjuran kekosongan jawatan AKP terkini\nyang perlu dibuat pengisian adalah sebanyak 2,652 iaitu\n2,132 di Semenanjung, 277 di Sabah dan 243 di\nSarawak seperti di Jadual 1.\nJadual 1: Unjuran Kekosongan Jawatan AKP Tahun 2024\nKekosongan Jawatan\nJawatan/Gred Jumlah\n| a —\nPembantu Tadbir\nPegawai Khidmat Pelanggan\nPembantu Tadbir (Kewangan)\nPembantu Pengurusan Murid\nPenyelia Asrama Gred NI\n1—6 Pembantu Makmai Gred 19\nPembantu Operasi Gred N11\n1& | Pemandu Kendoraan Gi | 4 s I p\nD a T a a\n2.2.3 Di samping itu, KPM juga memohon melalui emel\nbertarikh 20 Februari 2024 supaya keutamaan\npengambilan:\n(a) Pemandu Kenderaan Gred H11 adalah daripada\nkalangan calon-calon yang mempunyai Lesen\nVokasional (Bas/ Lori); dan\n(b) Pembantu Operasi Gred N11 adalah daripada\nkalangan calon-calon yang mempunyai Lesen\n3\nSULIT\nMemandu.\n\n2.2.4 Selain itu, KPM juga memohon pertimbangan SPP agar\npelantikan AKP bermula tahun 2024 terdiri daripada\ncalon-calon yang berumur tidak melebihi daripada 35\ntahun seperti dinyatakan melalui emel bertarikh\n19 Januari 2024 di Lampiran D.\n\n2.3 Kekosongan Jawatan AKP di Semenanjung\n\n2.3.1 Kekosongan jawatan AKP bagi tahun 2024 di\nSemenanjung adalah sebanyak 2,132 seperti perincian\nJadual 2.\n\n4\nSULIT\nJadual 2: Perincian Kekosongan Jawatan AKP di Semenanjung\nPEMBANTU\nTADBIR KHTE;IAT PET":%;;U PENZE;%SAN PENYELIA | PEMBANTU | PEMBANTU | PEMANDU\nB (PERKERANIAN | ANAN ASRAMA | MAKMAL | OPERASI | KENDERAAN | JUMLAH\n(KEWANGAN) MURID\n/OPERASI) GREDN19 | GREDW9 GReEDNg | GREDNI9 | GREDCI9 | GREDN11 | GREDH11\nGRED N19\nNEGERI\nk rr R a a\nWP KUALA\n13 W\nPUTRAJAYA\nn | x N | e lll i a\n5\nSULIT\n3. DASAR DAN PERATURAN BERKUAT KUASA\n\n3.1 Peraturan-peraturan Pegawai Awam (Pelantikan, Kenaikan\nPangkat dan Penamatan Perkhidmatan) 2012 (PUA 2012).\n\n3.2 Skim perkhidmatan dan penetapan gaji permulaan adalah\nberdasarkan Pekeliling Perkhidmatan Bilangan 1 Tahun 2016:\nRasionalisasi Skim Perkhidmatan Bagi Perkhidmatan Awam\nPersekutuan Di Bawah Sistem Saraan Malaysia dan mengikut\nPeraturan 25, Peraturan-Peraturan Pegawai Awam\n(Pelantikan, Kenaikan Pangkat dan Penamatan Perkhidmatan)\n2012.\n\n3.3 Mesyuarat Suruhanjaya Kali Ke-978 pada 25 Ogos 2014 telah\nmenetapkan nisbah siling kekosongan jawatan dengan calon\nyang dipanggil temu duga ialah tidak melebihi 1:15. Ini\nbertujuan untuk memastikan bilangan calon adalah mencukupi\nbagi mengisi kekosongan dan membolehkan Lembaga Temu\nDuga (LTD) dapat memilih yang terbaik daripada kalangan\ncalon yang memohon.\n\n3.4 Keputusan Mesyuarat Suruhanjaya Kali Ke-953 pada 22 Julai\n2013 telah menetapkan bahawa Pengerusi atau Timbalan\nPengerusi diberi tanggungjawab untuk meluluskan Laporan\nLembaga Permulaan (LLP) dan kertas pelantikan bagi urusan\npengambilan Anggota Perkhidmatan Pendidikan (APP) dan\nhendaklah disahkan oleh Suruhanjaya seperti yang\ndinyatakan di 25 (2) Kaedah-kaedah Suruhanjaya\nPerkhidmatan Pendidikan 2007.\n\n6\nSULIT\n4. ULASAN URUS SETIA\n4.1 Permohonan Jawatan AKP di Semenanjung\n\n4.1.1 Calon-calon yang dipertimbangkan bagi urusan\npengambilan AKP ini merupakan calon-calon\nSemenanjung yang telah memohon atau\nmengemaskini permohonan melalui portal MySPP\n(https:/myspp.spp.gov.my) bermula 21 Disember 2023\nhingga 18 Januari 2024.\n\n4.1.2 Seramai 58,812 orang calon telah memohon atau\nmengemaskini permohonan jawatan AKP dalam\ntempoh tersebut iaitu 47,711 orang calon jawatan AKP\nGred 19 dan 11,101 orang calon jawatan AKP Gred 11\nseperti perincian di Jadual 3.\n\n4.1.3 Urusan pengambilan AKP di Semenanjung\ndilaksanakan berdasarkan lokaliti negeri. Calon-calon\nakan dipanggil temu duga dan akan dilantik jika layak,\nberdasarkan negeri pilihan temu duga. Oleh yang\ndemikian, tapisan calon juga perlu dijalankan mengikut\nnegeri pilihan temu duga.\n\n7\nSULIT\nJadual 3: Permohonan Jawatan AKP di Semenanjung\nHu\nOperasi) Pelanggan | (Kewangan) Murid Guam9 | Grnde19 | GraMii | GdhH\nGred N19 GredN19 | GredW19 | GredN19\na a\nm a aII a K a\na I a a a a\nT K aI III a\ne | a IIII a\ne T aII a\naII III a a\na a IIII K a\na a a a a\na a I IIII a\na m aII a a\ne a a a a a\naf | a a aII a a a\nT a a a a\n8\nSULIT\n4.2 Proses Tapisan\n4.2.1 Tapisan Calon Jawatan AKP Gred 19\n4.2.1.1 Bilangan calon Semenanjung yang memohon\njawatan AKP Gred 19 adalah sangat ramai iaitu\n\n47,711 orang dan sangat tinggi melebihi unjuran\n\nkekosongan jawatan KPM.\n\n4.2.1.2 Justeru, urus setia telah melaksanakan dua (2)\ntapisan iaitu tapisan awal dan tapisan akhir untuk\nmemastikan hanya calon-calon yang layak sahaja\nyang dipanggil temu duga dalam bilangan yang\nideal/ munasabah seperti berikut:\n\na. Tapisan Awal Jawatan AKP Gred 19\n\ni. Tapisan awal dilaksanakan dengan meletakkan\nsyarat minimum skim perkhidmatan dan\numur 35 tahun ke bawah sebagai asas\ntapisan.\n\ni. Seramai 33, 387 orang calon melepasi tapisan\nawal dan jumlah ini masih terlalu tinggi\nberbanding jumlah kekosongan sebanyak\n1,506.\n\nE)\nSULIT\nb. Tapisan Akhir Jawatan AKP Gred 19\ni. Tapisan akhir bagi jawatan AKP Gred 19\ndilaksanakan dengan mengetatkan kelayakan\nakademik calon secara berperingkat.\nii. Perincian proses tapisan akhir bagi jawatan AKP\nGred 19 yang dilaksanakan adalah seperti di\nLampiran E1 hingga E6.\n4.2.1.3 Berdasarkan proses tapisan akhir di Lampiran E1\nhingga E6, dicadangkan hasil tapisan akhir dan\nbilangan calon bagi jawatan AKP Gred 19 seperti di\nJadual 4 dipertimbangkan untuk dipanggil temu\nduga.\nJadual 4: Tapisan Akhir Calon Jawatan AKP Gred 19 di Semenanjung\nS a a a a ——\n1. |Pembantu Taddir | Joor | 8 | 1 | 6 l18\nPerkeraniani\nOpanai -_-!!-\nGred N19 elantan\n(SPM/setaraf) Bilangan calon\nyang sesuai\ndipanggil temu\na a a\nNegeri Sembilan | 4 | 1 | 26 | 16\n| Terenganui | 3 | 4 | 26 ||\nWP KualaLumpur | 2? | 1 | 2 )\nWe Puraaya T\n—— a n\n2 |PegawaiKhidmat ( “Kean | 9 | 1 | 75 | 18 )| Biangancabon\nPelanggan yang sesuai\n10\nSULIT\n\nGi Ni dipanggi temu\nduga\n\n(SPM/setaraf)\n\nI Negeri sembian | ——\nI Terenggan ——\n— a K\nS Penpanti Tadbr Bilangan calon\n\nKewangan I seangar | T i A ng s\nI Negeri Sembian | ? | x I i dg\n\n(Spmsetaran W Kuaaumpur) 3\n\n—— T\n\nPembantu\n\nPengurusan\n\ncu\nBiangan caton\nuu Pinang —\n\n(BPMIsetaran) yang sesuai\ndipanggi temu\nduaa\nI wrw T I\n\n—A T a\n5 | PeneaAsama | I II 1 De\n\na a a a\n\na a\n—\n\ne a ng can\n\na I a ng sesua\n\n— panang T a gg e\n\nI Negeri sembian | — |N\n\nI WP Kuala Lumpur )— —\n\nL wrw | A B\n—-\n\nPembantu\n\nMakmal\n\nGredc10 Bilangan calon\n\n(SPMisetaran dang sesuai.\nuu Pinang | e AA\np\n| s | x | 1 | w ||\n\n11\nSULIT\n| NegeriSembilan | 15 | 1 | 146 1o\nI Teengani | 10 | 8 | 0 ||\nW Kuala Lumpur | —2?\n—— Kn\nT amtan Kesauranan a a\n4.2.2 Tapisan Calon Jawatan AKP Gred 11\n4.2.2.1 Bilangan calon Semenanjung yang memohon\njawatan AKP Gred 11 adalah seramai iaitu 11,101\norang.\n4.2.2.2 Justeru, urus setia juga melaksanakan dua (2)\ntapisan iaitu tapisan awal dan tapisan akhir untuk\nmemastikan hanya calon-calon yang layak sahaja\nyang dipanggil temu duga dalam bilangan yang\nideal/ munasabah seperti berikut:\na. Tapisan Awal Jawatan AKP Gred 11\ni. Tapisan awal dilaksanakan dengan meletakkan\nsyarat minimum skim perkhidmatan dan\numur 35 tahun ke bawah sebagai asas\ntapisan.\ni. Berdasarkan tapisan awal yang dilaksanakan,\ncalon bagi jawatan Pembantu Operasi (PO)\nGred N11 dan Pemandu Kenderaan (PK) Gred\nH11 di kebanyakan negeri telah mencapai\nbilangan yang ideal/ munasabah.\n12\nSULIT\ni. Walau bagaimanapun, masih terdapat negeri-\nnegeri yang masih mempunyai calon yang\nramai dan memerlukan tapisan akhir\ndilaksanakan.\nb. Tapisan Akhir Jawatan AKP Gred 11\ni. Tapisan akhir bagi jawatan AKP Gred 11 juga\ndilaksanakan secara berperingkat dengan\nmengetatkan kelayakan akademik.\nii. Perincian proses tapisan akhir bagi jawatan\nAKP Gred 19 yang dilaksanakan adalah seperti\ndi Lampiran E7 dan E8.\n4.2.2.3 Berdasarkan proses-proses tapisan yang telah\ndilaksanakan untuk jawatan AKP Gred 11,\ndicadangkan hasil tapisan dan bilangan calon\nseperti di Jadual 5 dipertimbangkan untuk\ndipanggil temu duga.\nJadual 5: Tapisan Calon Jawatan AKP Gred 11 di Semenanjung\nT a a a a\n1. | Pembantu L lanm |\nOperasi e\nOredN11 I Kelaman | 17 | TapisanAknir3| 140 | 16 | Byzggas"e;jg"\n|4 | 10 | duga\nI Peis | 9 | TapsanAwl | 101 | 111 |\nI20 | 142 |\n| Pahang | 4 | I 35 D\n| 14 | 1B |\n| Terenggann | 10 | TapisanAkhir3| 8 | 19 |\n| WP Kuala Lumpur | ——38 | TapisanAwal | 970 | 15 |\n13\nSULIT\nI T I WPuaaa | 4 | TapsanAkhirs ! 51 | d )\nuu | s |\n2 Pemandu Tapisan Akhir 1 | 31 | 16 |\nKenderaan |L2 | 10 )\nGredH11 a I A\nTapisan Akhir 1| 22 | 14 |\n(PMR/setaraff | Selanor | 6 | Bilangan calon\nyang sesuai\nNegeri Sembian | 8 | | 35 | 14 | dbanggitemu\nTapisanAwal — a dg\nWP Kuala Lumpur | 2 | 14 |\nI 57 |( 45 |\n|\nJumlah Keseluruhan | e N 3775\n4.3 Rumusan Bilangan Calon\n4.3.1 Berdasarkan tapisan-tapisan yang telah dijalankan,\nseramai 13,303 orang calon dicadangkan untuk\ndipertimbangkan dipanggil temu duga bagi mengisi\n2,132 kekosongan melibatkan lapan (8) jawatan AKP\ndi Semenanjung seperti di Jadual 6.\nJadual 6: Cadangan Calon Dipanggil Temu Duga Bagi Jawatan AKP di Semenanjung\nBil. Bil. Calon\nH Taanar u Kekosongan Layak\n—\ne\n1 KA Perlis “ 129 112\na\nT a a\n14\nSsULIT\n\nT\nKb a a\nK a\nKb a\n2| mmm r T\nr a\nLr a\nT e T\n\n———————||—|—AkAAkA.ANf a\nT\n—b a\n2| Pembanutaan (Kewangan)\n\n— T A A\na\nLr a\nKb a\nPembantu Pengurusan Murid\nKn a a\na\n5 Penyelia Asrama | pup | 9 | * | B)\nGred N19 | p | S l I B\nI Seanor | 1 | 8 | 18 |\nI Pahang | 10 |) 57 | 16 |\n| NegeriSembiian | 8 | 4 | 16 |\n\n15\nSULIT\nWP Kuala Lumpur\nKA rakan\nPembantu Makemai L\nKA aa a\nn\nT\nKb\nKb a a\np N | fw | 9 | m | a\n7 plAya Perlis 101 111\nK\na T\n—— A A\nA\nKb\nMd | Sr | 6 | “ | M|\nGred H11 Selangor 4 17\nn\n16\nSULIT\nT e\n—————| |— a\n—A AN\n\n5. CADANGAN PELAKSANAAN TEMU DUGA\n\n5.1 Keanggotaan Lembaga Temu Duga\n\n5.1.1 Setiap Lembaga Temu Duga (LTD) pengambilan AKP\ntahun 2024 di Semenanjung akan dianggotai oleh dua\n(2) orang iaitu Pengerusi dan Wakil Jabatan.\n\n5.1.2 Pengerusi LTD dicadangkan dilantik daripada kalangan\nAnggota Suruhanjaya Perkhidmatan Pendidikan dan\npegawai SPP Gred 41 dan ke atas.\n\n5.1.3 Manakala, Wakil Jabatan dilantik daripada kalangan\npegawai KPM Gred 41 dan ke atas yang mengurus\nhal ehwal pentadbiran.\n\n5.2 Pemarkahan dan Perakuan\n\n5.2.1 Pengerusi LTD akan menilai prestasi calon dengan\nmaksimum 70 markah. Manakala, Wakil Jabatan dari\nKPM akan menilai prestasi calon dengan maksimum\n30 markah.\n\n5.2.2 Markah lulus temu duga adalah seperti yang\ndiputuskan dalam Mesyuarat Suruhanjaya Ke-1093\nbertarikh 14 Jun 2019 iaitu 70 dengan pecahan\n\n17\nSULIT\nmarkah minimum bagi Pengerusi ialah 4996 dan Wakil\nJabatan ialah 2190.\n5.3 Tarikh dan Tempat\n5.3.1 Temu duga bagi pengambilan AKP tahun 2024 di\nSemenanjung dicadang dijalankan secara bersemuka\npada 29 April hingga 12 Jun 2024.\n5.3.2 Temu duga dicadang dilaksanakan di Ibu Pejabat SPP,\nPutrajaya dan beberapa pusat temu duga di\nSemenanjung seperti cadangan jadual temu duga di\nJadual 7.\nJadual 7: Cadangan Jadual Temu Duga AKP 2024 di Semenanjung\n| Bil. | Tarikh Temu Duga | Pengerusi LTD | Pusat Temu Duga Bil. Calon\nG Kola Bharu,\n13 Ibu Pejabat SPP, 1036\ntrajaya..... IKualatumpur | 66 |\n3. 6-9Mei2024 (ASJ) Putrajaya Kuala Lumpur 686\nPutrajaya\nc\n13-15Mei2024 L a\neorgetown,\n(Pegawai SPP) | Pulau Pinang Pulau Pinang\na |i\n13 Ibu Pejabat SPP, 835\n2023 Mei 2024 , Sembilan\nH- A) | Puiraaya\n13 Johor Bahru,\nD D a\nIgganu 823\n4012 Jun 2024 ASJ Terengganu\n8 Kuantan, Pahan 1,302\n(ASJ) Pahang g ,\n——I a\n18\nSULIT\n5.4 Calon Simpanan\n\n5.4.1 Bagi pengambilan AKP 2024 di Semenanjung,\ndicadang diwujudkan calon simpanan dengan kadar\nnisbah 1:2 iaitu satu kekosongan dinisbahkan kepada\ndua (2) orang calon simpanan dan tempoh sah laku\nsimpanan ditetapkan selama satu (1) tahun.\n\n5.4.2 Justifikasi cadangan pewujudan calon simpanan\nadalah seperti berikut:\n\na. calon simpanan akan dapat mempercepatkan\npengisian kekosongan jawatan berbanding\ndilaksanakan urusan pengambilan; dan\n\nb. kos dan tenaga dapat dijimatkan kerana\nsesetengah kekosongan jawatan tidak perlu\ndiadakan urusan temu duga.\n\n19\nSULIT\n6. KELULUSAN OLEH PENGERUSI SURUHANJAYA\nPERKHIDMATAN PENDIDIKAN\n6.1 Bahagian Pengambilan telah mengemukakan Laporan\nLembaga Permulaan untuk kelulusan Pengerusi Suruhanjaya\nPerkhidmatan Pendidikan (SPP) yang disokong oleh Timbalan\nSetiausaha (Pengambilan dan  Perkhidmatan) pada\n25 Mac 2024.\n6.2 Pengerusi SPP telah memberi kelulusan pada 25 Mac 2024\nseperti di Lampiran F.\n7. SYOR\n\nSuruhanjaya adalah dimohon untuk mengesahkan kelulusan oleh\n\nPengerusi SPP seperti syor-syor berikut:\n\ni. memanggil temu duga seramai 13,300 orang calon bagi\nmengisi 2,132 kekosongan AKP melibatkan lapan (8) jawatan\ndi Semenanjung;\n\ni. mewujudkan calon simpanan dengan kadar nisbah 1:2 iaitu\nsatu kekosongan dinisbahkan kepada dua (2) orang calon\nsimpanan dan tempoh sah laku simpanan ditetapkan selama\nsatu (1) tahun;\n\ni.  perancangan temu duga seperti di perenggan 5;\n\n20\nSsULIT\niv. Pengerusi LTD adalah dicadangkan dilantik daripada kalangan\nAnggota Suruhanjaya Perkhidmatan Pendidikan dan\npegawai SPP Gred 41 dan ke atas; dan\nv. Wakil Jabatan dilantik adalah daripada kalangan pegawai KPM\nGred 41 dan ke atas yang mengurus hal ehwal pentadbiran.\nDisediakan Oleh : Muhammad Akmal bin Ahmad\nPenolong Setiausaha\nBahagian Pengambilan\nDisemak Oleh : Fadli Ahmad bin Ismail\nSetiausaha Bahagian\nBahagian Pengambilan\nDisahkan Oleh : Khairiah binti Ab Rashid\nTimbalan Setiausaha\n(Pengambilan dan Perkhidmatan)\nn\n'],
        },{
          tajukDokumen: 'KERTAS BIL. 343/2024: CADANGAN MENGENAKAN TINDAKAN TATATERTIB TERHADAP NAMA PEGAWAI, PEGAWAI PERKHIDMATAN PENDIDIKAN (PPP) GRED DG44 KHAS UNTUK PENYANDANG (KUP), KOLEJ VOKASIONAL SHAH ALAM, SELANGOR [NOMBOR FAIL]', 
          jenisDokumen: 'KERTAS SURUHANJAYA', 
          noRujukanFail: 'SPP.600-3/1/1 Jld.11(4)(S)', 
          isiDokumen: []
        }];
        dtDbm.clear().rows.add(dataDbm).draw();
      }
    } catch (e) { toastr['error'](_ALERT_MSG_ERROR_DEFAULT, _ALERT_TITLE_ERROR); }
  };
  
  this.setOptionNegeri = function (_refNegeri) {
    try {
      mzOptionStop('optSmeAlTkNegeri', _refNegeri, 'display');
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
  
  this.setModalDokumenBerkaitanEkeps = function (_modalDokumenBerkaitanEkeps) {
    modalDokumenBerkaitanEkeps = _modalDokumenBerkaitanEkeps;
  };
  
  this.setModalPreviewPdf = function (_modalPreviewPdf) {
    modalPreviewPdf = _modalPreviewPdf;
  };

  this.setRefNegeri = function (_refNegeri) {
    refNegeri = _refNegeri;
  };
}

