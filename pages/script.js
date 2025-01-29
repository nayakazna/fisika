
    // TOC & Sidebar
    document.addEventListener("DOMContentLoaded", () => {
        const tocToggle = document.getElementById("toc-toggle");
        const tocSidebar = document.getElementById("toc-sidebar");
        const tocClose = document.getElementById("toc-close");
    
        // Create overlay if not already in HTML
        let overlay = document.getElementById("overlay");
        if (!overlay) {
            overlay = document.createElement("div");
            overlay.id = "overlay";
            document.body.appendChild(overlay);
        }
    
        // Function to toggle sidebar
        function toggleSidebar(show) {
            tocSidebar.setAttribute("aria-hidden", !show);
            overlay.classList.toggle("active", show);
        }
    
        // Open sidebar
        tocToggle.addEventListener("click", () => toggleSidebar(true));
    
        // Close sidebar
        tocClose.addEventListener("click", () => toggleSidebar(false));
        overlay.addEventListener("click", () => toggleSidebar(false));
    
        // Close on ESC key
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") toggleSidebar(false);
        });
    
        // Get TOC containers
        const tocLists = document.querySelectorAll("#toc-list");
    
        // Generate TOC once and apply to both locations
        const headers = document.querySelectorAll("article h1, article h2");
        let lastH1 = null;
    
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
            link.addEventListener("click", () => toggleSidebar(false)); // Close sidebar when clicked
    
            if (header.tagName === "H1") {
                listItem.appendChild(link);
                const nestedList = document.createElement("ol");
                listItem.appendChild(nestedList);
    
                tocLists.forEach(toc => toc.appendChild(listItem.cloneNode(true)));
                lastH1 = listItem; // Store last <h1>
            } else if (header.tagName === "H2" && lastH1) {
                const nestedList = lastH1.querySelector("ol");
                if (nestedList) {
                    const subItem = document.createElement("li");
                    subItem.appendChild(link);
                    nestedList.appendChild(subItem);
    
                    tocLists.forEach(toc => {
                        const lastNestedList = toc.querySelector("ol:last-child");
                        if (lastNestedList) lastNestedList.appendChild(subItem.cloneNode(true));
                    });
                }
            }
        });
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