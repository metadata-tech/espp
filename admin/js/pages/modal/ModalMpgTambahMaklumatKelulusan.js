function ModalMpgTambahMaklumatKelulusan () {
  
  const className = 'ModalMpgTambahMaklumatKelulusan';
  let self = this;
  let classFrom;
  let id;
  let submitType = '';

  let formValidateMtmk;
  this.getValidationDataMtmk = function () {
    return [
      {
        field_id: "optMtmkJenisDokumen",
        type: "select",
        name: "Jenis Dokumen",
        validator: {
          notEmpty: true
        }
      },
      {
        field_id: "txtMtmkTajukDokumen",
        type: "text",
        name: "Tajuk Dokumen",
        validator: {
          notEmpty: true
        }
      },
      {
        field_id: "txtMtmkNoRujukanFail",
        type: "text",
        name: "No. Rujukan Fail",
        validator: {
          notEmpty: true
        }
      },
      {
        field_id: "txtMtmkDokumen",
        type: "file",
        name: "Dokumen Berkaitan",
        validator: {
          // notEmptyFile: true,
          pdfType: true
        }
      },
      {
        field_id: "txtMtmkFile",
        type: "text",
        name: "Dokumen",
        validator: {
          notEmpty: true
        }
      },
      {
        field_id: "txtMtmkIsiDokumen",
        type: "text",
        name: "Teks PDF",
        validator: {
          notEmpty: true,
          notEqual: 'Sila tunggu...'
        }
      },
      {
        field_id: "optMtmkCawangan",
        type: "select",
        name: "Cawangan",
        validator: {
          notEmpty: true
        }
      },
      {
        field_id: "optMtmkFungsi",
        type: "select",
        name: "Fungsi/ Bahagian",
        validator: {
          notEmpty: true
        }
      },
      {
        field_id: "optMtmkSubFungsi",
        type: "select",
        name: "Sub Fungsi/ Aktiviti",
        validator: {
          notEmpty: true
        }
      },
    ];
  };
  
  this.init = function () {
    formValidateMtmk = new MzValidate(false);
    formValidateMtmk.registerFields(self.getValidationDataMtmk());
    
    $('#btnMtmkClose').on('click', function () {
      console.log('close');
      // $('#modalMpgTambahMaklumatKelulusan').modal('hide');
      // worker.terminate();
    });
      
    $('#optMtmkJenisDokumen').on('change', function () {
      if (this.value == '6' || this.value == '7') {
        //$('.optionKertas').show();
        formValidateMtmk.enableField('optMtmkCawangan');
        formValidateMtmk.enableField('optMtmkFungsi');
        formValidateMtmk.enableField('optMtmkSubFungsi');
      } else {
        //$('.optionKertas').hide();
        formValidateMtmk.disableField('optMtmkCawangan');
        formValidateMtmk.disableField('optMtmkFungsi');
        formValidateMtmk.disableField('optMtmkSubFungsi');
      }
    });

    $('#txtMtmkDokumen').on('change', function () {
      const preview = document.getElementById('pdfMtmkPreview');
      const file = document.getElementById('txtMtmkDokumen').files[0];
      const reader = new FileReader();

      if (typeof file == 'object') {
        if (file.type == 'application/pdf') {
          reader.addEventListener("load", function () {
            preview.src = reader.result;
          }, false);
      
          if (file) {
            reader.readAsDataURL(file);
          } 
        } else {
          preview.src = '';
        }
      } else {
        preview.src = '';
      }
    });
 
    // pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdn.jsdelivr.net/npm/pdfjs-dist@3.6.172/build/pdf.worker.js";
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'js/addons/pdf.worker.js';

    let language = "msa";

    const showError = (error) => {
      mzSetValue('txtMtmkIsiDokumen', null, 'textarea');
      $('#isiDokumenErr').html(document.createTextNode(`Error: ${error.message}`));
      // document.getElementById("txtMtmkIsiDokumenErr").appendChild(document.createTextNode(`Error: ${error.message}`));
    };

    const clearResults = () => {
      mzSetValue('txtMtmkIsiDokumen', null, 'textarea');
      $('#isiDokumenErr').html('');
    };

    $('#btnMtmkSave').on('click', function () {
      

          ShowLoader(); setTimeout(function () {
            toastr['success']('Maklumat berjaya dikemaskini!');
            $('#modalMpgTambahMaklumatKelulusan').modal('hide');
            HideLoader();
          }, 200);
    
     
    });
  };
  
  this.add = function () {
    try {
      submitType = 'add';

      formValidateMtmk.clearValidation();
      //$('.optionKertas').hide();

      ShowLoader();
      setTimeout(function () {
        $('#h5MtmkTitle').html('<i class="fa-duotone fa-circle-plus mr-2"></i>Maklumat Proses Pemerolehan');
        $('#modalMpgTambahMaklumatKelulusan').modal({backdrop: 'static', keyboard: false}).scrollTop(0);
        HideLoader();
      }, 200);
    } catch (e) {
      toastr['error'](e.message !== '' ? e.message : _ALERT_MSG_ERROR_DEFAULT, _ALERT_TITLE_ERROR);
    }
  };
  
  this.edit = function (_id) {
    try {
      mzEmptyParams([_id]);
      id = _id;
      submitType = 'edit';

      formValidateMtmk.clearValidation();
      
      ShowLoader();
      setTimeout(function () {
        //self.assignValue();

        $('#h5MtmkTitle').html('<i class="fa-duotone fa-pen-to-square mr-2"></i>KEMASKINI CATATAN PEMEROLEHAN');
        $('#modalMpgTambahMaklumatKelulusan').modal({backdrop: 'static', keyboard: false}).scrollTop(0);
        HideLoader();
      }, 200);
    } catch (e) {
      toastr['error'](e.message !== '' ? e.message : _ALERT_MSG_ERROR_DEFAULT, _ALERT_TITLE_ERROR);
    }
  };
  
  this.view = function (_id) {
    try {
      mzEmptyParams([_id]);
      id = _id;
      submitType = 'view';

      formValidateMtmk.clearValidation();
      
      ShowLoader();
      setTimeout(function () {
        //self.assignValue();

        $('#h5MtmkTitle').html('<i class="fa-duotone fa-clock-rotate-left mr-2"></i>Sejarah Transaksi');
        $('#modalMpgTambahMaklumatKelulusan').modal({backdrop: 'static', keyboard: false}).scrollTop(0);
        HideLoader();
      }, 200);
    } catch (e) {
      toastr['error'](e.message !== '' ? e.message : _ALERT_MSG_ERROR_DEFAULT, _ALERT_TITLE_ERROR);
    }
  };
  
  this.delete = function (_id) {
    try {
      mzEmptyParams([_id]);
      ShowLoader(); setTimeout(function () {
        toastr['success']('Maklumat berjaya dihapus!');
        HideLoader();
      }, 200);
    } catch (e) {
      toastr["error"](_ALERT_MSG_ERROR_DEFAULT, _ALERT_TITLE_ERROR);
    }
  };

  this.assignValue = function () {
    const jenisDokumen = '1';
    if (jenisDokumen == '6' || jenisDokumen == '7') {
      $('.optionKertas').show();
      formValidateMtmk.enableField('optMtmkCawangan');
      formValidateMtmk.enableField('optMtmkFungsi');
      formValidateMtmk.enableField('optMtmkSubFungsi');
    } else {
      $('.optionKertas').hide();
      formValidateMtmk.disableField('optMtmkCawangan');
      formValidateMtmk.disableField('optMtmkFungsi');
      formValidateMtmk.disableField('optMtmkSubFungsi');
    }
    mzSetValue('optMtmkJenisDokumen', jenisDokumen, 'select');
    mzSetValue('txtMtmkNoRujukanFail', 'SPP.600-3/1/1 Jld.21(4)(S)', 'text');
    mzSetValue('txtMtmkTajukDokumen', 'KERTAS BIL. KM13/2024: PEMAKLUMAN PERINTAH TAHAN KERJA YANG TERHENTI TERHADAP NAMA PEGAWAI, PEGAWAI PENDIDIKAN PENGAJIAN TINGGI (PPPT) GRED DH54, POLITEKNIK NILAI, NEGERI SEMBILAN [NOMBOR FAIL]', 'textarea');
    mzSetValue('txtMtmkFile', '3. MLRTT 672 (Image).pdf', 'text');
    document.getElementById('pdfMtmkPreview').src = 'document/3. MLRTT 672 (Image).pdf';

    var isiDokumen = "p DISAHKAN PADA: 9 MAC 2015 |\nSm L DISAHKAN pAdA S MAc 2 | 672\n-\nSPP(S).220/485/1 Jilid 24 (49)\nMINIT MESYUARAT\nLEMBAGA RAYUAN TATATERTIB PERKHIDMATAN PENDIDIKAN\nKALI KE-672(BIL.4/2015)\nHARI DAN TARIKH : Isnin, 23 Februari 2015\n-\nMASA : 11.05 pagi\nTEMPAT : Bilik Mesyuarat Suruhanjaya\nAras3, Blok B3, Kompleks JPM\nPusat Pentadbiran Kerajaan Persekutuan\nPUTRAJAYA\nHADIR:\n1. YBhg. Datuk Dr. Haili bin Dolhan - Pengerusi\nPengerusi SPP\nx 2. Tuan Haji Abdul Adzis bin Abas\n3. Puan Rahimah binti Mohd Sura\n4. YBhg. Dato' Dr. Soh Chee Seng\n5. YBhg. Dato' Haji Azmi bin Che Mat\n6. YBhg. Dato' Haji Imran bin Idris\n7. YBhg. Dato' Abdul Halim bin Abdul Razak\n8. Encik Awangku Ali bin Pg. Jumaat\n9. Tuan Haji Morazuki bin Hashim\nN 10. YBhg. Dato' Abu Bakar bin Othman - Setiausaha\nTIDAK HADIR DENGAN MAAF\n1. YBhg. Dato' Seri Dr. Abdul Rahman bin Hashim\nTimbalan Pengerusi SPP\n2. Tuan Haji Jamaludin bin Yahaya\n( . , ,\nTuan Haji Osman bin Abd. Aziz\nK\n(\nN 1\nX SULIT\nN\nSULIT DISAHKAN PADA: 9 MAC 2015 MLRTI Kedr2 (BI A0\n| .\n| HADIR BERSAMA- SAMA (URUS SETIA):\n! 1. Encik Mohd Taupik bin Yusof TSU(P)\n2. Puan Maheran binti Abdul Rahman SUB(PM)\n3. Encik Mohd Safrie bin Zakaria SUB(K)\n| 4. Encik Mohd Farid bin Mohd Arif SUB(G)\n| 5, Encik Mohamad Fahmi bin Mohd Latib SUB(BG)\n| 6. Puan Zuliana binti Mohd Akob SUB (D) ,\n7. Puan Zaidayu binti Haron PSU(NT)\n| 8. Puan Nuuraulia binti Md. Isa PSU(U)\n| 9. Puan Maimunah binti Ismail PPT(U)\n| 1. PERUTUSAN PENGERUSI\n| Pengerusi mengalu-alukan semua yang hadir.\n2. PENGESAHAN MINIT MESYUARAT LEMBAGA  RAYUAN\n| TATATERTIB PERKHIDMATAN PENDIDIKAN KALI KE-671 PADA 9 .\n| FEBUARI 2015\n| Minit Mesyuarat Lembaga Rayuan Tatatertib Perkhidmatan Pendidikan\nkali ke-671 pada 9 Februari 2015 disahkan tanpa pindaan.\n3. PERKARA BERBANGKIT DARIPADA MINIT MESYUARAT\nLEMBAGA RAYUAN TATATERTIB PERKHIDMATAN PENDIDIKAN\nKALI KE-671 PADA 9 FEBRUARI 2015\n| Tiada.\n4. PERBINCANGAN KERTAS *\n41 KERTAS BIL. R17/2015: RAYUAN TATATERTIB DARIPADA\nNURASHIKIN BINTI ADNAN PEGAWAI PERKHIDMATAN\nPENDIDIKAN LEPASAN DIPLOMA GRED DGA32 KHAS UNTUK\n| PENYANDANG SEKOLAH KEBANGSAAN BANDAR BARU SENTUL,\n| KUALA LUMPUR\n! H  (SPP(S).60/1/0080676(5)1\n% ' Lembaga menimbangkan kertas dan:\n| , .\nSULIT\n";
    mzSetValue('txtMtmkIsiDokumen', isiDokumen, 'textarea');
  };
  
  this.getClassName = function () {
    return className;
  };
  
  this.setClassFrom = function (_classFrom) {
    classFrom = _classFrom;
  };
}