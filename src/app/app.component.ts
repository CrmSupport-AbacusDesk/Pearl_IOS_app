import { Component, ViewChild } from '@angular/core';
import { App, Nav, Platform, ToastController, Events, AlertController, MenuController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AppVersion } from '@ionic-native/app-version';
import { HomePage } from '../pages/home/home';
import { ContactusPage } from '../pages/contactus/contactus';
import { EnquiryPage } from '../pages/enquiry/enquiry';
import { AboutusPage } from '../pages/aboutus/aboutus';
import { SearchPage } from '../pages/search/search';
import { ConstantProvider } from '../providers/constant/constant';
import { CatalougeProvider } from '../providers/catalouge/catalouge';
import { Storage } from '@ionic/storage';
import { DistributorListPage } from '../pages/sales-app/distributor-list/distributor-list';
import { MyserviceProvider } from '../providers/myservice/myservice';
import { OrderListPage } from '../pages/order-list/order-list';
import { SelectRegistrationTypePage } from '../pages/select-registration-type/select-registration-type';
import { AttendencePage } from '../pages/attendence/attendence';
import { CheckinListPage } from '../pages/sales-app/checkin-list/checkin-list';
import { DealerListPage } from '../pages/sales-app/dealer-list/dealer-list';
import { DirectDealerListPage } from '../pages/sales-app/direct-dealer-list/direct-dealer-list';
import { GeolocationserviceProvider } from '../providers/geolocationservice/geolocationservice';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { TabsPage } from '../pages/tabs/tabs';
import { AttendenceserviceProvider } from '../providers/attendenceservice/attendenceservice';
import { CatalougePage } from '../pages/catalouge/catalouge';
import { MainDistributorListPage } from '../pages/sales-app/main-distributor-list/main-distributor-list';
import moment from 'moment';
import { TargetListPage } from '../pages/target-list/target-list';
import { LeaveListPage } from '../pages/leave-list/leave-list';
import { TravelListPage } from '../pages/travel-list/travel-list';
import { DealerSurveyListPage } from '../pages/dealer-survey-list/dealer-survey-list';
import { Network } from '@ionic-native/network';
import { NetworkPage } from '../pages/network/network';
import { GstCalculatorPage } from '../pages/gst-calculator/gst-calculator';
import { WorkPlanPage } from '../pages/work-plan/work-plan';



export interface PageInterface {
    title: string;
    name: string;
    component: any;
    icon: string;
    index?: number;
    tabName?: string;
    tabComponent?: any;
    show:any;
}

@Component({
    templateUrl: 'app.html'
})

export class MyApp 
{
    @ViewChild(Nav) nav: Nav;
    
    rootPage: any ;
    user_logged_in:boolean;
    userLoggedRole:any;
    userLoggedDisplayName:any;
    userRoleId:any;
    last_attendence_data:any = [];
    currentTime:any = '';
    userType:any;
    userName:any;
    versionNumber:any;
    userToken:any;
    current_page:any;
    pages: PageInterface[];
    
    constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen , public service: CatalougeProvider,  public constant: ConstantProvider, private app: App, public toastCtrl: ToastController, public events: Events, public storage: Storage,public serve:MyserviceProvider, public track: GeolocationserviceProvider, public locationAccuracy: LocationAccuracy, public attendenceServe: AttendenceserviceProvider, public alertCtrl: AlertController, public menu: MenuController, public appVersion:AppVersion, public network: Network) 
    {
        
        // this.logout();
        
        
        // this.check_network();
        this.initializeApp();
        
        this.currentTime = moment().format("HH:mm:ss");
        
        this.events.subscribe('user:login', () =>
        {
            this.start_time();
        });
        
        
        this.events.subscribe('user:navigation_menu', () =>
        {
            this.open_nav_menu();
        });
        
        this.events.subscribe('side_menu:navigation_bar', () =>
        {
            this.set_pages();
            this.initializeApp();
        });
        
        
        this.events.subscribe('token_val', (val) =>
        {
            console.log('ok'+val);
            if(val)
            {
                this.user_logged_in = true;
                this.set_pages();
            }
        });
        
        
        this.events.subscribe('userName', (val) =>
        {
            console.log('userName'+val);
            if(val)
            {
                this.userName = val;
                this.set_pages();
            }
        });
        
        
        this.events.subscribe('userLoggedRole', (val) =>
        {
            console.log('userLoggedRole'+val);
            if(val)
            {
                this.userLoggedRole = val;
                this.set_pages();
            }
        });
        
        this.events.subscribe('userType', (val) =>
        {
            console.log('userType'+val);
            if(val)
            {
                this.userType = val;
                this.set_pages();
            }
        });
        
        
        this.events.subscribe('userLoggedDisplayName', (val) =>
        {
            console.log('userLoggedDisplayName'+val);
            if(val)
            {
                this.userLoggedDisplayName = val;
                this.set_pages();
            }
        });
        
        
        this.events.subscribe('userRoleId', (val) =>
        {
            console.log('userRoleId'+val);
            if(val)
            {
                this.userRoleId = val;
                this.set_pages();
            }
        });
        
        this.events.subscribe('userToken', (val) =>
        {
            console.log('userToken'+val);
            if(val)
            {
                this.userToken = val;
                this.set_pages();
            }
        });
        
        
        this.storage.get('token').then((token) =>
        {
            console.log(token);
            if(typeof(token) !== 'undefined' && token)
            {
                this.user_logged_in = true;
                console.log(this.user_logged_in);
                this.set_pages();
            }
            else
            {
                this.user_logged_in = false;
                this.rootPage = SelectRegistrationTypePage;
            }
        });
        
        
        this.storage.get('name').then((name) => 
        {
            console.log(name);
            if(typeof(name) !== 'undefined' && name)
            {
                this.userName = name;
                this.set_pages();
            }
        });
        
        
        this.storage.get('role_id').then((roleId) =>
        {
            console.log(roleId);
            if(typeof(roleId) !== 'undefined' && roleId)
            {
                this.userRoleId = roleId;
                this.set_pages();
            }
        });
        
        
        this.storage.get('user_type').then((userType) =>
        {
            console.log(userType);
            if(typeof(userType) !== 'undefined' && userType)
            {
                this.userType = userType;
                console.log(this.userType)
                this.set_pages();
            }
        });
        
        setTimeout(() =>
        {
            this.storage.get('role').then((role) => {
                console.log(role);
                if(typeof(role) !== 'undefined' && role){
                    this.userLoggedRole = role;
                }
                
                if(this.user_logged_in) {
                    
                    this.set_pages();
                }
            });
            
            this.storage.get('displayName').then((displayName) => 
            {
                console.log(displayName);
                if(typeof(displayName) !== 'undefined' && displayName){
                    this.userLoggedDisplayName = displayName;
                }
            });
        }, 1000);
        
        
        this.storage.get('token_value').then((token_value) => 
        {
            console.log(token_value);
            if(typeof(token_value) !== 'undefined' && token_value){
                this.userToken = token_value;
                
                this.set_pages();
            }
        });
        
        this.events.subscribe('current_page', (data) =>
        {
            console.log(data);
            this.current_page = data;
        });
        
        
        platform.registerBackButtonAction(() => 
        {
            const overlayView = this.app._appRoot._overlayPortal._views[0];
            
            if (overlayView && overlayView.dismiss)
            {
                overlayView.dismiss();
                return;
            }
            
            let nav = app.getActiveNav();
            
            if(nav.getActive() != undefined)
            {
                let activeView = nav.getActive().name;
                
                if(activeView == 'LoginPage' || activeView == 'HomePage' || activeView == 'DashboardPage' || activeView == 'SelectRegistrationTypePage') 
                {    
                    if(this.constant.backButton==0) 
                    {    
                        this.constant.backButton=1;
                        
                        let toast = this.toastCtrl.create({
                            message: 'Press again to exit!',
                            duration: 2000
                        });
                        
                        toast.present();
                        
                        setTimeout(() => {
                            this.constant.backButton=0;
                        },2500);
                    }
                    else 
                    {
                        this.platform.exitApp();
                    }
                }
                else 
                {
                    nav.pop();
                }
            }
            else
            {
                this.platform.exitApp();
            }
        });
        
    }
    
    v_num:any;
    
    initializeApp() 
    {
        this.platform.ready().then(() => 
        {
            this.statusBar.styleDefault();
            this.statusBar.overlaysWebView(false);
            this.statusBar.backgroundColorByHexString('#6F0EAB');
            this.splashScreen.hide();
            
            this.start_time();
            
            this.appVersion.getVersionNumber().then((version)=>{
                console.log(version);
                this.versionNumber = version;
                console.log(this.versionNumber);
            });
            
            this.serve.addData({},'Login/ios_app_version').then((result)=>
            {
                console.log(result);
                this.v_num = result['version'];
                
                if(this.v_num!=this.versionNumber)
                {
                let updateAlert = this.alertCtrl.create({
                    title: 'Update Available',
                    message: 'A newer version of this app is available for download. Please update it from PlayStore !',
                    buttons: [
                      {
                    text: 'Cancel',
                    
                    },
                    {
                    text: 'Update Now',
                    handler: () => {
                        
                    window.open("https://apps.apple.com/in/app/pearl-precision/id1472354588");
                        
                    }
                    }]
                    });
                    updateAlert.present();
                }
                })
            });
        }
        
        check_token:any;
        
        check_user_token()
        {
            this.storage.get('token_value').then((token_value)=>
            {
                console.log(token_value);
                
                if(token_value != '')
                {
                    this.serve.addData({},'Login/user_token').then((result)=>
                    {
                        console.log(result);
                        this.check_token = result['user_token'];
                        
                        if(token_value != this.check_token)
                        {
                            this.logout();
                        }
                        else
                        {
                            console.log('token is same');
                        }
                    });
                }
            });
        }
        
        open_nav_menu()
        {
            this.menu.enable(true, 'first');
            this.menu.open('first');
        }
        
        start_time()
        {
            this.storage.get('role_id').then((roleId) => 
            {
                console.log(roleId);
                
                if(typeof(roleId) !== 'undefined' && roleId)
                {
                    this.userRoleId = roleId;
                    
                    if(this.userRoleId)
                    {
                        this.storage.get('token').then((token) => 
                        {    
                            console.log(token);
                            
                            if(typeof(token) !== 'undefined' && token)
                            {
                                this.user_logged_in = true;
                                
                                if(this.user_logged_in)
                                {
                                    this.attendenceServe.last_attendence_data().then((result)=>
                                    {
                                        console.log(result);
                                        this.last_attendence_data = result['attendence_data'];
                                    })
                                }
                            }
                        });
                    }
                }
            });
        }
        
        presentAlert() 
        {
            let alert = this.alertCtrl.create({
                title: 'Alert',
                subTitle: 'Please Start Time First',
                buttons: ['Ok']
            });
            alert.present();
        }
        
        sign_up_data:any = "0";
        
        
        openPage(page: PageInterface) 
        {   
            if(this.user_logged_in && this.userName == undefined)
            {   
                if((this.last_attendence_data.start_time == '' || this.last_attendence_data.start_time == undefined) && (this.currentTime > '09:00:00' && this.currentTime < '18:00:00'))
                {
                    if(page.name != 'LeaveListPage')
                    {
                        let alert = this.alertCtrl.create({
                            title: 'Alert',
                            subTitle: 'Please Start Time First',
                            buttons: [
                                {
                                    text: 'Ok',
                                    handler: () => {
                                        
                                        let params = {};
                                        
                                        if(page.index) 
                                        {
                                            params = { tabIndex: page.index };
                                        }
                                        if(this.nav.getActiveChildNavs().length && page.index != undefined) 
                                        {
                                            this.nav.getActiveChildNavs()[0].select(page.index);
                                        } 
                                        else 
                                        {
                                            this.nav.push(page.component, params);
                                        }
                                    }
                                }
                            ]
                        });
                        alert.present();
                    }
                    else
                    {
                        let params = {};
                        
                        if(page.index) 
                        {
                            params = { tabIndex: page.index };
                        }
                        
                        if(this.nav.getActiveChildNavs().length && page.index != undefined) 
                        {
                            this.nav.getActiveChildNavs()[0].select(page.index);
                        } 
                        else 
                        {   
                            this.nav.push(page.component, params);
                        }
                    }
                }
                
                
                if((this.last_attendence_data && this.last_attendence_data.start_time != '' && this.last_attendence_data.start_time != undefined)  ||  (page.name == 'AttendencePage' || page.name == 'HomePage') )
                {
                    let params = {};
                    
                    if(page.index) 
                    {
                        params = { tabIndex: page.index };
                    }
                    
                    if(this.nav.getActiveChildNavs().length && page.index != undefined) 
                    {   
                        this.nav.getActiveChildNavs()[0].select(page.index);
                    }
                    else 
                    {   
                        this.nav.push(page.component, params);
                    }
                }
                
                if((this.last_attendence_data.start_time == '' || this.last_attendence_data.start_time == undefined) && (this.currentTime < '09:00:00' || this.currentTime > '18:00:00'))
                {
                    let params = {};
                    
                    if(page.index) 
                    {
                        params = { tabIndex: page.index };
                    }
                    
                    if(this.nav.getActiveChildNavs().length && page.index != undefined) 
                    {
                        this.nav.getActiveChildNavs()[0].select(page.index);
                    } 
                    else 
                    {
                        this.nav.push(page.component, params);
                    }
                }
            }
            
            if(this.userName != undefined)
            {
                let params = {};
                
                if(page.index) 
                {
                    params = { tabIndex: page.index };
                }
                
                if(this.nav.getActiveChildNavs().length && page.index != undefined) 
                {
                    this.nav.getActiveChildNavs()[0].select(page.index);
                } 
                else 
                {
                    this.nav.push(page.component, params);
                }
            }
        }
        
        openPage1(page: PageInterface) 
        {   
            let params = {};
            
            if(page.index) 
            {
                params = { tabIndex: page.index };
            }
            
            if(this.nav.getActiveChildNavs().length && page.index != undefined) 
            {
                this.nav.getActiveChildNavs()[0].select(page.index);
            } 
            else 
            {
                this.nav.push(page.component, params);   
            }
        }
        
        set_pages()
        {
            this.serve.set(this.user_logged_in);
            
            if(this.userToken != undefined)
            {
                this.serve.addData({},'Login/user_token').then((result)=>
                {
                    console.log(result);
                    this.check_token = result['user_token'];
                    
                    if(this.userToken != this.check_token)
                    {
                        this.logout();
                    }
                    
                    if(this.userToken == this.check_token)
                    {
                        console.log('token is same');
                        console.log(this.userRoleId+" "+this.userType+" "+this.userToken);
                        
                        if(this.userRoleId && this.userType == 'MARKET' && this.userToken != undefined)
                        {
                            this.rootPage = DashboardPage;
                            console.log('Dashboard');
                        }
                        if(this.userType == 'OFFICE')
                        {
                            this.rootPage = TabsPage;
                            console.log('TabsPage signUp');
                        }
                        if(this.userType == 4)
                        {
                            this.rootPage = TabsPage;
                            console.log('TabsPage signUp');
                        }
                        if(this.userType == 1)
                        {
                            this.rootPage = HomePage;
                            console.log('HomePage signUp');
                        }
                    }
                }).catch((error:any)=>
                {
                    console.log("ERROR" + error);
                    console.log(error);
                    console.log(typeof(error));
                    
                    if(error.url == null && error.status == 0 && this.serve.errorCount === 0)
                    {
                        this.serve.errorCount++;
                        this.presentAlertInternet();
                        
                        setTimeout(() => {
                            
                            this.serve.errorCount = 0;
                            
                        }, 1000);
                    }   
                });
            }
            
            if(this.user_logged_in)
            {
                if(this.userName)
                {
                    this.rootPage = TabsPage;
                }
            }
            
            if(this.userRoleId && this.userType == 'MARKET' && this.userToken != undefined)
            {
                console.log('logged in');
                
                this.pages=[
                    { title: 'Home', name: 'HomePage', component:DashboardPage, index: 0, icon: 'home', show: true },
                    { title: 'Products', name: 'ProductsPage', component:CatalougePage,index: 10, icon: 'shopping_basket', show: true },
                    { title: 'Target', name: 'TargetListPage', component:TargetListPage,index: 10, icon: 'timeline', show: true },
                    { title: 'Leave', name: 'LeaveListPage', component:LeaveListPage ,index: 10, icon: 'beach_access', show: true },
                    { title: 'Travel Plan', name: 'TravelListPage', component: TravelListPage, index: 23, icon: 'train', show: true },
                    { title: 'Calculator', name: 'GstCalculatorPage', component: GstCalculatorPage, index: 23, icon: 'gradient', show: true },
                    { title: 'Dealer Survey', name: 'DealerSurveyList', component: DealerSurveyListPage,index: 24, icon: 'group', show: true},
                    // { title: 'Work Plan', name: 'WorkPlan', component: WorkPlanPage,index: 24, icon: 'work', show: true},
                    { title: 'Channel Partner', name: 'Distributor', component: MainDistributorListPage,index: 15, icon: 'group', show: true},
                    { title: 'Direct Dealer', name: 'Direct Dealer', component: DirectDealerListPage,index: 13, icon: 'person_pin', show: true},
                    { title: 'Dealer', name: 'Dealer', component: DealerListPage,index: 12, icon: 'person', show: true},
                    { title: 'Order', name: 'Orders', component: OrderListPage,index: 6,  icon: 'add_shopping_cart', show: true},
                    { title: 'Lead', name: 'Lead', component: DistributorListPage,index: 5, icon: 'group_add', show: true},
                    { title: 'Check-In', name: 'Check-In', component: CheckinListPage , index: 9,icon: 'done_all', show: true},
                    { title: 'Attendance', name: 'AttendencePage', component: AttendencePage,index: 11, icon: 'date_range', show: true},
                    { title: 'Contact Us', name: 'ContactusPage', component: ContactusPage,index: 2, icon: 'contacts', show: true },
                ];
            }
            
            if(this.userRoleId && (this.userType == 'OFFICE') || (this.userType == 1))
            {
                console.log('not logged on');
                
                this.pages=[
                    { title: 'Home', name: 'HomePage', component:HomePage, index: 0, icon: 'home', show: true },
                    { title: 'Products', name: 'ProductsPage', component:CatalougePage ,index: 10, icon: 'shopping_basket', show: true },
                    { title: 'Contact Us', name: 'ContactusPage', component: ContactusPage,index: 2, icon: 'contacts', show: true },
                    { title: 'Enquiry', name: 'EnquiryPage', component: EnquiryPage, index: 3,icon: 'announcement', show: true },
                    { title: 'Search', name: 'SearchPage', component: SearchPage, index: 4,icon: 'search', show: true },
                    { title: 'About Us', name: 'AboutusPage', component: AboutusPage,index: 1, icon: 'info', show: true },  
                ];
                
                console.log('go To Home Page');
            }
            
            if(this.userRoleId == undefined || this.userRoleId == '' || this.userRoleId == false || this.userName)
            {
                console.log('not logged on');
                
                this.pages=[
                    { title: 'Home', name: 'HomePage', component:HomePage, index: 0, icon: 'home', show: true },
                    { title: 'Products', name: 'ProductsPage', component:CatalougePage ,index: 10, icon: 'shopping_basket', show: true },
                    { title: 'Contact Us', name: 'ContactusPage', component: ContactusPage,index: 2, icon: 'contacts', show: true },
                    { title: 'Enquiry', name: 'EnquiryPage', component: EnquiryPage, index: 3,icon: 'announcement', show: true },
                    { title: 'Search', name: 'SearchPage', component: SearchPage, index: 4,icon: 'search', show: true },
                    { title: 'About Us', name: 'AboutusPage', component: AboutusPage,index: 1, icon: 'info', show: true },
                    
                ];
                
                console.log('go To Home Page');
            }
        }
        
        isActive(page: PageInterface) 
        {
            let childNav = this.nav.getActiveChildNavs()[0];
            
            if(childNav) 
            {
                if(childNav.getSelected() && childNav.getSelected().root === page.tabComponent) 
                {
                    return 'primary';
                }
                return;
            }
            
            if(this.nav.getActive() && this.nav.getActive().name === page.name) 
            {
                return 'primary';
            }
            return;
        }
        
        Login() 
        {
            this.storage.set('token', '');
            this.storage.set('role', '');
            this.storage.set('displayName', '');
            this.storage.set('role_id','');
            this.storage.set('name','');
            this.storage.set('userId','');
            
            this.user_logged_in = false;
            this.userLoggedRole = '';
            this.userLoggedDisplayName = '';
            this.userRoleId = '';
            this.userType = '';
            this.userName = '';
            this.nav.push(SelectRegistrationTypePage)
        }
        
        logout() 
        {
            this.storage.set('token', '');
            this.storage.set('role', '');
            this.storage.set('displayName', '');
            this.storage.set('role_id','');
            this.storage.set('name','');
            this.storage.set('mobile','');
            this.storage.set('type','');
            this.storage.set('token_value','');
            this.storage.set('userId','');
            this.storage.set('token_info','');
            this.storage.set('state_name','');
            this.storage.set('user_type','');
            this.storage.set('order_item_array','');
            this.storage.set('order_item_length','');
            this.storage.set('order_details','');
            this.storage.set('order_item_length','');
            this.user_logged_in = false;
            this.userLoggedRole = '';
            this.userLoggedDisplayName = '';
            this.userRoleId = '';
            this.userType = '';
            this.userName = '';
            
            this.set_pages();
            this.nav.push(SelectRegistrationTypePage);
        }
        
        check_network()
        {
            this.network.onDisconnect().subscribe(() => 
            {
                let toast = this.toastCtrl.create({
                    message: 'Network was disconnected :-(',
                    duration: 2000
                });
                toast.present();
                
                this.nav.push(NetworkPage,{'type':'InterNet'});
            });
            
            
            // watch network for a connection
            this.network.onConnect().subscribe(() => 
            {
                let toast = this.toastCtrl.create({
                    message: 'Network connected!',
                    duration: 2000
                });
                toast.present();
                
                this.nav.pop();
                
                setTimeout(() => 
                {
                    if (this.network.type === 'wifi') 
                    {
                        let toast = this.toastCtrl.create({
                            message: 'We got a wifi connection, woohoo!',
                            duration: 2000
                        });
                        toast.present();
                        
                        this.nav.pop();
                    }
                }, 3000);
            });
        }
        
        presentAlertInternet() 
        {
            let alert = this.alertCtrl.create({
                title: 'Network Issue!',
                enableBackdropDismiss: false,
                message: 'Please Check Your Internet Connection.',
                cssClass: 'alert-modal',
            });
            alert.present();
        }
    }
    