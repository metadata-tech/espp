function ModalPreviewPdf() {
  
  const className = 'ModalPreviewPdf';
  let self = this;
  let classFrom;
  let id;
  let submitType = '';
  
  this.init = function () {

    $('#txtMdbeDokumen').on('change', function () {
      const preview = document.querySelector('embed');
      const file = document.querySelector('input[type=file]').files[0];
      const reader = new FileReader();
      // var filename = file.name;

      if (typeof file == 'object') {
        // console.log(file.type);
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
  };
  
  this.view = function (_id) {
    try {
      mzEmptyParams([_id]);
      id = _id;
      submitType = 'view';
      
      ShowLoader();
      setTimeout(function () {
        $('#h5MpdfTitle').html('<i class="fa-duotone fa-file-pdf mr-2"></i>Paparan Dokumen');
        $('#modalPreviewPdf').modal({backdrop: 'static', keyboard: false}).scrollTop(0);
        HideLoader();
      }, 200);
    } catch (e) {
      toastr['error'](e.message !== '' ? e.message : _ALERT_MSG_ERROR_DEFAULT, _ALERT_TITLE_ERROR);
    }
  };
  
  this.getClassName = function () {
    return className;
  };
  
  this.setClassFrom = function (_classFrom) {
    classFrom = _classFrom;
  };
}