import {Page} from 'ionic/ionic';
@Page({
  templateUrl: 'device/device.html'
})
export class DevicePage {
  constructor() {
    this.info = `Device info on device`;
    this.deviceInfo = {
      platform: window.cordova ? window.device.platform : 'Browser'
    };
  }
}
