import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { FaqComponent } from './pages/faq/faq.component';
import { RegisterComponent } from './pages/user/register/register.component';
import { LoginComponent } from './pages/user/login/login.component';
import { MatchingComponent } from './pages/matching/matching.component';

const routes: Routes = [
    // Application routes here
    // Example
    // {path:'url' , component: 'component'}
    { path: "matching", component: MatchingComponent},
    { path: "user/login", component: LoginComponent},
    { path: "user/register", component: RegisterComponent},
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
    LoginComponent,
    MatchingComponent,
    RegisterComponent,
]
