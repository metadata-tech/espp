function ModalMpgAnalisisPemerolehan () {
  
  const className = 'ModalMpgAnalisisPemerolehan';
  let self = this;
  let classFrom;
  let id;
  let dtMana;
  // let dtDisplay;
  let submitType = '';

  let formValidateMmap;
  this.getValidationDataMmap = function () {
    return [
      {
        field_id: "optMmapJenisDokumen",
        type: "select",
        name: "Jenis Dokumen",
        validator: {
          notEmpty: true
        }
      },
      {
        field_id: "txtMmapTajukDokumen",
        type: "text",
        name: "Tajuk Dokumen",
        validator: {
          notEmpty: true
        }
      },
      {
        field_id: "txtMmapNoRujukanFail",
        type: "text",
        name: "No. Rujukan Fail",
        validator: {
          notEmpty: true
        }
      },
      {
        field_id: "txtMmapDokumen",
        type: "file",
        name: "Dokumen Berkaitan",
        validator: {
          // notEmptyFile: true,
          pdfType: true
        }
      },
      {
        field_id: "txtMmapFile",
        type: "text",
        name: "Dokumen",
        validator: {
          notEmpty: true
        }
      },
      {
        field_id: "txtMmapIsiDokumen",
        type: "text",
        name: "Teks PDF",
        validator: {
          notEmpty: true,
          notEqual: 'Sila tunggu...'
        }
      },
      {
        field_id: "optMmapCawangan",
        type: "select",
        name: "Cawangan",
        validator: {
          notEmpty: true
        }
      },
      {
        field_id: "optMmapFungsi",
        type: "select",
        name: "Fungsi/ Bahagian",
        validator: {
          notEmpty: true
        }
      },
      {
        field_id: "optMmapSubFungsi",
        type: "select",
        name: "Sub Fungsi/ Aktiviti",
        validator: {
          notEmpty: true
        }
      },
    ];
  };
  
  this.init = function () {
    formValidateMmap = new MzValidate(false);
    formValidateMmap.registerFields(self.getValidationDataMmap());
    
    $('#btnMmapClose').on('click', function () {
      console.log('close');
      // $('#modalMpgAnalisisPemerolehan').modal('hide');
      // worker.terminate();
    });
      
    $('#optMmapJenisDokumen').on('change', function () {
      if (this.value == '6' || this.value == '7') {
        //$('.optionKertas').show();
        formValidateMmap.enableField('optMmapCawangan');
        formValidateMmap.enableField('optMmapFungsi');
        formValidateMmap.enableField('optMmapSubFungsi');
      } else {
        //$('.optionKertas').hide();
        formValidateMmap.disableField('optMmapCawangan');
        formValidateMmap.disableField('optMmapFungsi');
        formValidateMmap.disableField('optMmapSubFungsi');
      }
    });

    $('#txtMmapDokumen').on('change', function () {
      const preview = document.getElementById('pdfMmapPreview');
      const file = document.getElementById('txtMmapDokumen').files[0];
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
      mzSetValue('txtMmapIsiDokumen', null, 'textarea');
      $('#isiDokumenErr').html(document.createTextNode(`Error: ${error.message}`));
      // document.getElementById("txtMmapIsiDokumenErr").appendChild(document.createTextNode(`Error: ${error.message}`));
    };

    const clearResults = () => {
      mzSetValue('txtMmapIsiDokumen', null, 'textarea');
      $('#isiDokumenErr').html('');
    };

    $('#btnMmapSave').on('click', function () {
      
        if (submitType == 'edit') {
          ShowLoader(); setTimeout(function () {
            toastr['success']('Maklumat berjaya dikemaskini!');
            $('#modalMpgAnalisisPemerolehan').modal('hide');
            HideLoader();
          }, 200);
        } else {
         $('#modalMpgAnalisisPemerolehan').modal('hide');
        }
     
    });

    dtMana = $('#dtMana').DataTable({
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
        { className: 'text-center align-top', targets: [0,1,2,3] },
        { className: 'text-left align-top', targets: [1] },
        { bSortable: false, targets: [0] },
        { visible: false, targets: [] },
        { className: 'noVis', targets: [0] },
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
          modalMpgAnalisisPemerolehan.view(123);
        });
        $('.lnkMplEdit').off('click').on('click', function () {
          modalMpgAnalisisPemerolehan.edit(123);
        });
        $('.lnkMplRemove').off('click').on('click', function () {
          // modalConfirmAction.action(123, self);
          modalConfirmDelete.delete(123, self);
        });
        $('.lnkMplLog').off('click').on('click', function () {
          
        });
        // $('.btnAddKcp').off('click').on('click', function () {
        //   sectionMpgMaklumatPemerolehan.add();
        // });
      },
      aoColumns: [
        { mData: null},
        { mData: 'noKadPengenalan'},
        { mData: 'namaCalon'},
        { mData: 'status'},
      ]
    });
    self.genTable();
  };

  this.genTable = function () {
    try {
      const dataDb = [{
        noKadPengenalan : "09292929283883",
        namaCalon : "AMMAR",
        status : "BERJAYA",
      },{
        noKadPengenalan : "01292929922",
        namaCalon : "HAIKAL",
        status : "BERJAYA",
      },{
        noKadPengenalan : "019283810838",
        namaCalon : "AMIRUL",
        status : "BERJAYA",
      }];
      dtMana.clear().rows.add(dataDb).draw();
    } catch (e) { toastr['error'](_ALERT_MSG_ERROR_DEFAULT, _ALERT_TITLE_ERROR); }
  };
  
  this.add = function () {
    try {
      submitType = 'add';

      formValidateMmap.clearValidation();
      //$('.optionKertas').hide();

      ShowLoader();
      setTimeout(function () {
        $('#h5MmapTitle').html('<i class="fa-duotone fa-circle-plus mr-2"></i>MAKLUMAT ANALISIS PEMEROLEHAN');
        $('#modalMpgAnalisisPemerolehan').modal({backdrop: 'static', keyboard: false}).scrollTop(0);
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

      formValidateMmap.clearValidation();
      
      ShowLoader();
      setTimeout(function () {
        //self.assignValue();

        $('#h5MmapTitle').html('<i class="fa-duotone fa-pen-to-square mr-2"></i>KEMASKINI ANALISIS PEMEROLEHAN');
        $('#modalMpgAnalisisPemerolehan').modal({backdrop: 'static', keyboard: false}).scrollTop(0);
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

      formValidateMmap.clearValidation();
      
      ShowLoader();
      setTimeout(function () {
        //self.assignValue();

        $('#h5MmapTitle').html('MAKLUMAT ANALISIS PEMEROLEHAN');
        $('#modalMpgAnalisisPemerolehan').modal({backdrop: 'static', keyboard: false}).scrollTop(0);
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
      formValidateMmap.enableField('optMmapCawangan');
      formValidateMmap.enableField('optMmapFungsi');
      formValidateMmap.enableField('optMmapSubFungsi');
    } else {
      $('.optionKertas').hide();
      formValidateMmap.disableField('optMmapCawangan');
      formValidateMmap.disableField('optMmapFungsi');
      formValidateMmap.disableField('optMmapSubFungsi');
    }
    mzSetValue('optMmapJenisDokumen', jenisDokumen, 'select');
    mzSetValue('txtMmapNoRujukanFail', 'SPP.600-3/1/1 Jld.21(4)(S)', 'text');
    mzSetValue('txtMmapTajukDokumen', 'KERTAS BIL. KM13/2024: PEMAKLUMAN PERINTAH TAHAN KERJA YANG TERHENTI TERHADAP NAMA PEGAWAI, PEGAWAI PENDIDIKAN PENGAJIAN TINGGI (PPPT) GRED DH54, POLITEKNIK NILAI, NEGERI SEMBILAN [NOMBOR FAIL]', 'textarea');
    mzSetValue('txtMmapFile', '3. MLRTT 672 (Image).pdf', 'text');
    document.getElementById('pdfMmapPreview').src = 'document/3. MLRTT 672 (Image).pdf';

    var isiDokumen = "p DISAHKAN PADA: 9 MAC 2015 |\nSm L DISAHKAN pAdA S MAc 2 | 672\n-\nSPP(S).220/485/1 Jilid 24 (49)\nMINIT MESYUARAT\nLEMBAGA RAYUAN TATATERTIB PERKHIDMATAN PENDIDIKAN\nKALI KE-672(BIL.4/2015)\nHARI DAN TARIKH : Isnin, 23 Februari 2015\n-\nMASA : 11.05 pagi\nTEMPAT : Bilik Mesyuarat Suruhanjaya\nAras3, Blok B3, Kompleks JPM\nPusat Pentadbiran Kerajaan Persekutuan\nPUTRAJAYA\nHADIR:\n1. YBhg. Datuk Dr. Haili bin Dolhan - Pengerusi\nPengerusi SPP\nx 2. Tuan Haji Abdul Adzis bin Abas\n3. Puan Rahimah binti Mohd Sura\n4. YBhg. Dato' Dr. Soh Chee Seng\n5. YBhg. Dato' Haji Azmi bin Che Mat\n6. YBhg. Dato' Haji Imran bin Idris\n7. YBhg. Dato' Abdul Halim bin Abdul Razak\n8. Encik Awangku Ali bin Pg. Jumaat\n9. Tuan Haji Morazuki bin Hashim\nN 10. YBhg. Dato' Abu Bakar bin Othman - Setiausaha\nTIDAK HADIR DENGAN MAAF\n1. YBhg. Dato' Seri Dr. Abdul Rahman bin Hashim\nTimbalan Pengerusi SPP\n2. Tuan Haji Jamaludin bin Yahaya\n( . , ,\nTuan Haji Osman bin Abd. Aziz\nK\n(\nN 1\nX SULIT\nN\nSULIT DISAHKAN PADA: 9 MAC 2015 MLRTI Kedr2 (BI A0\n| .\n| HADIR BERSAMA- SAMA (URUS SETIA):\n! 1. Encik Mohd Taupik bin Yusof TSU(P)\n2. Puan Maheran binti Abdul Rahman SUB(PM)\n3. Encik Mohd Safrie bin Zakaria SUB(K)\n| 4. Encik Mohd Farid bin Mohd Arif SUB(G)\n| 5, Encik Mohamad Fahmi bin Mohd Latib SUB(BG)\n| 6. Puan Zuliana binti Mohd Akob SUB (D) ,\n7. Puan Zaidayu binti Haron PSU(NT)\n| 8. Puan Nuuraulia binti Md. Isa PSU(U)\n| 9. Puan Maimunah binti Ismail PPT(U)\n| 1. PERUTUSAN PENGERUSI\n| Pengerusi mengalu-alukan semua yang hadir.\n2. PENGESAHAN MINIT MESYUARAT LEMBAGA  RAYUAN\n| TATATERTIB PERKHIDMATAN PENDIDIKAN KALI KE-671 PADA 9 .\n| FEBUARI 2015\n| Minit Mesyuarat Lembaga Rayuan Tatatertib Perkhidmatan Pendidikan\nkali ke-671 pada 9 Februari 2015 disahkan tanpa pindaan.\n3. PERKARA BERBANGKIT DARIPADA MINIT MESYUARAT\nLEMBAGA RAYUAN TATATERTIB PERKHIDMATAN PENDIDIKAN\nKALI KE-671 PADA 9 FEBRUARI 2015\n| Tiada.\n4. PERBINCANGAN KERTAS *\n41 KERTAS BIL. R17/2015: RAYUAN TATATERTIB DARIPADA\nNURASHIKIN BINTI ADNAN PEGAWAI PERKHIDMATAN\nPENDIDIKAN LEPASAN DIPLOMA GRED DGA32 KHAS UNTUK\n| PENYANDANG SEKOLAH KEBANGSAAN BANDAR BARU SENTUL,\n| KUALA LUMPUR\n! H  (SPP(S).60/1/0080676(5)1\n% ' Lembaga menimbangkan kertas dan:\n| , .\nSULIT\n";
    mzSetValue('txtMmapIsiDokumen', isiDokumen, 'textarea');
  };
  // this.setDtDisplay = function (_dtDisplay) {
  //   dtDisplay = _dtDisplay;
  // };

  this.getClassName = function () {
    return className;
  };
  
  this.setClassFrom = function (_classFrom) {
    classFrom = _classFrom;
  };
}