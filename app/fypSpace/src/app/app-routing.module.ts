import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { FaqComponent } from './pages/faq/faq.component';
import { RegisterComponent } from './pages/user/register/register.component';
import { LoginComponent } from './pages/user/login/login.component';
import { MatchingComponent } from './pages/matching/matching.component';
import { SessionAuthGuard } from './guards/session-auth.guard';
import { EditProfileComponent } from './pages/user/edit-profile/edit-profile.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { StudentDashboardComponent } from './pages/dashboard/student-dashboard/student-dashboard.component';
import { LecturerDashboardComponent } from './pages/dashboard/lecturer-dashboard/lecturer-dashboard.component';
import { StudentGuardGuard } from './guards/student-guard.guard';
import { LecturerGuardGuard } from './guards/lecturer-guard.guard';

const routes: Routes = [
    // Application routes here
    // Example
    // {path:'url' , component: 'component'}
    { path: "login", component: LoginComponent },
    { path: "logout", redirectTo: '/login', pathMatch: 'full' },
    { path: "register", component: RegisterComponent },
    { path: "FAQ/:role", component: FaqComponent },
    { path: "about", component: AboutComponent },
    { path: "matching", component: MatchingComponent },
    {
        path: "dashboard",
        component: DashboardComponent,
        canActivateChild: [SessionAuthGuard],
        children: [
            {
                path: "student",
                component: StudentDashboardComponent,
                canActivate: [StudentGuardGuard]
            },
            {
                path: "lecturer",
                component: LecturerDashboardComponent,
                canActivate: [LecturerGuardGuard]
            }
        ]
    },
    {
        path: "user",
        canActivate: [SessionAuthGuard],
        children: [
            {
                path: "edit", component: EditProfileComponent,
            },
        ]
    },
    { path: "", redirectTo: "/about", pathMatch: 'full' },
    { path: "**", component: ErrorPageComponent },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' }),
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
    EditProfileComponent,
    DashboardComponent,
    StudentDashboardComponent,
    LecturerDashboardComponent,
]
