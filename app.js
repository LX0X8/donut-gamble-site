let balance = 10000;
let games = 0;
let jackpot = 0;

function money(number) {
    return "$" + Number(number).toLocaleString(
        undefined,
        {
            maximumFractionDigits: 2
        }
    );
}


function updateUI() {

    document.getElementById("balance")
        .textContent = money(balance);

    document.getElementById("games")
        .textContent = games;

    document.getElementById("jackpot")
        .textContent = money(jackpot);

}


function toast(message) {

    const element =
        document.getElementById("toast");

    element.textContent = message;

    element.style.display = "block";

    clearTimeout(window.toastTimer);

    window.toastTimer =
        setTimeout(() => {

            element.style.display =
                "none";

        }, 2500);

}


function activity(message, className = "") {

    const list =
        document.getElementById(
            "activityList"
        );

    const empty =
        list.querySelector(".empty");

    if (empty) {
        empty.remove();
    }

    const item =
        document.createElement("div");

    item.className = className;

    item.innerHTML = message;

    list.prepend(item);

    while (list.children.length > 8) {
        list.lastElementChild.remove();
    }

}


function getWager(id) {

    const amount =
        Number(
            document.getElementById(id).value
        );

    if (
        !Number.isFinite(amount) ||
        amount <= 0
    ) {

        toast("Enter a valid wager.");

        return 0;
    }

    if (amount > balance) {

        toast(
            "You don't have enough demo credits."
        );

        return 0;
    }

    return amount;
}


/* COINFLIP */

function coinflip() {

    const amount =
        getWager("coinAmount");

    if (!amount) return;

    balance -= amount;

    games++;

    const won =
        Math.random() < 0.5;

    if (won) {
        balance += amount * 2;
    }

    activity(
        `${won ? "🟢" : "🔴"} Coinflip —
        <span class="${won ? "win" : "loss"}">
        ${won ? "WON" : "LOST"}
        ${money(amount)}
        </span>`
    );

    toast(
        won
            ? "🟢 You won!"
            : "🔴 You lost!"
    );

    updateUI();
}


/* ROULETTE */

function roulette() {

    const amount =
        getWager("rouletteAmount");

    if (!amount) return;

    balance -= amount;

    games++;

    const won =
        Math.random() < 0.5;

    if (won) {
        balance += amount * 2;
    }

    activity(
        `${won ? "🟢" : "🔴"} Roulette —
        <span class="${won ? "win" : "loss"}">
        ${won ? "WON" : "LOST"}
        ${money(amount)}
        </span>`
    );

    toast(
        won
            ? "🟢 You won!"
            : "🔴 You lost!"
    );

    updateUI();
}


/* JACKPOT */

function joinJackpot() {

    const amount =
        getWager("jackAmount");

    if (!amount) return;

    balance -= amount;

    jackpot += amount;

    games++;

    activity(
        `🎰 Jackpot entry —
        ${money(amount)}
        added to the demo pot`
    );

    toast(
        "🎰 You entered the demo jackpot!"
    );

    updateUI();
}


updateUI();
