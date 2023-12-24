import { AbstractControl } from "@angular/forms";

export function createTrimWhitespaceValidator() {
	return (control: AbstractControl) => {
		try {
			return control.value.toString().trim() === '' ? { required: true } : null;
		} catch {
			return null;
		}
	};
}
