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
    {
      field_id: "txtCtcrIsiDokumen",
      type: "text",
      name: "Isi Dokumen",
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
          if ($('#txtCtcrTajukMinit').val().length > 0) {
            dtSek.columns(1).search($('#txtCtcrTajukMinit').val() ? $('#txtCtcrTajukMinit').val() : '', false, true, false);
          }
          if ($('#optCtcrKategoriMesyuarat').val().length > 0) {
            dtSek.columns(2).search($('#optCtcrKategoriMesyuarat').val() ? $('#optCtcrKategoriMesyuarat').val() : '', false, true, false);
          }
          if ($('#txtCtcrNoRujukanFail').val().length > 0) {
            dtSek.columns(4).search($('#txtCtcrNoRujukanFail').val() ? $('#txtCtcrNoRujukanFail').val() : '', false, true, false);
          }
          if ($('#txtCtcrTarikhMesyuarat').val().length > 0) {
            moment.locale('ms');
            const tarikh = moment($('#txtCtcrTarikhMesyuarat').val(), 'DD/MM/YYYY').format('YYYY-MM-DD');
            dtSek.columns(5).search($('#txtCtcrTarikhMesyuarat').val() ? tarikh : '', false, true, false);
          }
          if ($('#txtCtcrTarikhPengesahanMinit').val().length > 0) {
            moment.locale('ms');
            const tarikh = moment($('#txtCtcrTarikhPengesahanMinit').val(), 'DD/MM/YYYY').format('YYYY-MM-DD');
            dtSek.columns(6).search($('#txtCtcrTarikhPengesahanMinit').val() ? tarikh : '', false, true, false);
          }
          if ($('#optCtcrJenisDokumen').val().length > 0) {
            dtSek.columns(7).search($('#optCtcrJenisDokumen').val() ? $('#optCtcrJenisDokumen').val() : '', false, true, false);
          }
          if ($('#txtCtcrTajukDokumen').val().length > 0) {
            dtSek.columns(8).search($('#txtCtcrTajukDokumen').val() ? $('#txtCtcrTajukDokumen').val() : '', false, true, false);
          }
          if ($('#txtCtcrBilMesyuaratNo').val().length > 0) {
            dtSek.columns(10).search($('#txtCtcrBilMesyuaratNo').val() ? $('#txtCtcrBilMesyuaratNo').val() : '', false, true, false);
          }
          if ($('#txtCtcrBilMesyuaratBil').val().length > 0) {
            dtSek.columns(11).search($('#txtCtcrBilMesyuaratBil').val() ? $('#txtCtcrBilMesyuaratBil').val() : '', false, true, false);
          }
          if ($('#txtCtcrBilMesyuaratTahun').val().length > 0) {
            dtSek.columns(12).search($('#txtCtcrBilMesyuaratTahun').val() ? $('#txtCtcrBilMesyuaratTahun').val() : '', false, true, false);
          }
          if ($('#txtCtcrIsiDokumen').val().length > 0) {
            dtSek.columns(13).search($('#txtCtcrIsiDokumen').val() ? $('#txtCtcrIsiDokumen').val() : '', false, true, true);
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
        bLengthChange: true,
        bFilter: true,
        pageLength: 10,
        bPaginate: true,
        bInfo: true,
        autoWidth: false,
        aaSorting: [[2, 'asc']],
        language: _DATATABLE_LANGUAGE,
        // dom: "<'row'<'col-12 col-sm-6 align-bottom'l><'col-sm-6 d-none d-sm-block'f>>" +
        dom:  "<'d-flex align-items-center'<'p-0 align-items-center d-none d-sm-block'B><'p-0 px-2 mt-2 align-items-center d-none d-sm-block'l><'p-0 mr-auto flex-fill 'f>>" +
        "<'d-flex mt-2'<'p-0 flex-fill'tr>>" +
        "<'d-flex align-items-center'<'p-0 flex-fill d-none d-sm-block'i><'p-0 mt-3 mr-auto flex-fill'p>>",
        columnDefs: [
          { className: 'text-center align-top', targets: [0,2,3,4,5,6,9] },
          { className: 'text-left align-top', targets: [1] },
          { bSortable: false, targets: [0,9] },
          { visible: false, targets: [7,8,10,11,12,13] },
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
          { mData: 'tajukMinit'},
          { mData: 'kategoriMesyuarat', mRender: function (data, type, row, meta) { 
            return data;
          }},
          { mData: null, mRender: function (data, type, row, meta) { 
            if (row['kategoriMesyuarat'] == 'MLRKP')
              return 'BIL. ' + row['bilMesyuaratBil'] + '/' + row['bilMesyuaratTahun']
            else
              return 'KALI KE-' + row['bilMesyuaratNo'] + ' (BIL. ' + row['bilMesyuaratBil'] + '/' + row['bilMesyuaratTahun'] + ')';
          }},
          { mData: 'noRujukanFail'},
          // { mData: 'tarikhMesyuarat'},
          { mData: 'tarikhMesyuarat', mRender: function (data) { 
            moment.locale('ms');
            return moment(data, 'DD/MM/YYYY').format('YYYY-MM-DD');
          }},
          // { mData: 'tarikhPengesahanMinit'},
          { mData: 'tarikhPengesahanMinit', mRender: function (data) { 
            moment.locale('ms');
            return moment(data, 'DD/MM/YYYY').format('YYYY-MM-DD');
          }},
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
          { mData: 'isiDokumen'},
        ]
      });

      self.genTable();

    } catch (e) { throw new Error(); }
  }
  
  this.genTable = function () {
    try {
      const dataDb = [{
        kategoriMesyuarat: "MSJ", 
        tahunMesyuarat: "2023", 
        tarikhMesyuarat: "15/10/2023", 
        tarikhPengesahanMinit: "15/10/2023", 
        bilMesyuarat: "KALI KE-1209 (BIL. 18/2023)",
        bilMesyuaratNo: "1209",
        bilMesyuaratBil: "18",
        bilMesyuaratTahun: "2023",
        noRujukanFail: "SPP.600-3/1/1 Jld.21(4)(S)",
        tajukMinit: "MINIT MESYUARAT SURUHANJAYA PERKHIDMATAN PENDIDIKAN KALI KE-1209 (BIL. 18/2023)",
        jenisDokumen: ["MINIT MESYUARAT"],
        tajukDokumen: ["MINT MESYUARAT SURUHANJAYA PERKHIDMATAN PENDIDIKAN KALI KE-2 BIL 1/2025"],
        isiDokumen: ["p DISAHKAN PADA: 9 MAC 2015 |\nSm L DISAHKAN pAdA S MAc 2 | 672\n-\nSPP(S).220/485/1 Jilid 24 (49)\nMINIT MESYUARAT\nLEMBAGA RAYUAN TATATERTIB PERKHIDMATAN PENDIDIKAN\nKALI KE-672(BIL.4/2015)\nHARI DAN TARIKH : Isnin, 23 Februari 2015\n-\nMASA : 11.05 pagi\nTEMPAT : Bilik Mesyuarat Suruhanjaya\nAras3, Blok B3, Kompleks JPM\nPusat Pentadbiran Kerajaan Persekutuan\nPUTRAJAYA\nHADIR:\n1. YBhg. Datuk Dr. Haili bin Dolhan - Pengerusi\nPengerusi SPP\nx 2. Tuan Haji Abdul Adzis bin Abas\n3. Puan Rahimah binti Mohd Sura\n4. YBhg. Dato' Dr. Soh Chee Seng\n5. YBhg. Dato' Haji Azmi bin Che Mat\n6. YBhg. Dato' Haji Imran bin Idris\n7. YBhg. Dato' Abdul Halim bin Abdul Razak\n8. Encik Awangku Ali bin Pg. Jumaat\n9. Tuan Haji Morazuki bin Hashim\nN 10. YBhg. Dato' Abu Bakar bin Othman - Setiausaha\nTIDAK HADIR DENGAN MAAF\n1. YBhg. Dato' Seri Dr. Abdul Rahman bin Hashim\nTimbalan Pengerusi SPP\n2. Tuan Haji Jamaludin bin Yahaya\n( . , ,\nTuan Haji Osman bin Abd. Aziz\nK\n(\nN 1\nX SULIT\nN\nSULIT DISAHKAN PADA: 9 MAC 2015 MLRTI Kedr2 (BI A0\n| .\n| HADIR BERSAMA- SAMA (URUS SETIA):\n! 1. Encik Mohd Taupik bin Yusof TSU(P)\n2. Puan Maheran binti Abdul Rahman SUB(PM)\n3. Encik Mohd Safrie bin Zakaria SUB(K)\n| 4. Encik Mohd Farid bin Mohd Arif SUB(G)\n| 5, Encik Mohamad Fahmi bin Mohd Latib SUB(BG)\n| 6. Puan Zuliana binti Mohd Akob SUB (D) ,\n7. Puan Zaidayu binti Haron PSU(NT)\n| 8. Puan Nuuraulia binti Md. Isa PSU(U)\n| 9. Puan Maimunah binti Ismail PPT(U)\n| 1. PERUTUSAN PENGERUSI\n| Pengerusi mengalu-alukan semua yang hadir.\n2. PENGESAHAN MINIT MESYUARAT LEMBAGA  RAYUAN\n| TATATERTIB PERKHIDMATAN PENDIDIKAN KALI KE-671 PADA 9 .\n| FEBUARI 2015\n| Minit Mesyuarat Lembaga Rayuan Tatatertib Perkhidmatan Pendidikan\nkali ke-671 pada 9 Februari 2015 disahkan tanpa pindaan.\n3. PERKARA BERBANGKIT DARIPADA MINIT MESYUARAT\nLEMBAGA RAYUAN TATATERTIB PERKHIDMATAN PENDIDIKAN\nKALI KE-671 PADA 9 FEBRUARI 2015\n| Tiada.\n4. PERBINCANGAN KERTAS *\n41 KERTAS BIL. R17/2015: RAYUAN TATATERTIB DARIPADA\nNURASHIKIN BINTI ADNAN PEGAWAI PERKHIDMATAN\nPENDIDIKAN LEPASAN DIPLOMA GRED DGA32 KHAS UNTUK\n| PENYANDANG SEKOLAH KEBANGSAAN BANDAR BARU SENTUL,\n| KUALA LUMPUR\n! H  (SPP(S).60/1/0080676(5)1\n% ' Lembaga menimbangkan kertas dan:\n| , .\nSULIT\n"],
        statusId: 1, 
      },{
        kategoriMesyuarat: "MLRTT", 
        tahunMesyuarat: "2024", 
        tarikhMesyuarat: "06/12/2024", 
        tarikhPengesahanMinit: "06/12/2024", 
        bilMesyuarat: "KALI KE-888 (BIL. 17/2024)",
        bilMesyuaratNo: "888",
        bilMesyuaratBil: "17",
        bilMesyuaratTahun: "2024",
        noRujukanFail: "SPP.600-3/1/9 Jld.10(39)(S)",
        tajukMinit: "MINIT MESYUARAT LEMBAGA RAYUAN TATATERTIB PERKHIDMATAN PENDIDIKAN KALI KE-888 (BIL.17/2024) ",
        // jenisDokumen: "MINT MESYUARAT<br>KERTAS SURUHANJAYA",
        jenisDokumen: ["MINIT MESYUARAT", "KERTAS SURUHANJAYA"],
        tajukDokumen: ["MINT MESYUARAT SURUHANJAYA PERKHIDMATAN PENDIDIKAN KALI KE-2200 BIL 14/2024", "KERTAS SURUHANJAYA LLP"],
        isiDokumen: [''],
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
        isiDokumen: [''],
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