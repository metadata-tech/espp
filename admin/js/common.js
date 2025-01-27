const _ALERT_TITLE_VALIDATION_ERROR = "RALAT VALIDASI";
const _ALERT_MSG_VALIDATION = "Pastikan semua ruangan diisi dengan betul!";
const _ALERT_TITLE_ERROR = "RALAT";
const _ALERT_MSG_ERROR_DEFAULT = "Kesilapan pada sistem. Sila hubungi Pihak Admin!";
const _ALERT_TITLE_SUCCESS = "BERJAYA";
const _ALERT_TITLE_INFO = "INFORMASI";
const _ALERT_TITLE_WARNING = "AMARAN";
const _ALERT_MSG_SUCCESS_ADD = "Data berjaya ditambah!";
const _ALERT_MSG_SUCCESS_EDIT = "Data berjaya dikemaskini!";
const _ALERT_MSG_SUCCESS_DELETE = "Data berjaya dihapus!";

const _ALERT_MSG_ERROR_UPLOAD_CODE_DUPLICATE = "Kod telah sedia ada dalam senarai muat naik!";
const _ALERT_MSG_ERROR_UPLOAD_SUBMIT = "Sila sahkan dan pastikan tiada data salah sebelum hantar!";
const _ALERT_MSG_ERROR_ROLE_PKL_PP = "Anda tidak ditugaskan untuk mana-mana Daerah Pentadbiran!";
const _ALERT_MSG_ERROR_ROLE_PKL_PD = "Anda tidak ditugaskan untuk mana-mana Daerah Banci!";

const _ALERT_TITLE_SUCCESS_LOGOUT = "SUCCESS SIGN OUT";
const _ALERT_MSG_SUCCESS_LOGOUT = "You have successfully signed out";
const _ALERT_MSG_ERROR_LOGOUT = "Error on system. Please try sign in again.";
const _ALERT_MSG_ERROR_CAPTCHA = "Please check the captcha!";
const _ALERT_TITLE_ERROR_TIMEOUT = "SESSION TIMEOUT";
const _ALERT_MSG_ERROR_TIMEOUT = "Session expired. Please try sign in again.";

const _ALERT_TITLE_ERROR_LOGIN = "SIGN IN ERROR";
const _ALERT_TITLE_SUCCESS_REGISTER = "REGISTRATION SUCCESS";
const _ALERT_MSG_SUCCESS_REGISTER = "You have successfully registered. Please activate via link sent to your email.";
const _ALERT_TITLE_ERROR_ACTIVATE = "ACTIVATION ERROR";
const _ALERT_TITLE_SUCCESS_ACTIVATE = "ACTIVATION SUCCESS";
const _ALERT_MSG_SUCCESS_ACTIVATE = "Your account has successfully activated. Please login with email as user ID and your registered password.";
const _ALERT_MSG_SUCCESS_UPDATE_USER = "Your information successfully updated";

const _DATATABLE_LANGUAGE =  {
    info: "Papar _START_ hingga _END_ dari _TOTAL_ rekod",
    emptyTable: "Tiada data diperolehi",
    infoEmpty: "Tiada data diperolehi",
    zeroRecords: "Tiada data dijumpai - maaf",
    lengthMenu: "Papar _MENU_ rekod per mukasurat",
    infoFiltered: "(ditapis dari _MAX_ jumlah rekod)",
    paginate: {
        previous: "Sebelumnya",
        next: "Seterusnya"
    },
    search: "Carian : ",
    buttons: {
        colvis: 'Kolum'
    }
};

let navId;
let navSecondId;
let versionLocal_;
const mzUrlDownload = '//localhost/sbp/';
let mzCnt;
const mzExportOpt = {
    columns: ':visible',
    format: {
        body: function ( data, row, column ) {
            if (row === 0 && column === 0) {
                mzCnt = 1;
            }
            if (column === 0 && typeof data === 'object') {
                return mzCnt++;
            }
            if (data.length > 3 && data.substring(0, 3) === '<a>') {
                return '';
            }
            if (data.length > 4 && data.substring(0, 4) === '<div') {
                return '';
            }
            if (data.toString().indexOf('<i>edit</i>') > 0) {
                return 'edit';
            }
            if (data.toString().indexOf('<i>add</i>') > 0) {
                return 'add';
            }
            if (data.toString().indexOf('fas fa-exclamation-triangle text-danger') > 0) {
                return data.replace('<i class="fas fa-exclamation-triangle text-danger"></i> ', '');
            }
            if (data.toString().indexOf('red-text') > 0) {
                return data.replace('<span class="red-text font-weight-500">', '').replace('</span>', '');
            }
            if (data.toString().indexOf('green-text') > 0) {
                return data.replace('<span class="green-text font-weight-500">', '').replace('</span>', '');
            }
            if (data.toString().indexOf('chip chip-tag light-green accent-4') > 0) {
                return data.replace('<div class="chip chip-tag light-green accent-4 white-text z-depth-1">', '').replace('</div>', '');
            }
            if (data.toString().indexOf('chip chip-tag blue accent-2') > 0) {
                return data.replace('<div class="chip chip-tag blue accent-2 white-text z-depth-1">', '').replace('</div>', '');
            }
            if (data.toString().indexOf('chip chip-tag grey') > 0) {
                return data.replace('<div class="chip chip-tag grey white-text z-depth-1">', '').replace('</div>', '');
            }
            if (data.toString().indexOf('ul class="pl-3 mb-1"') > 0) {
                return data.replace('<ul class="pl-3 mb-1"><li>', '')
                    .replaceAll('</li><li>', ', ')
                    .replaceAll('</li></ul>', '');
            }
            if (data.toString().indexOf('ul class') > 0) {
                return data.replace('<ul class="fa-ul ml-3_1 mb-0">', '')
                    .replaceAll('<li><span class="fa-li"><i class="fas fa-circle-exclamation text-danger"></i></span>', '')
                    .replaceAll('<li><span class="fa-li"><i class="fas fa-circle-check text-success"></i></span>', '')
                    .replaceAll('</li>', ', ')
                    .replaceAll(', </ul>', '')
                    .replace('</ul>', '');
            }
            if (data.toString().indexOf('badge badge-pill') > 0) {
                const startTxt = data.toString().indexOf('w-100') + 7;
                return data.substring(startTxt).replace('</span>', '');
            }
            return data;
        }
    }
};
const excelMultiHeader = function(data) {
    var namatabel = "dtLqc1";
    var colLength = $("#" + namatabel + " thead:first tr:last th").length;
    var jmlheader = $('#'+namatabel+' thead:first tr').length;

    if (jmlheader > 1) {
        data.body.unshift(data.header);
        data.header=[""];
        var j=0,rspan=[];
        for(j=0;j<jmlheader;j++){
            rspan[j]=[];
            for(var i=0;i<colLength;i++){
                rspan[j][i]=0;
            }
        }
        var colSpan=0,rowSpan=0;
        var topHeader = [],thisHead=[],thiscol=0,thisrow=0,jspan=0;
        for(j=1;j<=(jmlheader-1);j++){
            thisHead=[],thiscol=0;jspan=0;
            $('#'+namatabel).find("thead:first>tr:nth-child("+j+")>th").each(function (index, element) {
                colSpan = parseInt(element.getAttribute("colSpan"));
                rowSpan = parseInt(element.getAttribute("rowSpan"));
                jspan=jspan+colSpan;
                if(rspan[thisrow][thiscol]>0){
                    for(var i=0;i<rspan[thisrow][thiscol];i++){
                        thisHead.push("");
                    }
                }
                if(rowSpan>1){
                    jspan=jspan-colSpan;
                    for (var i=thisrow+1; i < jmlheader; i++) {
                        rspan[i][jspan]=colSpan;
                    }
                }
                thisHead.push(element.innerHTML.toUpperCase());
                for (var i = 0; i < colSpan - 1; i++) {
                    thisHead.push("");
                }
                thiscol++;
            });
            thisrow++;
            if(j==1){
                data.header=thisHead;
            }else{
                topHeader.push(thisHead);
            }

        };
        thiscol=topHeader.length;
        for(j=(thiscol-1);j>=0;j--){
            data.body.unshift(topHeader[j]);
        };
    }
}

let namaTable2 = '';
const excelMultiHeader2 = function(data) {
    var namatabel = namaTable2;
    var colLength = $("#" + namatabel + " thead:first tr:last th").length;
    var jmlheader = $('#'+namatabel+' thead:first tr').length;

    if (jmlheader > 1) {
        data.body.unshift(data.header);
        data.header=[""];
        var j=0,rspan=[];
        for(j=0;j<jmlheader;j++){
            rspan[j]=[];
            for(var i=0;i<colLength;i++){
                rspan[j][i]=0;
            }
        }
        var colSpan=0,rowSpan=0;
        var topHeader = [],thisHead=[],thiscol=0,thisrow=0,jspan=0;
        for(j=1;j<=(jmlheader-1);j++){
            thisHead=[],thiscol=0;jspan=0;
            $('#'+namatabel).find("thead:first>tr:nth-child("+j+")>th").each(function (index, element) {
                colSpan = parseInt(element.getAttribute("colSpan"));
                rowSpan = parseInt(element.getAttribute("rowSpan"));
                jspan=jspan+colSpan;
                if(rspan[thisrow][thiscol]>0){
                    for(var i=0;i<rspan[thisrow][thiscol];i++){
                        thisHead.push("");
                    }
                }
                if(rowSpan>1){
                    jspan=jspan-colSpan;
                    for (var i=thisrow+1; i < jmlheader; i++) {
                        rspan[i][jspan]=colSpan;
                    }
                }
                thisHead.push(element.innerHTML.toUpperCase());
                for (var i = 0; i < colSpan - 1; i++) {
                    thisHead.push("");
                }
                thiscol++;
            });
            thisrow++;
            if(j==1){
                data.header=thisHead;
            }else{
                topHeader.push(thisHead);
            }

        };
        thiscol=topHeader.length;
        for(j=(thiscol-1);j>=0;j--){
            data.body.unshift(topHeader[j]);
        };
    }
}

let accessList = [];

let modalClass = $('.modal');
modalClass.on('show.bs.modal', function () {
    const idx = $('.modal:visible').length;
    $(this).css('z-index', 1040 + (10 * idx));
});
modalClass.on('shown.bs.modal', function () {
    const idx = ($('.modal:visible').length) - 1; // raise backdrop after animation.
    let modalBackdrop = $('.modal-backdrop');
    modalBackdrop.not('.stacked').css('z-index', 1039 + (10 * idx));
    modalBackdrop.not('.stacked').addClass('stacked');
});

function ShowLoader() {
    let overlay = jQuery('<div id="loading-overlay" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(255, 255, 255, 0.6); z-index: 10000;"><div style="text-align: center; width: 100%; position: absolute; top: 40%; margin-top: -50px;"> <div class="preloader-wrapper big active"> <div class="spinner-layer spinner-blue"> <div class="circle-clipper left"> <div class="circle"></div> </div><div class="gap-patch"> <div class="circle"></div> </div><div class="circle-clipper right"> <div class="circle"></div> </div> </div> <div class="spinner-layer spinner-red"> <div class="circle-clipper left"> <div class="circle"></div> </div><div class="gap-patch"> <div class="circle"></div> </div><div class="circle-clipper right"> <div class="circle"></div> </div> </div> <div class="spinner-layer spinner-yellow"> <div class="circle-clipper left"> <div class="circle"></div> </div><div class="gap-patch"> <div class="circle"></div> </div><div class="circle-clipper right"> <div class="circle"></div> </div> </div> <div class="spinner-layer spinner-green"> <div class="circle-clipper left"> <div class="circle"></div> </div><div class="gap-patch"> <div class="circle"></div> </div><div class="circle-clipper right"> <div class="circle"></div> </div> </div> </div> </div> </div>');
    overlay.appendTo(document.body);
}

function HideLoader() {
    $('#loading-overlay').remove();
}

function mzFormatNumber(num, fix) {
    if (num == null) 	return null;
    if (isNaN(num)) return '-';
    if (num === '') return '-';
    num = parseFloat(num);
    let p = num.toFixed(fix).split(".");
    let result = p[0].split("").reduceRight(function(acc, num, i, orig) {
        const pos = orig.length - i - 1;
        return  num + (pos && !(pos % 3) ? "," : "") + acc;
    }, "") + (p[1] ? "." + p[1] : "");
    if (result.substring(0, 2) === '-,') {
        result = '-' + result.substring(2);
    }
    return result;
}

function mzValidMail(mail) {
    return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(mail);
}

function mzValidDigit(digit) {
    return /^\d+$/.test(digit);
}

function mzValidNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function maValidCurrency(n) {
    return /^\d+$/.test(n.split(',').join(''));
}

function maMaxLengthWhole(fieldVal, val) {
    const parts = fieldVal.split(".")
    if (parts[0].split(',').join('').length > val) {
        return false;
    } else {
        return true;
    }
}

function maMaxLengthDecimal(fieldVal, val) {
    const parts = fieldVal.split(".")
    if (parts.length >= 2) {
        if (parts[1].length > val) {
            return false;
        } else {
            return true;
        }
    } else {
        return true;
    }
}

function maConvertCurrency(n) {
    return n.split(',').join('');
}

function maNullCurrency(id) {
  id = id.replace(',', '');
  if ($('#'+id).val() != '' && $('#'+id).val() != null && $('#'+id).val() != 'undefined') {
    const returnVal = $('#'+id).val().replace(/,/g, '');
    // const returnVal = parseFloat($('#'+id).val().replace(/,/g, ''));
    if (isNaN(returnVal)) {
        return null;
    }
    return returnVal;
  } else {
    return null;
  }
}

function maZeroCurrency(id) {
  id = id.replace(',', '');
  if ($('#'+id).val() != '' && $('#'+id).val() != null && $('#'+id).val() != 'undefined') {
    const returnVal = parseFloat($('#'+id).val().split(',').join(''));
    if (isNaN(returnVal)) {
        return 0;
    }
    return returnVal;
  } else {
    return 0;
  }
}

function mzValidPassword(n) {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(n);
}

function MzValidate(isEnglish) {
    let obj = {};
    obj.fields = [];
    isEnglish = typeof isEnglish === 'undefined' ? true : isEnglish;

    const checkField = function (field_id, type, val) {
        try {
            const fieldSelector = type === 'notEmptyCheck' || type === 'notEmptyRadio' || type === 'notEqualRadio' || type === 'notEmptyCheckSingle' || type === 'notEmptyCheckRadio' || type === 'notSimilarRadio' || type === 'eitherOneCheck' ? $("input[name='"+field_id+"']:checked") : $('#' + field_id);
            const fieldVal = type !== 'notEmptyCheck' && type !== 'notEmptyRadio' && type !== 'notEmptyCheckSingle' && type !== 'notEmptyCheckRadio' ? fieldSelector.val() : '';
            const idVal = typeof val.id !== 'undefined' ? $('#' + val.id).val() : '';
            switch (type) {
                case 'notEmpty':
                    if (val === true && (fieldVal === '' || fieldVal === null))
                        return false;
                    break;
                case 'eqLength':
                    if (fieldVal.length !== val && fieldVal !== '')
                        return false;
                    break;
                case 'eqLengthDigit':
                    if (fieldVal.length !== val && fieldVal !== '')
                        return false;
                    break;
                case 'equal':
                    if (fieldVal !== val && fieldVal !== '')
                        return false;
                    break;
                case 'notEqual':
                    if (fieldVal == val && fieldVal !== '')
                        return false;
                        break;
                case 'notEqualRadio':
                    if (fieldVal == val && fieldVal !== '')
                        return false;
                        break;
                case 'maxLength':
                    if (fieldVal.length > val && fieldVal !== '')
                        return false;
                    break;
                case 'maxLengthDigit':
                    if (fieldVal.length > val && fieldVal !== '')
                        return false;
                    break;
                case 'maxLengthCurrency':
                    if (maConvertCurrency(fieldVal).length > val && fieldVal !== '')
                        return false;
                    break;
                case 'minLength':
                    if (fieldVal.length < val && fieldVal !== '')
                        return false;
                    break;
                case 'minLengthDigit':
                    if (fieldVal.length < val && fieldVal !== '')
                        return false;
                    break;
                case 'numeric':
                    if (val === true && !mzValidNumeric(fieldVal) && fieldVal !== '')
                        return false;
                    break;
                case 'currency':
                    if (val === true && !maValidCurrency(fieldVal) && fieldVal !== '')
                        return false;
                    break;
                case 'maxLengthWhole':
                    if (!maMaxLengthWhole(fieldVal, val) && fieldVal !== '')
                        return false;
                    break;
                case 'maxLengthDecimal':
                  if (!maMaxLengthDecimal(fieldVal, val) && fieldVal !== '')
                        return false;
                    break;
                case 'email':
                    if (val === true && !mzValidMail(fieldVal) && fieldVal !== '')
                        return false;
                    break;
                case 'digit':
                    if (val === true && !mzValidDigit(fieldVal) && fieldVal !== '')
                        return false;
                    break;
                case 'password':
                    if (val === true && !mzValidPassword(fieldVal) && fieldVal !== '')
                        return false;
                    break;
                case 'similar':
                    if (val !== '' && fieldVal !== idVal && fieldVal !== '')
                        return false;
                    break;
                case 'notSimilarId':
                    if (val !== '' && fieldVal === idVal && fieldVal !== '')
                        return false;
                    break;
                case 'notSimilar':
                case 'notSimilarRadio':
                    if (val !== '' && fieldVal === val)
                        return false;
                    break;
                case 'max':
                    if (fieldVal > val && fieldVal !== '')
                        return false;
                    break;
                case 'min':
                    if (fieldVal < val && fieldVal !== '')
                        return false;
                    break;
                case 'maxDate':
                    var fieldVal2 = fieldVal.split("/").reverse().join("/");
                    var val2 = val.split("/").reverse().join("/");
                    if (fieldVal2 > val2 && fieldVal2 !== '')
                        return false;
                    break;
                case 'minDate':
                    var fieldVal2 = fieldVal.split("/").reverse().join("/");
                    var val2 = val.split("/").reverse().join("/");
                    if (fieldVal2 < val2 && fieldVal2 !== '')
                        return false;
                    break;
                case 'notEmptyArr':
                    if (val === true && fieldVal.length === 0)
                        return false;
                    break;
                case 'notEmptyFile':
                    if (val === true && fieldSelector.prop('files').length === 0) {
                        return false;
                    }
                    break;
                case 'notEmptyCheckSingle':
                case 'notEmptyCheckRadio':
                case 'notEmptyCheck':
                case 'notEmptyRadio':
                    if (val === true && fieldSelector.length === 0)
                        return false;
                    break;
                case 'eitherOneCheck':
                    if (val === true && fieldSelector.length > 1)
                        return false;
                    break;
                case 'notEmptySummernote':
                    if (val === true && fieldSelector.summernote('isEmpty'))
                        return false;
                    break;
                case 'pdfType':
                    if (val === true && fieldSelector.prop('files').length > 0 && fieldSelector.prop('files')[0].type !== 'application/pdf') {
                        return false;
                    }
                    break;
                case 'xlsType':
                    if (val === true && fieldSelector.prop('files').length > 0 && !(fieldSelector.prop('files')[0].type === 'application/vnd.ms-excel' || fieldSelector.prop('files')[0].type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
                        return false;
                    }
                    break;
                case 'imageType':
                    if (val === true && fieldSelector.prop('files').length > 0 && fieldSelector.prop('files')[0].type !== 'image/jpg' && fieldSelector.prop('files')[0].type !== 'image/jpeg' && fieldSelector.prop('files')[0].type !== 'image/png') {
                        return false;
                    }
                    break;
                case 'imagePdfType':
                    if (val === true && fieldSelector.prop('files').length > 0 && fieldSelector.prop('files')[0].type !== 'image/jpg' && fieldSelector.prop('files')[0].type !== 'image/jpeg' && fieldSelector.prop('files')[0].type !== 'image/png' && fieldSelector.prop('files')[0].type !== 'application/pdf') {
                        return false;
                    }
                    break;
                case 'fileSize':
                    if (fieldSelector.prop('files').length > 0 && fieldSelector.prop('files')[0].size > val*1024*1024) {
                        return false;
                    }
                    break;
                case 'lower':
                    if (val !== '' && fieldVal !== '' && idVal !== '' && fieldVal > idVal)
                        return false;
                    break;
                case 'higher':
                    if (val !== '' && fieldVal !== '' && idVal !== '' && fieldVal < idVal)
                        return false;
                    break;
                case 'inList':
                    if (val !== '' && fieldVal !== '' && Array.isArray(val)) {
                        let isValid = false;
                        for (let i=0; i<val.length; i++) {
                            if (val[i] === fieldVal) {
                                isValid = true;
                                break;
                            }
                        }
                        if (!isValid)
                            return false;
                    }
                    break;
            }
            return true;
        } catch (e) { console.log(e.message); }
    };

    const validateFields = function (field_id, validator, name, type) {
        let msg = '';
        let fieldSelector;
        let fieldErrSelector;
        if (type === 'check') {
            fieldSelector = $("input[name='"+field_id+"']:checkbox");
            fieldErrSelector = $('#' + field_id.substring(0, field_id.length-2) + 'Err');
        }
        else if (type === 'radio') {
            fieldSelector = $("input[name='"+field_id+"']:radio");
            fieldErrSelector = $('#' +field_id + 'Err');
        }
        else {
            fieldSelector = $('#' + field_id);
            fieldErrSelector = $('#' +field_id + 'Err');
        }
        if (type === 'select') {
            $('#' + field_id + '_ .select-wrapper.md-form.md-outline input.select-dropdown').removeClass('invalid');
        } else {
            fieldSelector.removeClass('invalid');
        }
        fieldErrSelector.html('');

        /*const keys = Object.keys(validator);
        for(let i = 0; i < keys.length; i++){
            const value = validator[keys[i]];
        }*/

        $.each(validator, function (n2, u2) {
            try {
                if (!checkField(field_id, n2, u2)) {
                    switch (n2) {
                        case 'notEmpty':
                            if (type === 'select') {
                                msg += isEnglish ? '<br>Please choose ' + name : '<br>Sila pilih ' + name;
                            } else {
                                msg += isEnglish ? '<br>Please fill in ' + name : '<br>Sila isi ' + name;
                            }
                            return false;
                        case 'eqLength':
                            msg += isEnglish ? '<br>' + name + ' length must equal to ' + u2 + ' letters' : '<br>Panjang perkataan mesti bersamaan ' + u2 + ' huruf';
                            break;
                        case 'eqLengthDigit':
                            msg += isEnglish ? '<br>' + name + ' length must equal to ' + u2 + ' digit' : '<br>Panjang mesti bersamaan ' + u2 + ' digit';
                            break;
                        case 'equal':
                            msg += isEnglish ? '<br>' + name + ' must equal to ' + u2 + ' letters' : '<br>' + name + ' mesti bersamaan ' + u2;
                            break;
                        case 'notEqual':
                            msg += isEnglish ? '<br>' + name + ' must not equal to ' + u2 + ' letters' : '<br>' + name + ' mesti tidak bersamaan ' + u2;
                            break;
                        case 'notEqualRadio':
                            msg += isEnglish ? '<br>' + name + ' must not equal to ' + u2 + ' letters' : '<br>' + name + ' mesti tidak bersamaan ' + u2;
                            break;
                        case 'maxLength':
                            msg += isEnglish ? '<br>Maximum length must not exceed ' + u2 + ' letters' : '<br>Panjang maksimum mesti ' + u2 + ' huruf';
                            break;
                        case 'maxLengthDigit':
                            msg += isEnglish ? '<br>Maximum length must not exceed ' + u2 + ' digit' : '<br>Panjang maksimum mesti ' + u2 + ' digit';
                            break;
                        case 'maxLengthCurrency':
                            msg += isEnglish ? '<br>Maximum length must not exceed ' + u2 + ' numbers' : '<br>Panjang maksimum mesti ' + u2 + ' nombor';
                            break;
                        case 'minLength':
                            msg += isEnglish ? '<br>Minimum length must not less than ' + u2 + ' letters' : '<br>Panjang minimum mesti ' + u2 + ' huruf';
                            break;
                        case 'minLengthDigit':
                            msg += isEnglish ? '<br>Minimum length must not less than ' + u2 + ' digit' : '<br>Panjang minimum mesti ' + u2 + ' digit';
                            break;
                        case 'numeric':
                            msg += isEnglish ? '<br>' + name + ' must in valid numeric format' : '<br>' + name + ' mesti dalam format numerik';
                            break;
                        case 'currency':
                            msg += isEnglish ? '<br>' + name + ' must in valid digit format' : '<br>' + name + ' mesti dalam format nombor';
                            break;
                        case 'maxLengthWhole':
                            msg += isEnglish ? '<br>Maximum length whole number must not exceed ' + u2 + ' digit' : '<br>Panjang maksimum nombor bulat mesti ' + u2 + ' digit';
                            break;
                        case 'maxLengthDecimal':
                            msg += isEnglish ? '<br>Maximum length decimal must not exceed ' + u2 + ' digit' : '<br>Panjang maksimum nombor pecahan mesti ' + u2 + ' digit';
                            break;
                        case 'email':
                            msg += isEnglish ? '<br>' + name + ' must in valid email format' : '<br>' + name + ' mesti dalam format emel';
                            break;
                        case 'digit':
                            msg += isEnglish ? '<br>' + name + ' must in valid digit format' : '<br>' + name + ' mesti dalam format nombor';
                            break;
                        case 'password':
                            msg += '<br>' + name + ' mesti mengandungi huruf besar, huruf kecil, <i>special character</i> dan nombor';
                            break;
                        case 'similar':
                            msg += isEnglish ? '<br>' + name + ' must equal to ' + u2.label : '<br>' + name + ' mesti sama dengan ' + u2.label;
                            break;
                        case 'notSimilarId':
                            msg += isEnglish ? '<br>' + name + ' must not equal to ' + u2.label : '<br>' + name + ' mesti lain dari ' + u2.label;
                            break;
                        case 'notSimilar':
                        case 'notSimilarRadio':
                            msg += isEnglish ? '<br>' + name + ' must not equal to the original value' : '<br>' + name + ' mesti berlainan dengan nilai asal';
                            break;
                        case 'max':
                            msg += isEnglish ? '<br>' + name + ' must at most ' + u2 : '<br>' + name + ' mesti tidak melebihi ' + u2;
                            break;
                        case 'min':
                            msg += isEnglish ? '<br>' + name + ' must at least ' + u2 : '<br>' + name + ' mesti tidak kurang dari ' + u2;
                            break;
                        case 'maxDate':
                            msg += isEnglish ? '<br>' + name + ' must at most ' + u2 : '<br>' + name + ' mesti sebelum ' + u2;
                            break;
                        case 'minDate':
                            msg += isEnglish ? '<br>' + name + ' must at least ' + u2 : '<br>' + name + ' mesti selepas  ' + u2;
                            break;
                        case 'notEmptyArr':
                            msg += isEnglish ? '<br>Please choose ' + name : '<br>Sila pilih ' + name;
                            return false;
                        case 'notEmptyFile':
                            msg += isEnglish ? '<br>Please upload ' + name : '<br>Sila muatnaik fail ' + name;
                            return false;
                        case 'eitherOneCheck':
                            msg += isEnglish ? '<br>Please choose either one ' + name : '<br>Sila pilih salah satu ' + name;
                            return false;
                        case 'notEmptyCheck':
                            msg += isEnglish ? '<br>Please choose at least 1 ' + name : '<br>Sila pilih sekurang-kurangnya 1 ' + name;
                            return false;
                        case 'notEmptyRadio':
                            msg += isEnglish ? '<br>Please choose 1 ' + name : '<br>Sila pilih ' + name;
                            return false;
                        case 'notEmptyCheckRadio':
                            msg += isEnglish ? '<br>Please choose 1 ' + name : '<br>Sila pilih ' + name;
                            return false;
                        case 'notEmptyCheckSingle':
                            msg += isEnglish ? '<br>Please make sure ' + name + ' ticked' : '<br>Sila pastikan ' + name + ' dipilih';
                            return false;
                        case 'notEmptySummernote':
                            msg += isEnglish ? '<br>Please fill in '+name : '<br>Sila isi '+name;
                            return false;
                        case 'pdfType':
                            msg += isEnglish ? '<br>Please make sure the uploaded file is in PDF type' : '<br>Sila pastikan format dokumen muatnaik adalah PDF';
                            return false;
                        case 'xlsType':
                            msg += isEnglish ? '<br>Please make sure the uploaded file is in Excel type' : '<br>Sila pastikan format dokumen muatnaik adalah Excel';
                            return false;
                        case 'imageType':
                            msg += isEnglish ? '<br>Please make sure the uploaded file is in JPG, JPEG, PNG type' : '<br>Sila pastikan format dokumen muatnaik adalah JPG, JPEG, PNG';
                            return false;
                        case 'imagePdfType':
                            msg += isEnglish ? '<br>Please make sure the uploaded file is in PDF, JPG, JPEG, PNG type' : '<br>Sila pastikan format dokumen muatnaik adalah PDF, JPG, JPEG, PNG';
                            return false;
                        case 'lower':
                            msg += isEnglish ?  '<br>' + name + ' must lower than ' + u2.label : '<br>' + name + ' mestilah melebihi ' + u2.label;
                            break;
                        case 'higher':
                            msg += isEnglish ?  '<br>' + name + ' must higher than ' + u2.label : '<br>' + name + ' mestilah kurang dari ' + u2.label;
                            break;
                        case 'inList':
                            msg += isEnglish ?  '<br>' + name + ' is not in list' : '<br>' + name + ' tiada dalam senarai';
                            break;
                    }
                } else {
                    if (n2 === 'lower' || n2 === 'higher') {
                        $('#' +u2.id).removeClass('invalid');
                        $('#' +u2.id + 'Err').html('');
                    }
                }
            } catch (e) { toastr['error'](e.message, _ALERT_TITLE_ERROR); }
        });
        if (msg !== '') {
            if (type === 'select') {
                $('#' + field_id + '_ .select-wrapper.md-form.md-outline input.select-dropdown').addClass('invalid');
            } else {
                fieldSelector.addClass('invalid');
            }
            fieldErrSelector.html(msg.substring(4));
            return false;
        }
        return true;
    };

    const validateFieldsNoError = function (field_id, validator) {
        let noError = true;
        $.each(validator, function (n2, u2) {
            if (!checkField(field_id, n2, u2)) {
                noError = false;
                return false;
            }
        });
        return noError;
    };

    this.registerFields = function (data) {
        this.fields = [];
        let arrFields = [];
        $.each(data, function (n, u) {
            let fieldSelector;
            let fieldErrSelector;
            if (u.type === 'check') {
                fieldSelector = $("input[name='" + u.field_id + "']:checkbox");
                fieldErrSelector = $('#' + (u.field_id).substring(0, (u.field_id).length - 2) + 'Err');
            }
            else if (u.type === 'radio') {
                fieldSelector = $("input[name='"+u.field_id+"']:radio");
                fieldErrSelector = $('#' + u.field_id + 'Err');
            }
            else {
                fieldSelector = $('#' + u.field_id);
                fieldErrSelector = $('#' + u.field_id + 'Err');
            }
            if (u.type === 'select') {
                $('#' + u.field_id + '_ .select-wrapper.md-form.md-outline input.select-dropdown').removeClass('invalid');
            } else {
                fieldSelector.removeClass('invalid');
            }
            fieldErrSelector.html('');
            if (u.focus){
                fieldSelector.on('keyup blur', function () {
                    if (u.enabled) {
                        validateFields(u.field_id, u.validator, u.name, u.type);
                    }
                });
            } else {
                fieldSelector.on('keyup change', function () {
                    if (u.enabled) {
                        validateFields(u.field_id, u.validator, u.name, u.type);
                    }
                });
            }
            u.enabled = true;
            arrFields.push(u);
        });
        this.fields = arrFields;
    };

    this.registerFieldsNoKeyup = function (data) {
        this.fields = [];
        let arrFields = [];
        $.each(data, function (n, u) {
            let fieldSelector;
            let fieldErrSelector;
            if (u.type === 'check') {
                fieldSelector = $("input[name='" + u.field_id + "']:checkbox");
                fieldErrSelector = $('#' + (u.field_id).substring(0, (u.field_id).length - 2) + 'Err');
            }
            else if (u.type === 'radio') {
                fieldSelector = $("input[name='"+u.field_id+"']:radio");
                fieldErrSelector = $('#' + u.field_id + 'Err');
            }
            else {
                fieldSelector = $('#' + u.field_id);
                fieldErrSelector = $('#' + u.field_id + 'Err');
            }
            if (u.type === 'select') {
                $('#' + u.field_id + '_ .select-wrapper.md-form.md-outline input.select-dropdown').removeClass('invalid');
            } else {
                fieldSelector.removeClass('invalid');
            }
            fieldErrSelector.html('');
            u.enabled = true;
            arrFields.push(u);
        });
        this.fields = arrFields;
    };

    this.validateForm = function () {
        let result = true;
        $.each(this.fields, function (n, u) {
            if (u.enabled && !validateFieldsNoError(u.field_id, u.validator)) {
                result = false;
            }
        });
        return result;
    };

    this.validateNow = function () {
        let result = true;
        $.each(this.fields, function (n, u) {
            if (u.enabled && !validateFields(u.field_id, u.validator, u.name, u.type)) {
                result = false;
            }
        });
        return result;
    };

    this.validateSummernote = function () {
        let result = true;
        $.each(this.fields, function (n, u) {
            if (u.enabled && u.type === 'summernote' && !validateFields(u.field_id, u.validator, u.name, u.type)) {
                result = false;
            }
        });
        return result;
    };

    this.clearValidation = function (_fieldId) {
        $.each(this.fields, function (n, u) {
            let fieldSelector;
            let fieldErrSelector;
            let fieldLblSelector = '';
            const fieldId = u.field_id;
            let checkSkip = false;
            if (typeof _fieldId !== 'undefined' && _fieldId !== fieldId) {
                checkSkip = true;
            }
            if (!checkSkip) {
                if (u.type === 'check') {
                    fieldSelector = $("input[name='"+fieldId+"']:checkbox");
                    fieldErrSelector = $('#' + fieldId.substring(0, fieldId.length-2) + 'Err');
                }
                else if (u.type === 'radio') {
                    fieldSelector = $("input[name='"+fieldId+"']:radio");
                    fieldErrSelector = $('#' + u.field_id + 'Err');
                }
                else {
                    fieldSelector = $('#' + fieldId);
                    fieldErrSelector = $('#' + fieldId + 'Err');
                    fieldLblSelector = $('#lbl' + fieldId.substring(3));
                }

                if (u.type === 'text' || u.type === 'textarea') {
                    fieldSelector.val('');
                    fieldLblSelector.removeClass('active');
                }
                else if (u.type === 'select') {
                    fieldSelector.materialSelect('destroy');
                    fieldSelector.val(null);
                    fieldLblSelector.removeClass('active');
                    fieldSelector.materialSelect({visibleOptions: 15});
                    //$('.mdb-select').materialSelect('destroy');
                    //$('#' + fieldId).val(null).trigger( 'click');
                    //$('.mdb-select').materialSelect();
                    //$('#' + fieldId).prevAll('.select-dropdown').children('li:contains(\'\')').trigger('click');
                }
                else if (u.type === 'selectMultiple') {
                    //$('#' + fieldId).prevAll('.select-dropdown').children('li:contains(\'\')').trigger('click');
                    fieldSelector.val(null).change();
                    //fieldLblSelector.html('').removeClass('active');
                }
                else if (u.type === 'checkSingle') {
                    fieldSelector.prop('checked',false);
                }
                else if (u.type === 'check' || u.type === 'radio') {
                    fieldSelector.prop('checked',false);
                }
                else if (u.type === 'file') {
                    fieldSelector.val('');
                    $('#txt' + fieldId.substring(3)).val('');
                    fieldLblSelector.removeClass('active');
                }
                else if (u.type === 'summernote') {
                    fieldSelector.summernote('code', '');
                }
                else if (u.type === 'date') {
                    const input = fieldSelector.pickadate();
                    let calendar = input.data('pickadate');
                    calendar.clear();
                }
                fieldSelector.removeClass('invalid');
                fieldErrSelector.html('');
            }
        });
    };

    this.resetValidation = function (_fieldId) {
      $.each(this.fields, function (n, u) {
          let fieldSelector;
          let fieldErrSelector;
          let fieldLblSelector = '';
          const fieldId = u.field_id;
          let checkSkip = false;
          if (typeof _fieldId !== 'undefined' && _fieldId !== fieldId) {
              checkSkip = true;
          }
          if (!checkSkip) {
              if (u.type === 'check') {
                  fieldSelector = $("input[name='"+fieldId+"']:checkbox");
                  fieldErrSelector = $('#' + fieldId.substring(0, fieldId.length-2) + 'Err');
              }
              else if (u.type === 'radio') {
                  fieldSelector = $("input[name='"+fieldId+"']:radio");
                  fieldErrSelector = $('#' + u.field_id + 'Err');
              }
              else {
                  fieldSelector = $('#' + fieldId);
                  fieldErrSelector = $('#' + fieldId + 'Err');
                  fieldLblSelector = $('#lbl' + fieldId.substring(3));
              }
              fieldSelector.removeClass('invalid');
              fieldErrSelector.html('');
          }
      });
  };

    this.enableField = function (fieldId) {
        let arrFields = this.fields;
        $.each(arrFields, function (n, u) {
            if (u.field_id === fieldId) {
                u.enabled = true;
                return false;
            }
        });
        this.fields = arrFields;
    };

    this.disableField = function (fieldId) {
        let arrFields = this.fields;
        $.each(arrFields, function (n, u) {
            if (u.field_id === fieldId) {
                u.enabled = false;
                let fieldSelector;
                let fieldErrSelector;
                if (u.type === 'check') {
                    fieldSelector = $("input[name='"+fieldId+"']:checkbox");
                    fieldErrSelector = $('#' + fieldId.substring(0, fieldId.length-2) + 'Err');
                }
                else if (u.type === 'radio') {
                    fieldSelector = $("input[name='"+fieldId+"']:radio");
                    fieldErrSelector = $('#' + u.field_id + 'Err');
                }
                else {
                    fieldSelector = $('#' + fieldId);
                    fieldErrSelector = $('#' + fieldId + 'Err');
                }
                if (u.type === 'select') {
                    fieldSelector.materialSelect({visibleOptions: 15});
                }
                fieldSelector.removeClass('invalid');
                fieldErrSelector.html('');
                return false;
            }
        });
        this.fields = arrFields;
    };

    this.validateField = function (fieldId) {
        let result = true;
        let arrFields = this.fields;
        $.each(arrFields, function (n, u) {
            if (u.field_id === fieldId) {
                if (u.enabled && !validateFieldsNoError(u.field_id, u.validator)) {
                    result = false;
                }
            }
        });
        return result;
    };
    
    this.enableFieldAll = function () {
        let arrFields = this.fields;
        $.each(arrFields, function (n, u) {
            const fieldId = u.field_id;
            let fieldSelector;
            if (u.type === 'check' || u.type === 'radio') {
                fieldSelector = $("input[name='"+fieldId+"']");
            } else {
                fieldSelector = $('#' + fieldId);
            }
            if (u.type === 'select') {
                mzDisableSelect(fieldId, false);
            } else if (u.type === 'radio') {
                fieldSelector.prop('disabled', false);
            } else {
                fieldSelector.prop('disabled', false);
            }
        });
    };
    
    this.disableFieldAll = function () {
        let arrFields = this.fields;
        $.each(arrFields, function (n, u) {
            const fieldId = u.field_id;
            let fieldSelector;
            if (u.type === 'check' || u.type === 'radio') {
                fieldSelector = $("input[name='"+fieldId+"']");
            } else {
                fieldSelector = $('#' + fieldId);
            }
            if (u.type === 'select') {
                mzDisableSelect(fieldId, true);
            } else if (u.type === 'radio') {
                fieldSelector.prop('disabled', true);
            } else {
                fieldSelector.prop('disabled', true);
            }
        });
    };
}

async function mzFetch(url, type, data, isHideLoader, isHideSuccess) {
    if (typeof isHideLoader === 'undefined') {
        isHideLoader = true;
    }
    if (typeof isHideSuccess === 'undefined') {
        isHideSuccess = false;
    }
    if (typeof type === 'undefined') {
        type = 'GET';
    }
    try {
        let header = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
        if (sessionStorage.getItem('t') !== null) {
            header = {'Authorization': 'Bearer ' + sessionStorage.getItem('t')};
        }
        let params = {
            method: type,
            headers: header
        };
        if (type !== 'GET') {
            params['body'] = JSON.stringify(data)
        }
        const response = await fetch(url, params);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const resp = await response.json();
        if (resp.success) {
            if (resp['errmsg'] !== '' && !isHideSuccess) {
                toastr['success'](resp['errmsg'], _ALERT_TITLE_SUCCESS);
            }
        } else if (resp['errmsg'] === 'Expired token') {
            window.location.href = '/login?f=2';
        } else {
            const errMsg = resp['errmsg'] !== '' ? resp['errmsg'] : _ALERT_MSG_ERROR_DEFAULT;
            throw new Error(errMsg);
        }
        if (isHideLoader) {
            HideLoader();
        }
        return resp.result;
    } catch (error) {
        if (isHideLoader) {
            HideLoader();
        }
        throw new Error(error.message);
    }
}

function mzAjax (url, type, data, functionStr) {
    let returnVal = '';
    if (typeof url === 'undefined' || typeof type === 'undefined' || url === '' || type === '') {
        throw new Error(_ALERT_MSG_ERROR_DEFAULT);
    }
    if (type !== 'GET' && type !== 'POST' && type !== 'PUT' && type !== 'DELETE') {
        throw new Error(_ALERT_MSG_ERROR_DEFAULT);
    }
    data = typeof data === 'undefined' ? {} : data; // JSON.stringify(data)
    const async = (typeof functionStr !== 'undefined' && functionStr !== '');

    let header = {};
    if (sessionStorage.getItem('userToken') !== null) {
        header = {'Authorization': 'Bearer ' + sessionStorage.getItem('userToken')};
    }
    if (type === 'GET' && data !== '') {
        jQuery.extend(header, data);
        data = '';
    }

    let errMsg = '';
    $.ajax({
        url: '../api/'+url,
        type: type,
        contentType: 'application/json; charset=utf-8',
        headers: header,
        data: JSON.stringify(data),
        dataType: 'json',
        async: async,
        success: function (resp) {
            if (resp.success) {
                returnVal = resp.result;
                if (typeof functionStr !== 'undefined') {
                    if (functionStr.slice(-2) === '()') {
                        eval(functionStr.slice(0, -1) + '\'' + JSON.stringify(returnVal) + '\');');
                    } else {
                        eval(functionStr.slice(0, -1) + ',\'' + JSON.stringify(returnVal) + '\');');
                    }
                }
                if (resp['errmsg'] !== '') {
                    toastr['success'](resp['errmsg'], _ALERT_TITLE_SUCCESS);
                }
            } else if (resp['errmsg'] === 'Expired token') {
                window.location.href = '/login?f=3';
            } else {
                errMsg = resp['errmsg'] !== '' ? resp['errmsg'] : _ALERT_MSG_ERROR_DEFAULT;
            }
        },
        error: function () {
            errMsg = _ALERT_MSG_ERROR_DEFAULT;
        }
    });

    if (errMsg !== '') {
        throw new Error(errMsg);
    }
    return returnVal;
}

function mzGetUrlVars() {
    let vars = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
        function (m, key, value) {
            vars[key] = value;
        }
    );
    return vars;
}

function mzSleep(delay) {
    let start = new Date().getTime();
    while (new Date().getTime() < start + delay) {
    }
}

function mzLogout() {
	//mzAjaxRequest('user/log_out', 'POST');
    sessionStorage.clear();
    window.location.href = '/login';
    // window.location.href = '../../sbp';
}

function mzLogoutError(errorType) {
    mzAjax('user/log_out/'+errorType, 'POST');
    sessionStorage.clear();
    sessionStorage.setItem('errorLogout', errorType);
    window.location.href = '/login?f=3';
}

function mzGoToMenu(url, _navId, _navSecondId) {
    sessionStorage.setItem('navId', _navId);
    sessionStorage.setItem('navSecondId', _navSecondId);
    window.location.href = url;
    //initiatePages();
}


function mzSetupMenu(menuSet) {
    const navId_ = parseInt(sessionStorage.getItem('navId'));
    const navSecondId_ = parseInt(sessionStorage.getItem('navSecondId'));
    let titleHtml = '<i class="fas fa-angle-double-right mx-2 white-text" aria-hidden="true"></i>';
    $.each(menuSet, function (n, nav) {
        let menuHtml = '<li>';
        const strActive = navId_ === nav['navId'] ? 'active' : '';
        const strBold = navId_ === nav['navId'] ? 'font-weight-bold' : '';
        const navSeconds = nav['navSecond'];
        if (navSeconds.length > 0) {
            menuHtml += '<a class="collapsible-header waves-effect arrow-r ' + strActive + '"><i style="min-width: 25px;"  class="' + nav['navIcon'] + '"></i> ' + nav['navName'] + '<i class="fa fa-angle-down rotate-icon"></i></a>';
            menuHtml += '<div class="collapsible-body">';
            menuHtml += '<ul>';
            if (navId_ === nav['navId']) {
                titleHtml += '<span class="font-weight-bold">' + nav['navName'] + '</span>';
            }
            $.each(navSeconds, function (n2, nav2nd) {
                const strHighlight = navSecondId_ === nav2nd['navSecondId'] ? 'font-weight-bold' : '';
                menuHtml += '<li><a href="#" class="waves-effect ' + strHighlight + '" onclick="mzGoToMenu(\'' + nav2nd['navSecondPage'] + '\', \'' + nav['navId'] + '\', \'' + nav2nd['navSecondId'] + '\');">&nbsp;' + nav2nd['navSecondName'] + '</a></li>';   // <span className="badge badge-danger ml-2" style="vertical-align: super !important;">4</span>
                if (navSecondId_ === nav2nd['navSecondId']) {
                    titleHtml += '<span class="font-small"> / ' + nav2nd['navSecondName'] + '</span>';
                }
            });
            menuHtml += '</ul>';
            menuHtml += '</div>';
        } else {
            menuHtml += '<a class="collapsible-header waves-effect ' + strBold + '" href="#" onclick="mzGoToMenu(\'' + nav['navPage'] + '\', \'' + nav['navId'] + '\', \'0\');"><i style="min-width: 25px;"  class="' + nav['navIcon'] + '"></i> ' + nav['navName'] + '</a>';
            if (navId_ === nav['navId']) {
                titleHtml += nav['navName'];
            }
        }
        menuHtml += '</li>';
        $('#ulNavLeft').append(menuHtml);
    });
    $('#pBasePageTitle').append(titleHtml);
    $('.collapsible').collapsible();
}

function mzCheckInternal () {
    // const token = sessionStorage.getItem('t');
    // navId = parseInt(sessionStorage.getItem('navId'));
    // navSecondId = parseInt(sessionStorage.getItem('navSecondId'));
    // let userInfo = sessionStorage.getItem('userInfo');

    // $('#spanUserFullName').text(mzEscapeString(mzGetUserInfoByParam('userFullName')));
    
    // const localDbMain = new LocalDb('main');
    // localDbMain.indexedConnect().then(() => {
    //   Promise.all([
    //       localDbMain.indexedGetArray('ref_role', 'roleId'),
    //   ]).then(responses => {
    //       $('#spanUserFullName').text(mzEscapeString(mzGetUserInfoByParam('userFullName')) + ' (' + responses[0][mzGetUserInfoByParam('roleId')]['roleName'] + ')');
    //   });
    // }).catch(()=>{ toastr['error'](_ALERT_MSG_ERROR_DEFAULT, _ALERT_TITLE_ERROR); });

    // if (token === null) {
    //     window.location.href = '/login?f=4';
    // } else if (userInfo === null || navId === null || navSecondId === null) {
    //     sessionStorage.removeItem('t');
    //     window.location.href = '/login?f=5';
    // }

    // const access = sessionStorage.getItem('a');
    // const objEncrypted = CryptoJS.AES.decrypt(access, 'eSPP').toString(CryptoJS.enc.Utf8);
    // const navAccess = JSON.parse(objEncrypted);
    // const navCode = navSecondId !== 0 ? navId + '_' + navSecondId : navId.toString();
    // if (typeof navAccess[navCode] !== 'undefined') {
    //     accessList = navAccess[navCode];
    // } else {
    //     toastr['error']('Anda tidak mempunyai akses sah untuk halaman ini', _ALERT_TITLE_ERROR);
    // }

    // const userId = mzGetUserId();
    let modalChangePassword = new ModalChangePassword();
    let modalChangeProfile = new ModalChangeProfile();
    let modalNotification = new ModalNotification();

    $('#btnChangePassword').on('click', function () {
        modalChangePassword.edit(123);
    });

    $('#btnChangeProfile').on('click', function () {
        modalChangeProfile.edit(123);
    });

    $('#btnNotification').on('click', function () {
        modalNotification.edit(123);
    });

    setupPages(false);
}

function setupPages(isExternal) {
    //versionLocal_ = mzGetDataVersion(isExternal);
    //$(".button-collapse").sideNav();

    //let container = document.querySelector('.custom-scrollbar');
    /*Ps.initialize(container, {
        wheelSpeed: 2,
        wheelPropagation: true,
        minScrollbarLength: 20
    });*/

    // Material Select Initialization
    $(document).ready(function () {
        $('.mdb-select').materialSelect({visibleOptions: 15});
        $('.select-wrapper.md-form.md-outline input.select-dropdown').bind('focus blur', function () {
            $(this).closest('.select-outline').find('label').toggleClass('active');
            $(this).closest('.select-outline').find('.caret').toggleClass('active');
        });
        $(".mdb-lightbox-ui").load("mdb-addons/mdb-lightbox-ui.html");
        $(".button-collapse").sideNav2();
        const sideNavScrollbar = document.querySelector('.custom-scrollbar');
        const ps = new PerfectScrollbar(sideNavScrollbar);
    });

    // Tooltips Initialization
    $('[data-toggle="tooltip"]').tooltip();

    // Dismissible Popover
    $('[data-toggle="popover"]').popover();
    $('.popover-dismiss').popover({
        trigger: 'focus'
    });

    $('.dropdown-toggle').dropdown();

    // Data Picker Initialization
    /* $('.datepicker').pickadate(
        {monthsFull: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
            'November', 'December'],
        monthsShort: ['Jan', 'Feb', 'Mac', 'Apr', 'Mei', 'Jun', 'Jul', 'Ogo', 'Sep', 'Okt',
            'Nov', 'Dis'],
        weekdaysShort: ['Ahd', 'Isn', 'Sel', 'Rab', 'Kha', 'Jum', 'Sab'],
        weekdaysFull: ['Ahad', 'Isnin', 'Selasa', 'Rabu', 'Khamis', 'Jumaat', 'Sabtu'],
        today: 'Hari ini',
        clear: 'Padam',
        close: 'Batal'}
    ); */
    $('.datepicker').pickadate(
      {
        monthsFull: ['Januari', 'Februari', 'Mac', 'April', 'Mei', 'Jun', 'Julai', 'Ogos', 'September', 'Oktober', 'November', 'Disember'],
        monthsShort: ['Jan', 'Feb', 'Mac', 'Apr', 'Mei', 'Jun', 'Jul', 'Ogo', 'Sep', 'Okt', 'Nov', 'Dis'],
        weekdaysShort: ['Ahd', 'Isn', 'Sel', 'Rab', 'Kha', 'Jum', 'Sab'],
        weekdaysFull: ['Ahad', 'Isnin', 'Selasa', 'Rabu', 'Khamis', 'Jumaat', 'Sabtu'],
        firstDay: 1,
        today: 'Hari ini',
        clear: 'Padam',
        close: 'Batal'
      }
    );
    $('.datepicker2').pickadate(
      {
        monthsFull: ['Januari', 'Februari', 'Mac', 'April', 'Mei', 'Jun', 'Julai', 'Ogos', 'September', 'Oktober', 'November', 'Disember'],
        monthsShort: ['Jan', 'Feb', 'Mac', 'Apr', 'Mei', 'Jun', 'Jul', 'Ogo', 'Sep', 'Okt', 'Nov', 'Dis'],
        weekdaysShort: ['Ahd', 'Isn', 'Sel', 'Rab', 'Kha', 'Jum', 'Sab'],
        weekdaysFull: ['Ahad', 'Isnin', 'Selasa', 'Rabu', 'Khamis', 'Jumaat', 'Sabtu'],
        firstDay: 1,
        today: 'Hari ini',
        clear: 'Padam',
        close: 'Batal',
        format: 'dd/mm/yyyy',
        formatSubmit: 'dd/mm/yyyy',
      }
    );
    // $('.datepicker2').placeholder('DD/MM/YYYY');
    $('.timepicker').pickatime({
        autoclose: true
    });

    // Toast Initialization
    toastr.options = {
        "closeButton": true, // true/false
        "debug": false, // true/false
        "newestOnTop": false, // true/false
        "progressBar": true, // true/false
        "positionClass": "md-toast-top-right", // md-toast-top-right / md-toast-top-left / md-toast-bottom-right / md-toast-bottom-left
        "preventDuplicates": false,// true/false
        "onclick": null,
        "showDuration": "500", // in milliseconds
        "hideDuration": "1000", // in milliseconds
        "timeOut": "5000", // in milliseconds
        "extendedTimeOut": "1000", // in milliseconds
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
}

function mzGetUserId() {
    let userInfo = sessionStorage.getItem('userInfo');
    const objEncrypted = CryptoJS.AES.decrypt(userInfo, 'eSPP').toString(CryptoJS.enc.Utf8);
    userInfo = JSON.parse(objEncrypted);
    return userInfo['userId'];
}

function mzDateFromTo(startId, endId) {
    // Get the elements
    let from_input = $('#'+startId).pickadate(),
        from_picker = from_input.pickadate('picker');
    let to_input = $('#'+endId).pickadate(),
        to_picker = to_input.pickadate('picker');

    // Check if there’s a “from” or “to” date to start with and if so, set their appropriate properties.
    if (from_picker.get('value')) {
        to_picker.set('min', from_picker.get('select'));
    }
    if (to_picker.get('value')) {
        from_picker.set('max', to_picker.get('select'));
    }

    // Apply event listeners in case of setting new “from” / “to” limits to have them update on the other end. If ‘clear’ button is pressed, reset the value.
    from_picker.on('set', function (event) {
        if (event.select) {
            to_picker.set('min', from_picker.get('select'));
        } else if ('clear' in event) {
            to_picker.set('min', false);
        }
    });
    to_picker.on('set', function (event) {
        if (event.select) {
            from_picker.set('max', to_picker.get('select'));
        } else if ('clear' in event) {
            from_picker.set('max', false);
        }
    });
}

function mzDateFromToReset(startId, endId) {
    // Get the elements
    const from_input = $('#'+startId).pickadate();
    let from_picker = from_input.pickadate('picker');
    const to_input = $('#'+endId).pickadate();
    let to_picker = to_input.pickadate('picker');

    to_picker.set('min', false);
    from_picker.set('max', false);
}

function mzSetMinDate(id, dateInput) {
    const picker_input = $('#'+id).pickadate();
    let picker_value = picker_input.pickadate('picker');
    if (dateInput === true) {
        picker_value.set('min', true);
    } else if (dateInput === false) {
        picker_value.set('min', false);
    } else {
        const dateSplit = dateInput.split('-');
        if (dateSplit.length === 3) {
            let day = parseInt(dateSplit[2]);
            let month = parseInt(dateSplit[1]);
            let year = parseInt(dateSplit[0]);
            picker_value.set('min', [year, month-1, day]);
        }
    }
}

function mzSetMaxDate(id, dateInput) {
    const picker_input = $('#'+id).pickadate();
    let picker_value = picker_input.pickadate('picker');
    if (dateInput === true) {
        picker_value.set('max', true);
    } else if (dateInput === false) {
        picker_value.set('max', false);
    } else {
        const dateSplit = dateInput.split('-');
        if (dateSplit.length === 3) {
            let day = parseInt(dateSplit[2]);
            let month = parseInt(dateSplit[1]);
            let year = parseInt(dateSplit[0]);
            picker_value.set('max', [year, month-1, day]);
        }
    }
}

function mzDateDisable(dateId, dateStr) {
    const dateArr = dateStr.split('/');
    const date_input = $('#'+dateId).pickadate();
    let date_picker = date_input.pickadate('picker');
    date_picker.set('disable', [[parseInt(dateArr[0]), parseInt(dateArr[1])-1, parseInt(dateArr[2])]]);
}

function mzDateEnable(dateId, dateStr) {
    const dateArr = dateStr.split('/');
    const date_input = $('#'+dateId).pickadate();
    let date_picker = date_input.pickadate('picker');
    date_picker.set('enable', [[parseInt(dateArr[0]), parseInt(dateArr[1])-1, parseInt(dateArr[2])]]);
}

function mzConvertDate(dateInput) {
    if (typeof dateInput === 'undefined' || dateInput === '') {
        return null;
    }
    let dateNew = null;
    const dateSplit = dateInput.split(" ");
    if (dateSplit.length === 3) {
        let day = dateSplit[0];
        let month = dateSplit[1];
        let year = dateSplit[2];
        if (day.length === 1) {
            day = '0' + day;
        }
        dateNew = year + '-' + mzConvertMonth(month.slice(0, -1)) + '-' + day;
    }
    return dateNew;
}

function mzDateDisplay(dateInput) {
    if (dateInput === null || dateInput === '') {
        return '';
    }
    let dateNew = '';
    const dateSplit = dateInput.split('-');
    if (dateSplit.length === 3) {
        let day = dateSplit[2];
        let month = dateSplit[1];
        let year = dateSplit[0];
        const monthArray = mzGetMonthArray();
        dateNew = monthArray[parseInt(month)-1]['monthShort'] + ' ' + parseInt(day) + ', ' + year;
    }
    return dateNew;
}

function mzConvertDateDisplay (dateInput) {
    if (typeof dateInput === 'undefined') {
        return '';
    }
    let fullDateStr = '';
    let timeNew = '';
    const monthsFull = ['', 'Januari', 'Februari', 'Mac', 'April', 'Mei', 'Jun', 'Julai', 'Ogos', 'September', 'Oktober',
        'November', 'Disember'];

    const datePart = dateInput.substring(0, 10);
    let dateSplit = datePart.split("/");
    if (dateSplit.length !== 3) {
        dateSplit = datePart.split("-");
        if (dateSplit.length !== 3) {
            return '';
        }
    }
    const day = dateSplit[2];
    const month = dateSplit[1];
    const year = dateSplit[0];
    let dateNew = parseInt(day) + ' ' + monthsFull[parseInt(month)] + ', ' + year;
    if (dateInput.length === 19) {
        timeNew = dateInput.substring(11);
        fullDateStr = dateNew + ', ' + timeNew;
    } else {
        fullDateStr = dateNew;
    }
    return fullDateStr;
}

function mzConvertTimeDisplay (timeInput) {
    if (typeof timeInput === 'undefined' || (timeInput.length !== 8)) {
        return '';
    }
    const timeSplit = timeInput.split(':');
    if (timeSplit.length !== 3) {
        return '';
    }
    const secs = timeSplit[2];
    const minutes = timeSplit[1];
    const hours = parseInt(timeSplit[0]);
    const ampm = hours < 12 ? 'am' : 'pm';
    const newHour = hours < 12 ? hours : hours-12;
    return newHour.toString() + ':' + minutes + ':' + secs + ampm;
}

function mzConvertMonthEdb(monthInput) {
    switch (monthInput) {
        case 'JAN':
            return 0;
        case 'FEB':
            return 1;
        case 'MAR':
            return 2;
        case 'APR':
            return 3;
        case 'MAY':
            return 4;
        case 'JUN':
            return 5;
        case 'JUL':
            return 6;
        case 'AUG':
            return 7;
        case 'SEP':
            return 8;
        case 'OCT':
            return 9;
        case 'NOV':
            return 10;
        case 'DEC':
            return 11;
        default:
            return '';
    }
}

function mzConvertMonthEdbStr(monthInput) {
    switch (monthInput) {
        case 'JAN':
            return '01';
        case 'FEB':
            return '02';
        case 'MAR':
            return '03';
        case 'APR':
            return '04';
        case 'MAY':
            return '05';
        case 'JUN':
            return '06';
        case 'JUL':
            return '07';
        case 'AUG':
            return '08';
        case 'SEP':
            return '09';
        case 'OCT':
            return '10';
        case 'NOV':
            return '11';
        case 'DEC':
            return '12';
        default:
            return '';
    }
}

function mzConvertMonth(monthInput) {
    switch (monthInput) {
        case 'Januari':
            return '01';
        case 'Februari':
            return '02';
        case 'Mac':
            return '03';
        case 'April':
            return '04';
        case 'Mei':
            return '05';
        case 'Jun':
            return '06';
        case 'Julai':
            return '07';
        case 'Ogos':
            return '08';
        case 'September':
            return '09';
        case 'Oktober':
            return '10';
        case 'November':
            return '11';
        case 'Disember':
            return '12';
        default:
            return '';
    }
}

function maTextMonth(monthInput) {
    switch (monthInput) {
        case '01':
            return 'Januari';
        case '02':
            return 'Februari';
        case '03':
            return 'Mac';
        case '04':
            return 'April';
        case '05':
            return 'Mei';
        case '06':
            return 'Jun';
        case '07':
            return 'Julai';
        case '08':
            return 'Ogos';
        case '09':
            return 'September';
        case '10':
            return 'Oktober';
        case '11':
            return 'November';
        case '12':
            return 'Disember';
        default:
            return '';
    }
}

function mzSetDate (id, dateInput) {
    const dateSplit = dateInput.split('-');
    if (dateSplit.length === 3) {
        let day = parseInt(dateSplit[2]);
        let month = parseInt(dateSplit[1]);
        let year = parseInt(dateSplit[0]);
        const picker_input = $('#'+id).pickadate();
        let picker_value = picker_input.pickadate('picker');
        picker_value.set('select', [year, month-1, day]);
    }
}

function mzEmailShort (emailInput, shortLength) {
    let emailNew = '';
    shortLength = typeof shortLength === 'undefined' ? 20 : shortLength;
    if (emailInput !== null && emailInput.length > shortLength) {
        for (let u = shortLength; u < emailInput.length; u++) {
            if (emailInput.substring(u, u+1) === '@' || emailInput.substring(u, u+1) === '.') {
                emailNew = emailInput.substring(0, u) + '<br>' + emailInput.substring(u);
                break;
            }
        }
    }
    if (emailNew === '') {
        emailNew = emailInput;
    }
    return emailNew;
}

function mzGetDataVersion (isExternal) {
    return mzAjax(isExternal === true ? '../version/external' : '../version', 'GET');
}

function mzGetRef (name, version, api) {
    if (typeof name === 'undefined' || typeof version === 'undefined') {
        throw new Error(_ALERT_MSG_ERROR_DEFAULT);
    }
    if (typeof version[name] === 'undefined' || version[name] === '') {
        throw new Error(_ALERT_MSG_ERROR_DEFAULT);
    }
    let getNew = false;
    let objData;
    let rawData;
    const localData = localStorage.getItem(name);
    if (localData === null) {
        getNew = true;
    } else {
        const objEncrypted = CryptoJS.AES.decrypt(localData, 'eSPP').toString(CryptoJS.enc.Utf8);
        objData = JSON.parse(objEncrypted);
        if (typeof objData.version === 'undefined' || typeof objData.data === 'undefined' || objData.version !== version[name]) {
            getNew = true;
        } else {
            rawData = objData.data;
        }
    }
    if (getNew) {
        rawData = mzAjax(api, 'GET');
        const rawEncrypted = CryptoJS.AES.encrypt(JSON.stringify({version:version[name], data:rawData}), 'iremote');
        localStorage.setItem(name, rawEncrypted);
    }
    return rawData;
}

function mzCmp(a, b) {
    return a[1].localeCompare(b[1]);
}

function mzOptionStopClear(name, required, defaultText) {
    let selectorName = $('#'+name);
    selectorName.materialSelect('destroy');
    if (name === '' || typeof name === 'undefined') {
        throw new Error(_ALERT_MSG_ERROR_DEFAULT);
    }
    if (typeof defaultText === 'undefined' || defaultText === null) {
        defaultText = 'Sila Pilih';
    } else if (defaultText !== '-' && defaultText !== 'Semua') {
        defaultText = 'Pilih '+defaultText;
    }
    removeOptions(document.getElementById(name));
    document.getElementById(name).options[0] = new Option(defaultText, "", true, true);
    if (typeof required !== 'undefined' && required === true) {
        document.getElementById(name).options[0].disabled = true;
    }
    selectorName.prop('disabled', true);
    selectorName.val(null);
    selectorName.materialSelect({visibleOptions: 15});
    selectorName.removeClass('invalid');
    $('#'+name+'Err').html('');
}

function mzOptionStop(name, data, valIndex, filters, required, defaultText, isSort, sortIndex) {
    let selectorName = $('#'+name);
    selectorName.materialSelect({'destroy': true});
    mzOption(name, data, valIndex, filters, required, defaultText, isSort, sortIndex);
    selectorName.prop('disabled', false);
    selectorName.materialSelect({visibleOptions: 15});
    selectorName.removeClass('invalid');
    $('#'+name+'Err').html('');
}

function mzOption(name, data, valIndex, filters, required, defaultText, isSort, sortIndex) {
    if (typeof name === 'undefined' || typeof data === 'undefined') {
        throw new Error(_ALERT_MSG_ERROR_DEFAULT);
    }
    if (name === '') {
        throw new Error(_ALERT_MSG_ERROR_DEFAULT);
    }
    if (typeof defaultText === 'undefined' || defaultText === null) {
        defaultText = 'Sila Pilih';
    } else if (defaultText.substring(0, 3) !== 'All' && defaultText !== 'Tiada' && defaultText !== 'Semua') {
        defaultText = 'Pilih '+defaultText;
    }
    if (typeof isSort === 'undefined') {
        isSort = true;
    }

    const dataFilterArr = typeof filters === 'undefined' ? [] : filters;
    let optionIndex = 0;
    removeOptions(document.getElementById(name));
    document.getElementById(name).options[optionIndex++] = new Option(defaultText, "", true, true);
    if (typeof required !== 'undefined' && required === true) {
        document.getElementById(name).options[0].disabled = true;
    }

    let dataSort = [];
    $.each(data, function (n, u) {
        if (typeof u !== 'undefined' && typeof u[valIndex] !== 'undefined') {
            u['id'] = n;
            dataSort.push(u);
        }
    });

    if (isSort) {
        if (typeof sortIndex !== 'undefined' && sortIndex !== '') {
            dataSort.sort(function(a, b){
                return a[sortIndex].localeCompare(b[sortIndex], 'en', {numeric: true});
            });
        } else {
            dataSort.sort(function(a, b){
                return a[valIndex].localeCompare(b[valIndex]);
            });
        }
    }

    $.each(dataSort, function (n, u) {
        if (typeof u !== 'undefined' && typeof u[valIndex] !== 'undefined') {
            if (dataFilterArr !== '') {
                const keysFilter = Object.keys(dataFilterArr);
                let filterCnt = 0;
                for (let i=0; i<keysFilter.length; i++) {
                    const filterKey = keysFilter[i];
                    const filterVal = dataFilterArr[filterKey];
                    if (typeof u[filterKey] !== 'undefined') {
                        const dataValue = u[filterKey];
                        if (dataValue === filterVal) {
                            filterCnt++;
                        } else if (filterVal !== null && typeof filterVal === 'string' && filterVal.substring(0,1) === '#') {
                            const filterSplit = dataValue.split(',');
                            for (let j=0; j<filterSplit.length; j++) {
                                if (filterSplit[j] === filterVal.substring(1)) {
                                    filterCnt++;
                                    break;
                                }
                            }
                        } else if (filterVal !== null && typeof filterVal === 'string' && filterVal.substring(0,1) === '(') {
                            let filterVal2 = filterVal.substring(1,filterVal.length-1);
                            const filterSplit2 = filterVal2.split(',');
                            for (let j=0; j<filterSplit2.length; j++) {
                                if (filterSplit2[j] == dataValue) {
                                    filterCnt++;
                                    break;
                                }
                            }
                        }
                    }
                }
                if (filterCnt === keysFilter.length) {
                    document.getElementById(name).options[optionIndex++] = new Option(u[valIndex], u['id']);
                }
            } else {
                document.getElementById(name).options[optionIndex++] = new Option(u[valIndex], u['id']);
            }
        }
    });

    $('#' + name).materialSelect({visibleOptions: 15});
    $('#' + name).val(null);
    //$('#lbl' + name.substring(3));
    $('#lbl' + name.substring(3)).removeClass('active').addClass('active');
}

function maOptionStopSecondary(name, data, valIndex, secondaryText, filters, required, defaultText, isSort, sortIndex) {
    let selectorName = $('#'+name);
    selectorName.materialSelect({'destroy': true});
    maOptionSecondary(name, data, valIndex, secondaryText, filters, required, defaultText, isSort, sortIndex);
    selectorName.prop('disabled', false);
    selectorName.materialSelect({visibleOptions: 15});
    selectorName.removeClass('invalid');
    $('#'+name+'Err').html('');
}

function maOptionSecondary(name, data, valIndex, secondaryText, filters, required, defaultText, isSort, sortIndex) {
    if (typeof name === 'undefined' || typeof data === 'undefined') {
        throw new Error(_ALERT_MSG_ERROR_DEFAULT);
    }
    if (name === '') {
        throw new Error(_ALERT_MSG_ERROR_DEFAULT);
    }
    if (typeof defaultText === 'undefined' || defaultText === null) {
        defaultText = 'Sila Pilih';
    } else if (defaultText.substring(0, 3) !== 'All' && defaultText !== 'Tiada') {
        defaultText = 'Pilih '+defaultText;
    }
    if (typeof isSort === 'undefined') {
        isSort = true;
    }

    const dataFilterArr = typeof filters === 'undefined' ? [] : filters;
    let optionIndex = 0;
    removeOptions(document.getElementById(name));
    document.getElementById(name).options[optionIndex++] = new Option(defaultText, "", true, true);
    if (typeof required !== 'undefined' && required === true) {
        document.getElementById(name).options[0].disabled = true;
    }

    let dataSort = [];
    $.each(data, function (n, u) {
        if (typeof u !== 'undefined' && typeof u[valIndex] !== 'undefined') {
            u['id'] = n;
            dataSort.push(u);
        }
    });

    if (isSort) {
        if (typeof sortIndex !== 'undefined' && sortIndex !== '') {
            dataSort.sort(function(a, b){
                return a[sortIndex].localeCompare(b[sortIndex], 'en', {numeric: true});
            });
        } else {
            dataSort.sort(function(a, b){
                return a[valIndex].localeCompare(b[valIndex]);
            });
        }
    }

    $.each(dataSort, function (n, u) {
        if (typeof u !== 'undefined' && typeof u[valIndex] !== 'undefined') {
            if (dataFilterArr !== '') {
                const keysFilter = Object.keys(dataFilterArr);
                let filterCnt = 0;
                for (let i=0; i<keysFilter.length; i++) {
                    const filterKey = keysFilter[i];
                    const filterVal = dataFilterArr[filterKey];
                    if (typeof u[filterKey] !== 'undefined') {
                        const dataValue = u[filterKey];
                        if (dataValue === filterVal) {
                            filterCnt++;
                        } else if (filterVal !== null && typeof filterVal === 'string' && filterVal.substring(0,1) === '#') {
                            const filterSplit = dataValue.split(',');
                            for (let j=0; j<filterSplit.length; j++) {
                                if (filterSplit[j] === filterVal.substring(1)) {
                                    filterCnt++;
                                    break;
                                }
                            }
                        } else if (filterVal !== null && typeof filterVal === 'string' && filterVal.substring(0,1) === '(') {
                            let filterVal2 = filterVal.substring(1,filterVal.length-1);
                            const filterSplit2 = filterVal2.split(',');
                            for (let j=0; j<filterSplit2.length; j++) {
                                if (filterSplit2[j] == dataValue) {
                                    filterCnt++;
                                    break;
                                }
                            }
                        }
                    }
                }
                if (filterCnt === keysFilter.length) {
                    $('<option>').val(u['id']).text(u[valIndex]).data("secondary-text", u[secondaryText]).appendTo('#'+name);
                }
            } else {
                $('<option>').val(u['id']).text(u[valIndex]).data("secondary-text", u[secondaryText]).appendTo('#'+name);
            }
        }
    });

    $('#' + name).val(null);
    $('#lbl' + name.substring(3)).removeClass('active').addClass('active');
}

function removeOptions(selectBox) {
    let i;
    for(i = selectBox.options.length - 1 ; i >= 0 ; i--)
    {
        selectBox.remove(i);
    }
}

function mzChartOption() {
    Highcharts.setOptions({
        exporting: {
            buttons: {
                contextButton: {
                    menuItems: ['viewData', 'viewFullscreen', 'printChart', 'downloadPNG', 'downloadJPEG', 'downloadPDF', 'downloadSVG', 'downloadPDF', 'downloadXLS']
                }
            }
        }
    });
}

function mzSetValue(name, value, type, label) {
    let selector = $('#'+name);
    let selectorName = $('#'+name);
    let selectorLabel = $('#lbl' + name.substring(3));
    if (type === 'text') {
        selector.val('');
        selectorLabel.removeClass('active');
    }
    else if (type === 'textarea') {
        selector.val('');
        selectorLabel.removeClass('active');
    }
    else if (type === 'select') {
        selector.materialSelect('destroy');
        selector.val('');
        selector.materialSelect({visibleOptions: 15});
    }
    else if (type === 'summernote') {
        selector.summernote('code', '');
    }
    else if (type === 'radio2') {
        $('input[name="'+name+'"]').prop('checked', false);
    }
    else if (type === 'check3') {
        $('input[name="'+name+'[]"]').prop('checked', false);
    }

    if (value !== null && value !== '' && value.length !== 0) {
        if (type === 'text') {
            selector.val(value);
            selectorLabel.addClass('active');
        }
        else if (type === 'select') {
            selector.materialSelect('destroy');
            selector.val(value.toString().trim());
            //$('#opt' + name).prevAll('.select-dropdown').children('li:contains('+value+')').trigger('click');
            //$('#lbl'+name).html(label).addClass('active');
            selector.materialSelect({visibleOptions: 15});
        }
        else if (type === 'textarea') {
            selector.val(value);
            selectorLabel.addClass('active');
        }
        else if (type === 'checkSingle') {
            selector.prop('checked', value === label);
        }
        else if (type === 'check') {
            for (let i = 0; i < value.length; i++) {
                $('#'+name+value[i]).prop('checked', true);
            }
        }
        else if (type === 'check2') {
            const arrCheck = value.split(',');
            for (let i = 0; i < arrCheck.length; i++) {
                $('#'+name+arrCheck[i]).prop('checked', true);
            }
        }
        else if (type === 'check3') {
            if (value === true) {
                $('input[name="'+name+'[]"][value="1"]').prop('checked', true);
            } else if (value === false) {
                $('input[name="'+name+'[]"][value="2"]').prop('checked', true);
            }
        }
        else if (type === 'check4') {
            $('input[name="'+name+'[]"][value="'+value+'"]').prop('checked', true);
        }
        else if (type === 'radio') {
            selector.prop('checked', true);
        }
        else if (type === 'radio2') {
            $('input[name="'+name+'"][value="'+value+'"]').prop('checked', true);
        }
        else if (type === 'radio3') {
            if (value === true) {
                $('input[name="'+name+'"][value="1"]').prop('checked', true);
            } else if (value === false) {
                $('input[name="'+name+'"][value="2"]').prop('checked', true);
            } else {
                $('input[name="'+name+'"]').prop('checked', false);
            }
        }
        else if (type === 'date') {
            const dateSplit = value.split("-");
            if (dateSplit.length !== 3) {
                return '';
            }
            const day = parseInt(dateSplit[2]);
            const month = parseInt(dateSplit[1])-1;
            const year = parseInt(dateSplit[0]);
            selector.pickadate('set').set('select', new Date(year, month, day));
        }
        else if (type === 'summernote') {
            selector.summernote('code', value);
        }
    }
}

function mzHandleFileSelect(evt) {
    let id = evt.target.id;
    let f = evt.target.files[0];
    if (typeof f !== 'undefined') {
        let reader = new FileReader();
        reader.onload = (function() {
            return function(e) {
                const binaryData = e.target.result;
                const base64String = window.btoa(binaryData);
                $('#'+id+'Blob').val(base64String);
            };
        })(f);
        reader.readAsBinaryString(f);
    } else {
        $('#'+id+'Blob').val('');
    }
}

function mzSetObjectToArray(objects, id) {
    if (typeof id === 'undefined' || id === '') {
        throw new Error(_ALERT_MSG_ERROR_DEFAULT);
    }

    let returnVal = [];
    $.each(objects, function (n, u) {
        if (typeof u[id] === 'undefined') {
            throw new Error(_ALERT_MSG_ERROR_DEFAULT);
        }
        const rawIndex = parseInt(u[id]);
        if (isNaN(rawIndex)) {
            throw new Error(_ALERT_MSG_ERROR_DEFAULT);
        }
        returnVal[rawIndex] = u;
    });
    return returnVal;
}

function mzIsRoleExist(roleIds) {
    if (typeof roleIds === 'undefined' || roleIds === '') {
        throw new Error(_ALERT_MSG_ERROR_DEFAULT);
    }
    const roleSplit = roleIds.split(',');
    if (roleSplit.length === 0) {
        throw new Error(_ALERT_MSG_ERROR_DEFAULT);
    }

    let result = false;
    let userInfo = sessionStorage.getItem('userInfo');
    const objEncrypted = CryptoJS.AES.decrypt(userInfo, 'eSPP').toString(CryptoJS.enc.Utf8);
    userInfo = JSON.parse(objEncrypted);
    const roles = userInfo['roles'];
    for (let i=0; i<roles.length; i++) {
        for (let j=0; j<roleSplit.length; j++) {
            if (roles[i]['roleId'] === roleSplit[j]) {
                result = true;
                break;
            }
        }
        if (result) {
            break;
        }
    }
    return result;
}

function mzGetUserInfo () {
    let userInfo = sessionStorage.getItem('userInfo');
    const objEncrypted = CryptoJS.AES.decrypt(userInfo, 'eSPP').toString(CryptoJS.enc.Utf8);
    return JSON.parse(objEncrypted);
}

function mzGetUserInfoByParam(parameter) {
    if (typeof parameter === 'undefined' || parameter === '') {
        throw new Error(_ALERT_MSG_ERROR_DEFAULT);
    }
    let userInfo = sessionStorage.getItem('userInfo');
    const objEncrypted = CryptoJS.AES.decrypt(userInfo, 'eSPP').toString(CryptoJS.enc.Utf8);
    userInfo = JSON.parse(objEncrypted);
    return userInfo[parameter];
}

function mzDisableSelect(fieldId, disable) {
    let selector = $('#'+fieldId);
    selector.removeClass('grey lighten-5');
    if (disable) {
        selector.addClass('grey lighten-5');
    }
    selector.materialSelect('destroy');
    selector.prop('disabled', disable);
    selector.materialSelect({visibleOptions: 15});
}

function mzEmptyParams (arrParam) {
    for (let i=0; i<arrParam.length; i++) {
        if (typeof arrParam[i] === 'undefined' || arrParam[i] === '') {
            throw new Error(_ALERT_MSG_ERROR_DEFAULT);
        }
    }
}

function mzDateSetMin(fieldId, dateStr) {
    const dateInput = $('#'+fieldId).pickadate();
    const datePicker = dateInput.pickadate('picker');

    const dateSplit = dateStr.split("/");
    if (dateSplit.length !== 3) {
        throw new Error(_ALERT_MSG_ERROR_DEFAULT);
    }
    const day = parseInt(dateSplit[2]);
    const month = parseInt(dateSplit[1]);
    const year = parseInt(dateSplit[0]);
    datePicker.set('min', new Date(year,month-1, day));
}

function mzDateSetMax(fieldId, dateStr) {
    const dateInput = $('#'+fieldId).pickadate();
    const datePicker = dateInput.pickadate('picker');

    const dateSplit = dateStr.split("/");
    if (dateSplit.length !== 3) {
        throw new Error(_ALERT_MSG_ERROR_DEFAULT);
    }
    const day = parseInt(dateSplit[2]);
    const month = parseInt(dateSplit[1]);
    const year = parseInt(dateSplit[0]);
    datePicker.set('max', new Date(year,month-1, day));
}

function mzGetMonthArray() {
    return [
        {monthId:1, monthName:'January', monthShort:'Jan'},
        {monthId:2, monthName:'February', monthShort:'Feb'},
        {monthId:3, monthName:'March', monthShort:'Mar'},
        {monthId:4, monthName:'April', monthShort:'Apr'},
        {monthId:5, monthName:'May', monthShort:'May'},
        {monthId:6, monthName:'June', monthShort:'Jun'},
        {monthId:7, monthName:'July', monthShort:'Jul'},
        {monthId:8, monthName:'August', monthShort:'Aug'},
        {monthId:9, monthName:'September', monthShort:'Sept'},
        {monthId:10, monthName:'October', monthShort:'Oct'},
        {monthId:11, monthName:'November', monthShort:'Nov'},
        {monthId:12, monthName:'December', monthShort:'Dec'}
    ];
}

function mzGetDayName(inputDate) {
    const thisDate = moment(inputDate);
    switch (thisDate.weekday()) {
        case 0:
            return 'Sunday';
        case 1:
            return 'Monday';
        case 2:
            return 'Tuesday';
        case 3:
            return 'Wednesday';
        case 4:
            return 'Thursday';
        case 5:
            return 'Friday';
        case 6:
            return 'Saturday';
        default:
            return '';
    }
}

function mzGetYearArray() {
    const yearArr = [];
    let dateEarliest = new Date();
    dateEarliest.setFullYear(2012, 8, 1);
    const earliestYear = dateEarliest.getFullYear();
    let dateCurrent = new Date();
    const currentYear = dateCurrent.getFullYear();
    for (let i = earliestYear; i <= currentYear; i++) {
        yearArr.push({yearId:i, yearName:i})
    }
    return yearArr;
}

function mzIsValidDate(s) {  // 31/9/2011
    const bits = s.split('/');
    const d = new Date(bits[2] + '/' + bits[1] + '/' + bits[0]);
    return !!(d && (d.getMonth() + 1) === parseInt(bits[1]) && d.getDate() === Number(bits[0]));
}

function mzIsObject ( obj ) {
    return obj && (typeof obj  === "object");
}

function mzIsArray ( obj ) {
    return mzIsObject(obj) && (obj instanceof Array);
}

function mzOpenPdf (filename, pdfTitle) {
    ShowLoader();
    setTimeout(function () {
        try {
            $('#mpdf_title').html('<i class="far fa-file-pdf text-white"></i> &nbsp;'+pdfTitle);
            //$('#mpdf_iframe').attr('src', '//daftar.pdp.gov.my/api/'+uploadFolder+'/'+uploadFilename+'.pdf');
            $('#mpdf_iframe').attr('src', filename + '?' + new Date().valueOf());
            $('#modal_pdf').modal('show');
        } catch (e) {
            toastr['error'](e.message, _ALERT_TITLE_ERROR);
        }
        HideLoader();
    }, 200);
}

function mzOpenUpload (uploadId) {
    ShowLoader();
    setTimeout(function () {
        try {
            const pdfSrc = mzAjax('pdf/upload/'+uploadId, 'GET');
            $('#mpdf_title').html('<i class="far fa-file-pdf text-white"></i> &nbsp;'+pdfSrc['title']);
            $('#mpdf_iframe').attr('src', pdfSrc['src']);
            $('#modal_pdf').modal('show');
        } catch (e) {
            toastr['error'](e.message, _ALERT_TITLE_ERROR);
        }
        HideLoader();
    }, 200);
}

function mzOpenPdfUpload (uploadFolder, uploadFilename, pdfTitle) {
    ShowLoader();
    setTimeout(function () {
        try {
            $('#mpdf_title').html('<i class="far fa-file-pdf text-white"></i> &nbsp;'+pdfTitle);
            //$('#mpdf_iframe').attr('src', '//daftar.pdp.gov.my/api/'+uploadFolder+'/'+uploadFilename+'.pdf');
            $('#mpdf_iframe').attr('src', 'sbp/admin/'+uploadFolder+'/'+uploadFilename+'.pdf');
            $('#modal_pdf').modal('show');
        } catch (e) {
            toastr['error'](e.message, _ALERT_TITLE_ERROR);
        }
        HideLoader();
    }, 200);
}

function mzDownloadUri (uri, name) {
    // toastr['error']('Fungsi muat turun tidak tersedia buat sementara waktu!', _ALERT_TITLE_WARNING);
    let link = document.createElement("a");
    link.download = name;
    link.href = uri;
    link.click();
}

function mzDownloadBlob (data, type, name) {
    let blob = new Blob([data], {type});
    let url = window.URL.createObjectURL(blob);
    mzDownloadUri(url, name);
    window.URL.revokeObjectURL(url);
}

function mzDisplayImageFileInput(input, targetId) {
    if (input.files && input.files[0]) {
        let reader = new FileReader();
        reader.onload = function(e) {
            $('#'+targetId).attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]); // convert to base64 string
    }
}

function mzChkVal (fieldName) {
    let returnVal = '';
    $("input[name='"+fieldName+"[]']:checked").map(function(){
        returnVal += ','+$(this).val();
    });
    returnVal = returnVal.substring(1);
    return returnVal;
}

function mzChkArr (fieldName) {
    let returnVal = [];
    $("input[name='"+fieldName+"[]']:checked").map(function(){
        returnVal.push($(this).val());
    });
    if (returnVal.length > 0) {
        return returnVal;
    } else {
        return null;
    }
}

function mzNullDate(id) {
    if (typeof id === 'undefined' || id === '') {
        return null;
    }
    const dateInput = $('#'+id).val();
    let dateNew = null;
    const dateSplit = dateInput.split("/");
    if (dateSplit.length === 3) {
        let day = dateSplit[0];
        let month = dateSplit[1];
        let year = dateSplit[2];
        if (day.length === 1) {
            day = '0' + day;
        }
        dateNew = year + '-' + month + '-' + day;
    }
    return dateNew;
}

function mzNullInt (id) {
    let val = $('#'+id).val();
    if (val !== null) {
        val = val.replaceAll(',', '');
    }
    const returnVal = parseInt(val);
    if (isNaN(returnVal)) {
        return null;
    }
    return returnVal;
}

function mzNullString (id) {
    const value = $('#'+id).val();
    if (value === '') {
        return null;
    }
    return value;
}

function maNullPadan (id) {
    const value = $('#'+id).val();
    if (value === 'Padan') {
        return true;
    } else if (value === 'Tidak Padan') {
        return false;
    } else {
        return null;
    }
}

function mzNullFloat (id) {
    let val = $('#'+id).val();
    if (val !== null) {
        val = val.replace(',', '');
    }
    const returnVal = parseFloat(val);
    if (isNaN(returnVal)) {
        return null;
    }
    return returnVal;
}

function mzSpaceString (data) {
    if (data === '' || data === null) {
        return '&nbsp;';
    }
    return data;
}

function mzNullToDash (data) {
    if (data === '' || data === null) {
        return '-';
    }
    return data;
}

function mzNullToEmpty (data) {
    if (data === '' || data === null) {
        return '';
    }
    return data;
}

function mzNullToValue (data, value) {
    if (data === '' || data === null) {
        return value;
    }
    return data;
}

function mzNullRad (name, isInt) {
    const value = $("input[name='"+name+"']:checked").val();
    if (typeof value === 'undefined') {
        return null;
    }
    if (typeof isInt !== 'undefined' && isInt === true) {
        return parseInt(value);
    }
    return value;
}

function mzNullRadBool (name) {
    const value = $("input[name='"+name+"']:checked").val();
    if (typeof value === 'undefined') {
        return null;
    }
    if (value === '1') {
        return true;
    } else if (value === '2') {
        return false;
    } else {
        return null;
    }
}

function mzNullRadBool2 (name) {
    const value = $("input[name='"+name+"']:checked").val();
    if (typeof value === 'undefined') {
        return false;
    }
    if (value === '1') {
        return true;
    } else {
        return false;
    }
}

function mzNullRef (data, ref, refName, isUcase) {
    if (Object.keys(ref).length > 0 && data !== null && typeof ref[data] !== 'undefined') {
        if (typeof isUcase !== 'undefined' && isUcase === true) {
            return (ref[data][refName]).toUpperCase();
        }
        return ref[data][refName];
    }
    return null;
}

function mzBoolDisplay (data, isUcase) {
    if (data === null) {
        return null;
    }
    if (typeof data === 'boolean') {
        if (typeof isUcase !== 'undefined' && isUcase === true) {
            return data ? 'YA' : 'TIDAK';
        }
        return data ? 'Ya' : 'Tidak';
    }
    return data;
}

function mzConvertToChar (value, totalDigit) {
    let x = value + Math.pow(10, totalDigit);
    return (x.toString()).substring(1);
}

function mzEscapeString (val) {
    return val.replace(/\\/g, "");
}

function mzGetLinkRow (selector, dtTable) {
    if (typeof selector === 'undefined' || typeof dtTable === 'undefined') {
        return false;
    }
    const linkId = selector.attr('id');
    const linkIndex = linkId.indexOf('_');
    if (linkIndex > 0) {
        const rowId = linkId.substring(linkIndex + 1);
        return dtTable.row(parseInt(rowId)).data();
    } else {
        toastr['error'](_ALERT_MSG_ERROR_DEFAULT, _ALERT_TITLE_ERROR);
    }
    return false;
}

function mzGetLinkId (selector, dtTable, idName) {
    if (typeof selector === 'undefined' || typeof dtTable === 'undefined' || typeof idName === 'undefined' || idName === '') {
        return false;
    }
    const linkId = selector.attr('id');
    const linkIndex = linkId.indexOf('_');
    if (linkIndex > 0) {
        const rowId = linkId.substring(linkIndex + 1);
        const currentRow = dtTable.row(parseInt(rowId)).data();
        return currentRow[idName];
    } else {
        toastr['error'](_ALERT_MSG_ERROR_DEFAULT, _ALERT_TITLE_ERROR);
    }
    return false;
}

function maConvertInt (id) {
    if ($("#"+id).val().length > 0 ) {
        var x = $("#"+id).val().split(",").join("");
        return parseInt(x);
    }
    return 0;
}

function maPad (str, max) {
    str = str.toString();
    return str.length < max ? maPad("0" + str, max) : str;
}

function maGetCurrency (val) {
    if (val != null) {
        var x = val.toString().match(/^0*(\d+(?:\.(?:(?!0+$)\d)+)?)/)[1];
        var tail = "";
        if (x.indexOf(".") >= 0) {
            tail = x.substring(x.indexOf("."));
            x = x.substring(0, x.indexOf("."));
        }
        return x.replace(/(?!\.)\D/g, "").replace(/(?<=\..*)\./g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",") 
        + tail.replace(/(?!\.)\D/g, "").replace(/(?<=\.\d\d\d\d).*/g, "");
    }
    return '';
}

function maGetFloat (val) {
    if (!isNaN(val) && val !== null) {
        return parseFloat(val);
    } else {
        return null;
    }
}

function maGetNumber (val) {
    if (val != null) {
        return val;
    }
    return '';
}

function maGetPadan (val, id) {
    $('#'+id).removeClass('text-danger text-default');
    if (val == true) {
        $('#'+id).addClass('text-default');
        return 'Padan';
    } else if (val == false) {
        $('#'+id).addClass('text-danger');
        return 'Tidak Padan';
    } else {
        $('#'+id).removeClass('text-danger text-default');
        return null;
    }
}

function maConvertFloat (id) {
    if ($("#"+id).val().length > 0 ) {
        var x = $("#"+id).val().split(",").join("");
        return parseFloat(x);
    }
    return 0;
}

function maNullConvertInt (id) {
    if ($("#"+id).val().length > 0 ) {
        var x = $("#"+id).val().split(",").join("");
        return parseInt(x);
    }
    return null;
}

function maScrollTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function maUpdateNumberFormat(_obj) {
  var num = maGetNumber(_obj.val());
  if(_obj.val() == '' || _obj.val() == null) {
    
  } else {
    _obj.val(num.toLocaleString());
  }
}

function maGetNumber(_str) {
  var arr = _str.split('');
  var out = new Array();
  for(var cnt=0;cnt<arr.length;cnt++) {
      if(isNaN(arr[cnt]) == false) {
          out.push(arr[cnt]);
      }
  }
  return Number(out.join(''));
}

function maReplaceClass(fieldId, class1, class2) {
  $('#'+fieldId).removeClass(class1);
  $('#'+fieldId).addClass(class2);
}

function maDisableClearSelect(fieldId, disable) {
    let selector = $('#'+fieldId);
    selector.prop('disabled', disable);
    selector.materialSelect('destroy');
    if (disable) selector.val(null);
    selector.materialSelect();
}

function maDisableSelect(fieldId, disable) {
    let selector = $('#'+fieldId);
    selector.materialSelect('destroy');
    selector.prop('disabled', disable);
    selector.materialSelect({visibleOptions: 15});
}

function maDisableClearRadio(fieldClass, disable) {
    let selector = $('.'+fieldClass);
    selector.prop('disabled', disable);
    if (disable) selector.prop('checked', false);
}

function maDisableClearCheck(fieldName, disable) {
    let selector = $("input[name='"+fieldName+"']:checkbox");
    selector.prop('disabled', disable);
    if (disable) selector.prop('checked', false);
}

function maDisableCheck(fieldName, disable) {
    let selector = $("input[name='"+fieldName+"']:checkbox");
    selector.prop('disabled', disable);
    // if (disable) selector.prop('checked', false);
}

function maDisableClearInput(fieldId, disable) {
    let selector = $('#'+fieldId);
    selector.prop('disabled', disable);
    if (disable) selector.val(null);
}

function maDisableInput(fieldId, disable) {
    let selector = $('#'+fieldId);
    selector.prop('disabled', disable);
    // if (disable) selector.val(null);
}

function maDisableClearCheckId(fieldId, disable) {
    let selector = $('#'+fieldId);
    selector.prop('disabled', disable);
    if (disable) selector.prop('checked', false);
}

function maDisableClear(fieldId, disable) {
    let selector = $('#'+fieldId);
    selector.prop('disabled', disable);
    if (disable) selector.val(null);
}

function maDisableClearClass(fieldClass, disable) {
    let selector = $('.'+fieldClass);
    selector.prop('disabled', disable);
    if (disable) selector.val(null);
}

function maOptionFromFile(fieldId, fileName) {
  const request = (async () => {
    const response = await fetch("option/"+fileName+".html");
    const options = await response.text();
    var list = document.getElementById(fieldId);
    list.innerHTML = options;
  })();
}

function maIsNullAndUndef(variable) {
    return (variable == null && variable == undefined);
}

function maGetCurrentDate() {
    const d = new Date();
    const currentDate = 
    d.getFullYear() + "-" + 
    ('0' + (d.getMonth()+1)).slice(-2) + "-" + 
    ('0' + d.getDate()).slice(-2) + " " +
    ('0' + d.getHours()).slice(-2) + ":" +
    ('0' + d.getMinutes()).slice(-2) + ":" +
    ('0' + d.getSeconds()).slice(-2) + "";
    return currentDate;
}

function maGetDate() {
    const d = new Date();
    const currentDate = d.getDate() + ' ' + maTextMonth(maPad(d.getMonth() + 1, 2)) + ' ' + d.getFullYear();
    /* d.getFullYear() + "-" +
    ('0' + mzConvertMonth((d.getMonth()+1)).slice(-2)) + "-" +
    ('0' + d.getDate()).slice(-2) + " " +
    ('0' + d.getHours()).slice(-2) + ":" +
    ('0' + d.getMinutes()).slice(-2) + ":" +
    ('0' + d.getSeconds()).slice(-2) + ""; */
    return currentDate;
}

function mzFindMedian (arr) {
    arr.sort((a, b) => a - b);
    const middleIndex = Math.floor(arr.length / 2);
    if (arr.length % 2 === 0) {
        return (arr[middleIndex - 1] + arr[middleIndex]) / 2;
    } else {
        return arr[middleIndex];
    }
}

function maCamelCase(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index == 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
}

function mzDiffSetArray (arr1, arr2) {
    try {
        let diffArr = {'add': [], 'update': [], 'delete': []}
        diffArr['add'] = arr1.filter(x => !arr2.includes(x));
        diffArr['update'] = arr1.filter(x => arr2.includes(x));
        diffArr['delete'] = arr2.filter(x => !arr1.includes(x));
        return diffArr;
    } catch (e) {
        throw new Error(_ALERT_MSG_ERROR_DEFAULT);
    }
}

function maPadananDataKemaskini (arr1, arr2, id, seksyen, subseksyen=null, kod=null, no=null) {
  let promises = [];
  $.each(arr1, function(key, value) {
    if (typeof arr1[key] == 'boolean') {
      if (arr1[key] != arr2[key]) {
        const datas = {
          airpId: id,
          seksyenId: seksyen,
          subseksyenId: subseksyen,
          airpPadananMedan: key,
          airpPadananDataLama: (arr2[key] != null) ? ((arr2[key]) ? 'YA' : 'TIDAK') : null,
          airpPadananDataKemaskini: (arr1[key] != null) ? ((arr1[key]) ? 'YA' : 'TIDAK') : null,
          airpPadananKodMedan: kod,
          airpPadananKodNo: no,
          airpPadananJenis: 'update',
        }
        promises.push(mzFetch('prosesan/airp_padanan', 'POST', datas, false, true));
      }
    } else if (typeof arr1[key] == 'object') {
      if (JSON.stringify(arr1[key]) != JSON.stringify(arr2[key])) {
        const datas = {
          airpId: id,
          seksyenId: seksyen,
          subseksyenId: subseksyen,
          airpPadananMedan: key,
          airpPadananDataLama: arr2[key],
          airpPadananDataKemaskini: arr1[key],
          airpPadananKodMedan: kod,
          airpPadananKodNo: no,
          airpPadananJenis: 'update',
        }
        promises.push(mzFetch('prosesan/airp_padanan', 'POST', datas, false, true));
      }
    } else {
      if ($.trim(arr1[key]) != $.trim(arr2[key])) {
        const datas = {
          airpId: id,
          seksyenId: seksyen,
          subseksyenId: subseksyen,
          airpPadananMedan: key,
          airpPadananDataLama: arr2[key],
          airpPadananDataKemaskini: arr1[key],
          airpPadananKodMedan: kod,
          airpPadananKodNo: no,
          airpPadananJenis: 'update',
        }
        promises.push(mzFetch('prosesan/airp_padanan', 'POST', datas, false, true));
      }
    }
  });

  Promise.all(promises).then((responses) => {
  }).catch(() => { toastr['error'](_ALERT_MSG_ERROR_DEFAULT, _ALERT_TITLE_ERROR); HideLoader(); });
}

function maPadananDataTambah (arr1, id, seksyen, subseksyen=null, kod=null, no=null) {
  let promises = [];
  $.each(arr1, function(key, value) {
    if (typeof arr1[key] == 'boolean') {
      if (arr1[key] != null) {
        const datas = {
          airpId: id,
          seksyenId: seksyen,
          subseksyenId: subseksyen,
          airpPadananMedan: key,
          airpPadananDataLama: null,
          airpPadananDataKemaskini: (arr1[key]) ? 'YA' : 'TIDAK',
          airpPadananKodMedan: kod,
          airpPadananKodNo: no,
          airpPadananJenis: 'add',
        }
        promises.push(mzFetch('prosesan/airp_padanan', 'POST', datas, false, true));
      }
    } else if (typeof arr1[key] == 'object') {
      if (arr1[key] != null) {
        const datas = {
          airpId: id,
          seksyenId: seksyen,
          subseksyenId: subseksyen,
          airpPadananMedan: key,
          airpPadananDataLama: null,
          airpPadananDataKemaskini: arr1[key],
          airpPadananKodMedan: kod,
          airpPadananKodNo: no,
          airpPadananJenis: 'add',
        }
        promises.push(mzFetch('prosesan/airp_padanan', 'POST', datas, false, true));
      }
    } else {
      if (arr1[key] != null) {
        const datas = {
          airpId: id,
          seksyenId: seksyen,
          subseksyenId: subseksyen,
          airpPadananMedan: key,
          airpPadananDataLama: null,
          airpPadananDataKemaskini: arr1[key],
          airpPadananKodMedan: kod,
          airpPadananKodNo: no,
          airpPadananJenis: 'add',
        }
        promises.push(mzFetch('prosesan/airp_padanan', 'POST', datas, false, true));
      }
    }
  });

  Promise.all(promises).then((responses) => {
  }).catch(() => { toastr['error'](_ALERT_MSG_ERROR_DEFAULT, _ALERT_TITLE_ERROR); HideLoader(); });
}

function maPadananDataHapus (arr1, id, seksyen, subseksyen=null, kod=null, no=null) {
  let promises = [];
  $.each(arr1, function(key, value) {
    if (typeof arr1[key] == 'boolean') {
      const datas = {
        airpId: id,
        seksyenId: seksyen,
        subseksyenId: subseksyen,
        airpPadananMedan: key,
        airpPadananDataLama: (arr1[key] != null) ? ((arr1[key]) ? 'YA' : 'TIDAK') : null,
        airpPadananDataKemaskini: null,
        airpPadananKodMedan: kod,
        airpPadananKodNo: no,
        airpPadananJenis: 'delete',
      }
      promises.push(mzFetch('prosesan/airp_padanan', 'POST', datas, false, true));
    } else if (typeof arr1[key] == 'object') {
      const datas = {
        airpId: id,
        seksyenId: seksyen,
        subseksyenId: subseksyen,
        airpPadananMedan: key,
        airpPadananDataLama: mzChkArr(arr1[key]),
        airpPadananDataKemaskini: null,
        airpPadananKodMedan: kod,
        airpPadananKodNo: no,
        airpPadananJenis: 'delete',
      }
      promises.push(mzFetch('prosesan/airp_padanan', 'POST', datas, false, true));
    } else {
      const datas = {
        airpId: id,
        seksyenId: seksyen,
        subseksyenId: subseksyen,
        airpPadananMedan: key,
        airpPadananDataLama: arr1[key],
        airpPadananDataKemaskini: null,
        airpPadananKodMedan: kod,
        airpPadananKodNo: no,
        airpPadananJenis: 'delete',
      }
      promises.push(mzFetch('prosesan/airp_padanan', 'POST', datas, false, true));
    }
  });

  Promise.all(promises).then((responses) => {
  }).catch(() => { toastr['error'](_ALERT_MSG_ERROR_DEFAULT, _ALERT_TITLE_ERROR); HideLoader(); });
}

$(function () {
      $(".alphabet").keydown(function (e) {
          var key = e.keyCode;
          if (!e.shiftKey) {
              if (!(key == 8 || key == 9 || key == 32 || key == 46 || key == 222 || (key >= 35 && key <= 40) || (key >= 65 && key <= 90) || key == 189 || key == 190)) {
                  e.preventDefault();
              }
          }
      });
});

$('.currency4').on('change click keyup input paste',(function (event) {
    $(this).val(function (index, value) {
        var x = value.toString();
        var tail = "";
        if (x.indexOf(".") >= 0) {
            tail = x.substring(x.indexOf("."));
            x = x.substring(0, x.indexOf("."));
        }
        return x.replace(/(?!\.)\D/g, "").replace(/(?<=\..*)\./g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",") 
        + tail.replace(/(?!\.)\D/g, "").replace(/(?<=\.\d\d\d\d).*/g, "");
        return value.replace(/(?!\.)\D/g, "").replace(/(?<=\..*)\./g, "").replace(/(?<=\.\d\d\d\d).*/g, "");
    });
}));

$('.currency2').on('change click keyup input paste',(function (event) {
    $(this).val(function (index, value) {
        return value.replace(/(?!\.)\D/g, "")
        .replace(/(?<=\..*)\./g, "")
        .replace(/(?<=\.\d\d\d).*/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    });
}));

$('.currency').on('change click keyup input paste',(function (event) {
    $(this).val(function (index, value) {
        return value.replace(/(?!\.)\D/g, "")
        .replace(/(?<=\..*)\./g, "")
        .replace(/[.]/g, '')
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    });
}));

$(document).on("input", ".numeric", function() {
    this.value = this.value.replace(/\D/g,'');
});

$(document).on("input", ".uc-text", function() {
    this.value = this.value.toUpperCase();
});

$('.checkbox-radio').change(function() {
    $('input[name="'+this.name+'"]').not(this).prop('checked', false);
});

const dropdowns = document.querySelectorAll('.dropdown-toggle')
/*
const dropdown = [...dropdowns].map((dropdownToggleEl) => new bootstrap.Dropdown(dropdownToggleEl, {
    popperConfig(defaultBsPopperConfig) {
        return { ...defaultBsPopperConfig, strategy: 'fixed' };
    }
}));*/