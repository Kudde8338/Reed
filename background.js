const SOURCE_SITE = "flaxmovies";

console.log("EXTENSION RUNNING");

browser.webRequest.onBeforeRequest.addListener(
  (details) => {

    const url = new URL(details.url).hostname;

    const origin = details.originUrl || details.initiator || "";

    // If you're not visiting a url containing the keyword "flaxmovies" it ignores everything
    if (!origin.includes(SOURCE_SITE)) return;

    // If the site opens a new tab it immediatly closes it
    if (!url.includes(SOURCE_SITE)) {
      console.log("CLOSING TAB:", details.tabId, url);

      browser.tabs.remove(details.tabId);
    }

  },
  { urls: ["<all_urls>"], types: ["main_frame"] }
);