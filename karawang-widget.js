(function() {
    async function fetchRSS() {
        const rssUrl = "https://karawangkab.go.id/rss.xml";
        const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(rssUrl)}`;

        try {
            const response = await fetch(proxyUrl);
            const text = await response.text();
            const parser = new DOMParser();
            const xml = parser.parseFromString(text, "text/xml");

            const items = xml.querySelectorAll("item");
            let output = "<ul style='padding:10px; list-style:none; margin:0; max-height:300px; overflow-y:auto;'>";

            items.forEach((item, index) => {
                if (index < 10) {
                    const title = item.querySelector("title").textContent;
                    const link = item.querySelector("link").textContent;
                    const pubDate = item.querySelector("pubDate") ? new Date(item.querySelector("pubDate").textContent).toLocaleString("id-ID", { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) + " WIB" : "";
                    
                    output += `
                        <li style='display:flex; align-items:center; background:#f8f9fa; padding:10px; margin-bottom:10px; border-radius:5px; border-left:5px solid #007bff; position:relative; flex-direction: column;'>
                            <div style='display:flex; justify-content:space-between; width:100%; font-size:10px; color:#666;'>
                                <span>${pubDate}</span>
                                <span style='background:#28a745; color:white; padding:3px 6px; border-radius:3px; font-size:10px;'>Berita Terbaru</span>
                            </div>
                            <div style='display:flex; align-items:center; width:100%; margin-top:5px;'>
                                <div style='background:#007bff; padding:10px; border-radius:5px; margin-right:10px;'>
                                    <img src="https://lab.yusupmadcani.my.id/logo.png" style="width:40px; height:40px;">
                                </div>
                                <div style='flex-grow:1;'>
                                    <a href="${link}" target="_blank" style='text-decoration:none; color:#000; font-weight:bold; font-size:14px;'>${title}</a>
                                </div>
                            </div>
                        </li>`;
                }
            });

            output += "</ul>";

            const widgetContainer = document.getElementById("karawang-widget-container");
            if (widgetContainer) {
                widgetContainer.innerHTML = `
                    <div style="border:1px solid #ddd; padding:0; width:100%; max-width:400px; background:#fff; box-shadow:0px 2px 5px rgba(0,0,0,0.1); border-radius:8px; overflow:hidden; font-family:Arial, sans-serif;">
                        <div style="display:flex; align-items:center; background:#005f31; color:white; padding:10px; text-align:center;">
                            <img src="logo.png" style="height:40px; margin-right:10px;">
                            <div>
                                <span style="font-size:18px; font-weight:bold; display:block;">Government Public Relations (GPR)</span>
                                <span style="font-size:14px;">Kabupaten Karawang</span>
                            </div>
                        </div>
                        <div>${output}</div>
                        <div style="background:url('bg-footer4.webp') no-repeat center; background-size:cover; height:60px; border-top:1px solid #ddd;"></div>
                    </div>
                `;
            }
        } catch (error) {
            console.error("Error fetching RSS:", error);
        }
    }

    document.addEventListener("DOMContentLoaded", fetchRSS);
})();
