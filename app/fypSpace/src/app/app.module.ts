//module
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import {MatCardModule} from '@angular/material/card'; 
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatInputModule} from '@angular/material/input'; 
import {MatButtonModule } from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatListModule} from '@angular/material/list'; 
import {MatIconModule} from '@angular/material/icon'; 
import {MatChipsModule} from '@angular/material/chips'; 
import {MatSidenavModule} from '@angular/material/sidenav'; 
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'; 
import { PortalModule } from '@angular/cdk/portal';
//Additional packages
//Pipes
import { FilterPipePipe } from './pipes/filter-pipe.pipe';
import { UserListItemComponent } from './shared/parts/user/user-list-item/user-list-item.component';
import { UserListComponent } from './shared/parts/user/user-list/user-list.component';
import { SidenavComponent } from './shared/sidenav/sidenav.component';
import { ListSortPanelComponent } from './shared/sidenav/list-sort-panel/list-sort-panel.component';
import { ListFilterPanelComponent } from './shared/sidenav/list-filter-panel/list-filter-panel.component';
import { SubmitBtnComponent } from './shared/submit-btn/submit-btn.component';



@NgModule({
    declarations: [
        AppComponent,
        routingComponents,
        NavBarComponent,
        FooterComponent,
        FilterPipePipe,
        UserListItemComponent,
        UserListComponent,
        SidenavComponent,
        ListSortPanelComponent,
        ListFilterPanelComponent,
        SubmitBtnComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        RouterModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        CollapseModule.forRoot(),
        BsDropdownModule.forRoot(),
        AccordionModule.forRoot(),
        ButtonsModule.forRoot(),
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatListModule,
        MatIconModule,
        MatChipsModule,
        MatSidenavModule,
        MatProgressSpinnerModule,
        PortalModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
