//module
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { RouterModule} from '@angular/router';
//components
import { AppComponent } from './app.component';
import { NavBarComponent } from './shared/navbar/nav-bar/nav-bar.component';
import { FooterComponent } from './shared/footer/footer/footer.component';
//ngx-bootstrap
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
//Angular Material
//Pipes
import { FilterPipePipe } from './pipes/filter-pipe.pipe';


@NgModule({
    declarations: [
        AppComponent,
        routingComponents,
        NavBarComponent,
        FooterComponent,
        FilterPipePipe,
    ],
    imports: [
        AppRoutingModule,
        RouterModule,
        BrowserModule,
        BrowserAnimationsModule,
        CollapseModule.forRoot(),
        BsDropdownModule.forRoot(),
        AccordionModule.forRoot(),
        ButtonsModule.forRoot(),
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
