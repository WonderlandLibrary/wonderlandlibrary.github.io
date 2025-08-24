/**
 entry: {clientName: string, clientDescription: string, link: string, previewImage1: string, previewImage2: string, price: int}
 */
const clients = [ ]

let currentIndex = -1;

window.addEventListener("load", async function() {
    fetch('https://wonderland.sigmaclient.cloud/data/clients.json')
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
            return response.json()
        })
        .then(async data => {
            for (let client of data.clients) {
                clients.push({
                    clientName: client.name,
                    clientDescription: client.description,
                    link: client.link === "discord" ? "https://discord.gg/BZhQFWYbhR" : client.link,
                    previewImage1: client.images[0],
                    previewImage2: client.images[1],
                    price: client.price
                })
            }

            if (window.location.href.endsWith("marketplace.html"))
                await displayClient(0)

            for (let client of clients) {
                addToNavBar(client.clientName, client.price === -1 ? `javascript:alert("Coming soon!")` : client.link)
            }
        })
});

function addToNavBar(name, link) {
    const dropdown = document.getElementById("client-dropdown");
    const wrapper = document.createElement("li");
    const a = document.createElement("a");
    a.href = link;
    a.innerText = name;
    wrapper.appendChild(a);
    dropdown.appendChild(wrapper);
}

async function left() {
    let nextIndex = currentIndex - 1;

    if (nextIndex < 0)
        nextIndex = clients.length - 1;

    await displayClient(nextIndex)
}

async function right() {
    let nextIndex = currentIndex + 1;

    if (nextIndex > clients.length - 1)
        nextIndex = 0;

    await displayClient(nextIndex)
}

async function displayClient(index) {
    if (currentIndex === index || index < 0 || index >= clients.length)
        return

    await setClientToWindow(clients[index])
    currentIndex = index;
}

async function setClientToWindow(client) {
    let clientPrice;
    let clickable = true;

    switch (client.price) {
        case 0:
            clientPrice = "Free"
            break
        case -1:
            clientPrice = "Coming soon"
            clickable = false;
            break
        default:
            clientPrice = await convertEuroToLocalCurrency(client.price)
            break
    }

    setClientWindow(
        client.clientName,
        client.clientDescription,
        "javascript:left()",
        client.link,
        "javascript:right()",
        "https://wonderland.sigmaclient.cloud/data/" + client.previewImage1,
        "https://wonderland.sigmaclient.cloud/data/" + client.previewImage2,
        clientPrice,
        clickable
    )
}

function setClientWindow(
    clientName,
    clientDescription,
    leftLink,
    centerLink,
    rightLink,
    topImage,
    bottomImage,
    clientPrice,
    clickable
) {
    const wrapper = document.querySelector(".window-wrapper");
    if (!wrapper) return;

    wrapper.innerHTML = `
        <main class="window">
            <img src="${topImage}" class="client-preview top" alt="Client preview image 1">

            <div class="client">
                <div class="client-element client-control left hover">
                    <a class="client-element-link" href="${leftLink}"></a>
                    <div class="arrow left"></div>
                </div>

                <div class="client-element client-text ${clickable ? `hover` : ""}">
                    ${clickable ? `<a class="client-element-link" href="${centerLink}"></a>` : ""}
                    <h1 class="client-name">${clientName}</h1>
                    <p class="client-price">${clientPrice}</p>
                    <p class="client-description">${clientDescription}</p>
                </div>

                <div class="client-element client-control right hover">
                    <a class="client-element-link" href="${rightLink}"></a>
                    <div class="arrow right"></div>
                </div>
            </div>

            <img src="${bottomImage}" class="client-preview bottom" alt="Client preview image 2">
        </main>
    `;
}