function SectionMpgMaklumatPemerolehan () {
  
  const className = 'SectionMpgMaklumatPemerolehan';
  let self = this;
  let submitType = ''; 
  let classFrom;
  let id;
  let dtDisplay;
  let dtDbm;
  let dtDbm2;
  let dtDbm3;
  let dtDbm4;
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
        field_id: "txtLtPnnoPemerolehan2",
        type: "text",
        name: "No. Pemerolehan",
        validator: {
          notEmpty: true
        }
      },
      {
        field_id: "txtSmeTajukMesyuarat",
        type: "text",
        name: "Tajuk Mesyuarat",
        validator: {
          notEmpty: true
        }
      },
      {
        field_id: "txtSmeTarikhDari",
        type: "text",
        name: "Tarikh Mesyuarat",
        validator: {
          notEmpty: true,
        }
      },
      {
        field_id: "txtSmeTarikhTutup",
        type: "text",
        name: "Tarikh Mesyuarat",
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
    ];
  };

  this.add = function () {
    try {
      submitType = 'add';
      id = 123;
  
      formValidate.clearValidation();
      $('.divSmeSave').show();
      $('.divTab').show();

      ShowLoader();
      setTimeout(function () {

        self.genTableDbm();
        self.genTableDbm2();
        self.genTableDbm3();
        self.genTableDbm4();




        // $('#h4SmeTitle').html('<i class="fa-duotone fa-lg fa-file-circle-plus mr-3"></i>Daftar Maklumat eKEPS');
        $('.sectionMain').hide();
        $('.sectionMpgMaklumatPemerolehan').show();
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
        self.genTableDbm2();
        self.genTableDbm3();
        self.genTableDbm4();



        $('#h4SmeTitle').html('<i class="fa-duotone fa-lg fa-file-pen mr-3"></i>Kemaskini Maklumat eKEPS');
        $('.sectionMain').hide();
        $('.sectionMpgMaklumatPemerolehan').show();
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
      $('.divSmeSave').show();
      $('.divTab').show();

      ShowLoader();
      setTimeout(function () {

        self.genTableDbm();
        self.genTableDbm2();


        // $('#h4SmeTitle').html('<i class="fa-duotone fa-lg fa-file mr-3"></i>Paparan Maklumat eKEPS');
        $('.sectionMain').hide();
        $('.sectionMpgMaklumatPemerolehan').show();
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
      if ($('#txtSmeTajukMesyuarat').val().length == 0 || ($('#txtSmeTajukMesyuarat').val() == 'MINIT MESYUARAT SURUHANJAYA PERKHIDMATAN PENDIDIKAN' || $('#txtSmeTajukMesyuarat').val() == 'MINIT MESYUARAT LEMBAGA RAYUAN TATATERTIB PERKHIDMATAN PENDIDIKAN' || $('#txtSmeTajukMesyuarat').val() == 'MINIT MESYUARAT LEMBAGA RAYUAN KENAIKAN PANGKAT PERKHIDMATAN PENDIDIKAN')) {
        if (this.value == 'MSJ') {
          formValidate.clearValidation('txtSmeTajukMesyuarat');
          mzSetValue('txtSmeTajukMesyuarat', 'MINIT MESYUARAT SURUHANJAYA PERKHIDMATAN PENDIDIKAN', 'text');
          maDisableClear('txtSmeBilMesyuaratNo', false);
        }
        else if (this.value == 'MLRTT') {
          formValidate.clearValidation('txtSmeTajukMesyuarat');
          mzSetValue('txtSmeTajukMesyuarat', 'MINIT MESYUARAT LEMBAGA RAYUAN TATATERTIB PERKHIDMATAN PENDIDIKAN', 'text');
          maDisableClear('txtSmeBilMesyuaratNo', false);
        }
        else if (this.value == 'MLRKP') {
          formValidate.clearValidation('txtSmeTajukMesyuarat');
          mzSetValue('txtSmeTajukMesyuarat', 'MINIT MESYUARAT LEMBAGA RAYUAN KENAIKAN PANGKAT PERKHIDMATAN PENDIDIKAN', 'text');
          maDisableClear('txtSmeBilMesyuaratNo', true);
        } else {
          mzSetValue('txtSmeTajukMesyuarat', '', 'text');
        }
      }
    }); */
      
    // $('#optSmeKategoriMesyuarat').on('change', function () {
    //   if (this.value == 'MSJ') {
    //     formValidate.clearValidation('txtSmeTajukMesyuarat');
    //     mzSetValue('txtSmeTajukMesyuarat', 'MESYUARAT SURUHANJAYA PERKHIDMATAN PENDIDIKAN', 'text');
    //     maDisableClear('txtSmeBilMesyuaratNo', false);
    //     formValidate.enableField('txtSmeBilMesyuaratNo');
    //   }
    //   else if (this.value == 'MLRTT') {
    //     formValidate.clearValidation('txtSmeTajukMesyuarat');
    //     mzSetValue('txtSmeTajukMesyuarat', 'MESYUARAT LEMBAGA RAYUAN TATATERTIB PERKHIDMATAN PENDIDIKAN', 'text');
    //     maDisableClear('txtSmeBilMesyuaratNo', false);
    //     formValidate.enableField('txtSmeBilMesyuaratNo');
    //   }
    //   else if (this.value == 'MLRKP') {
    //     formValidate.clearValidation('txtSmeTajukMesyuarat');
    //     mzSetValue('txtSmeTajukMesyuarat', 'MESYUARAT LEMBAGA RAYUAN KENAIKAN PANGKAT PERKHIDMATAN PENDIDIKAN', 'text');
    //     maDisableClear('txtSmeBilMesyuaratNo', true);
    //     formValidate.disableField('txtSmeBilMesyuaratNo');
    //   } else {
    //     mzSetValue('txtSmeTajukMesyuarat', '', 'text');
    //   }
    // });
      
    // $('#txtSmeTarikhMesyuarat').on('change', function () {
    //   if (this.value.substring(6).length > 0) {
    //     mzSetValue('txtSmeBilMesyuaratTahun', this.value.substring(6), 'text');
    //   } else {
    //     mzSetValue('txtSmeBilMesyuaratTahun', '', 'text');
    //   }
    // });

    $('.btnSmeBack').on('click', function () {
      $('.sectionMain').show();
      $('.sectionMpgMaklumatPemerolehan').hide();
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
          toastr['success']('Maklumat Pemerolehan berjaya disimpan!');
          classFrom.genTable();
          $('.divTab').show();
          ('.sectionMpgMaklumatPemerolehan').hide();
          ('.sectionMain').show();
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

    $('.btnDbmTambah').on('click', function () {
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
        { className: 'text-center', targets: [0,1,2,3] },
        { className: 'text-left', targets: [1] },
        { bSortable: false, targets: [0,1,2,3] },
        { visible: false, targets: [] },
        { className: 'noVis', targets: [0,1] },
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
        { mData: null, mRender: function (data, type, row, meta) {
            return '<div class="form-check p-0 m-0" style="margin-top: -6px !important; margin-bottom: -6px !important;">' +
                '<input type="checkbox" class="form-check-input check chkKotak" name="chkKotak[]" id="chkKotak' + meta.row + '" value="' + meta.row + '">' +
                '<label class="form-check-label" for="chkKotak' + meta.row + '"></label>' +
                '</div>';
              }},
      ]
    });

    dtDbm2 = $('#dtDbm2').DataTable({
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
        { className: 'text-center', targets: [0,1,2,3] },
        { className: 'text-left', targets: [1] },
        { bSortable: false, targets: [0,1,2,3] },
        { visible: false, targets: [] },
        { className: 'noVis', targets: [0,1] },
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
        { mData: null, mRender: function (data, type, row, meta) {
            return '<div class="form-check p-0 m-0" style="margin-top: -6px !important; margin-bottom: -6px !important;">' +
                '<input type="checkbox" class="form-check-input check chkKotak" name="chkKotak[]" id="chkKotak' + meta.row + '" value="' + meta.row + '">' +
                '<label class="form-check-label" for="chkKotak' + meta.row + '"></label>' +
                '</div>';
              }},
      ]
    });

    dtDbm3 = $('#dtDbm3').DataTable({
      bLengthChange: false,
      bFilter: false,
      bPaginate: false,
      bInfo: true,
      autoWidth: false,
      ordering: true,
      aaSorting: [[2, 'desc']],
      language: _DATATABLE_LANGUAGE,
      dom: "<'d-flex'<'p-0'f><'p-0 d-none d-sm-block ml-auto'>>" +
      "<'d-flex'<'p-0 flex-fill'tr>>",
      columnDefs: [
        { className: 'text-center', targets: [0,1,2,3] },
        { className: 'text-left', targets: [1] },
        { bSortable: false, targets: [0,1,2,3] },
        { visible: false, targets: [] },
        { className: 'noVis', targets: [0,1] },
      ],
      fnRowCallback : function(nRow, aData, iDisplayIndex){
        const info = $(this).DataTable().page.info();
        let no = info.start + (iDisplayIndex + 1);
        $('td', nRow).eq(0).html(no);
      },
      drawCallback: function () {
        $('[data-toggle="tooltip"]').tooltip();
        $('.lnkDbmRemove').off('click').on('click', function () {
          modalConfirmDelete.delete(123, modalDokumenBerkaitanEkeps);
        });
      },
      aoColumns: [
        { mData: null},
        { mData: 'tajukDokumen'},
        { mData: 'jenisDokumen'},
        { mData: null, mRender: function (data, type, row, meta) { 
          return dtDisplay.getActionMpgMaklumatPemerolehan(submitType, 'lnkDbm', meta.row, 1); 
        }},
      ]
    });
  

  dtDbm4 = $('#dtDbm4').DataTable({
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
      { className: 'text-center', targets: [0,1,2,3,4,5,6] },
      { className: 'text-left', targets: [1] },
      { bSortable: false, targets: [0,1,2,6] },
      { visible: false, targets: [] },
      { className: 'noVis', targets: [0,1] },
    ],
    fnRowCallback : function(nRow, aData, iDisplayIndex){
      const info = $(this).DataTable().page.info();
      let no = info.start + (iDisplayIndex + 1);
      $('td', nRow).eq(0).html(no);
    },
    drawCallback: function () {
      $('[data-toggle="tooltip"]').tooltip();
      $('.lnkDbmRemove').off('click').on('click', function () {
        modalConfirmDelete.delete(123, modalDokumenBerkaitanEkeps);
      });
    },
    aoColumns: [
      { mData: null},
      { mData: 'tahun'},
      { mData: 'kementerian'},
      { mData: 'skim'},
      { mData: 'bilKekosonganDipohon'},
      { mData: 'tarikhPohon'},
      { mData: null, mRender: function (data, type, row, meta) {
        return '<div class="form-check p-0 m-0" style="margin-top: -6px !important; margin-bottom: -6px !important;">' +
            '<input type="checkbox" class="form-check-input check chkKotak" name="chkKotak[]" id="chkKotak' + meta.row + '" value="' + meta.row + '">' +
            '<label class="form-check-label" for="chkKotak' + meta.row + '"></label>' +
            '</div>';
          }},
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
    mzSetValue('txtSmeTajukMesyuarat', 'MESYUARAT SURUHANJAYA PERKHIDMATAN PENDIDIKAN KALI KE-1209 (BIL. 18/2023)', 'text');
  };
  
  this.genTableDbm = function () {
    try {
        const dataDbm = [{
          tajukDokumen: '001', 
          jenisDokumen: 'MINIT MESYUARAT', 
          noRujukanFail: 'SPP.600-3/1/1 Jld.18(4)(S)', 
          isiDokumen: []
        },{
          tajukDokumen: '002', 
          jenisDokumen: 'KERTAS SURUHANJAYA', 
          noRujukanFail: 'SPP.600-3/1/1 Jld.11(4)(S)', 
          isiDokumen: []
        }];
        dtDbm.clear().rows.add(dataDbm).draw();
    } catch (e) { toastr['error'](_ALERT_MSG_ERROR_DEFAULT, _ALERT_TITLE_ERROR); }
  };
  
  this.genTableDbm2 = function () {
    try {
        const dataDbm = [{
          tajukDokumen: '101', 
          jenisDokumen: 'MINIT MESYUARAT', 
          noRujukanFail: 'SPP.600-3/1/1 Jld.18(4)(S)', 
          isiDokumen: []
        },{
          tajukDokumen: '102', 
          jenisDokumen: 'KERTAS SURUHANJAYA', 
          noRujukanFail: 'SPP.600-3/1/1 Jld.11(4)(S)', 
          isiDokumen: []
        }];
        dtDbm2.clear().rows.add(dataDbm).draw();
    } catch (e) { toastr['error'](_ALERT_MSG_ERROR_DEFAULT, _ALERT_TITLE_ERROR); }
  };


  this.genTableDbm3 = function () {
    try {
        const dataDbm = [{
          tajukDokumen: '101', 
          jenisDokumen: 'MINIT MESYUARAT', 
          noRujukanFail: 'SPP.600-3/1/1 Jld.18(4)(S)', 
        },{
          tajukDokumen: '102', 
          jenisDokumen: 'KERTAS SURUHANJAYA', 
          noRujukanFail: 'SPP.600-3/1/1 Jld.11(4)(S)', 
        }];
        dtDbm3.clear().rows.add(dataDbm).draw();
    } catch (e) { toastr['error'](_ALERT_MSG_ERROR_DEFAULT, _ALERT_TITLE_ERROR); }
  };

  this.genTableDbm4 = function () {
    try {
        const dataDbm = [{
          tahun: '2025', 
          kementerian: '121-KEMENTERIAN PENDIDIKAN MALAYSIA', 
          skim: '1188-PEGAWAI PERKHIDMATAN PENDIDIKAN SISWAZAH GRED DG41', 
          bilKekosonganDipohon: '888', 
          tarikhPohon: '01/10/2025', 
        },{
          tahun: '2025', 
          kementerian: '121-KEMENTERIAN PENDIDIKAN MALAYSIA', 
          skim: '1188-PEGAWAI PERKHIDMATAN PENDIDIKAN SISWAZAH GRED DG41', 
          bilKekosonganDipohon: '222', 
          tarikhPohon: '01/10/2025', 
        },{
          tahun: '2025', 
          kementerian: '121-KEMENTERIAN PENDIDIKAN MALAYSIA', 
          skim: '1188-PEGAWAI PERKHIDMATAN PENDIDIKAN SISWAZAH GRED DG41', 
          bilKekosonganDipohon: '999', 
          tarikhPohon: '01/10/2025', 
        }];
        dtDbm4.clear().rows.add(dataDbm).draw();
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

