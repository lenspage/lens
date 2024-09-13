import Ajv from "ajv";

export function verify({ schema, data }) {
	const ajv = new Ajv({ allErrors: true });

	const validate = ajv.compile(schema);

	const valid = validate(data);

	return { valid, errors: validate.errors };
}
