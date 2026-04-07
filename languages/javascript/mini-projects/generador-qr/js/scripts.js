let urlInput = document.querySelector("#url");
let generateBtn = document.querySelector("#generate");
let qrCodeContainer = document.querySelector("#qrcode");
let notification = document.querySelector("#notification");
generateBtn.addEventListener("click", () => {
    let url = urlInput.value.trim();
    if (url === "") {
        notification.textContent = "Por favor, ingresa una URL";
        notification.style.display = "block";
        return;
    }
    notification.style.display = "none";
    qrCodeContainer.innerHTML = "";
    new QRCode(qrCodeContainer, {
        text: url,
        width: 256,
        height: 256,
    });
});

