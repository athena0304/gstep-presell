export function city (value) {
	if (value === '0;请选择') {
		return ''
	}
	if (value.includes(';')) {
		return value.split(';')[1]
	}
	return value
}