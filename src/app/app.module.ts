import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import "materialize-css";
import { MaterializeModule } from 'angular2-materialize';
import { Geolocation } from '@ionic-native/geolocation';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { AppVersion } from '@ionic-native/app-version';
import { SocialSharing } from '@ionic-native/social-sharing';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CatalougePageModule } from '../pages/catalouge/catalouge.module';
import { ProductsPageModule } from '../pages/products/products.module';
import { NewArrivalsPageModule } from '../pages/new-arrivals/new-arrivals.module';
import { ProductDetailsPageModule } from '../pages/product-details/product-details.module';
import { ContactusPageModule } from '../pages/contactus/contactus.module';
import { EnquiryPageModule } from '../pages/enquiry/enquiry.module';
import { AboutusPageModule } from '../pages/aboutus/aboutus.module';
import { EventPageModule } from '../pages/event/event.module';
import { SearchPageModule } from '../pages/search/search.module';
import { NetworkPageModule } from '../pages/network/network.module';
import { ConstantProvider } from '../providers/constant/constant';
import { CatalougeProvider } from '../providers/catalouge/catalouge';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { SubcategoryPageModule } from '../pages/subcategory/subcategory.module';
import { ArrivalserviceProvider } from '../providers/arrivalservice/arrivalservice';
import { EnquiryserviceProvider } from '../providers/enquiryservice/enquiryservice';
import { AboutserviceProvider } from '../providers/aboutservice/aboutservice';
import { SearchserviceProvider } from '../providers/searchservice/searchservice';
import { BrandPageModule } from '../pages/brand/brand.module';
import { LoginPageModule } from '../pages/login/login.module';
import { OtpverifyPageModule } from '../pages/otpverify/otpverify.module';
import { ProductdetailserviceProvider } from '../providers/productdetailservice/productdetailservice';
import { LoginserviceProvider } from '../providers/loginservice/loginservice';
import { LeadsListPageModule } from '../pages/leads-list/leads-list.module';
import { LeadsDetailPageModule } from '../pages/leads-detail/leads-detail.module';
import { RetailerPageModule } from '../pages/retailer/retailer.module';
import { MyserviceProvider } from '../providers/myservice/myservice';
import { AddOrderPageModule } from '../pages/add-order/add-order.module';
import { FilterProvider } from '../providers/filter/filter';
import { FollowupPageModule } from '../pages/followup/followup.module';
import { OrderListPageModule } from '../pages/order-list/order-list.module';
import { DistributorListPageModule } from '../pages/sales-app/distributor-list/distributor-list.module';
import { IonicSelectableModule } from 'ionic-selectable';
import { DistributorDetailPageModule } from '../pages/sales-app/distributor-detail/distributor-detail.module';
import { OrderDetailPageModule } from '../pages/order-detail/order-detail.module';
import { SignupPageModule } from '../pages/signup/signup.module';
import { SelectRegistrationTypePageModule } from '../pages/select-registration-type/select-registration-type.module';
import { AttendencePageModule } from '../pages/attendence/attendence.module';
import { FollowupserviceProvider } from '../providers/followupservice/followupservice';
import { AttendenceserviceProvider } from '../providers/attendenceservice/attendenceservice';
import { AddLeadsPageModule } from '../pages/sales-app/add-leads/add-leads.module';
import { CheckinListPageModule } from '../pages/sales-app/checkin-list/checkin-list.module';
import { AddCheckinPageModule } from '../pages/sales-app/add-checkin/add-checkin.module';
import { AddDealerPageModule } from '../pages/sales-app/add-dealer/add-dealer.module';
import { EndCheckinPageModule } from '../pages/sales-app/end-checkin/end-checkin.module';
import { DealerListPageModule } from '../pages/sales-app/dealer-list/dealer-list.module';
import { DirectDealerListPageModule } from '../pages/sales-app/direct-dealer-list/direct-dealer-list.module';
import { GeolocationserviceProvider } from '../providers/geolocationservice/geolocationservice';
import { DashboardPageModule } from '../pages/dashboard/dashboard.module';
import { PointLocationPageModule } from '../pages/point-location/point-location.module';
import { CheckinDetailPageModule } from '../pages/sales-app/checkin-detail/checkin-detail.module';
import { ProfilePageModule } from '../pages/profile/profile.module';
import { CustomerCheckinPageModule } from '../pages/sales-app/customer-checkin/customer-checkin.module';
import { MainDistributorListPageModule } from '../pages/sales-app/main-distributor-list/main-distributor-list.module';
import { Push } from '@ionic-native/push';
import { OrderTypeModalPageModule } from '../pages/order-type-modal/order-type-modal.module';
import { OrderDetailPage } from '../pages/order-detail/order-detail';
import { CustomerOrderPageModule } from '../pages/sales-app/customer-order/customer-order.module';
import { CartDetailPageModule } from '../pages/cart-detail/cart-detail.module';
import { OffersPageModule } from '../pages/plumber-app/offers/offers.module';
import { OfferDetailPageModule } from '../pages/plumber-app/offer-detail/offer-detail.module';
import { OfferListPageModule } from '../pages/plumber-app/offer-list/offer-list.module';
import { SelectSearchableModule } from 'ionic-select-searchable';
import { AddDistributionPageModule } from '../pages/sales-app/add-distribution/add-distribution.module';
import { EditNetworkPageModule } from '../pages/sales-app/edit-network/edit-network.module';
import { TargetListPageModule } from '../pages/target-list/target-list.module';
import { FilterpopupPageModule } from '../pages/filterpopup/filterpopup.module';
import { AddLeavePageModule } from '../pages/add-leave/add-leave.module';
import { LeaveListPageModule } from '../pages/leave-list/leave-list.module';
import { TravelAddPageModule } from '../pages/travel-add/travel-add.module';
import { TravelListPageModule } from '../pages/travel-list/travel-list.module';
import { WorkTypeModalPageModule } from '../pages/work-type-modal/work-type-modal.module';
import { OfferCategoryPageModule } from '../pages/offer-category/offer-category.module';
import { OfferSubCategoryPageModule } from '../pages/offer-sub-category/offer-sub-category.module';
import { OfferProductListPageModule } from '../pages/offer-product-list/offer-product-list.module';
import { Camera } from '@ionic-native/camera';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { MyWalletPageModule } from '../pages/my-wallet/my-wallet.module';
import { WalletHistoryPageModule } from '../pages/wallet-history/wallet-history.module';
import { TermConditionPageModule } from '../pages/term-condition/term-condition.module';
import { DealerSurveyPageModule } from '../pages/dealer-survey/dealer-survey.module';
import { DealerSurveyListPageModule } from '../pages/dealer-survey-list/dealer-survey-list.module';
import { PlumberProfilePageModule } from '../pages/plumber-profile/plumber-profile.module';
import { MenuPageModule } from '../pages/menu/menu.module';
import { Network } from '@ionic-native/network';
import { GstCalculatorPageModule } from '../pages/gst-calculator/gst-calculator.module';
import { AddCpOrderPageModule } from '../pages/channel-partner-app/add-cp-order/add-cp-order.module';
import { LedgerPageModule } from '../pages/channel-partner-app/ledger/ledger.module';
import { CpOrderCartPageModule } from '../pages/channel-partner-app/cp-order-cart/cp-order-cart.module';
import { CpOrderListPageModule } from '../pages/channel-partner-app/cp-order-list/cp-order-list.module';
import { CpDiscountPageModule } from '../pages/channel-partner-app/cp-discount/cp-discount.module';
import { FileTransfer} from '@ionic-native/file-transfer';
import { WorkPlanPageModule } from '../pages/work-plan/work-plan.module';
import { MomentModule } from 'ngx-moment';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
  ],
  imports: [
    BrowserModule,
    MomentModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      links: [
        {component:OrderDetailPage,name:'Detail',segment: 'detail/:userId'}
      ]
   }),
    IonicStorageModule.forRoot(),
    MaterializeModule,
    SelectSearchableModule,
    CatalougePageModule,
    ProductsPageModule,
    NewArrivalsPageModule,
    ProductDetailsPageModule,
    ContactusPageModule,
    EnquiryPageModule,
    AboutusPageModule,
    EventPageModule,
    SearchPageModule,
    NetworkPageModule,
    SubcategoryPageModule,
    BrandPageModule,
    LoginPageModule,
    OtpverifyPageModule,
    LeadsListPageModule,
    LeadsDetailPageModule,
    RetailerPageModule,
    FollowupPageModule,
    OrderListPageModule,
    AddOrderPageModule,
    DistributorListPageModule,
    IonicSelectableModule,
    DistributorDetailPageModule,
    OrderDetailPageModule,
    SignupPageModule,
    SelectRegistrationTypePageModule,
    AttendencePageModule,
    AddLeadsPageModule,
    CheckinListPageModule,
    AddCheckinPageModule,
    AddDealerPageModule,
    EndCheckinPageModule,
    DealerListPageModule,
    DirectDealerListPageModule,
    DashboardPageModule,
    PointLocationPageModule,
    CheckinDetailPageModule,
    ProfilePageModule,
    CustomerCheckinPageModule,
    MainDistributorListPageModule,
    OrderTypeModalPageModule,
    CustomerOrderPageModule,
    CartDetailPageModule,
    OffersPageModule,
    OfferDetailPageModule,
    OfferListPageModule,
    AddDistributionPageModule,
    EditNetworkPageModule,
    TargetListPageModule,
    FilterpopupPageModule,
    AddLeavePageModule,
    LeaveListPageModule,
    TravelAddPageModule,
    TravelListPageModule,
    WorkTypeModalPageModule,
    OfferCategoryPageModule,
    OfferSubCategoryPageModule,
    OfferProductListPageModule,
    MyWalletPageModule,
    WalletHistoryPageModule,
    TermConditionPageModule,
    DealerSurveyPageModule,
    DealerSurveyListPageModule,
    PlumberProfilePageModule,
    MenuPageModule,
    GstCalculatorPageModule,
    AddCpOrderPageModule,
    LedgerPageModule,
    CpOrderCartPageModule,
    CpOrderListPageModule,
    CpDiscountPageModule,
    WorkPlanPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ConstantProvider,
    CatalougeProvider,
    ArrivalserviceProvider,
    EnquiryserviceProvider,
    AboutserviceProvider,
    SearchserviceProvider,
    ProductdetailserviceProvider,
    LoginserviceProvider,
    MyserviceProvider,
    FilterProvider,
    SocialSharing,
    FollowupserviceProvider,
    AttendenceserviceProvider,
    Geolocation,
    BackgroundGeolocation,
    GeolocationserviceProvider,
    LocationAccuracy,
    Push,
    AppVersion,
    Camera,
    BarcodeScanner,
    Network,
    FileTransfer
  ]
})
export class AppModule {}
