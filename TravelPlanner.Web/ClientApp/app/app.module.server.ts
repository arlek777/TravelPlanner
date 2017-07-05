import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { sharedConfig } from './app.module.shared';
import { LocalStorage } from './utils/localstorage';

@NgModule({
    bootstrap: sharedConfig.bootstrap,
    declarations: sharedConfig.declarations,
    imports: [
        ServerModule,
        ...sharedConfig.imports
    ],
    providers: [{ provide: LocalStorage, useValue: { getItem(k){}, removeItem(k) {}, setItem(k,k1) {} } }]
})
export class AppModule {
}
