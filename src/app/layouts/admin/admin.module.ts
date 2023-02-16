import { CommonModule, DatePipe } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AccountModule } from "src/app/pages/admin/account/account.module";

import { DashboardComponent } from "src/app/pages/admin/dashboard/dashboard.component";
import { AuthService } from "src/app/services/auth.service";
import { UserService } from "src/app/services/user/user.service";
import { SharedModule } from "src/app/shared/shared.module";
import { AdminRoutes } from "./admin.routing";

@NgModule({
    declarations: [
        DashboardComponent
    ],
    providers: [AuthService, UserService, DatePipe],
    imports: [
      CommonModule,
      RouterModule.forChild(AdminRoutes),
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
      SharedModule,
      AccountModule
    ],
  })
  export class AdminModule {}