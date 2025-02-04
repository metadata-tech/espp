function ModalPreviewPdf() {
  
  const className = 'ModalPreviewPdf';
  let self = this;
  let classFrom;
  let id;
  let submitType = '';
  
  this.init = function () {
    
  };
  
  this.view = function (_id) {
    try {
      mzEmptyParams([_id]);
      id = _id;
      submitType = 'view';
      
      ShowLoader();
      setTimeout(function () {
        document.getElementById('pdfMpdfPreview').src = 'document/3. MLRTT 672 (Image).pdf';

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