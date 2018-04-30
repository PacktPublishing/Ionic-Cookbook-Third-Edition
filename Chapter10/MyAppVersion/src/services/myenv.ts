import { Injectable } from "@angular/core";
import { AppVersion } from "@ionic-native/app-version";

@Injectable()
export class MyEnv {
  constructor(private appVersion: AppVersion) {}

  getAppVersion() {
    return this.appVersion.getVersionCode();
  }
}
