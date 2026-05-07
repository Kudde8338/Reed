async function loadActiveSites() {
    const { active_sites = [] } = await browser.storage.sync.get("active_sites");

    const list = document.getElementById("siteList");
    list.innerHTML = "";

    for (const site of active_sites) {
        const li = document.createElement("li");

        // Add text
        const text = document.createElement("span");
        text.textContent = site;

        // Add remove button
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";

        // Remove logic
        removeButton.addEventListener("click", async () => {
            const { active_sites = [] } = await browser.storage.sync.get("active_sites");

            const updated = active_sites.filter(s => s !== site);

            await browser.storage.sync.set({
                active_sites: updated
            });

            loadActiveSites();
        });


        li.appendChild(text);
        li.appendChild(removeButton);
        list.appendChild(li);
    }
}



async function loadBlacklistedSites() {
    const { blacklisted_sites = [] } = await browser.storage.sync.get("blacklisted_sites");

    const list = document.getElementById("blacklistItems");
    list.innerHTML = "";

    for (const site of blacklisted_sites) {
        const li = document.createElement("li");

        // Add text
        const text = document.createElement("span");
        text.textContent = site;

        // Add remove button
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";

        // Remove logic
        removeButton.addEventListener("click", async () => {
            const { blacklisted_sites = [] } = await browser.storage.sync.get("blacklisted_sites");

            const updated = blacklisted_sites.filter(s => s !== site);

            await browser.storage.sync.set({
                blacklisted_sites: updated
            });

            loadBlacklistedSites();
        });


        li.appendChild(text);
        li.appendChild(removeButton);
        list.appendChild(li);
    }
}

document.getElementById("addButton").addEventListener("click", async () => {

    const input = document.getElementById("siteInput");

    const site = input.value.trim();

    if (!site) return;

    const { active_sites = [] } = await browser.storage.sync.get("active_sites");

    if (!active_sites.includes(site)) {
        active_sites.push(site);

        await browser.storage.sync.set({
            active_sites
        });
    }

    input.value = "";

    loadActiveSites();
});

document.getElementById("addBlacklist").addEventListener("click", async () => {

    const input = document.getElementById("blacklistInput");

    const site = input.value.trim();

    if (!site) return;

    const { blacklisted_sites = [] } = await browser.storage.sync.get("blacklisted_sites");

    if (!blacklisted_sites.includes(site)) {
        blacklisted_sites.push(site);

        await browser.storage.sync.set({
            blacklisted_sites
        });
    }

    input.value = "";

    loadBlacklistedSites();
});



loadActiveSites();
loadBlacklistedSites();