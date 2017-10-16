import {NgModule, Optional, SkipSelf} from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {AuthService, UserService} from '@app/shared/services';
import {CanLoadAdmin, CanLoadCourses, CanLoadGrading, CanLoadManage} from '@app/shared/guards';
import {
  AdminResolver, CoursesResolver, GradingResolver, HomeResolver, LandingResolver,
  ManageResolver
} from '@app/shared/resolvers';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  declarations: [],
  providers: [
    UserService,
    AuthService,
    CanLoadCourses,
    CanLoadGrading,
    CanLoadAdmin,
    CanLoadManage,
    AdminResolver,
    CoursesResolver,
    GradingResolver,
    LandingResolver,
    ManageResolver,
    HomeResolver,
  ]
})
export class CoreModule {
  constructor (
    @Optional() @SkipSelf() parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}
