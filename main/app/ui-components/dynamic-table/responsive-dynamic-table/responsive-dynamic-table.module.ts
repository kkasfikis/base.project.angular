import { NgModule } from "@angular/core";
import { ResponsiveDynamicTableDirective } from "./responsive-dynamic-table.directive";

@NgModule({
    declarations : [ResponsiveDynamicTableDirective],
    exports : [ResponsiveDynamicTableDirective]
})
export class ResponsiveDynamicTableModule {}