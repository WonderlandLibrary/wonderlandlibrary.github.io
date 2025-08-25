window.addEventListener("load", async () => {
    const container = document.getElementById("index-wrapper");

    const contentBox = document.createElement("div");
    contentBox.classList.add("window");

    const title = document.createElement("h2");
    title.innerText = "Wonderland Central";
    title.classList.add("title");
    contentBox.appendChild(title)

    const buttons = document.createElement("div");
    buttons.classList.add("buttons");

    buttons.appendChild(createButton("Marketplace", "Browse our cutting-edge partnered clients", "marketplace.html", "marketplace"))
    buttons.appendChild(createButton("Archive", "Browse our endless archive of clients, plugins, tools and more", "archive.html", "archive"))
    buttons.appendChild(createButton("Discord", "Join our discord to converse with highly intelligent individuals", "discord.html", "discord"))

    contentBox.appendChild(buttons)

    container.appendChild(contentBox);
});

function createButton(title, description, link, icon) {
    const wrapper = document.createElement("a");
    wrapper.href = link;

    const button = document.createElement("div");
    button.classList.add("button");

    const buttonLabels = document.createElement("div");
    buttonLabels.classList.add("button-labels");

    const titleElement = document.createElement("p")
    titleElement.classList.add("button-title")
    titleElement.innerText = title;
    buttonLabels.appendChild(titleElement);

    const descriptionElement = document.createElement("p");
    descriptionElement.classList.add("button-description");
    descriptionElement.innerText = description;
    buttonLabels.appendChild(descriptionElement);

    button.appendChild(buttonLabels);

    const iconElement = document.createElement("img")
    iconElement.classList.add("button-icon");
    iconElement.src = "icons/" + icon + ".webp";
    button.appendChild(iconElement);

    wrapper.appendChild(button);

    return wrapper;
}