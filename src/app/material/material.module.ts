import { NgModule } from '@angular/core';

import {
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  MatToolbarModule,
  MatCardModule,
  MatListModule,
  MatButtonModule,
  MatIconModule
} from '@angular/material';

export const MATERIAL_MODULES = [
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  MatToolbarModule,
  MatCardModule,
  MatListModule,
  MatButtonModule,
  MatIconModule,
  MatInputModule
];

@NgModule({
  imports: [MATERIAL_MODULES],
  exports: [MATERIAL_MODULES]
})
export class MaterialModule { }
