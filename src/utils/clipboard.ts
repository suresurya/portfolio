const normalizeBasePath = (basePath: string): string => {
	const withLeadingSlash = basePath.startsWith("/") ? basePath : `/${basePath}`;
	return withLeadingSlash.endsWith("/") ? withLeadingSlash : `${withLeadingSlash}/`;
};

export const copyTextToClipboard = async (value: string): Promise<boolean> => {
	if (typeof window === "undefined") {
		return false;
	}

	if (navigator.clipboard && window.isSecureContext) {
		try {
			await navigator.clipboard.writeText(value);
			return true;
		} catch {
			// Fallback to execCommand if clipboard API is unavailable in this context.
		}
	}

	const helper = document.createElement("textarea");
	helper.value = value;
	helper.setAttribute("readonly", "true");
	helper.style.position = "fixed";
	helper.style.opacity = "0";
	document.body.appendChild(helper);
	helper.select();

	const didCopy = document.execCommand("copy");
	document.body.removeChild(helper);

	return didCopy;
};

export const buildAbsoluteAppUrl = (path: string): string => {
	if (typeof window === "undefined") {
		return path;
	}

	const normalizedPath = path.replace(/^\/+/, "");
	const basePath = normalizeBasePath(import.meta.env.BASE_URL || "/");
	return new URL(normalizedPath, `${window.location.origin}${basePath}`).toString();
};
