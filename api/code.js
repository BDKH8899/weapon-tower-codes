if (!global.currentActiveCode) {
    global.currentActiveCode = "D2H4-1S3P";
    global.codeUsedStatus = false;
    global.lastGeneratedTime = Date.now();
}

export default function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

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

    const msLeft = Math.max(0, 300000 - (Date.now() - global.lastGeneratedTime));

    if (req.method === 'POST') {
        global.codeUsedStatus = true;
        return res.status(200).json({ success: true });
    }

    if (req.headers.accept && req.headers.accept.includes('text/html')) {
        return res.status(200).send(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Weapon Tower 2 - Live Rewards</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                    body {
                        font-family: 'Segoe UI', Arial, sans-serif;
                        text-align: center;
                        background: radial-gradient(circle, #1a1a2e 0%, #0f0f1b 100%);
                        color: white;
                        margin: 0;
                        padding: 20px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        min-height: 100vh;
                    }
                    .card {
                        max-width: 450px;
                        width: 100%;
                        background: rgba(32, 32, 48, 0.95);
                        padding: 35px 25px;
                        border-radius: 20px;
                        box-shadow: 0 15px 35px rgba(0,0,0,0.6);
                        border: 3px solid #ff3344;
                        box-sizing: border-box;
                    }
                    .game-logo {
                        max-width: 100%;
                        max-height: 220px;
                        object-fit: contain;
                        border-radius: 12px;
                        margin-bottom: 15px;
                        box-shadow: 0 8px 16px rgba(0,0,0,0.4);
                        display: block;
                        margin-left: auto;
                        margin-right: auto;
                    }
                    .code-box {
                        font-size: 42px;
                        font-weight: bold;
                        margin: 15px 0;
                        color: #55ff7f;
                        background: #0c0c14;
                        padding: 15px;
                        border-radius: 10px;
                        border: 2px dashed #226633;
                        letter-spacing: 3px;
                        text-shadow: 0 0 10px rgba(85,255,127,0.3);
                    }
                    .btn-container {
                        margin: 15px 0;
                    }
                    .btn {
                        display: block;
                        width: 100%;
                        padding: 14px 0;
                        margin: 12px 0;
                        font-size: 16px;
                        font-weight: bold;
                        text-transform: uppercase;
                        border: none;
                        border-radius: 8px;
                        cursor: pointer;
                        transition: all 0.2s ease;
                        text-decoration: none !important;
                        box-sizing: border-box;
                        text-align: center;
                    }
                    .btn-copy {
                        background: #00aaff !important;
                        color: white !important;
                        box-shadow: 0 4px 14px rgba(0,170,255,0.4);
                    }
                    .btn-copy:hover { background: #0088cc !important; transform: translateY(-2px); }
                    
                    .btn-play {
                        background: #00e676 !important;
                        color: #000000 !important;
                        box-shadow: 0 4px 14px rgba(0,230,118,0.4);
                    }
                    .btn-play:hover { background: #00c853 !important; transform: translateY(-2px); }
                    
                    .timer-text {
                        font-size: 18px;
                        color: #ffaa00;
                        font-weight: bold;
                        margin-top: 20px;
                        letter-spacing: 1px;
                    }
                </style>
            </head>
            <body>
                <div class="card">
                    <img src="/logo.png" alt="Weapon Tower 2 Logo" class="game-logo">
                    
                    <h1 style="margin: 15px 0 0 0; color: #ff3344; letter-spacing: 1px;">WEAPON TOWER 2</h1>
                    <p style="color: #a0a0b5; margin: 5px 0 25px 0;">Active Limited-Time Reward Code</p>
                    
                    <div class="code-box" id="codeText">${global.currentActiveCode}</div>
                    
                    <div class="btn-container">
                        <button class="btn btn-copy" onclick="copyCode()">📋 Copy Code</button>
                    </div>
                    
                    <div class="btn-container">
                        <a href="https://www.roblox.com/games/87583133713556/WEAPON-TOWER-2" class="btn btn-play">🎮 Play Game</a>
                    </div>
                    
                    <div class="timer-text" id="timer">Loading reset countdown...</div>
                </div>

                <script>
                    let timeLeft = ${msLeft};

                    function updateTimer() {
                        if (timeLeft <= 0) {
                            document.getElementById("timer").innerHTML = "🔄 Refreshing system...";
                            setTimeout(() => { window.location.reload(); }, 1500);
                            return;
                        }

                        let totalSeconds = Math.floor(timeLeft / 1000);
                        let minutes = Math.floor(totalSeconds / 60);
                        let seconds = totalSeconds % 60;
                        seconds = seconds < 10 ? '0' + seconds : seconds;

                        document.getElementById("timer").innerHTML = "⏱️ Code Resets In: " + minutes + ":" + seconds;
                        
                        timeLeft -= 1000;
                        setTimeout(updateTimer, 1000);
                    }

                    function copyCode() {
                        const codeElement = document.getElementById("codeText");
                        navigator.clipboard.writeText(codeElement.innerText);
                        
                        const copyBtn = document.querySelector(".btn-copy");
                        const oldText = copyBtn.innerText;
                        copyBtn.innerText = "✅ Copied!";
                        copyBtn.style.background = "#22bb66";
                        
                        setTimeout(() => {
                            copyBtn.innerText = oldText;
                            copyBtn.style.background = "#00aaff";
                        }, 2000);
                    }

                    updateTimer();
                </script>
            </body>
            </html>
        `);
    }

    return res.status(200).json({ 
        activeCode: global.currentActiveCode, 
        isUsed: global.codeUsedStatus 
    });
}
