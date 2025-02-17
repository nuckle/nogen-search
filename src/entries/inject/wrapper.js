export function wrapper(id, call) {
	if (window[id] !== true) {
		window[id] = true;
		call();
	}
}
