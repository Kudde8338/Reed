async function loadSites() {
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

            loadSites();
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

    const { active_sites = [] } =
        await browser.storage.sync.get("active_sites");

    if (!active_sites.includes(site)) {
        active_sites.push(site);

        await browser.storage.sync.set({
            active_sites
        });
    }

    input.value = "";

    loadSites();
});



loadSites();