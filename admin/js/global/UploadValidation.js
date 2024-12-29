function UploadValidation () {

    let self = this;
    let status = '';
    let action = '';
    let idIndex = null;
    let codeIndex = null;
    let refData;
    let idValue = null;
    let codeValue = null;
    let totalSuccess = 0;
    let totalFail = 0;
    let codeArr = [];
    let validationArr = [];
    let isIdSeq = false;
    const boolArr = ['Ya', 'Tidak', 'YA', 'TIDAK', 'ya', 'tidak', 1, 0];

    this.init = function (_idIndex, _codeIndex, _isIdSeq) {
        try {
            mzEmptyParams([_idIndex, _codeIndex, _isIdSeq]);
            idIndex = _idIndex;
            codeIndex = _codeIndex;
            isIdSeq = _isIdSeq;
            totalSuccess = 0;
            totalFail = 0;
            codeArr = [];
            validationArr = [];
        } catch (e) { throw new Error(_ALERT_MSG_ERROR_DEFAULT); }
    };

    this.initRow = function () {
        validationArr = [];
        action = '';
        codeValue = null;
    };

    this.validate = function (fieldValue, validator, fieldLabel, isString, isCode, isBoolean) {
        try {
            if (typeof fieldValue === 'undefined') {
                fieldValue = null;
            } else if (typeof isString !== 'undefined' && isString) {
                fieldValue = fieldValue.toString().trim();
                if (fieldValue === '') {
                    fieldValue = null;
                }
            }
            $.each(validator, function (n, u) {
                checkField(fieldValue, n, u, fieldLabel);
            });
            if (typeof isCode !== 'undefined' && isCode) {
                codeValue = fieldValue;
                if (codeValue !== null) {
                    codeArr.push(codeValue.toString());
                }
            }
            if (typeof isBoolean !== 'undefined' && isBoolean && boolArr.includes(fieldValue)) {
                fieldValue = $.inArray(fieldValue, ['YA', 'ya', 'Ya', 1]) !== -1;
            }
            return fieldValue;
        } catch (e) { throw new Error(_ALERT_MSG_ERROR_DEFAULT); }
    };

    const checkField = function (fieldVal, type, val, fieldLbl) {
        try {
            switch (type) {
                case 'notEmpty':
                case 'notEmptyRadio':
                    if (val === true && (fieldVal === '' || fieldVal === null)) {
                        validationArr.push(fieldLbl+' mandatori');
                    }
                    break;
                case 'eqLength':
                    if (fieldVal === null || fieldVal.toString().length !== val) {
                        validationArr.push(fieldLbl+' saiz mesti '+val);
                    }
                    break;
                case 'maxLength':
                    if (fieldVal !== null && fieldVal.toString().length > val) {
                        validationArr.push(fieldLbl+' maksimum saiz '+val);
                    }
                    break;
                case 'minLength':
                    if (fieldVal === null || fieldVal.toString().length < val) {
                        validationArr.push(fieldLbl+' minimum saiz '+val);
                    }
                    break;
                case 'numeric':
                    if (val === true && fieldVal !== null && !mzValidNumeric(fieldVal)) {
                        validationArr.push(fieldLbl+' mesti numerik');
                    }
                    break;
                case 'digit':
                    if (val === true && fieldVal !== null && !mzValidDigit(fieldVal)) {
                        validationArr.push(fieldLbl+' mesti nombor');
                    }
                    break;
                case 'inList':
                    if (fieldVal !== null && !val.includes(fieldVal)) {
                        validationArr.push(fieldLbl+' tidak wujud');
                    }
                    break;
                case 'similar':
                    if (fieldVal !== null && fieldVal !== val) {
                        validationArr.push(fieldLbl+' tidak tepat');
                    }
                    break;
                case 'isBool':
                    if (val === true && fieldVal !== null && !boolArr.includes(fieldVal)) {
                        validationArr.push(fieldLbl+' salah');
                    }
                    break;
                default:
                    break;
            }
            return true;
        } catch (e) { console.log(e.message); }
    };

    this.setRefData = function (_refData, _isCodeString) {
        try {
            refData = _isCodeString ? {} : [];
            $.each(_refData, function (n, u) {
                if (isIdSeq) {
                    refData[u[codeIndex]] = u;
                } else {
                    refData[u[idIndex]] = u;
                }
            });
        } catch (e) { throw new Error(_ALERT_MSG_ERROR_DEFAULT); }
    };

    this.pushError = function (errorLbl) {
        validationArr.push(errorLbl);
    };

    this.getStatus = function () {
        if (validationArr.length === 0) {
            totalSuccess++;
        } else {
            totalFail++;
        }
        return validationArr;
    };

    this.getAction = function () {
        return action;
    };

    this.getActionById = function () {
        if (typeof refData[idValue] !== 'undefined') {
            action = 'Kemaskini';
        } else {
            action = 'Tambah';
        }
        return action;
    };

    this.getIdValue = function (_isIdInt) {
        idValue = null;
        if (codeValue !== null && typeof _isIdInt !== 'undefined' && _isIdInt === true && typeof refData[parseInt(codeValue)] !== 'undefined') {
            idValue = refData[parseInt(codeValue)][idIndex];
            action = 'Kemaskini';
        } else if (codeValue !== null && typeof refData[codeValue] !== 'undefined') {
            idValue = refData[codeValue][idIndex];
            action = 'Kemaskini';
        } else {
            action = 'Tambah';
        }
        return idValue;
    };

    this.getIdValueUpdate = function (code, _isIdInt) {
        idValue = null;
        if (typeof _isIdInt !== 'undefined' && _isIdInt === true && typeof refData[parseInt(code)] !== 'undefined') {
            idValue = refData[parseInt(code)][idIndex];
            action = 'Kemaskini';
        } else if (typeof refData[code] !== 'undefined') {
            idValue = refData[code][idIndex];
            action = 'Kemaskini';
        } else {
            action = 'Tambah';
        }
        return idValue;
    };

    this.getTotalSuccess = function () {
        return totalSuccess;
    };

    this.getTotalFail = function () {
        return totalFail;
    };

    this.addTotalSuccess = function () {
        return ++totalSuccess;
    };

    this.minusTotalSuccess = function () {
        return --totalSuccess;
    };

    this.addTotalFail = function () {
        return ++totalFail;
    };

    this.minusTotalFail = function () {
        return --totalFail;
    };

    this.getCodeArr = function () {
        return codeArr;
    };

    this.removeIndexCodeArr = function (_code) {
        if (_code === null) {
            return false;
        }
        if (_code !== '') {
            const index = codeArr.indexOf(_code.toString());
            if (index !== -1) {
                codeArr.splice(index, 1);
            }
        }
    };

    this.addIndexCodeArr = function (_code) {
        if (_code !== null && _code !== '') {
            codeArr.push(_code.toString());
        }
    };

    this.getDuplicateArr = function () {
        const arr = self.getCodeArr();
        return [...new Set(arr.filter((e, i, a) => a.indexOf(e) !== i))];
    };

    this.adjustDuplication = function (previousCode,  dtData, lblPrefix) {
        if (previousCode !== null) {
            const duplicateCodeArr = self.getDuplicateArr();
            if (!duplicateCodeArr.includes(previousCode.toString())) {
                dtData.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
                    const dataRow = this.data();
                    let status = dataRow['status'];
                    if (dataRow[codeIndex] === previousCode && status.length > 0) {
                        if (status.length === 1 && status[0] === 'Kod duplikasi') {
                            $('#'+lblPrefix+'TotalSuccess').text(mzFormatNumber(self.addTotalSuccess()));
                            $('#'+lblPrefix+'TotalFail').text(mzFormatNumber(self.minusTotalFail()));
                        }
                        const index = status.indexOf('Kod duplikasi');
                        if (index > -1) {
                            status.splice(index);
                            dataRow['status'] = status;
                        }
                        dtData.row(rowIdx).data(dataRow).draw(false);
                    }
                });
            }
        }
    };

    this.registerDuplication = function (data) {
        const duplicateCodeArr = self.getDuplicateArr();
        for (let i = 0; i < data.length; i++) {
            const code = data[i][codeIndex] !== null ? (data[i][codeIndex]).toString() : '';
            if (duplicateCodeArr.includes(code)) {
                let status = data[i]['status'];
                if (status.length === 0) {
                    self.minusTotalSuccess();
                    self.addTotalFail();
                }
                status.push('Kod duplikasi');
                data[i]['status'] = status;
            }
        }
        return data;
    };

    this.checkDuplication = function (data) {
        const duplicateCodeArr = self.getDuplicateArr();
        const code = data[codeIndex] !== null ? (data[codeIndex]).toString() : '';
        if (duplicateCodeArr.includes(code)) {
            let status = data['status'];
            if (status.length === 0) {
                self.minusTotalSuccess();
                self.addTotalFail();
            }
            status.push('Kod duplikasi');
            data['status'] = status;
        }
        return data;
    };

    this.recalculateTotal = function (statusArr) {
        if (statusArr.length === 0) {
            self.minusTotalSuccess();
            self.addTotalFail();
        }
    };
}
