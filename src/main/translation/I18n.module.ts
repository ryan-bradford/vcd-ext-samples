/*
 * Copyright 2017-2018 VMware, Inc. All rights reserved. VMware Confidential
 */
import {Inject, Injectable, InjectionToken, NgModule, Pipe, PipeTransform, ChangeDetectorRef} from "@angular/core";
import { AbstractTranslationPipe, I18nModule as SharedI18nModule, 
     MessageFormatTranslationService,
    TranslationService as SharedService, 
    BOOTSTRAP_DETAILS,
    TranslationLoader} from "@vcd/ui-components";
import { HttpClient } from "@angular/common/http";
import { EXTENSION_ASSET_URL } from "@vcd/sdk/common";

export const PLUGIN_TRANSLATION_SERVICE = new InjectionToken("PLUGIN_TRANSLATION_SERVICE");

/**
 * A singleton instance.
 */
let sharedSingleton: SharedService = null;
export function sharedSingletonFactory(details: {locale: string}, httpClient: HttpClient, assetUrl: string) {
    if (!sharedSingleton) {
        sharedSingleton = new MessageFormatTranslationService(details.locale, "en", new TranslationLoader(httpClient, assetUrl), true);
    }
    return sharedSingleton;
}

/**
 * Translates a key for the core components libraries.
 */
@Injectable()
@Pipe({
    name: "translate",  
    pure: true,
})
export class AppTranslationPipe extends AbstractTranslationPipe implements PipeTransform {
    constructor(@Inject(PLUGIN_TRANSLATION_SERVICE) service: SharedService, changeRef: ChangeDetectorRef) {
        super(service, changeRef);
    }
}

@NgModule({
    imports: [SharedI18nModule],
    declarations: [
        AppTranslationPipe,
    ],
    providers: [
        {
            provide: PLUGIN_TRANSLATION_SERVICE,
            useFactory: sharedSingletonFactory,
            deps: [BOOTSTRAP_DETAILS, HttpClient, EXTENSION_ASSET_URL]
        },
    ],
    exports: [
        AppTranslationPipe,
    ]
})
export class I18nModule {
}
