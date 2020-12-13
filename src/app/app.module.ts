import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LayerComponent } from './components/layer/layer.component';
import { WidgetComponent } from './components/widget/widget.component';
import { MapComponent } from './components/map/map.component';
import { BasemapComponent } from './components/basemap/basemap.component';
import { FinderComponent } from './components/finder/finder.component';
import { PopUpService } from './services/pop-up.service';
import { PopupComponent } from './components/popup/popup.component';
import { TRANSLATION_PROVIDERS } from './translate';
import { TranslateService } from './services/translate.service';
import { TranslatePipe } from './translate/translate.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LayerComponent,
    WidgetComponent,
    MapComponent,
    BasemapComponent,
    FinderComponent,
    PopupComponent,
    TranslatePipe,
  ],
  imports: [
    BrowserModule,
  ],
  providers: [
    PopUpService,
    TranslateService,
    TRANSLATION_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
