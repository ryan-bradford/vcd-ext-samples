import { CommonModule } from "@angular/common";
import { Inject, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Store } from "@ngrx/store";
import { VcdApiClient, VcdSdkModule } from "@vcd/sdk";
import { ExtensionNavRegistration, EXTENSION_ROUTE, EXTENSION_ASSET_URL } from "@vcd/sdk/common";
import { PluginModule } from "@vcd/sdk/core";
import { TranslateService } from "@vcd/sdk/i18n";
import { ClarityModule } from "@clr/angular";
import { SimpleComponent } from "./simple/simple.component";
import { TranslationService, I18nModule } from "@vcd/ui-components";
import { DataExporterExamplesModule } from "./test/data-exporter.examples.module";

const ROUTES: Routes = [
    { path: "", component: SimpleComponent }
];

@NgModule({
    imports: [
        ClarityModule,
        CommonModule,
        VcdSdkModule,
        RouterModule.forChild(ROUTES),
        I18nModule.forChild(EXTENSION_ASSET_URL, true),
        DataExporterExamplesModule
    ],
    declarations: [
        SimpleComponent,
    ],
    bootstrap: [SimpleComponent],
    exports: [],
    providers: [VcdApiClient]
})
export class SimplePluginModule extends PluginModule {
    constructor(appStore: Store<any>, @Inject(EXTENSION_ROUTE) extensionRoute: string, translate: TranslateService, pluginTranslate: TranslationService) {
        super(appStore, translate);
        console.log(extensionRoute);
        pluginTranslate.registerTranslations()
        this.registerExtension(<ExtensionNavRegistration>{
            path: extensionRoute,
            icon: "page",
            nameCode: "nav.label",
            descriptionCode: "nav.description"
        });
    }
}
