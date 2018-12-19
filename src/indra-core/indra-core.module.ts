import { NgModule, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PIPES_CADENAS } from './pipes/cadenas.pipe';
import { SizerComponent } from './components/sizer.component';
import { PIPES_NUMERICOS } from './pipes/numericos.pipe';

@NgModule({
  declarations: [ PIPES_CADENAS, PIPES_NUMERICOS, SizerComponent, ],
  exports: [ PIPES_CADENAS, PIPES_NUMERICOS, SizerComponent, ],
  imports: [CommonModule]
})
export class IndraCoreModule {
  constructor(@Optional() @SkipSelf() parentModule: IndraCoreModule) {
    if (parentModule) {
      const msg = `IndraCoreModule has already been loaded.
        Import IndraCoreModule once, only, in the root AppModule.`;
      throw new Error(msg);
    }
  }
}
