function SectionMaklumat () {
  
  const className = 'SectionMaklumat';
  let self = this;
  let submitType = ''; 
  let classFrom;
  let anggotaId;
  let dtDisplay;
  let dtSmAk;

  this.add = function () {
    try {
      submitType = 'add';
      console.log(submitType);

      ShowLoader();
      setTimeout(function () {
        self.genTableAk();

        $('#h4SmTitle').html('<i class="fa-duotone fa-lg fa-file-circle-plus mr-3"></i>Daftar Maklumat PGSPP');
        $('.sectionMain').hide();
        $('.sectionMaklumat').show();
        maScrollTop();
        
        HideLoader();
      }, 200);
    } catch (e) { toastr['error'](e.message !== '' ? e.message : _ALERT_MSG_ERROR_DEFAULT, _ALERT_TITLE_ERROR); }
  };

  this.edit = function (_anggotaId) {
    try {
      mzEmptyParams([_anggotaId]);
      anggotaId = _anggotaId;
      submitType = 'edit';
      console.log(submitType);

      ShowLoader();
      setTimeout(function () {
        self.genTableAk();

        $('#h4SmTitle').html('<i class="fa-duotone fa-lg fa-file-pen mr-3"></i>Kemaskini Maklumat PGSPP');
        $('.sectionMain').hide();
        $('.sectionMaklumat').show();
        maScrollTop();
        
        HideLoader();
      }, 200);
    } catch (e) { toastr['error'](e.message !== '' ? e.message : _ALERT_MSG_ERROR_DEFAULT, _ALERT_TITLE_ERROR); }
  };

  this.view = function (_anggotaId) {
    try {
      mzEmptyParams([_anggotaId]);
      anggotaId = _anggotaId;
      submitType = 'view';

      ShowLoader();
      setTimeout(function () {

        $('.sectionMain').hide();
        $('.sectionMaklumat').show();
        maScrollTop();
        
        HideLoader();
      }, 200);
    } catch (e) { toastr['error'](e.message !== '' ? e.message : _ALERT_MSG_ERROR_DEFAULT, _ALERT_TITLE_ERROR); }
  };
  
  this.init = function () {    
    console.log('init section');

    $('.btnSmBack').on('click', function () {
      $('.sectionMain').show();
      $('.sectionMaklumat').hide();
      maScrollTop();
    });

    $('.btnSmNext').click(function(e) {
      e.preventDefault();
      $('.nav-pills-custom .active').parent().next('li').find('a').trigger('click');
    });

    $('.btnSmPrevious').click(function(e) {
      e.preventDefault();
      $('.nav-pills-custom .active').parent().prev('li').find('a').trigger('click');
    });
    
    dtSmAk = $('#dtSmAk').DataTable({
      bLengthChange: false,
      bFilter: true,
      bPaginate: false,
      bInfo: true,
      autoWidth: false,
      ordering: false,
      language: _DATATABLE_LANGUAGE,
      dom: "<'d-flex'<'p-0 flex-fill'tr>>",
      columnDefs: [
        { className: 'text-center', targets: [0,1,2,3,4,5] },
      ],
      fnRowCallback : function(nRow, aData, iDisplayIndex){
        const info = $(this).DataTable().page.info();
        let no = info.start + (iDisplayIndex + 1);
        $('td', nRow).eq(0).html(no);
      },
      drawCallback: function () {
        $('[data-toggle="tooltip"]').tooltip();
        $('.lnkSmAkView').off('click').on('click', function () {
          
        });
        $('.lnkSmAkEdit').off('click').on('click', function () {
          
        });
        $('.lnkSmAkRemove').off('click').on('click', function () {
          
        });
      },
      aoColumns: [
        { mData: null},
        { mData: 'namaPenuh'},
        { mData: 'tarikhLahir'},
        { mData: 'hubungan'},
        { mData: 'pekerjaan'},
        { mData: null, mRender: function (data, type, row, meta) { return dtDisplay.getActionA(submitType, 'lnkSmAk', meta.row, 1); }},
      ]
    });
  };
  
  this.genTableAk = function () {
    try {
      const dataDb = [{
        namaPenuh: 'MOHD AZAM BIN ABD HAMI', 
        hubungan: "ANAK LELAKI", 
        pekerjaan: "TIDAK BEKERJA", 
        tarikhLahir:"20/05/2005", 
        statusId: 1, 
      }];
      dtSmAk.clear().rows.add(dataDb).draw();
    } catch (e) { toastr['error'](_ALERT_MSG_ERROR_DEFAULT, _ALERT_TITLE_ERROR); }
  };
  
  this.setOptionNegeri = function (_refNegeri) {
    try {
      mzOptionStop('optSmAlTkNegeri', _refNegeri, 'display');
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
  
  this.setModalKklPlb = function (_modalKklPlb) {
    modalKklPlb = _modalKklPlb;
  };

  this.setRefNegeri = function (_refNegeri) {
    refNegeri = _refNegeri;
  };
}

