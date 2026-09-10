// ======================================================
// NEXACART - HOME PAGE JAVASCRIPT
// ======================================================


// ================= CART =================

let cartCount = 0;

function addToCart(productName) {

    cartCount++;

    const cart = document.getElementById("cartCount");

    if (cart) {
        cart.textContent = cartCount;
    }

    showNotification(
        productName + " added to cart 🛒"
    );
}


// ================= SEARCH =================

function openSearch() {

    const overlay =
        document.getElementById("searchOverlay");

    if (!overlay) return;

    overlay.classList.add("show");

    setTimeout(() => {

        const input =
            document.getElementById("searchInput");

        if (input) {
            input.focus();
        }

    }, 200);
}


function closeSearch() {

    const overlay =
        document.getElementById("searchOverlay");

    if (overlay) {
        overlay.classList.remove("show");
    }
}


function performSearch() {

    const input =
        document.getElementById("searchInput");

    if (!input) return;

    const value =
        input.value.trim();

    if (value === "") {

        showNotification(
            "Please enter a product name."
        );

        return;
    }

    showNotification(
        "Searching for: " + value
    );

}


// ================= SEARCH TAGS =================

document.querySelectorAll(".search-tags button")
.forEach(button => {

    button.addEventListener("click", function () {

        const input =
            document.getElementById("searchInput");

        if (!input) return;

        input.value = this.textContent;

        input.focus();

    });

});


// ================= CATEGORY =================

function categoryClick(category) {

    showNotification(
        category + " category selected."
    );

    const products =
        document.getElementById("products");

    if (products) {

        products.scrollIntoView({
            behavior: "smooth"
        });

    }
}


// ======================================================
// AI VISUAL SEARCH
// ======================================================


// ---------- CREATE VISUAL SEARCH MODAL ----------

function createVisualSearchModal() {

    // Already exists?
    if (document.getElementById("visualModal")) {
        return;
    }

    const modal =
        document.createElement("div");

    modal.id = "visualModal";

    modal.innerHTML = `

        <div class="visual-modal-backdrop"
             onclick="closeVisualSearch()">
        </div>

        <div class="visual-modal-box">

            <button
                class="visual-close"
                onclick="closeVisualSearch()">

                <i class="fa-solid fa-xmark"></i>

            </button>


            <div class="visual-header">

                <div class="visual-ai-icon">

                    <i class="fa-solid fa-wand-magic-sparkles"></i>

                </div>

                <div>

                    <span>AI POWERED</span>

                    <h2>AI Visual Search</h2>

                </div>

            </div>


            <p class="visual-description">

                Upload a product image and our AI system
                will analyze it to find similar products.

            </p>


            <label class="visual-drop-area"
                   for="productImage">

                <div class="drop-icon">

                    <i class="fa-solid fa-cloud-arrow-up"></i>

                </div>

                <h3>Upload Product Image</h3>

                <p>
                    PNG, JPG or JPEG
                </p>

                <span class="choose-image">
                    Choose Image
                </span>

            </label>


            <input
                type="file"
                id="productImage"
                accept="image/png,image/jpeg,image/jpg"
                hidden
            >


            <div id="previewArea"
                 class="visual-preview-area">

                <img
                    id="previewImage"
                    alt="Selected Product"
                >

                <div class="preview-info">

                    <span>SELECTED IMAGE</span>

                    <strong id="selectedFileName">
                        Product image
                    </strong>

                </div>

            </div>


            <button
                class="analyze-btn"
                id="analyzeButton"
                onclick="analyzeImage()">

                <i class="fa-solid fa-brain"></i>

                Analyze with AI

            </button>


            <div
                id="resultArea"
                class="visual-result">

                <div class="result-icon">

                    <i class="fa-solid fa-microchip"></i>

                </div>

                <div>

                    <span>AI RESULT</span>

                    <p id="resultText">
                        Waiting for image...
                    </p>

                </div>

            </div>


            <div class="visual-powered">

                <span></span>

                CNN Visual Search Module

                <span></span>

            </div>

        </div>
    `;

    document.body.appendChild(modal);

    addVisualSearchCSS();

}


// ---------- OPEN MODAL ----------

function startVisualSearch() {

    createVisualSearchModal();

    const modal =
        document.getElementById("visualModal");

    if (!modal) return;

    modal.classList.add("show");

    document.body.style.overflow = "hidden";

}


// ---------- CLOSE MODAL ----------

function closeVisualSearch() {

    const modal =
        document.getElementById("visualModal");

    if (!modal) return;

    modal.classList.remove("show");

    document.body.style.overflow = "";

}


// ======================================================
// IMAGE SELECTION
// ======================================================

document.addEventListener("change", function (event) {

    if (event.target.id !== "productImage") {
        return;
    }

    const file =
        event.target.files[0];

    if (!file) return;


    // File type check

    const allowedTypes = [
        "image/png",
        "image/jpeg",
        "image/jpg"
    ];

    if (!allowedTypes.includes(file.type)) {

        showNotification(
            "Please select PNG, JPG or JPEG image."
        );

        event.target.value = "";

        return;
    }


    // Preview

    const imageURL =
        URL.createObjectURL(file);

    const preview =
        document.getElementById("previewImage");

    const previewArea =
        document.getElementById("previewArea");

    const fileName =
        document.getElementById("selectedFileName");

    const result =
        document.getElementById("resultText");


    if (preview) {
        preview.src = imageURL;
    }

    if (previewArea) {
        previewArea.classList.add("show");
    }

    if (fileName) {
        fileName.textContent = file.name;
    }

    if (result) {

        result.textContent =
            "Image ready for AI analysis.";

    }


    showNotification(
        "Product image selected ✓"
    );

});


// ======================================================
// AI IMAGE ANALYSIS
// ======================================================

function analyzeImage() {

    const input =
        document.getElementById("productImage");

    if (!input) return;

    const file =
        input.files[0];


    if (!file) {

        showNotification(
            "Please upload a product image first."
        );

        return;
    }


    const result =
        document.getElementById("resultText");

    const button =
        document.getElementById("analyzeButton");


    if (result) {

        result.textContent =
            "Analyzing product image...";

    }


    if (button) {

        button.disabled = true;

        button.innerHTML = `
            <i class="fa-solid fa-spinner fa-spin"></i>
            AI Analyzing...
        `;

    }


    // Demo AI processing animation

    setTimeout(() => {

        if (result) {

            result.innerHTML = `
                <strong>Image analyzed successfully</strong>
                <br>
                <small>
                    CNN model connection ready.
                    Similar product matching will appear here.
                </small>
            `;

        }


        if (button) {

            button.disabled = false;

            button.innerHTML = `
                <i class="fa-solid fa-brain"></i>
                Analyze Again
            `;

        }


        showNotification(
            "AI image analysis completed ✓"
        );

    }, 1800);

}


// ======================================================
// VISUAL SEARCH CSS
// ======================================================

function addVisualSearchCSS() {

    if (document.getElementById("visualSearchCSS")) {
        return;
    }

    const style =
        document.createElement("style");

    style.id = "visualSearchCSS";

    style.textContent = `

    /* ===============================
       VISUAL SEARCH MODAL
    =============================== */

    #visualModal {

        position: fixed;

        inset: 0;

        z-index: 9999;

        display: flex;

        align-items: center;

        justify-content: center;

        padding: 20px;

        visibility: hidden;

        opacity: 0;

        transition: .35s ease;

    }


    #visualModal.show {

        visibility: visible;

        opacity: 1;

    }


    .visual-modal-backdrop {

        position: absolute;

        inset: 0;

        background: rgba(3,4,8,.88);

        backdrop-filter: blur(18px);

    }


    .visual-modal-box {

        width: min(560px, 94vw);

        max-height: 92vh;

        overflow-y: auto;

        position: relative;

        z-index: 2;

        padding: 30px;

        border-radius: 24px;

        background:
            linear-gradient(
                145deg,
                #151827,
                #0d1018
            );

        border: 1px solid rgba(255,255,255,.1);

        box-shadow:
            0 30px 100px rgba(0,0,0,.65),
            0 0 80px rgba(124,92,255,.12);

        transform: translateY(25px) scale(.96);

        transition: .35s ease;

    }


    #visualModal.show
    .visual-modal-box {

        transform:
            translateY(0)
            scale(1);

    }


    .visual-close {

        position: absolute;

        right: 18px;

        top: 18px;

        width: 38px;

        height: 38px;

        border-radius: 50%;

        background: #202331;

        color: #dfe2ec;

        font-size: 16px;

        transition: .25s;

    }


    .visual-close:hover {

        background: #7c5cff;

        transform: rotate(90deg);

    }


    .visual-header {

        display: flex;

        align-items: center;

        gap: 14px;

        padding-right: 45px;

    }


    .visual-ai-icon {

        width: 52px;

        height: 52px;

        display: grid;

        place-items: center;

        border-radius: 15px;

        background:
            linear-gradient(
                135deg,
                #7c5cff,
                #28d9ff
            );

        color: white;

        font-size: 20px;

        box-shadow:
            0 0 30px rgba(124,92,255,.25);

    }


    .visual-header span {

        color: #8e7cff;

        font-size: 8px;

        font-weight: 800;

        letter-spacing: 2px;

    }


    .visual-header h2 {

        margin-top: 4px;

        color: white;

        font-size: 25px;

    }


    .visual-description {

        margin: 20px 0;

        color: #858b9c;

        font-size: 12px;

        line-height: 1.7;

    }


    .visual-drop-area {

        min-height: 190px;

        display: flex;

        flex-direction: column;

        align-items: center;

        justify-content: center;

        text-align: center;

        border-radius: 18px;

        border: 1px dashed rgba(143,125,255,.5);

        background:
            radial-gradient(
                circle,
                rgba(124,92,255,.08),
                transparent 65%
            );

        cursor: pointer;

        transition: .3s;

    }


    .visual-drop-area:hover {

        border-color: #9b8aff;

        background:
            rgba(124,92,255,.09);

        transform: translateY(-2px);

    }


    .drop-icon {

        width: 55px;

        height: 55px;

        display: grid;

        place-items: center;

        border-radius: 15px;

        background: rgba(124,92,255,.13);

        color: #a596ff;

        font-size: 21px;

        margin-bottom: 12px;

    }


    .visual-drop-area h3 {

        font-size: 14px;

        color: #f4f5fb;

    }


    .visual-drop-area p {

        margin-top: 5px;

        color: #6f7587;

        font-size: 10px;

    }


    .choose-image {

        margin-top: 12px;

        padding: 8px 14px;

        border-radius: 8px;

        background: #7c5cff;

        color: white;

        font-size: 10px;

        font-weight: 700;

    }


    .visual-preview-area {

        display: none;

        align-items: center;

        gap: 13px;

        margin-top: 15px;

        padding: 10px;

        border-radius: 13px;

        background: #151822;

        border: 1px solid rgba(255,255,255,.07);

    }


    .visual-preview-area.show {

        display: flex;

    }


    .visual-preview-area img {

        width: 65px;

        height: 65px;

        object-fit: cover;

        border-radius: 10px;

        border: 1px solid rgba(255,255,255,.1);

    }


    .preview-info {

        display: flex;

        flex-direction: column;

        gap: 5px;

        min-width: 0;

    }


    .preview-info span {

        color: #777d90;

        font-size: 8px;

        letter-spacing: 1.5px;

    }


    .preview-info strong {

        color: #e8eaf2;

        font-size: 11px;

        overflow: hidden;

        text-overflow: ellipsis;

        white-space: nowrap;

        max-width: 330px;

    }


    .analyze-btn {

        width: 100%;

        margin-top: 15px;

        padding: 13px;

        border-radius: 11px;

        background:
            linear-gradient(
                90deg,
                #7c5cff,
                #4d9dff
            );

        color: white;

        font-size: 12px;

        font-weight: 800;

        transition: .3s;

    }


    .analyze-btn:hover {

        transform: translateY(-2px);

        box-shadow:
            0 10px 30px
            rgba(124,92,255,.25);

    }


    .analyze-btn:disabled {

        opacity: .7;

        cursor: wait;

        transform: none;

    }


    .visual-result {

        display: flex;

        align-items: center;

        gap: 12px;

        margin-top: 15px;

        padding: 13px;

        border-radius: 12px;

        background: rgba(124,92,255,.05);

        border: 1px solid rgba(124,92,255,.12);

    }


    .result-icon {

        width: 35px;

        height: 35px;

        display: grid;

        place-items: center;

        border-radius: 9px;

        background: rgba(124,92,255,.12);

        color: #a092ff;

        flex-shrink: 0;

    }


    .visual-result span {

        color: #777d90;

        font-size: 7px;

        letter-spacing: 1.5px;

    }


    .visual-result p {

        margin-top: 4px;

        color: #dce0ea;

        font-size: 10px;

        line-height: 1.5;

    }


    .visual-result small {

        color: #777d90;

    }


    .visual-powered {

        margin-top: 18px;

        display: flex;

        align-items: center;

        gap: 8px;

        justify-content: center;

        color: #555b6b;

        font-size: 8px;

        letter-spacing: 1px;

    }


    .visual-powered span {

        width: 25px;

        height: 1px;

        background: #303443;

    }


    @media (max-width: 600px) {

        .visual-modal-box {

            padding: 22px;

        }

        .visual-header h2 {

            font-size: 21px;

        }

        .visual-drop-area {

            min-height: 160px;

        }

    }

    `;

    document.head.appendChild(style);

}


// ======================================================
// OFFER
// ======================================================

function showOffer() {

    showNotification(
        "Exclusive offers are coming soon 🔥"
    );

}


// ======================================================
// NOTIFICATION
// ======================================================

function showNotification(message) {

    const oldNotification =
        document.querySelector(".custom-notification");

    if (oldNotification) {
        oldNotification.remove();
    }


    const notification =
        document.createElement("div");

    notification.className =
        "custom-notification";


    notification.innerHTML = `

        <i class="fa-solid fa-circle-check"></i>

        <span>${message}</span>

    `;


    document.body.appendChild(notification);


    setTimeout(() => {

        notification.classList.add("hide");

        setTimeout(() => {

            notification.remove();

        }, 300);

    }, 2200);

}


// ======================================================
// NOTIFICATION CSS
// ======================================================

const notificationStyle =
    document.createElement("style");


notificationStyle.textContent = `

.custom-notification {

    position: fixed;

    right: 25px;
    bottom: 25px;

    z-index: 12000;

    display: flex;

    align-items: center;

    gap: 10px;

    padding: 14px 18px;

    background: #151821;

    border: 1px solid rgba(255,255,255,.1);

    border-radius: 12px;

    color: #e9ebf4;

    font-size: 12px;

    box-shadow:
        0 15px 40px rgba(0,0,0,.4);

    animation:
        notificationIn .35s ease;

}


.custom-notification i {

    color: #8d7cff;

}


.custom-notification.hide {

    animation:
        notificationOut .3s ease forwards;

}


@keyframes notificationIn {

    from {

        opacity: 0;

        transform:
            translateY(20px);

    }

    to {

        opacity: 1;

        transform:
            translateY(0);

    }

}


@keyframes notificationOut {

    to {

        opacity: 0;

        transform:
            translateY(20px);

    }

}

`;

document.head.appendChild(notificationStyle);


// ======================================================
// ESCAPE KEY
// ======================================================

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            closeSearch();

            closeVisualSearch();

        }

    }
);


// ======================================================
// NAVBAR ACTIVE
// ======================================================

const navLinks =
    document.querySelectorAll(
        ".nav-links a"
    );


navLinks.forEach(link => {

    link.addEventListener(
        "click",
        function () {

            navLinks.forEach(item => {

                item.classList.remove(
                    "active"
                );

            });
 
            this.classList.add("active");

        }
    );

});


// ======================================================
// INITIALIZE VISUAL SEARCH
// ======================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        createVisualSearchModal();

    }
);