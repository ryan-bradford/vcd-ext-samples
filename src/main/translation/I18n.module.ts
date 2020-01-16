/*
 * Copyright 2017-2018 VMware, Inc. All rights reserved. VMware Confidential
 */
import {Inject, Injectable, InjectionToken, NgModule, Pipe, PipeTransform} from "@angular/core";
import { AbstractTranslationPipe, I18nModule as SharedI18nModule, 
     MessageFormatTranslationService as SharedMessageService,
    TranslationService as SharedService, 
    BOOTSTRAP_DETAILS} from "@vcd/ui-components";

export const PLUGIN_TRANSLATION_SERVICE = new InjectionToken("PLUGIN_TRANSLATION_SERVICE");

/**
 * A singleton instance. d
 */
let sharedSingleton: SharedService = null;
export function sharedSingletonFactory(details: {locale: string}) {
    if (!sharedSingleton) {
        sharedSingleton = new SharedMessageService(details.locale, "en");
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
    constructor(@Inject(PLUGIN_TRANSLATION_SERVICE) service: SharedService) {
        super(service);
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
            deps: [BOOTSTRAP_DETAILS]
        },
    ],
    exports: [
        AppTranslationPipe,
    ]
})
export class I18nModule {
}
