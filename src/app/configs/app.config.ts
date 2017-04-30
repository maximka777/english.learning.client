import {OpaqueToken} from "@angular/core";

export let APP_CONFIG = new OpaqueToken('app.config');

export const AppConfig: any = {
  API: "http://localhost:3000",
};
