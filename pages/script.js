document.addEventListener("DOMContentLoaded", () => {
    // TOC Generation Logic
    const tocLists = document.querySelectorAll("#toc-list");
    const headers = document.querySelectorAll("article h1, article h2");
    
    // Create document fragment for TOC construction
    const fragmentTOC = document.createDocumentFragment();
    let currentH1 = null;
    let currentNestedList = null;

    headers.forEach(header => {
        if (!header.id) {
            header.id = header.textContent
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[^\w-]/g, "");
        }

        const listItem = document.createElement("li");
        const link = document.createElement("a");
        link.href = `#${header.id}`;
        link.textContent = header.textContent;
        link.addEventListener("click", () => toggleSidebar(false));

        if (header.tagName === "H1") {
            // Create new H1 entry
            currentH1 = listItem;
            currentNestedList = document.createElement("ol");
            
            listItem.appendChild(link);
            listItem.appendChild(currentNestedList);
            fragmentTOC.appendChild(listItem);
        } else if (header.tagName === "H2" && currentH1) {
            // Add to current H1's nested list
            const subItem = document.createElement("li");
            subItem.appendChild(link);
            currentNestedList.appendChild(subItem);
        }
    });

    // Clone complete TOC structure to all containers
    tocLists.forEach(toc => {
        toc.appendChild(fragmentTOC.cloneNode(true));
    });

    // Sidebar Toggle Logic
    const tocToggle = document.getElementById("toc-toggle");
    const tocSidebar = document.getElementById("toc-sidebar");
    const tocClose = document.getElementById("toc-close");
    const overlay = document.getElementById("overlay") || createOverlay();

    function toggleSidebar(show) {
        tocSidebar.setAttribute("aria-hidden", !show);
        overlay.classList.toggle("active", show);
    }

    function createOverlay() {
        const overlay = document.createElement("div");
        overlay.id = "overlay";
        document.body.appendChild(overlay);
        return overlay;
    }

    // Event Listeners
    tocToggle.addEventListener("click", () => toggleSidebar(true));
    tocClose.addEventListener("click", () => toggleSidebar(false));
    overlay.addEventListener("click", () => toggleSidebar(false));

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") toggleSidebar(false);
    });

    // Proof Toggle System
    document.addEventListener('click', (event) => {
        if (event.target.matches('.bukti-toggle')) {
            const button = event.target;
            const content = button.nextElementSibling;
            const isExpanded = button.getAttribute('aria-expanded') === 'true';
            
            button.setAttribute('aria-expanded', !isExpanded);
            content.hidden = isExpanded;
        }
    });
});