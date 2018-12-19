import { Directive, forwardRef, OnChanges, Input, SimpleChanges } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS, ValidatorFn, ValidationErrors, Validators } from '@angular/forms';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[upperCase]',
  providers: [{provide: NG_VALIDATORS, useExisting: UpperCaseValidator, multi: true}]
})
export class UpperCaseValidator implements Validator {
  validate(control: AbstractControl): {[key: string]: any} {
    const valor = control.value;
    if (valor) {
      return valor !== valor.toUpperCase() ? {'upperCase': {valor}} : null;
    } else {
      return null;
    }
  }
}

/**
 * @description
 * Provider which adds `MinValidator` to the `NG_VALIDATORS` multi-provider list.
 */
export const MIN_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => MinValidator),
  multi: true
};

/**
 * A directive that adds minimum length validation to controls marked with the
 * `min` attribute. The directive is provided with the `NG_VALIDATORS` mult-provider list.
 *
 * @see [Form Validation](guide/form-validation)
 *
 * @usageNotes
 *
 * ### Adding a minimum length validator
 *
 * The following example shows how to add a minimum length validator to an input attached to an
 * ngModel binding.
 *
 * ```html
 * <input name="firstName" ngModel min="4">
 * ```
 *
 * @ngModule ReactiveFormsModule
 * @ngModule FormsModule
 * @publicApi
 */
@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[min][formControlName],[min][formControl],[min][ngModel]',
  providers: [MIN_VALIDATOR],
  // tslint:disable-next-line:use-host-property-decorator
  host: {'[attr.min]': 'min ? min : null'}
})
export class MinValidator implements Validator,
    OnChanges {
  // TODO(issue/24571): remove '!'.
  private _validator !: ValidatorFn;
  // TODO(issue/24571): remove '!'.
  private _onChange !: () => void;

  /**
   * @description
   * Tracks changes to the the minimum length bound to this directive.
   */
  // TODO(issue/24571): remove '!'.
  @Input() min !: string;

  /**
   * @description
   * A lifecycle method called when the directive's inputs change. For internal use
   * only.
   *
   * @param changes A object of key/value pairs for the set of changed inputs.
   */
  ngOnChanges(changes: SimpleChanges): void {
    if ('min' in changes) {
      this._createValidator();
      if (this._onChange) { this._onChange(); }
    }
  }

  /**
   * @description
   * Method that validates whether the value meets a minimum length
   * requirement. Returns the validation result if enabled, otherwise null.
   */
  validate(control: AbstractControl): ValidationErrors|null {
    return this.min == null ? null : this._validator(control);
  }

  /**
   * @description
   * Registers a callback function to call when the validator inputs change.
   *
   * @param fn The callback function
   */
  registerOnValidatorChange(fn: () => void): void { this._onChange = fn; }

  private _createValidator(): void {
    this._validator = Validators.min(parseInt(this.min, 10));
  }
}

/**
 * @description
 * Provider which adds `MaxValidator` to the `NG_VALIDATORS` multi-provider list.
 */
export const MAX_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => MaxValidator),
  multi: true
};

/**
 * A directive that adds maximum length validation to controls marked with the
 * `max` attribute. The directive is provided with the `NG_VALIDATORS` mult-provider list.
 *
 * @see [Form Validation](guide/form-validation)
 *
 * @usageNotes
 *
 * ### Adding a maximum length validator
 *
 * The following example shows how to add a maximum length validator to an input attached to an
 * ngModel binding.
 *
 * ```html
 * <input name="firstName" ngModel max="4">
 * ```
 *
 * @ngModule ReactiveFormsModule
 * @ngModule FormsModule
 * @publicApi
 */
@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[max][formControlName],[max][formControl],[max][ngModel]',
  providers: [MAX_VALIDATOR],
  // tslint:disable-next-line:use-host-property-decorator
  host: {'[attr.max]': 'max ? max : null'}
})
export class MaxValidator implements Validator,
    OnChanges {
  // TODO(issue/24571): remove '!'.
  private _validator !: ValidatorFn;
  // TODO(issue/24571): remove '!'.
  private _onChange !: () => void;

  /**
   * @description
   * Tracks changes to the the maximum length bound to this directive.
   */
  // TODO(issue/24571): remove '!'.
  @Input() max !: string;

  /**
   * @description
   * A lifecycle method called when the directive's inputs change. For internal use
   * only.
   *
   * @param changes A object of key/value pairs for the set of changed inputs.
   */
  ngOnChanges(changes: SimpleChanges): void {
    if ('max' in changes) {
      this._createValidator();
      if (this._onChange) { this._onChange(); }
    }
  }

  /**
   * @description
   * Method that validates whether the value meets a maximum length
   * requirement. Returns the validation result if enabled, otherwise null.
   */
  validate(control: AbstractControl): ValidationErrors|null {
    return this.max == null ? null : this._validator(control);
  }

  /**
   * @description
   * Registers a callback function to call when the validator inputs change.
   *
   * @param fn The callback function
   */
  registerOnValidatorChange(fn: () => void): void { this._onChange = fn; }

  private _createValidator(): void {
    this._validator = Validators.max(parseInt(this.max, 10));
  }
}

export const MIS_VALIDADORES = [ UpperCaseValidator, MinValidator, MaxValidator ];
