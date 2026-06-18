// Global variables to track the active code state in memory
if (!global.currentActiveCode) {
    global.currentActiveCode = "A1B2-C3D4";
    global.codeUsedStatus = false;
    global.lastGeneratedTime = Date.now();
}

export default function handler(req, res) {
    // Enable cross-origin requests so your Roblox game can talk to it
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Automatically check if 5 minutes (300,000 milliseconds) have passed
    const timePassed = Date.now() - global.lastGeneratedTime;
    if (timePassed >= 300000) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let p1 = '', p2 = '';
        for (let i = 0; i < 4; i++) {
            p1 += chars.charAt(Math.floor(Math.random() * chars.length));
            p2 += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        global.currentActiveCode = `${p1}-${p2}`;
        global.codeUsedStatus = false;
        global.lastGeneratedTime = Date.now();
    }

    // ROBLOX REDEEMS CODE (POST Request)
    if (req.method === 'POST') {
        global.codeUsedStatus = true;
        return res.status(200).json({ success: true });
    }

    // PLAYER VISITS WEBSITE (HTML View)
    if (req.headers.accept && req.headers.accept.includes('text/html')) {
        return res.status(200).send(`
            <html>
                <body style="font-family: Arial, sans-serif; text-align: center; background: #14141c; color: white; padding-top: 50px;">
                    <div style="max-width: 400px; margin: 0 auto; background: #20202c; padding: 30px; border-radius: 12px; border: 2px solid #3a3a50;">
                        <h2 style="color: #00aaff; margin-bottom:0; letter-spacing: 1px;">WEAPON TOWER</h2>
                        <p style="color: #a0a0b0; margin-top:5px;">Live 5-Minute Code Reward</p>
                        <div style="font-size: 38px; font-weight: bold; margin: 25px 0; color: #55ff7f; background: #0c0c12; padding: 15px; border-radius: 8px; border: 1px solid #22442c; letter-spacing: 2px;">
                            ${global.currentActiveCode}
                        </div>
                        <button onclick="window.location.reload()" style="padding: 10px 24px; font-weight: bold; background: #00aaff; color: white; border: none; border-radius: 5px; cursor: pointer;">
                            REFRESH CODE
                        </button>
                    </div>
                </body>
            </html>
        `);
    }

    // ROBLOX CHECKS CODE STATUS (GET Request returning raw JSON)
    return res.status(200).json({ 
        activeCode: global.currentActiveCode, 
        isUsed: global.codeUsedStatus 
    });
}
