import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { FooterComponent } from "./footer/footer.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { SiderComponent } from "./sider/sider.component";

@NgModule({
    imports:[
        CommonModule,
        FormsModule,
        RouterModule
    ],
    declarations:[
        NavbarComponent,
        FooterComponent,
        SiderComponent
    ],
    exports:[
        NavbarComponent,
        FooterComponent,
        SiderComponent
    ]

})

export class SiderModule {}