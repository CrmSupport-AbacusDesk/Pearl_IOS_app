webpackJsonp([1],{

/***/ 989:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LeaveDetailPageModule", function() { return LeaveDetailPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__leave_detail__ = __webpack_require__(993);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var LeaveDetailPageModule = /** @class */ (function () {
    function LeaveDetailPageModule() {
    }
    LeaveDetailPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__leave_detail__["a" /* LeaveDetailPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__leave_detail__["a" /* LeaveDetailPage */]),
            ],
        })
    ], LeaveDetailPageModule);
    return LeaveDetailPageModule;
}());

//# sourceMappingURL=leave-detail.module.js.map

/***/ }),

/***/ 993:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LeaveDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the LeaveDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LeaveDetailPage = /** @class */ (function () {
    function LeaveDetailPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    LeaveDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LeaveDetailPage');
    };
    LeaveDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-leave-detail',template:/*ion-inline-start:"/Users/vikasbehl/Downloads/avtar/pearl/pearlJuneUpdate/pearl-App/src/pages/leave-detail/leave-detail.html"*/'<ion-header class="catalogue-header" no-border>\n	<ion-navbar>\n		<ion-title>My Leaves</ion-title>\n		<!-- <ion-buttons end class="login-btn">\n			<button ion-button>\n				<img class="w30" src="assets/icons/profil-ic-2.svg" alt="">\n			</button>\n		</ion-buttons> -->\n	</ion-navbar>\n</ion-header>\n\n<ion-content style="background: #f4f4f4;" class="after-none">\n	\n	<div class="gradient h80"></div>\n	\n	<div class="list">\n		<div class="box m16 border-radius" style="margin-top: -80px !important;">\n			<div class="heading">\n				<p class="date">6 DEC 2018  11:53 AM</p>\n			</div>\n			<div class="figure-outer mb6 mt16">\n				<div class="figure-innear dflex white-bg">\n					<div class="cs-figure">\n						<p>From</p>\n						<p>10/DEC/2018</p>\n					</div>\n					<div class="cs-figure border-left">\n						<p>To</p>\n						<p>15/DEC/2018</p>\n					</div>\n				</div>\n			</div> \n			<div class="detail">\n				<p>It is a long established fact that a reader will be distracted by the readable</p>\n			</div>\n		</div>\n	</div>\n	\n	<ion-list radio-group class="select-leave">\n		<ion-list-header>\n			Select Date to cancel Leave\n		</ion-list-header>\n		\n		<ion-item>\n			<ion-label class="dflex"> <p>10 Dec</p> <p>Monday</p> </ion-label>\n			<ion-checkbox></ion-checkbox>\n		</ion-item>\n		\n		<ion-item>\n			<ion-label class="dflex"> <p>11 Dec</p> <p>Tuesday</p> </ion-label>\n			<ion-checkbox></ion-checkbox>\n		</ion-item>\n		\n		<ion-item>\n			<ion-label class="dflex"> <p>12 Dec</p> <p>Wednesday</p> </ion-label>\n			<ion-checkbox checked="true"></ion-checkbox>\n		</ion-item>\n		\n		<ion-item>\n			<ion-label class="dflex"> <p>13 Dec</p> <p>Thursday</p> </ion-label>\n			<ion-checkbox></ion-checkbox>\n		</ion-item>\n		\n		<ion-item>\n			<ion-label class="dflex"> <p>14 Dec</p> <p>Friday</p> </ion-label>\n			<ion-checkbox></ion-checkbox>\n		</ion-item>\n		\n		<ion-item>\n			<ion-label class="dflex"> <p>15 Dec</p> <p>Saturday</p> </ion-label>\n			<ion-checkbox></ion-checkbox>\n		</ion-item>\n\n	</ion-list>\n\n	<div class="cs-btn p16 pt0">\n		<button class="white-bg" ion-button block round outline color="danger" outline>CANCEL LEAVE</button>\n	</div>	\n	\n</ion-content>\n'/*ion-inline-end:"/Users/vikasbehl/Downloads/avtar/pearl/pearlJuneUpdate/pearl-App/src/pages/leave-detail/leave-detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"]])
    ], LeaveDetailPage);
    return LeaveDetailPage;
}());

//# sourceMappingURL=leave-detail.js.map

/***/ })

});
//# sourceMappingURL=1.js.map