import { LoadingComponent } from './../../shared/loading/loading.component';

import { CommonModule, DatePipe } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AccountModule } from "src/app/pages/admin/account/account.module";

import { DashboardComponent } from "src/app/pages/admin/dashboard/dashboard.component";
import { AuthService } from "src/app/services/auth.service";
import { UploadImgService } from "src/app/services/imgs/upload.img.service";
import { UserService } from "src/app/services/user/user.service";
import { AlertService } from "src/app/services/utils/alert.service";
import { SharedModule } from "src/app/shared/shared.module";
import { AdminRoutes } from "./admin.routing";
import { TeamService } from './../../services/teams/team.service';
import { TeamModule } from './../../pages/admin/team/team.module';

@NgModule({
    declarations: [
        DashboardComponent,
    ],
    providers: [AuthService, UserService, DatePipe, AlertService, UploadImgService, TeamService],
    imports: [
      CommonModule,
      RouterModule.forChild(AdminRoutes),
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
      SharedModule,
      AccountModule,
      TeamModule
    ],
  })
  export class AdminModule {}