function SectionMpgSalinCalon () {
  
  const className = 'SectionMpgSalinCalon';
  let self = this;
  let submitType = ''; 
  let classFrom;
  let id;
  let dtDisplay;
  // let dtDbm;
  let dtDbm3;
  let modalDokumenBerkaitanEkeps;
  let modalPreviewPdf;

  let formValidate;
  this.getValidationData = function () {
    return [
      {
        field_id: "optSmscKategoriMesyuarat",
        type: "select",
        name: "Kategori Mesyuarat",
        validator: {
          notEmpty: true
        }
      },
      {
        field_id: "txtSmscTajukMesyuarat",
        type: "text",
        name: "Tajuk Mesyuarat",
        validator: {
          notEmpty: true
        }
      },
      {
        field_id: "txtSmscTarikhDari",
        type: "text",
        name: "Tarikh Mesyuarat",
        validator: {
          notEmpty: true,
        }
      },
      {
        field_id: "txtSmscTarikhTutup",
        type: "text",
        name: "Tarikh Mesyuarat",
        validator: {
          notEmpty: true,
        }
      },
      {
        field_id: "txtSmscBilMesyuaratNo",
        type: "text",
        name: "Bilangan Mesyuarat",
        validator: {
          notEmpty: true,
        }
      },
      {
        field_id: "txtSmscBilMesyuaratBil",
        type: "text",
        name: "Bilangan Mesyuarat",
        validator: {
          notEmpty: true,
        }
      },
      {
        field_id: "txtSmscBilMesyuaratTahun",
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
      $('.divSmscSave').show();
      $('.divTab').show();

      ShowLoader();
      setTimeout(function () {

        // self.genTableDbm();
        self.genTableDbm3();

        $('.sectionMain').hide();
        $('.sectionMpgSalinCalon').show();
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
      $('.divSmscSave').show();
      $('.divTab').show();

      ShowLoader();
      setTimeout(function () {
        self.assignValue();

        // self.genTableDbm();
        self.genTableDbm3();

        $('#h4SmscTitle').html('<i class="fa-duotone fa-lg fa-file-pen mr-3"></i>Kemaskini Maklumat eKEPS');
        $('.sectionMain').hide();
        $('.sectionMpgSalinCalon').show();
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
      $('.divSmscSave').show();
      $('.divTab').show();

      ShowLoader();
      setTimeout(function () {

        // self.genTableDbm();
        self.genTableDbm3();


        // $('#h4SmscTitle').html('<i class="fa-duotone fa-lg fa-file mr-3"></i>Paparan Maklumat eKEPS');
        $('.sectionMain').hide();
        $('.sectionMpgSalinCalon').show();
        maScrollTop();
        
        HideLoader();
      }, 200);
    } catch (e) { toastr['error'](e.message !== '' ? e.message : _ALERT_MSG_ERROR_DEFAULT, _ALERT_TITLE_ERROR); }
  };
  
  this.init = function () {    
    console.log('init section');

    formValidate = new MzValidate(false);
    formValidate.registerFields(self.getValidationData());


    $('.btnSmscBack').on('click', function () {
      $('.sectionMain').show();
      $('.sectionMpgSalinCalon').hide();
      maScrollTop();
    });

    $('.btnSmscNext').click(function(e) {
      e.preventDefault();
      $('.nav-pills-custom .active').parent().next('li').find('a').trigger('click');
    });

    $('.btnSmscPrevious').click(function(e) {
      e.preventDefault();
      $('.nav-pills-custom .active').parent().prev('li').find('a').trigger('click');
    });

    $('#btnSmscSave').click(function(e) {
      if (!formValidate.validateNow()) {
        toastr['error'](_ALERT_MSG_VALIDATION, _ALERT_TITLE_VALIDATION_ERROR);
      } else {
        ShowLoader(); setTimeout(function () {
          toastr['success']('Maklumat Pemerolehan berjaya disimpan!');
          classFrom.genTable();
          $('.sectionMain').show();
          $('.sectionMpgSalinCalon').hide();
          HideLoader();
        }, 500);
      }
    });

    $('#btnSmscReset').on('click', function () {
      formValidate.clearValidation();
      if (submitType == 'edit' || submitType == 'view') {
        self.assignValue();
      } else {
        mzSetValue('txtSmscPegawaiNama', 'SITI AISYAH BINTI ABDUL MALIK', 'text');
        mzSetValue('txtSmscPegawaiJawatan', 'PEGAWAI PSU - PENGAMBILAN', 'text');
        mzSetValue('optSmscPegawaiKementerian', '1215', 'text');
      }
    });

    // $('.btnDbmTambah').on('click', function () {
    //   modalDokumenBerkaitanEkeps.add();
    // });
    
    // dtDbm = $('#dtDbm').DataTable({
    //   bLengthChange: false,
    //   bFilter: true,
    //   bPaginate: false,
    //   bInfo: true,
    //   autoWidth: false,
    //   ordering: true,
    //   aaSorting: [[2, 'desc']],
    //   language: _DATATABLE_LANGUAGE,
    //   dom: "<'d-flex'<'p-0'f><'p-0 d-none d-sm-block ml-auto'>>" +
    //   "<'d-flex'<'p-0 flex-fill'tr>>",
    //   columnDefs: [
    //     { className: 'text-center', targets: [0,1,2,3] },
    //     { className: 'text-left', targets: [1] },
    //     { bSortable: false, targets: [0,1,2,3] },
    //     { visible: false, targets: [] },
    //     { className: 'noVis', targets: [0,1] },
    //   ],
    //   fnRowCallback : function(nRow, aData, iDisplayIndex){
    //     const info = $(this).DataTable().page.info();
    //     let no = info.start + (iDisplayIndex + 1);
    //     $('td', nRow).eq(0).html(no);
    //   },
    //   drawCallback: function () {
    //     $('[data-toggle="tooltip"]').tooltip();
    //     $('.lnkDbmView').off('click').on('click', function () {
    //       modalDokumenBerkaitanEkeps.view(123);
    //     });
    //     $('.lnkDbmEdit').off('click').on('click', function () {
    //       modalDokumenBerkaitanEkeps.edit(123);
    //     });
    //     $('.lnkDbmRemove').off('click').on('click', function () {
    //       modalConfirmDelete.delete(123, modalDokumenBerkaitanEkeps);
    //     });
    //     $('.lnkDbmPdf').off('click').on('click', function () {
    //       modalPreviewPdf.view(123);
    //     });
    //   },
    //   aoColumns: [
    //     { mData: null},
    //     { mData: 'tajukDokumen'},
    //     { mData: 'jenisDokumen'},
    //     { mData: null, mRender: function (data, type, row, meta) {
    //         return '<div class="form-check p-0 m-0" style="margin-top: -6px !important; margin-bottom: -6px !important;">' +
    //             '<input type="checkbox" class="form-check-input check chkKotak" name="chkKotak[]" id="chkKotak' + meta.row + '" value="' + meta.row + '">' +
    //             '<label class="form-check-label" for="chkKotak' + meta.row + '"></label>' +
    //             '</div>';
    //           }},
    //   ]
    // });

    

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
        { className: 'text-center', targets: [0,1,2] },
        { className: 'text-left', targets: [1] },
        { bSortable: false, targets: [0,1] },
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
        { mData: 'noKadPengenalan'},
        { mData: 'nama'},
      ]
    });

};

  this.assignValue = function () {
    const kategoriMesyuarat = 'MSJ';
    mzSetValue('optSmscKategoriMesyuarat', 'MSJ', 'select');
    if (kategoriMesyuarat == 'MSJ') {
      maDisableInput('txtSmscBilMesyuaratNo', false);
      formValidate.enableField('txtSmscBilMesyuaratNo');
    }
    else if (kategoriMesyuarat == 'MLRTT') {
      maDisableInput('txtSmscBilMesyuaratNo', false);
      formValidate.enableField('txtSmscBilMesyuaratNo');
    }
    else if (kategoriMesyuarat == 'MLRKP') {
      maDisableInput('txtSmscBilMesyuaratNo', true);
      formValidate.disableField('txtSmscBilMesyuaratNo');
    } else {
      maDisableInput('txtSmscBilMesyuaratNo', false);
      formValidate.enableField('txtSmscBilMesyuaratNo');
    }
    mzSetValue('txtSmscTarikhMesyuarat', '20/12/2023', 'text');
    mzSetValue('txtSmscTarikhPengesahanMinit', '20/12/2023', 'text');
    mzSetValue('txtSmscBilMesyuaratNo', '1209', 'text');
    mzSetValue('txtSmscBilMesyuaratBil', '18', 'text');
    mzSetValue('txtSmscBilMesyuaratTahun', '2023', 'text');
    mzSetValue('txtSmscNoRujukanFail', 'SPP.600-3/1/1 Jld.21(4)(S)', 'text');
    mzSetValue('txtSmscTajukMesyuarat', 'MESYUARAT SURUHANJAYA PERKHIDMATAN PENDIDIKAN KALI KE-1209 (BIL. 18/2023)', 'text');
  };
  
  // this.genTableDbm = function () {
  //   try {
  //       const dataDbm = [{
  //         tajukDokumen: '001', 
  //         jenisDokumen: 'MINIT MESYUARAT', 
  //         noRujukanFail: 'SPP.600-3/1/1 Jld.18(4)(S)', 
  //         isiDokumen: []
  //       },{
  //         tajukDokumen: '002', 
  //         jenisDokumen: 'KERTAS SURUHANJAYA', 
  //         noRujukanFail: 'SPP.600-3/1/1 Jld.11(4)(S)', 
  //         isiDokumen: []
  //       }];
  //       dtDbm.clear().rows.add(dataDbm).draw();
  //   } catch (e) { toastr['error'](_ALERT_MSG_ERROR_DEFAULT, _ALERT_TITLE_ERROR); }
  // };
  

  this.genTableDbm3 = function () {
    try {
        const dataDbm = [{
          noKadPengenalan: '010110010110', 
          nama: 'AMMAR', 
        },{
          noKadPengenalan: '02020202020', 
          nama: 'AMIRUL', 
        }];
        dtDbm3.clear().rows.add(dataDbm).draw();
    } catch (e) { toastr['error'](_ALERT_MSG_ERROR_DEFAULT, _ALERT_TITLE_ERROR); }
  };

  this.setOptionNegeri = function (_refNegeri) {
    try {
      mzOptionStop('optSmscAlTkNegeri', _refNegeri, 'display');
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

