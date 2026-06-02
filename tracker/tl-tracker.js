;(function (global) {
	const DEFAULT_ENDPOINT = "http://localhost:3001/api/v1/collector/collect";
	const STORAGE_KEY = "__thatlytics_viewer_id__";

	function getStorageValue(key) {
		try {
			return global.localStorage.getItem(key);
		} catch {
			return null;
		}
	}

	function setStorageValue(key, value) {
		try {
			global.localStorage.setItem(key, value);
		} catch {
			// ignore storage failures
		}
	}

	function resolveUrl(value) {
		if (!value) {
			return DEFAULT_ENDPOINT;
		}

		try {
			return new URL(value, global.location.href).toString();
		} catch {
			return DEFAULT_ENDPOINT;
		}
	}

	function createClient(options) {
		const config = {
			endpoint: resolveUrl(options.endpoint),
			sourceId: options.sourceId || null,
			sourceIdentifier: options.sourceIdentifier || null,
			autoTrack: options.autoTrack !== false,
			storageKey: options.storageKey || STORAGE_KEY,
		};

		function getViewerId() {
			return getStorageValue(config.storageKey);
		}

		function rememberViewerId(viewerId) {
			if (viewerId) {
				setStorageValue(config.storageKey, viewerId);
			}
		}

		async function send(payload) {
			const body = JSON.stringify(payload);

			if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
				const beacon = navigator.sendBeacon(config.endpoint, new Blob([body], { type: "application/json" }));

				if (beacon) {
					return { ok: true };
				}
			}

			const response = await fetch(config.endpoint, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body,
				keepalive: true,
				credentials: "omit",
			});

			if (!response.ok) {
				throw new Error(`thatlytics request failed with status ${response.status}`);
			}

			let data = null;

			try {
				data = await response.json();
			} catch {
				data = null;
			}

			if (data && data.viewerId) {
				rememberViewerId(data.viewerId);
			}

			return data;
		}

		async function trackPageView(overrides = {}) {
			const payload = {
				eventType: "PAGE_VIEW",
				sourceId: config.sourceId,
				sourceIdentifier: config.sourceIdentifier,
				viewerId: overrides.viewerId || getViewerId() || undefined,
				referrer: overrides.referrer || global.document.referrer || "",
				url: overrides.url || global.location.href,
				title: overrides.title || global.document.title || "",
				userAgent: overrides.userAgent || global.navigator.userAgent || "",
				...overrides,
			};

			const result = await send(payload);

			if (result && result.viewerId) {
				rememberViewerId(result.viewerId);
			}

			return result;
		}

		function patchHistory() {
			if (global.__thatlyticsHistoryPatched) {
				return;
			}

			global.__thatlyticsHistoryPatched = true;

			const originalPushState = global.history.pushState;
			const originalReplaceState = global.history.replaceState;

			global.history.pushState = function (...args) {
				const result = originalPushState.apply(this, args);
				global.dispatchEvent(new Event("thatlytics:navigation"));
				return result;
			};

			global.history.replaceState = function (...args) {
				const result = originalReplaceState.apply(this, args);
				global.dispatchEvent(new Event("thatlytics:navigation"));
				return result;
			};

			global.addEventListener("popstate", () => {
				global.dispatchEvent(new Event("thatlytics:navigation"));
			});

			global.addEventListener("hashchange", () => {
				global.dispatchEvent(new Event("thatlytics:navigation"));
			});
		}

		function init() {
			patchHistory();

			if (config.autoTrack) {
				const firePageView = () => {
					trackPageView().catch(() => {
						// ignore analytics delivery failures
					});
				};

				if (global.document.readyState === "complete" || global.document.readyState === "interactive") {
					queueMicrotask(firePageView);
				} else {
					global.addEventListener("DOMContentLoaded", firePageView, { once: true });
				}

				global.addEventListener("thatlytics:navigation", firePageView);
			}

			return {
				trackPageView,
				getViewerId,
			};
		}

		return {
			init,
			trackPageView,
			getViewerId,
			config,
		};
	}

	const thatlytics = {
		init(options = {}) {
			const client = createClient(options);
			return client.init();
		},
		trackPageView(options = {}) {
			return createClient(options).trackPageView();
		},
	};

	global.Thatlytics = thatlytics;
	global.thatlytics = thatlytics;

	if (typeof module !== "undefined" && module.exports) {
		module.exports = thatlytics;
	}
})(typeof window !== "undefined" ? window : globalThis);
