import {Page, Item, ItemGroup, ItemGroupTitle, ItemSliding, List, ListHeader} from 'ionic/ionic';
@Page({
  directives: [Item, ItemGroup, ItemGroupTitle, ItemSliding, List, ListHeader],
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
