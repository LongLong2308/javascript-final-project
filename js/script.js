"use strict";

/*
Hàm này được gọi khi trang tải xong.

Chức năng:
- Lấy tất cả phần tử figure.
- Sử dụng vòng lặp for.
- Tự động thêm tabindex.
- Thêm các sự kiện chuột và bàn phím.
*/
function addTabFocus() {
    console.log("Page loaded: addTabFocus function started.");

    const figures = document.querySelectorAll(".gallery figure");

    for (let i = 0; i < figures.length; i++) {
        const currentFigure = figures[i];
        const currentImage = currentFigure.querySelector("img");

        /*
        Tự động thêm tabindex="0".

        tabindex="0" giúp người dùng có thể nhấn Tab
        để đưa focus đến từng figure.
        */
        currentFigure.setAttribute("tabindex", "0");

        /*
        Thêm aria-label dựa vào alt của ảnh.
        Điều này hỗ trợ trình đọc màn hình.
        */
        currentFigure.setAttribute(
            "aria-label",
            currentImage.alt
        );

        /*
        Sự kiện chuột:
        Khi con trỏ đi vào figure.
        */
        currentFigure.addEventListener("mouseover", function () {
            console.log(
                "Mouseover event triggered:",
                currentImage.alt
            );

            updatePreview(currentFigure);
        });

        /*
        Khi con trỏ rời khỏi figure.
        */
        currentFigure.addEventListener("mouseleave", function () {
            console.log(
                "Mouseleave event triggered:",
                currentImage.alt
            );

            resetPreview();
        });

        /*
        Sự kiện bàn phím:
        Khi figure nhận focus bằng phím Tab.
        */
        currentFigure.addEventListener("focus", function () {
            console.log(
                "Focus event triggered:",
                currentImage.alt
            );

            updatePreview(currentFigure);
        });

        /*
        Khi focus rời khỏi figure.
        */
        currentFigure.addEventListener("blur", function () {
            console.log(
                "Blur event triggered:",
                currentImage.alt
            );

            resetPreview();
        });
    }

    console.log(
        figures.length +
        " figures received tabindex and event listeners."
    );
}


/*
Hàm cập nhật khu vực xem trước.

Khi người dùng:
- Di chuột vào ảnh.
- Hoặc dùng Tab để focus vào ảnh.

Hàm sẽ lấy:
- Đường dẫn src của ảnh.
- Văn bản alt của ảnh.
*/
function updatePreview(selectedFigure) {
    const preview = document.getElementById("image-preview");
    const selectedImage = selectedFigure.querySelector("img");

    console.log(
        "Updating preview with:",
        selectedImage.alt
    );

    preview.style.backgroundImage =
        "url('" + selectedImage.src + "')";

    preview.textContent = selectedImage.alt;
}


/*
Hàm đưa khu vực xem trước về trạng thái ban đầu.

Được gọi khi:
- Chuột rời khỏi figure.
- Figure mất focus.
*/
function resetPreview() {
    const preview = document.getElementById("image-preview");

    console.log("Preview reset.");

    preview.style.backgroundImage = "none";

    preview.textContent =
        "Choose an image below to display it here.";
}


/*
Sự kiện load.

Khi toàn bộ trang đã tải xong,
hàm addTabFocus sẽ được gọi.
*/
window.addEventListener("load", addTabFocus);