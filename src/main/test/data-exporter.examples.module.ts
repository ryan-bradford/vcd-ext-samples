/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { ClarityModule } from "@clr/angular";
import { DataExporterExampleComponent } from "./data-exporter.example.component";

import { DataExporterModule } from "@vcd/ui-components";

@NgModule({
    declarations: [DataExporterExampleComponent],
    imports: [CommonModule, ClarityModule, ReactiveFormsModule, DataExporterModule],
    exports: [DataExporterExampleComponent],
    entryComponents: [DataExporterExampleComponent],
})
export class DataExporterExamplesModule {}
