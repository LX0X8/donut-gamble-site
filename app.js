/*
    DonutMax frontend

    IMPORTANT:
    This file does NOT handle real wagers.

    Later, replace the placeholder API functions
    with your backend API.
*/


const API_URL = "";
// Example later:
// const API_URL = "https://api.donutmax.win";


let totalGames = 0;
let jackpot = 0;


/* =========================
   INITIALIZATION
========================= */

document.addEventListener("DOMContentLoaded", () => {

    updateBotStatus();

    loadStats();

    loadActivity();

});


/* =========================
   BOT STATUS
========================= */

async function updateBotStatus() {

    const status = document.getElementById("botStatus");

    if (!API_URL) {

        status.textContent = "Demo Mode";

        return;
    }


    try {

        const response =
            await fetch(`${API_URL}/api/status`);

        if (!response.ok) {
            throw new Error();
        }

        const data =
            await response.json();


        status.textContent =
            data.online ? "Bot Online" : "Bot Offline";

    }

    catch {

        status.textContent = "Offline";

    }

}


/* =========================
   STATS
========================= */

async function loadStats() {

    /*
        Backend connection will eventually
        return real values.
    */

    if (!API_URL) {

        document.getElementById("onlinePlayers")
            .textContent = "—";

        document.getElementById("totalGames")
            .textContent = "0";

        document.getElementById("jackpotValue")
            .textContent = "$0";

        document.getElementById("cardJackpot")
            .textContent = "$0";

        return;
    }


    try {

        const response =
            await fetch(`${API_URL}/api/stats`);

        const data =
            await response.json();


        totalGames = data.totalGames || 0;

        jackpot = data.jackpot || 0;


        document.getElementById("onlinePlayers")
            .textContent = data.onlinePlayers ?? "—";

        document.getElementById("totalGames")
            .textContent = formatMoney(totalGames);

        document.getElementById("jackpotValue")
            .textContent = "$" + formatMoney(jackpot);

        document.getElementById("cardJackpot")
            .textContent = "$" + formatMoney(jackpot);

    }

    catch (error) {

        console.error(
            "Unable to load stats:",
            error
        );

    }

}


/* =========================
   ACTIVITY
========================= */

async function loadActivity() {

    if (!API_URL) {
        return;
    }


    try {

        const response =
            await fetch(`${API_URL}/api/activity`);

        const data =
            await response.json();


        renderActivity(data);

    }

    catch (error) {

        console.error(
            "Unable to load activity:",
            error
        );

    }

}


function renderActivity(items) {

    const container =
        document.getElementById("activityList");


    if (!items || !items.length) {

        container.innerHTML = `
            <div class="empty-activity">
                <span>🎰</span>
                <p>No games yet</p>
                <small>Recent games will appear here.</small>
            </div>
        `;

        return;
    }


    container.innerHTML =
        items.map(item => `

            <div class="activity-item">

                <div class="activity-icon">
                    ${item.icon || "🎰"}
                </div>

                <p>
                    <strong>${escapeHTML(item.player)}</strong>
                    ${item.text || ""}
                </p>

                <small>
                    ${escapeHTML(item.time || "")}
                </small>

            </div>

        `).join("");

}


/* =========================
   GAME MODAL
========================= */

function openGame(game) {

    const modal =
        document.getElementById("gameModal");


    const title =
        document.getElementById("modalTitle");

    const icon =
        document.getElementById("modalIcon");

    const description =
        document.getElementById("modalDescription");


    title.textContent = game;


    if (game === "Coinflip") {

        icon.textContent = "🪙";

        description.textContent =
            "Choose heads or tails and place your wager.";

    }

    else if (game === "Jackpot") {

        icon.textContent = "🎰";

        description.textContent =
            "Enter the jackpot and compete for the pot.";

    }

    else {

        icon.textContent = "🎯";

        description.textContent =
            "Take the risk and see if luck is on your side.";

    }


    modal.classList.add("active");

}


function closeGame() {

    document
        .getElementById("gameModal")
        .classList.remove("active");

}


/* Close modal when clicking outside */

document
    .getElementById("gameModal")
    .addEventListener("click", event => {

        if (
            event.target.id === "gameModal"
        ) {
            closeGame();
        }

    });


/* =========================
   MINECRAFT CONNECT
========================= */

function connectMinecraft() {

    /*
        Later this can open your authentication
        system / backend.

        Do NOT put Microsoft account credentials
        in this JavaScript file.
    */

    alert(
        "Minecraft account connection will be added when the backend is connected."
    );

}


/* =========================
   UTILITIES
========================= */

function formatMoney(number) {

    number = Number(number) || 0;


    if (number >= 1_000_000_000) {

        return (
            (number / 1_000_000_000)
                .toFixed(2)
                .replace(/\.00$/, "")
            + "B"
        );

    }


    if (number >= 1_000_000) {

        return (
            (number / 1_000_000)
                .toFixed(2)
                .replace(/\.00$/, "")
            + "M"
        );

    }


    if (number >= 1_000) {

        return (
            (number / 1_000)
                .toFixed(2)
                .replace(/\.00$/, "")
            + "K"
        );

    }


    return number.toLocaleString();

}


function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}
