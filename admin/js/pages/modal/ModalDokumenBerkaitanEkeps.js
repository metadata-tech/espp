function ModalDokumenBerkaitanEkeps() {
  
  const className = 'ModalDokumenBerkaitanEkeps';
  let self = this;
  let classFrom;
  let id;
  let submitType = '';

  let formValidateMdbe;
  this.getValidationDataMdbe = function () {
    return [
      {
        field_id: "optMdbeJenisDokumen",
        type: "select",
        name: "Jenis Dokumen",
        validator: {
          notEmpty: true
        }
      },
      {
        field_id: "optMdbeKategoriMesyuarat",
        type: "select",
        name: "Kategori Mesyuarat",
        validator: {
          notEmpty: true
        }
      },
      {
        field_id: "txtMdbeTajukDokumen",
        type: "text",
        name: "Tajuk Dokumen",
        validator: {
          notEmpty: true
        }
      },
      {
        field_id: "txtMdbeBilMesyuaratNo",
        type: "text",
        name: "Bilangan Mesyuarat",
        validator: {
          notEmpty: true
        }
      },
      {
        field_id: "txtMdbeBilMesyuaratBil",
        type: "text",
        name: "Bilangan Mesyuarat",
        validator: {
          notEmpty: true
        }
      },
      {
        field_id: "txtMdbeBilMesyuaratTahun",
        type: "text",
        name: "Bilangan Mesyuarat",
        validator: {
          notEmpty: true
        }
      },
      {
        field_id: "optMdbeMasaJam",
        type: "select",
        name: "Masa",
        validator: {
          notEmpty: true
        }
      },
      {
        field_id: "optMdbeMasaMinit",
        type: "select",
        name: "Minit",
        validator: {
          notEmpty: true
        }
      },
      {
        field_id: "optMdbeMasaMeridiem",
        type: "select",
        name: "Meridiem",
        validator: {
          notEmpty: true
        }
      },
      {
        field_id: "txtMdbeTempat",
        type: "text",
        name: "Tempat",
        validator: {
          notEmpty: true
        }
      },
      {
        field_id: "txtMdbeNoRujukanFail",
        type: "text",
        name: "No. Rujukan Fail",
        validator: {
          notEmpty: true
        }
      },
      {
        field_id: "txtMdbeTarikhMesyuarat",
        type: "text",
        name: "Tarikh Mesyuarat",
        validator: {
          notEmpty: true
        }
      },
      {
        field_id: "txtMdbeDokumen",
        type: "file",
        name: "Dokumen Berkaitan",
        validator: {
          // notEmptyFile: true,
          pdfType: true
        }
      },
      {
        field_id: "txtMdbeFile",
        type: "text",
        name: "Dokumen",
        validator: {
          notEmpty: true
        }
      },
      {
        field_id: "txtMdbeIsiDokumen",
        type: "text",
        name: "Teks PDF",
        validator: {
          notEmpty: true,
          notEqual: 'Sila tunggu...'
        }
      },
    ];
  };
  
  this.init = function () {
    formValidateMdbe = new MzValidate(false);
    formValidateMdbe.registerFields(self.getValidationDataMdbe());
    
    $('#btnMdbeClose').on('click', function () {
      console.log('close');
      // $('#modalDokumenBerkaitanEkeps').modal('hide');
      // worker.terminate();
    });

    $('#txtMdbeDokumen').on('change', function () {
      const preview = document.getElementById('pdfMdbePreview');
      const file = document.getElementById('txtMdbeDokumen').files[0];
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

    const readFile = (file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.addEventListener("loadend", (event) =>
          resolve(new Uint8Array(event.target.result))
        );
        reader.readAsArrayBuffer(file);
      });
    };

    const convertToImage = async (pdf) => {
      const images = [];
      for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
        const page = await pdf.getPage(pageNumber);
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = document.createElement("canvas");
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        await page.render({
          canvasContext: canvas.getContext("2d"),
          viewport: viewport,
        }).promise;
        images.push(canvas.toDataURL("image/png"));
      }
      return images;
    };

    const convertToText = async (images) => {
      const worker = await Tesseract.createWorker();
      await worker.loadLanguage(language);
      await worker.initialize(language);
      let textToPdf = "";
      mzSetValue('txtMdbeIsiDokumen', 'Sila tunggu...', 'textarea');

      for (const image of images) {
        const {
          data: { text },
        } = await worker.recognize(image);
        textToPdf += text;
        console.log(text);
      }
      mzSetValue('txtMdbeIsiDokumen', textToPdf, 'textarea');

      await worker.terminate();
    };

    const loadFile = async (file) =>
      pdfjsLib.getDocument({ data: file }).promise;

    const convertFile = async (file) => {
      ShowLoader();
      const pdf = await loadFile(file);
      const images = await convertToImage(pdf);
      await convertToText(images);
      HideLoader();
    };

    const showError = (error) => {
      mzSetValue('txtMdbeIsiDokumen', null, 'textarea');
      $('#isiDokumenErr').html(document.createTextNode(`Error: ${error.message}`));
      // document.getElementById("txtMdbeIsiDokumenErr").appendChild(document.createTextNode(`Error: ${error.message}`));
    };

    const clearResults = () => {
      mzSetValue('txtMdbeIsiDokumen', null, 'textarea');
      $('#isiDokumenErr').html('');
    };

    const fileInput = document.getElementById("txtMdbeDokumen");
    fileInput.addEventListener("change", async () => {
      clearResults();
      mzSetValue('txtMdbeIsiDokumen', 'Sila tunggu...', 'textarea');
      try {
        await convertFile(await readFile(fileInput.files[0]));
      } catch (error) {
        HideLoader();
        showError(error);
      }
    });
      
    $('#optMdbeKategoriMesyuarat').on('change', function () {
      if (this.value == 'MSJ') {
        formValidateMdbe.clearValidation('txtMdbeTajukMinit');
        maDisableClear('txtMdbeBilMesyuaratNo', false);
        formValidateMdbe.enableField('txtMdbeBilMesyuaratNo');
      }
      else if (this.value == 'MLRTT') {
        formValidateMdbe.clearValidation('txtMdbeTajukMinit');
        maDisableClear('txtMdbeBilMesyuaratNo', false);
        formValidateMdbe.enableField('txtMdbeBilMesyuaratNo');
      }
      else if (this.value == 'MLRKP') {
        formValidateMdbe.clearValidation('txtMdbeTajukMinit');
        maDisableClear('txtMdbeBilMesyuaratNo', true);
        formValidateMdbe.disableField('txtMdbeBilMesyuaratNo');
      } else {
        formValidateMdbe.enableField('txtMdbeBilMesyuaratNo');
      }
    });
      
    $('#txtMdbeTarikhMesyuarat').on('change', function () {
      if (this.value.substring(6).length > 0) {
        mzSetValue('txtMdbeBilMesyuaratTahun', this.value.substring(6), 'text');
      } else {
        mzSetValue('txtMdbeBilMesyuaratTahun', '', 'text');
      }
    });

    $('#btnMdbeSave').on('click', function () {
      if (!formValidateMdbe.validateNow()) {
        toastr['error'](_ALERT_MSG_VALIDATION, _ALERT_TITLE_VALIDATION_ERROR);
      } else {
        if (submitType == 'edit') {
          ShowLoader(); setTimeout(function () {
            toastr['success']('Maklumat berjaya dikemaskini!');
            $('#modalDokumenBerkaitanEkeps').modal('hide');
            HideLoader();
          }, 200);
        } else if (submitType == 'add') {
          ShowLoader(); setTimeout(function () {
            toastr['success']('Maklumat berjaya ditambah!');
            $('#modalDokumenBerkaitanEkeps').modal('hide');
            HideLoader();
          }, 200);
        }
      }
    });
  };
  
  this.add = function () {
    try {
      submitType = 'add';

      formValidateMdbe.clearValidation();
      document.getElementById('pdfMdbePreview').src = '';

      ShowLoader();
      setTimeout(function () {
        $('#h5MdbeTitle').html('<i class="fa-duotone fa-circle-plus mr-2"></i>Dokumen Berkaitan');
        $('#modalDokumenBerkaitanEkeps').modal({backdrop: 'static', keyboard: false}).scrollTop(0);
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

      formValidateMdbe.clearValidation();
      document.getElementById('pdfMdbePreview').src = '';
      
      ShowLoader();
      setTimeout(function () {
        self.assignValue();

        $('#h5MdbeTitle').html('<i class="fa-duotone fa-pen-to-square mr-2"></i>Dokumen Berkaitan');
        $('#modalDokumenBerkaitanEkeps').modal({backdrop: 'static', keyboard: false}).scrollTop(0);
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

      formValidateMdbe.clearValidation();
      document.getElementById('pdfMdbePreview').src = '';
      
      ShowLoader();
      setTimeout(function () {
        self.assignValue();

        $('#h5MdbeTitle').html('Dokumen Berkaitan');
        $('#modalDokumenBerkaitanEkeps').modal({backdrop: 'static', keyboard: false}).scrollTop(0);
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
    mzSetValue('optMdbeJenisDokumen', 3, 'select');
    const kategoriMesyuarat = 'MSJ';
    mzSetValue('optMdbeKategoriMesyuarat', 'MSJ', 'select');
    if (kategoriMesyuarat == 'MSJ') {
      maDisableInput('txtMdbeBilMesyuaratNo', false);
      formValidateMdbe.enableField('txtMdbeBilMesyuaratNo');
    }
    else if (kategoriMesyuarat == 'MLRTT') {
      maDisableInput('txtMdbeBilMesyuaratNo', false);
      formValidateMdbe.enableField('txtMdbeBilMesyuaratNo');
    }
    else if (kategoriMesyuarat == 'MLRKP') {
      maDisableInput('txtMdbeBilMesyuaratNo', true);
      formValidateMdbe.disableField('txtMdbeBilMesyuaratNo');
    } else {
      formValidateMdbe.enableField('txtMdbeBilMesyuaratNo');
    }
    mzSetValue('txtMdbeTarikhMesyuarat', '20/12/2023', 'text');
    mzSetValue('txtMdbeBilMesyuaratNo', '1209', 'text');
    mzSetValue('txtMdbeBilMesyuaratBil', '18', 'text');
    mzSetValue('txtMdbeBilMesyuaratTahun', '2023', 'text');
    mzSetValue('optMdbeMasaJam', 10, 'select');
    mzSetValue('optMdbeMasaMinit', 30, 'select');
    mzSetValue('optMdbeMasaMeridiem', 'AM', 'select');
    mzSetValue('txtMdbeTempat', 'SURUHANJAYA PERKHIDMATAN PENDIDIKAN', 'text');
    mzSetValue('txtMdbeNoRujukanFail', 'SPP.600-3/1/1 Jld.21(4)(S)', 'text');
    mzSetValue('txtMdbeTajukDokumen', 'KERTAS BIL. KM13/2024: PEMAKLUMAN PERINTAH TAHAN KERJA YANG TERHENTI TERHADAP NAMA PEGAWAI, PEGAWAI PENDIDIKAN PENGAJIAN TINGGI (PPPT) GRED DH54, POLITEKNIK NILAI, NEGERI SEMBILAN [NOMBOR FAIL]', 'textarea');
    mzSetValue('txtMdbeFile', '3. MLRTT 672 (Image).pdf', 'text');
    document.getElementById('pdfMdbePreview').src = 'document/3. MLRTT 672 (Image).pdf';

    var isiDokumen = 'SULIT DISAHKAN PADA: 9 MAC 2015 6 72\nN SPP(S).220/485/1 Jilid 24 (49)\nMINIT MESYUARAT\nLEMBAGA RAYUAN TATATERTIB PERKHIDMATAN PENDIDIKAN\nKALI KE-672(BIL.4/2015)\nNA ! I\nHARI DAN TARIKH : Isnin, 23 Februari 2015\nMASA : 11.05 pagi\nTEMPAT : Bilik Mesyuarat Suruhanjaya\nAras3, Blok B3, Kompleks JPM\nPusat Pentadbiran Kerajaan Persekutuan\nPUTRAJAYA\nHADIR:\n1. YBhg. Datuk Dr. Haili bin Dolhan - Pengerusi\nPengerusi SPP\nx 2. Tuan Haji Abdul Adzis bin Abas\n3. Puan Rahimah binti Mohd Sura\n4. YBhg. Dato Dr. Soh Chee Seng\n5. YBhg. Dato Haji Azmi bin Che Mat\n6. YBhg. Dato Haji Imran bin Idris\n7. YBhg. Dato Abdul Halim bin Abdul Razak\n8. Encik Awangku Ali bin Pg. Jumaat\n9. Tuan Haji Morazuki bin Hashim\nN 10. YBhg. Dato Abu Bakar bin Othman - Setiausaha\nTIDAK HADIR DENGAN MAAF\n1. YBhg. Dato Seri Dr. Abdul Rahman bin Hashim\nTimbalan Pengerusi SPP\n2. Tuan Haji Jamaludin bin Yahaya\n% Tuan Haji Osman bin Abd. Aziz\nN 1\nN SULIT\n';
    mzSetValue('txtMdbeIsiDokumen', isiDokumen, 'textarea');
  };
  
  this.getClassName = function () {
    return className;
  };
  
  this.setClassFrom = function (_classFrom) {
    classFrom = _classFrom;
  };
}