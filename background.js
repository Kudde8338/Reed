console.log("EXTENSION RUNNING");

browser.webRequest.onBeforeRequest.addListener(
  async (details) => {
    const { active_sites = [] } = await browser.storage.sync.get("active_sites");

    // Get url data
    const url = new URL(details.url).hostname;
    const origin = details.originUrl || details.initiator || "";

    // If you're not visiting a url in the active sites it returns nothing
    const active = active_sites.some(site => origin.includes(site));
    if (!active) return;

    // If the site opens a new tab it immediatly closes it
    const close = !active_sites.some(site => url.includes(site));
    if (close) {
      browser.tabs.remove(details.tabId);
      await browser.history.deleteUrl({ url: details.url });
    };

  },
  { urls: ["<all_urls>"], types: ["main_frame"] }
);

browser.tabs.onUpdated.addListener(
  async (tabId, changeInfo, tab) => {

    if (!changeInfo.url) return;

    const { blacklisted_sites = [] } = await browser.storage.sync.get("blacklisted_sites");

    const url = new URL(changeInfo.url).hostname;

    const blacklisted = blacklisted_sites.some(site => url.includes(site));

    if (blacklisted) {
      browser.tabs.remove(tabId);
      await browser.history.deleteUrl({ url: details.url });
      console.log(`Closed blacklisted tab: ${url}`);
    }
  }
);