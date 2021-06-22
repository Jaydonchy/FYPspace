import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { FaqComponent } from './pages/faq/faq.component';

const routes: Routes = [
    // Application routes here
    // Example
    // {path:'url' , component: 'component'}
    { path: "FAQ/:role", component: FaqComponent },
    { path: "", component: AboutComponent },
    { path: "**", component: ErrorPageComponent },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }

// Array of components to be exported
export const routingComponents = [
    ErrorPageComponent,
    AboutComponent,
    FaqComponent,
]
