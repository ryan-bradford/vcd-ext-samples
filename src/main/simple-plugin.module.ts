import { CommonModule } from "@angular/common";
import { Inject, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Store } from "@ngrx/store";
import { VcdApiClient, VcdSdkModule } from "@vcd/sdk";
import { ExtensionNavRegistration, EXTENSION_ROUTE } from "@vcd/sdk/common";
import { PluginModule } from "@vcd/sdk/core";
import { TranslateService } from "@vcd/sdk/i18n";
import { ClarityModule } from "@clr/angular";
import { SimpleComponent } from "./simple/simple.component";
import { I18nModule, PLUGIN_TRANSLATION_SERVICE } from "./translation/I18n.module";
import { TranslationService, BOOTSTRAP_DETAILS } from "@vcd/ui-components";
import { TRANSLATIONS } from "./translation/translations";
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
        I18nModule,
        DataExporterExamplesModule
    ],
    declarations: [
        SimpleComponent,
    ],
    bootstrap: [SimpleComponent],
    exports: [],
    providers: [VcdApiClient, {
        provide: BOOTSTRAP_DETAILS,
        useValue: {locale: 'en'}
    }]
})
export class SimplePluginModule extends PluginModule {
    constructor(appStore: Store<any>, @Inject(EXTENSION_ROUTE) extensionRoute: string, translate: TranslateService,
    @Inject(PLUGIN_TRANSLATION_SERVICE) pluginTranslate: TranslationService) {
        super(appStore, translate);
        pluginTranslate.registerTranslations(TRANSLATIONS)
        this.registerExtension(<ExtensionNavRegistration>{
            path: extensionRoute,
            icon: "page",
            nameCode: "nav.label",
            descriptionCode: "nav.description"
        });
    }
}
