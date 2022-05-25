import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class FormGenerator {
    private static _formGenerator: FormGenerator;

    public static getInstance(): FormGenerator {
        if (FormGenerator._formGenerator) {
            return FormGenerator._formGenerator;
        }
        FormGenerator._formGenerator = new FormGenerator();

        return FormGenerator._formGenerator;
    }

    private _fb: FormBuilder;

    private constructor() {
        this._fb = new FormBuilder();
    }

    public getSignInForm(): FormGroup {
        return this._fb.group(
            {
                email: [null, Validators.compose([
                    Validators.email,
                    Validators.required,
                ])],
                password: [null, Validators.compose([
                    Validators.required
                ])],
            }
        );
    }
}
