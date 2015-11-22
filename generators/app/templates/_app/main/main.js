import {App} from 'ionic/ionic';
import {TabsPage} from './../tabs/tabs';
import './main.scss';

@App({
  templateUrl: 'main/main.html',
  config: {
    platforms: {
     android: {
       navbarStyle: 'primary',
       tabbarStyle: 'primary'
     }
    }
  }
  
})
class App {
  constructor() {
    // retrieve the conference data
    this.root = TabsPage;
  }
}
