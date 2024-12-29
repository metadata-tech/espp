function LocalDb (dbName, skip) {

    let request;
    let localDb = {
        'main': {dbName: 'sbp_main', dbVer: 3},
        'reference': {dbName: 'sbp_reference', dbVer: 23},
        'operation': {dbName: 'sbp_operation', dbVer: 18}
    };
    let dbDef = localDb[dbName];
    skip = typeof skip !== 'undefined' ? skip : false;

    this.indexedConnect = () => {
        return new Promise((resolve, reject) => {
            request = indexedDB.open(dbDef.dbName, dbDef.dbVer);
            request.onerror = (event) => {
                console.error(`Database error: ${event.target.errorCode}`);
            };
            request.onupgradeneeded = (e) => {
                dbDef.dbCon = e.target.result;
                if (dbDef.dbName === 'sbp_main') {
                    if (e.oldVersion < 1) {
                        let menu = dbDef.dbCon.createObjectStore('menu', {keyPath: 'navId'});
                        menu.createIndex('navTurn', ['navTurn'], { unique: false });
                        dbDef.dbCon.createObjectStore('sync', {keyPath: 'currentId'});
                        dbDef.dbCon.createObjectStore('ref_status', {keyPath: 'statusId'});
                        let objectMd = dbDef.dbCon.createObjectStore('ref_module', {keyPath: 'moduleId'});
                        objectMd.createIndex('moduleCode', ['moduleCode'], { unique: true });
                        let objectRo = dbDef.dbCon.createObjectStore('ref_role', {keyPath: 'roleId'});
                        objectRo.createIndex('roleType', ['roleType'], { unique: false });
                        objectRo.createIndex('moduleId', ['moduleId'], { unique: false });
                        let objectGr = dbDef.dbCon.createObjectStore('ref_group', {keyPath: 'groupId'});
                        objectGr.createIndex('groupType', ['groupType'], { unique: false });
                        objectGr.createIndex('negeriId', ['negeriId'], { unique: false });
                        objectGr.createIndex('groupStatus', ['groupStatus'], { unique: false });
                    }
                    if (e.oldVersion < 2) {
                        const txn = e.target.transaction;
                        let objectRo = txn.objectStore('ref_role');
                        objectRo.createIndex('roleLevel', ['moduleId', 'roleLevel'], { unique: false });
                    }
                    if (e.oldVersion < 3) {
                        dbDef.dbCon.createObjectStore('sys_user', {keyPath: 'userId'});
                    }
                }
                else if (dbDef.dbName === 'sbp_operation') {
                    if (e.oldVersion < 3) {
                        let objectTk = dbDef.dbCon.createObjectStore('mop_tk', {keyPath: 'tkId'});
                        objectTk.createIndex('blokPerhitunganId', ['blokPerhitunganId'], {unique: false});
                        let objectAi = dbDef.dbCon.createObjectStore('mop_air', {keyPath: 'airId'});
                        objectAi.createIndex('tkId', ['tkId'], {unique: false});
                        objectAi.createIndex('tkId-airNo', ['tkId', 'airNo'], {unique: true});
                    }
                    if (e.oldVersion < 4) {
                        let objectTk = dbDef.dbCon.createObjectStore('mop_rkl_tk', {keyPath: 'tkId'});
                        objectTk.createIndex('blokPerhitunganId', ['blokPerhitunganId'], {unique: false});
                        let objectTkAir = dbDef.dbCon.createObjectStore('mop_rkl_tk_air', {keyPath: 'tkAirId'});
                        objectTkAir.createIndex('tkId', ['tkId'], {unique: false});
                        objectTkAir.createIndex('tkId-airNo', ['tkId', 'airNo'], {unique: true});
                    }
                    if (e.oldVersion < 6) {
                        const txn = e.target.transaction;
                        let objectTk = txn.objectStore('mop_rkl_tk');
                        objectTk.createIndex('blokPerhitunganId-tkNo', ['blokPerhitunganId', 'tkNo'], {unique: false});
                    }
                    if (e.oldVersion < 7) {
                        dbDef.dbCon.deleteObjectStore("mop_air");
                        dbDef.dbCon.deleteObjectStore("mop_tk");
                        let objectUser = dbDef.dbCon.createObjectStore('mop_user', {keyPath: 'userId'});
                        objectUser.createIndex('userRoleId', ['userRoleId'], {unique: false});
                    }
                    if (e.oldVersion < 8) {
                        const txn = e.target.transaction;
                        let objectTk = txn.objectStore('mop_rkl_tk');
                        objectTk.createIndex('pembanciId', ['pembanciId'], {unique: false});
                        objectTk.createIndex('penyeliaId', ['penyeliaId'], {unique: false});
                        objectTk.createIndex('blokPerhitunganId-penyeliaId', ['blokPerhitunganId', 'penyeliaId'], {unique: false});
                    }
                    if (e.oldVersion < 9) {
                        let objectStatus = dbDef.dbCon.createObjectStore('mop_rkl_tk_status', { keyPath: "id", autoIncrement:true });
                        objectStatus.createIndex('tkId', ['tkId'], {unique: false});
                        const txn = e.target.transaction;
                        let objectTk = txn.objectStore('mop_rkl_tk');
                        objectTk.createIndex('statusBorangRklId', ['statusBorangRklId'], {unique: false});
                        objectTk.deleteIndex('blokPerhitunganId-penyeliaId');
                    }
                    if (e.oldVersion < 10) {
                        let objectPertubuhan = dbDef.dbCon.createObjectStore('mop_rkl_pertubuhan', {keyPath: 'pertubuhanId'});
                        objectPertubuhan.createIndex('kodNgDp', ['kodNgDp'], {unique: false});
                        objectPertubuhan.createIndex('pembanciId', ['pembanciId'], {unique: false});
                        objectPertubuhan.createIndex('penyeliaId', ['penyeliaId'], {unique: false});
                    }
                    if (e.oldVersion < 11) {
                        let objectStatus = dbDef.dbCon.createObjectStore('mop_rkl_pertubuhan_status', { keyPath: "id", autoIncrement:true });
                        objectStatus.createIndex('pertubuhanId', ['pertubuhanId'], {unique: false});
                    }
                    if (e.oldVersion < 12) {
                        const txn = e.target.transaction;
                        let objectTk = txn.objectStore('mop_rkl_tk');
                        objectTk.createIndex('pembanciId-statusBorangRklId', ['pembanciId', 'statusBorangRklId'], {unique: false});
                        objectTk.createIndex('penyeliaId-statusBorangRklId', ['penyeliaId', 'statusBorangRklId'], {unique: false});
                        let objectPertubuhan = txn.objectStore('mop_rkl_pertubuhan');
                        objectPertubuhan.createIndex('pembanciId-statusBorangRklId', ['pembanciId', 'statusBorangRklId'], {unique: false});
                        objectPertubuhan.createIndex('penyeliaId-statusBorangRklId', ['penyeliaId', 'statusBorangRklId'], {unique: false});
                    }
                    if (e.oldVersion < 13) {
                        const txn = e.target.transaction;
                        let objectTk = txn.objectStore('mop_rkl_tk');
                        objectTk.createIndex('pembanciId-tkKodResponId', ['pembanciId', 'tkKodResponId'], {unique: false});
                        objectTk.createIndex('penyeliaId-tkKodResponId', ['penyeliaId', 'tkKodResponId'], {unique: false});
                        let objectPertubuhan = txn.objectStore('mop_rkl_pertubuhan');
                        objectPertubuhan.createIndex('pembanciId-pertubuhanKodResponId', ['pembanciId', 'pertubuhanKodResponId'], {unique: false});
                        objectPertubuhan.createIndex('penyeliaId-pertubuhanKodResponId', ['penyeliaId', 'pertubuhanKodResponId'], {unique: false});
                    }
                    if (e.oldVersion < 14) {
                        const txn = e.target.transaction;
                        let objectTk = txn.objectStore('mop_rkl_tk');
                        objectTk.createIndex('tkKod', ['tkKod'], {unique: false});
                        dbDef.dbCon.deleteObjectStore("mop_rkl_tk_status");
                        dbDef.dbCon.deleteObjectStore("mop_rkl_pertubuhan_status");
                        let objectTkStatus = dbDef.dbCon.createObjectStore('mop_rkl_tk_log_status', { keyPath: "tkLogStatusId", autoIncrement:true });
                        objectTkStatus.createIndex('tkId', ['tkId'], {unique: false});
                        let objectPertubuhanStatus = dbDef.dbCon.createObjectStore('mop_rkl_pertubuhan_log_status', { keyPath: "pertubuhanLogStatusId", autoIncrement:true });
                        objectPertubuhanStatus.createIndex('pertubuhanId', ['pertubuhanId'], {unique: false});
                        let objectPertubuhan = txn.objectStore('mop_rkl_pertubuhan');
                        objectPertubuhan.deleteIndex('kodNgDp');
                        objectPertubuhan.createIndex('daerahPentadbiranId', ['daerahPentadbiranId'], {unique: false});
                    }
                    if (e.oldVersion < 15) {
                        dbDef.dbCon.deleteObjectStore("mop_rkl_tk_log_status");
                        dbDef.dbCon.deleteObjectStore("mop_rkl_pertubuhan_log_status");
                        const txn = e.target.transaction;
                        let objectPertubuhan = txn.objectStore('mop_rkl_pertubuhan');
                        objectPertubuhan.createIndex('blokPerhitunganId', ['blokPerhitunganId'], {unique: false});
                    }
                    if (e.oldVersion < 16) {
                        dbDef.dbCon.createObjectStore("mop_rkl_tk_ir_deleted", {keyPath: 'tkIrId'});
                        let objectDel = dbDef.dbCon.createObjectStore("mop_rkl_tk_air_deleted", {keyPath: 'airId'});
                        objectDel.createIndex('tkIrId', ['tkIrId'], { unique: false });
                    }
                    if (e.oldVersion < 18) {
                      const txn = e.target.transaction;
                      let objectTkAir = txn.objectStore('mop_rkl_tk_air');
                      objectTkAir.deleteIndex('tkId-airNo');
                    }
                }
                else if (dbDef.dbName === 'sbp_reference') {
                    if (e.oldVersion < 1) {
                        dbDef.dbCon.createObjectStore('sync', {keyPath: 'currentId'});
                        dbDef.dbCon.createObjectStore('ref_negeri', {keyPath: 'negeriId'});
                        let objectDp = dbDef.dbCon.createObjectStore('ref_daerah_pentadbiran', {keyPath: 'daerahPentadbiranId'});
                        objectDp.createIndex('negeriId', ['negeriId'], { unique: false });
                        let objectDb = dbDef.dbCon.createObjectStore('ref_daerah_banci', {keyPath: 'daerahBanciId'});
                        objectDb.createIndex('negeriId', ['negeriId'], { unique: false });
                        objectDb.createIndex('daerahPentadbiranId', ['daerahPentadbiranId'], { unique: false });
                        let objectBp = dbDef.dbCon.createObjectStore('ref_blok_perhitungan', {keyPath: 'blokPerhitunganId'});
                        objectBp.createIndex('daerahBanciId', ['daerahBanciId'], { unique: false });
                        dbDef.dbCon.createObjectStore('ref_pengenalan_diri', {keyPath: 'pengenalanDiriId'});
                        dbDef.dbCon.createObjectStore('ref_hubungan_kir', {keyPath: 'hubunganKirId'});        
                        let objectEt = dbDef.dbCon.createObjectStore('ref_etnik', {keyPath: 'etnikId'});
                        objectEt.createIndex('etnikJenis', ['etnikJenis'], { unique: false });
                        dbDef.dbCon.createObjectStore('ref_warganegara', {keyPath: 'warganegaraId'});
                        dbDef.dbCon.createObjectStore('ref_taraf_perkahwinan', {keyPath: 'tarafPerkahwinanId'});
                        dbDef.dbCon.createObjectStore('ref_sijil_tertinggi', {keyPath: 'sijilTertinggiId'});
                        dbDef.dbCon.createObjectStore('ref_penglibatan_pertanian', {keyPath: 'penglibatanPertanianId'});
                        let objectSp = dbDef.dbCon.createObjectStore('ref_selain_pertanian', {keyPath: 'selainPertanianId'});
                        objectSp.createIndex('selainPertanianSektor', ['selainPertanianSektor'], { unique: false });
                        dbDef.dbCon.createObjectStore('ref_kementerian', {keyPath: 'kementerianId'});
                        let objectAp = dbDef.dbCon.createObjectStore('ref_agensi_pertanian', {keyPath: 'agensiPertanianId'});
                        objectAp.createIndex('kementerianId', ['kementerianId'], { unique: false });
                        dbDef.dbCon.createObjectStore('ref_agensi_wilayah', {keyPath: 'agensiWilayahId'});
                        dbDef.dbCon.createObjectStore('ref_taraf_pekerjaan', {keyPath: 'tarafPekerjaanId'});
                        dbDef.dbCon.createObjectStore('ref_kategori_pekerjaan', {keyPath: 'kategoriPekerjaanId'});
                        let objectPb = dbDef.dbCon.createObjectStore('ref_pbt', {keyPath: 'pbtId'});
                        objectPb.createIndex('daerahPentadbiranId', ['daerahPentadbiranId'], { unique: false });
                        let objectMm = dbDef.dbCon.createObjectStore('ref_mukim', {keyPath: 'mukimId'});
                        objectMm.createIndex('daerahPentadbiranId', ['daerahPentadbiranId'], { unique: false });
                        objectMm.createIndex('daerahPentadbiranId-mukimKod', ['daerahPentadbiranId', 'mukimKod'], { unique: true });
                        let objectMk = dbDef.dbCon.createObjectStore('ref_mukim_kecil', {keyPath: 'mukimKecilId'});
                        objectMk.createIndex('mukimId', ['mukimId'], { unique: false });
                        dbDef.dbCon.createObjectStore('ref_strata', {keyPath: 'strataId'});
                        dbDef.dbCon.createObjectStore('ref_jenis_bp', {keyPath: 'jenisBpId'});
                        dbDef.dbCon.createObjectStore('ref_kategori_bp', {keyPath: 'kategoriBpId'});
                        dbDef.dbCon.createObjectStore('ref_jenis_tk', {keyPath: 'jenisTkId'});
                        let objectPr = dbDef.dbCon.createObjectStore('ref_parlimen', {keyPath: 'parlimenId'});
                        objectPr.createIndex('negeriId', ['negeriId'], { unique: false });
                        let objectAd = dbDef.dbCon.createObjectStore('ref_adun', {keyPath: 'adunId'});
                        objectAd.createIndex('parlimenId', ['parlimenId'], { unique: false });
                        dbDef.dbCon.createObjectStore('ref_wilayah_ekonomi', {keyPath: 'wilayahEkonomiId'});
                    }
                    if (e.oldVersion < 2) {
                        dbDef.dbCon.createObjectStore('ref_file_type', {keyPath: 'fileTypeId'});
                        let objectA = dbDef.dbCon.createObjectStore('ref_audit_type', {keyPath: 'auditTypeId'});
                        objectA.createIndex('moduleId', ['moduleId'], { unique: false });
                    }
                    if (e.oldVersion < 6) {
                        //dbDef.dbCon.deleteObjectStore("ref_jantina");
                        dbDef.dbCon.createObjectStore('ref_jantina', {keyPath: 'jantinaId'});
                    }
                    if (e.oldVersion < 9) {
                        dbDef.dbCon.createObjectStore('ref_pendaftaran_perniagaan', {keyPath: 'pendaftaranPerniagaanId'});
                        dbDef.dbCon.createObjectStore('ref_status_borang_rkl', {keyPath: 'statusBorangRklId'});
                        dbDef.dbCon.createObjectStore('ref_kod_respon_ir', {keyPath: 'kodResponIrId'});
                        dbDef.dbCon.createObjectStore('ref_kod_respon_pertubuhan', {keyPath: 'kodResponPertubuhanId'});
                    }
                    if (e.oldVersion < 13) {
                        dbDef.dbCon.createObjectStore('ref_jenis_pendaftaran', {keyPath: 'jenisPendaftaranId'});
                        dbDef.dbCon.createObjectStore('ref_legal_status', {keyPath: 'legalStatusId'});
                        dbDef.dbCon.createObjectStore('ref_msic', {keyPath: 'msicId'});
                        dbDef.dbCon.createObjectStore('ref_pejabat_operasi', {keyPath: 'pejabatOperasiId'});
                        dbDef.dbCon.createObjectStore('ref_sektor_msbr', {keyPath: 'sektorMsbrId'});
                        let objectSs = dbDef.dbCon.createObjectStore('ref_sub_sektor_msbr', {keyPath: 'subSektorMsbrId'});
                        objectSs.createIndex('sektorMsbrId', ['sektorMsbrId'], { unique: false });
                    }
                    if (e.oldVersion < 14) {
                        dbDef.dbCon.createObjectStore('ref_msic_section', {keyPath: 'msicSectionId'});
                        let objectMsd = dbDef.dbCon.createObjectStore('ref_msic_division', {keyPath: 'msicDivisionId'});
                        objectMsd.createIndex('msicSectionId', ['msicSectionId'], { unique: false });
                        let objectMsg = dbDef.dbCon.createObjectStore('ref_msic_group', {keyPath: 'msicGroupId'});
                        objectMsg.createIndex('msicDivisionId', ['msicDivisionId'], { unique: false });
                        let objectMsc = dbDef.dbCon.createObjectStore('ref_msic_class', {keyPath: 'msicClassId'});
                        objectMsc.createIndex('msicGroupId', ['msicGroupId'], { unique: false });
                        const txn = e.target.transaction;
                        let objectMsi = txn.objectStore('ref_msic');
                        objectMsi.createIndex('msicClassId', ['msicClassId'], { unique: false });
                    }
                    if (e.oldVersion < 15) {
                        const txn = e.target.transaction;
                        let objectPo = txn.objectStore('ref_pejabat_operasi');
                        objectPo.createIndex('negeriId', ['negeriId'], { unique: false });
                    }
                    if (e.oldVersion < 17) {
                        dbDef.dbCon.createObjectStore('ref_status_qc', {keyPath: 'statusQcId'});
                    }
                    if (e.oldVersion < 18) {
                        dbDef.dbCon.createObjectStore('ref_kod_respon_qc', {keyPath: 'kodResponQcId'});
                    }
                    if (e.oldVersion < 19) {
                        let objectQcv = dbDef.dbCon.createObjectStore('ref_qc_variable', {keyPath: 'qcVariableId'});
                        objectQcv.createIndex('qcVariableTurn', ['qcVariableTurn'], { unique: true });
                    }
                    if (e.oldVersion < 20) {
                        dbDef.dbCon.createObjectStore('ref_status_kotak', {keyPath: 'statusKotakId'});
                    }
                    if (e.oldVersion < 21) {
                        dbDef.dbCon.createObjectStore('ref_pusat_prosesan', {keyPath: 'pusatProsesanId'});
                    }
                    if (e.oldVersion < 22) {
                        const txn = e.target.transaction;
                        let objectPs = txn.objectStore('ref_pusat_prosesan');
                        objectPs.createIndex('negeriId', ['negeriId'], { unique: false });
                    }
                    if (e.oldVersion < 23) {
                        const txn = e.target.transaction;
                        let objectPs = txn.objectStore('ref_daerah_pentadbiran');
                        objectPs.createIndex('pusatProsesanId', ['pusatProsesanId'], { unique: false });
                    }
                }
            };
            request.onsuccess = (e) => {
                dbDef.dbCon = e.target.result;
                if (skip) {
                    resolve();
                } else if (dbDef.dbName === 'sbp_main') {
                    this.indexedGetAll('sync').then((res) => {
                        if (res.length === 0) {
                            this.indexedAdd('sync', {currentId: 1, currentValue: 0}).then(() => {
                                mzFetch('main/changes/0').then((res) => {
                                    if (res.length > 0) {
                                        this.updateChanges(res).then((res) => {
                                            resolve();
                                        });
                                    } else {
                                        resolve();
                                    }
                                });
                            }).catch((e)=>{
                                console.log(e);
                                reject(e);
                            });
                        } else {
                            mzFetch('main/changes/'+res[0]['currentValue']).then((res) => {
                                if (res.length > 0) {
                                    this.updateChanges(res).then((res) => {
                                        resolve();
                                    });
                                } else {
                                    resolve();
                                }
                            });
                        }
                    });
                } else if (dbDef.dbName === 'sbp_reference') {
                    this.indexedGetAll('sync').then((res) => {
                        if (typeof res[0] === 'undefined' || res[0]['currentValue'] < 110857) {
                            console.log('error sync id');
                            reject('error sync id');
                        } else {
                            const changeId = res[0]['currentValue'];
                            this.updateChangesRef(changeId).then(() => {
                                resolve();
                            }).catch((e)=>{
                                console.log(e);
                                reject(e);
                            });
                        }
                    });
                    /*Promise.all([
                        this.updateChangesRef(108501),
                        this.updateChangesRef(108502),
                        this.updateChangesRef(108503),
                        this.updateChangesRef(108504)
                    ]).then(responses => {
                        console.log(responses);
                        resolve();
                    }).catch((e)=>{
                        console.log(e);
                        reject(e);
                    });*/
                } else {
                    resolve();
                }
            };
            request.onerror = (e) => {
                console.log(e);
                reject(e);
            }
        });
    };

    this.updateChangesRef = (changeId) => {
        return new Promise((resolve, reject) => {
            mzFetch('reference/changes/'+changeId).then((res) => {
                let changeIds = changeId;
                let changeIdSync = changeId;
                $.each(res, function (storeName, data) {
                    let trx = dbDef.dbCon.transaction([storeName], "readwrite").objectStore(storeName);
                    for (const row of data) {
                        const changesAction = row['changesAction'];
                        if (changesAction === 'add') {
                            trx.add(row['changesData']);
                        } else if (changesAction === 'put') {
                            trx.put(row['changesData']);
                        } else if (changesAction === 'delete') {
                            trx.delete(row['changesKey']);
                        }
                        changeIdSync = row['changesId'];
                    }
                    if (changeIdSync > changeIds) {
                        changeIds = changeIdSync;
                    }
                });
                if (changeIds >= changeId) {
                    this.indexedPut('sync', 1, {currentValue: changeIds}).then(() => {
                        resolve();
                    });
                } else {
                    resolve();
                }
            }).catch((e)=>{
                console.log(e);
            });
        });
    };

    this.initiateChangesRef = (type, changeId) => {
        return new Promise((resolve, reject) => {
            mzFetch('reference/changes/'+type+'/'+changeId).then((res) => {
                if (res.length > 0) {
                    //this.updateChanges(res).then((res2) => {
                        //resolve();
                    //});
                } else {
                    resolve();
                }
            }).catch((e)=>{
                console.log(e);
            });
        });
    };

    this.syncDb = () => {
        return new Promise((resolve, reject) => {
            this.indexedGet('sync', 1).then((res2) => {
                mzFetch('reference/changes/'+res2['currentValue']).then((res) => {
                    if (res.length > 0) {
                        this.updateChanges(res).then((res) => {
                            resolve('sync success');
                        });
                    } else {
                        resolve('no update');
                    }
                });
            }).catch((e)=>{
                console.log(e);
                reject(e);
            });
        });
    };

    this.addBlokPerhitungan = (data) => {
        return new Promise((resolve, reject) => {
            let changeId = 0;
            let trx = dbDef.dbCon.transaction(['ref_blok_perhitungan'], "readwrite").objectStore('ref_blok_perhitungan');
            for (let i = 0; i < data.length; i++) {
                trx.add(data[i]['changesData']);
                changeId = data[i]['changesId'];
            }
            resolve(changeId);
            trx.onerror = (e) => {
                reject(e);
            }
        });
    }

    this.indexedAddMultiple = (storeName, data) => {
        return new Promise((resolve, reject) => {
            let changeId = 0;
            let trx = dbDef.dbCon.transaction([storeName], "readwrite").objectStore(storeName);
            for (let i = 0; i < data.length; i++) {
                trx.add(data[i][1]);
                changeId = data[i][0];
            }
            resolve(changeId);
            trx.onerror = (e) => {
                reject(e);
            }
        });
    }

    this.indexedSyncMultiple = (storeName, data) => {
        return new Promise((resolve, reject) => {
            let changeId = 0;
            let trx = dbDef.dbCon.transaction([storeName], "readwrite").objectStore(storeName);
            for (let i = 0; i < data.length; i++) {
                const changesAction = data[i][1]['changesAction'];
                if (changesAction === 'add') {
                    trx.add(data[i][1]);
                } else if (changesAction === 'put') {
                    trx.put(data[i][1]);
                } else if (changesAction === 'delete') {
                    trx.delete(data[i][1]['changesKey']);
                }
                changeId = data[i][0];
            }
            resolve(changeId);
            trx.onerror = (e) => {
                reject(e);
            }
        });
    }

    this.updateChanges = async function (res) {
        let changeId = 0;
        for (let i = 0; i < res.length; i++) {
            const changesAction = res[i]['changesAction'];
            if (changesAction === 'add') {
                await this.indexedAdd(res[i]['changesName'], res[i]['changesData']);
            } else if (changesAction === 'put') {
                await this.indexedPut(res[i]['changesName'], res[i]['changesKey'], res[i]['changesData']);
            } else if (changesAction === 'delete') {
                await this.indexedDelete(res[i]['changesName'], res[i]['changesKey']);
            }
            changeId = res[i]['changesId'];
        }
        if (changeId > 0) {
            await this.indexedPut('sync', 1, {currentValue: changeId});
        }
    };

    this.indexedCount = (storeName) => {
        return new Promise((resolve, reject) => {
            let trx = dbDef.dbCon.transaction([storeName]).objectStore(storeName);
            trx = trx.count();
            trx.onsuccess = (r) => {
                resolve(r.target.result);
            }
            trx.onerror = (e) => {
                reject(e);
            }
        });
    };

    this.indexedGet = (storeName, key) => {
        return new Promise((resolve, reject) => {
            let trx = dbDef.dbCon.transaction([storeName]).objectStore(storeName);
            trx = trx.get(key);
            trx.onsuccess = (r) => {
                if (r.target.result === undefined) {
                    reject(`[readDB] ${storeName}, key: ${key} not found`);
                } else {
                    resolve(r.target.result);
                }
            }
            trx.onerror = (e) => {
                reject(e);
            }
        });
    };

    this.indexedGetAll = (storeName) => {
        return new Promise((resolve, reject) => {
            let trx = dbDef.dbCon.transaction([storeName]).objectStore(storeName);
            trx = trx.getAll();
            trx.onsuccess = (r) => {
                if (r.target.result === undefined) {
                    reject(`[readDB] ${storeName}, key: ${key} not found`);
                } else {
                    resolve(r.target.result);
                }
            }
            trx.onerror = (e) => {
                reject(e);
            }
        });
    };

    this.indexedGetAllSort = (storeName, indexSort, direction) => {
        return new Promise((resolve, reject) => {
            let trx = dbDef.dbCon.transaction([storeName]);
            let objectStore = trx.objectStore(storeName);
            let request = objectStore.index(indexSort).openCursor(null, direction);
            let result = [];
            request.onsuccess = (r) => {
                let cursor = r.target.result;
                if (cursor) {
                    result.push(cursor.value);
                    cursor.continue();
                } else {
                    resolve(result);
                }
            }
            request.onerror = (e) => {
                reject(e);
            }
        });
    };

    this.indexedGetArray = (storeName, indexName, displayCode, displayName, displayNameType) => {
        return new Promise((resolve, reject) => {
            let trx = dbDef.dbCon.transaction([storeName]).objectStore(storeName);
            trx = trx.getAll();
            trx.onsuccess = (r) => {
                let newArr = {};
                const results = r.target.result;
                for (let i = 0; i < results.length; i++) {
                    if (typeof displayCode !== 'undefined' && typeof displayName !== 'undefined' && typeof displayNameType !== 'undefined') {
                        results[i]['display'] = results[i][displayCode] + ' - ' + results[i][displayName] + ' (' + results[i][displayNameType] + ')';
                    }
                    else if (typeof displayCode !== 'undefined' && typeof displayName !== 'undefined') {
                        if (results[i][displayName] !== '-') {
                            results[i]['display'] = results[i][displayCode] + ' ' + mzNullToEmpty(results[i][displayName]);
                        } else {
                            results[i]['display'] = results[i][displayCode];
                        }
                    }
                    newArr[results[i][indexName]] = results[i];
                }
                resolve(newArr);
            }
            trx.onerror = (e) => {
                reject(e);
            }
        });
    };

    this.indexedGetArrayFilter = (storeName, indexName, filterIndex, filterValue, displayCode, displayName) => {
        return new Promise((resolve, reject) => {
            let trx = dbDef.dbCon.transaction([storeName]).objectStore(storeName);
            const branchIndex = trx.index(filterIndex);
            const filters = typeof filterValue === 'object' ? filterValue : [filterValue];
            const query = branchIndex.getAll(filters);
            query.onsuccess = (r) => {
                let newArr = {};
                const results = r.target.result;
                for (let i = 0; i < results.length; i++) {
                    if (typeof displayCode !== 'undefined' && typeof displayName !== 'undefined') {
                        results[i]['display'] = results[i][displayCode] + ' ' + results[i][displayName];
                    } else if (typeof displayCode !== 'undefined') {
                        results[i]['display'] = results[i][displayCode];
                    }
                    newArr[results[i][indexName]] = results[i];
                }
                resolve(newArr);
            }
            query.onerror = (e) => {
                reject(e);
            }
        });
    };

    this.indexedGetAllFilter = (storeName, indexName, filterValue) => {
        return new Promise((resolve, reject) => {
            let trx = dbDef.dbCon.transaction([storeName]).objectStore(storeName);
            const branchIndex = trx.index(indexName);
            const filters = typeof filterValue === 'object' ? filterValue : [filterValue];
            const query = branchIndex.getAll(filters);
            query.onsuccess = (r) => {
                resolve(r.target.result);
            }
            query.onerror = (e) => {
                reject(e);
            }
        });
    };

    this.indexedGetFilter = (storeName, indexName, filterValue) => {
        return new Promise((resolve, reject) => {
            let trx = dbDef.dbCon.transaction([storeName]).objectStore(storeName);
            const branchIndex = trx.index(indexName);
            const filters = typeof filterValue === 'object' ? filterValue : [filterValue];
            const query = branchIndex.get(filters);
            query.onsuccess = (r) => {
                resolve(r.target.result);
            }
            query.onerror = (e) => {
                reject(e);
            }
        });
    };

    this.indexedAppend = (storeName, newData) => {
        return new Promise((resolve, reject) => {
            let trx = dbDef.dbCon.transaction([storeName], "readwrite").objectStore(storeName);
            const objectStoreRequest = trx.clear();
            objectStoreRequest.onsuccess = (event) => {
                newData.map(row => trx.put(row));
                resolve(`[appendDB] -> ${storeName}, Task finished`);
            };
            trx.onerror = (e) => {
                reject(e);
            }
        });
    };

    this.indexedAdd = (storeName, newData) => {
        return new Promise((resolve, reject) => {
            let trx = dbDef.dbCon.transaction([storeName], "readwrite").objectStore(storeName);
            trx.add(newData);
            resolve(`[addDB] -> ${storeName}, Task finished`);
            trx.onerror = (e) => {
                reject(e);
            }
        });
    };

    this.indexedAdds = (storeName, newData) => {
        return new Promise((resolve, reject) => {
            let trx = dbDef.dbCon.transaction([storeName], "readwrite").objectStore(storeName);
            $.each(newData, function(key,value) {
                trx.add(value);
            });
            resolve(`[addMultiple] -> ${storeName}, Task finished`);
            trx.onerror = (e) => {
                reject(e);
            }
        });
    };

    this.indexedPut = (storeName, key, newData) => {
        return new Promise((resolve, reject) => {
            let trx = dbDef.dbCon.transaction([storeName], "readwrite").objectStore(storeName);
            let req = trx.get(key);
            req.onsuccess = (r) => {
                if (r.target.result !== undefined) {
                    let data = r.target.result;
                    Array.from(Object.keys(newData)).map((i) => {
                        data[i] = newData[i];
                    });
                    let upd = trx.put(data);
                    upd.onsuccess = (e) => {
                        resolve(`[updateDB] ${dbDef.dbName}, updated ${key} `);
                    }
                } else {
                    resolve(`[updateDB] ${storeName}, key: ${key} not found`);
                }
            }
            req.onerror = (e) => {
                reject(e);
            }
        });
    };

    this.indexedDelete = (storeName, key) => {
        return new Promise((resolve, reject) => {
            let trx = dbDef.dbCon.transaction([storeName], "readwrite").objectStore(storeName);
            let req = trx.delete(key);
            req.onsuccess = () => {
                resolve();
            }
            req.onerror = (e) => {
                reject(e);
            }
        });
    }
    
    this.indexedClear = (storeName) => {
        return new Promise((resolve, reject) => {
            let trx = dbDef.dbCon.transaction([storeName], "readwrite").objectStore(storeName);
            let req = trx.clear();
            req.onsuccess = () => {
                resolve();
            }
            req.onerror = (e) => {
                reject(e);
            }
        });
    }
}