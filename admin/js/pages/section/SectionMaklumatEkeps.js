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
      ordering: true,
      aaSorting: [[2, 'desc']],
      language: _DATATABLE_LANGUAGE,
      dom: "<'d-flex'<'p-0'f><'p-0 d-none d-sm-block ml-auto'>>" +
      "<'d-flex'<'p-0 flex-fill'tr>>",
      columnDefs: [
        { className: 'text-center', targets: [0,2,3,4] },
        { className: 'text-left', targets: [1] },
        { bSortable: false, targets: [0,4] },
        { visible: false, targets: [5] },
        { className: 'noVis', targets: [4,5] },
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
          jenisDokumen: 'MINIT MESYUARAT', 
          noRujukanFail: 'SPP.600-3/1/1 Jld.18(4)(S)', 
          tajukDokumen: ["MINT MESYUARAT SURUHANJAYA PERKHIDMATAN PENDIDIKAN KALI KE-2 BIL 1/2025"],
          isiDokumen: ["p DISAHKAN PADA: 9 MAC 2015 |\nSm L DISAHKAN pAdA S MAc 2 | 672\n-\nSPP(S).220/485/1 Jilid 24 (49)\nMINIT MESYUARAT\nLEMBAGA RAYUAN TATATERTIB PERKHIDMATAN PENDIDIKAN\nKALI KE-672(BIL.4/2015)\nHARI DAN TARIKH : Isnin, 23 Februari 2015\n-\nMASA : 11.05 pagi\nTEMPAT : Bilik Mesyuarat Suruhanjaya\nAras3, Blok B3, Kompleks JPM\nPusat Pentadbiran Kerajaan Persekutuan\nPUTRAJAYA\nHADIR:\n1. YBhg. Datuk Dr. Haili bin Dolhan - Pengerusi\nPengerusi SPP\nx 2. Tuan Haji Abdul Adzis bin Abas\n3. Puan Rahimah binti Mohd Sura\n4. YBhg. Dato' Dr. Soh Chee Seng\n5. YBhg. Dato' Haji Azmi bin Che Mat\n6. YBhg. Dato' Haji Imran bin Idris\n7. YBhg. Dato' Abdul Halim bin Abdul Razak\n8. Encik Awangku Ali bin Pg. Jumaat\n9. Tuan Haji Morazuki bin Hashim\nN 10. YBhg. Dato' Abu Bakar bin Othman - Setiausaha\nTIDAK HADIR DENGAN MAAF\n1. YBhg. Dato' Seri Dr. Abdul Rahman bin Hashim\nTimbalan Pengerusi SPP\n2. Tuan Haji Jamaludin bin Yahaya\n( . , ,\nTuan Haji Osman bin Abd. Aziz\nK\n(\nN 1\nX SULIT\nN\nSULIT DISAHKAN PADA: 9 MAC 2015 MLRTI Kedr2 (BI A0\n| .\n| HADIR BERSAMA- SAMA (URUS SETIA):\n! 1. Encik Mohd Taupik bin Yusof TSU(P)\n2. Puan Maheran binti Abdul Rahman SUB(PM)\n3. Encik Mohd Safrie bin Zakaria SUB(K)\n| 4. Encik Mohd Farid bin Mohd Arif SUB(G)\n| 5, Encik Mohamad Fahmi bin Mohd Latib SUB(BG)\n| 6. Puan Zuliana binti Mohd Akob SUB (D) ,\n7. Puan Zaidayu binti Haron PSU(NT)\n| 8. Puan Nuuraulia binti Md. Isa PSU(U)\n| 9. Puan Maimunah binti Ismail PPT(U)\n| 1. PERUTUSAN PENGERUSI\n| Pengerusi mengalu-alukan semua yang hadir.\n2. PENGESAHAN MINIT MESYUARAT LEMBAGA  RAYUAN\n| TATATERTIB PERKHIDMATAN PENDIDIKAN KALI KE-671 PADA 9 .\n| FEBUARI 2015\n| Minit Mesyuarat Lembaga Rayuan Tatatertib Perkhidmatan Pendidikan\nkali ke-671 pada 9 Februari 2015 disahkan tanpa pindaan.\n3. PERKARA BERBANGKIT DARIPADA MINIT MESYUARAT\nLEMBAGA RAYUAN TATATERTIB PERKHIDMATAN PENDIDIKAN\nKALI KE-671 PADA 9 FEBRUARI 2015\n| Tiada.\n4. PERBINCANGAN KERTAS *\n41 KERTAS BIL. R17/2015: RAYUAN TATATERTIB DARIPADA\nNURASHIKIN BINTI ADNAN PEGAWAI PERKHIDMATAN\nPENDIDIKAN LEPASAN DIPLOMA GRED DGA32 KHAS UNTUK\n| PENYANDANG SEKOLAH KEBANGSAAN BANDAR BARU SENTUL,\n| KUALA LUMPUR\n! H  (SPP(S).60/1/0080676(5)1\n% ' Lembaga menimbangkan kertas dan:\n| , .\nSULIT\n"],
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

