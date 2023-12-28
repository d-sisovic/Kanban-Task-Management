import { AbstractControl } from "@angular/forms";

export const enterAnimationDuration = 200;

export function createTrimWhitespaceValidator() {
	return (control: AbstractControl) => {
		try {
			return control.value.toString().trim() === '' ? { required: true } : null;
		} catch {
			return null;
		}
	};
}
