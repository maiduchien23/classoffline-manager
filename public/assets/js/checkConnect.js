let toggle_box_facebook = document.querySelector(".toggle_box_facebook");
if (toggle_box_facebook) {
    let toggle_box_google = document.querySelector(".toggle_box_google");
    let toggle_box_github = document.querySelector(".toggle_box_github");
    let checkbox_fb = document.getElementById("checkbox_fb");
    let checkbox_google = document.getElementById("checkbox_google");
    let checkbox_github = document.getElementById("checkbox_github");

    toggle_box_facebook.onclick = function (e) {
        if (checkbox_fb.checked) {
            const status = confirm("Bạn có chắc muốn tắt liên kết?");
            if (status) {
                window.location.href = "/connect/facebook/destroy";
            }
        } else {
            e.preventDefault();
            window.location.href = "/connect/facebook/redirect";
        }
    };

    toggle_box_google.onclick = function (e) {
        if (checkbox_google.checked) {
            const status = confirm("Bạn có chắc muốn tắt liên kết?");
            if (status) {
                window.location.href = "/connect/google/destroy";
            }
        } else {
            e.preventDefault();
            window.location.href = "/connect/google/redirect";
        }
    };

    toggle_box_github.onclick = function (e) {
        if (checkbox_github.checked) {
            const status = confirm("Bạn có chắc muốn tắt liên kết?");
            if (status) {
                window.location.href = "/connect/github/destroy";
            }
        } else {
            e.preventDefault();
            window.location.href = "/auth/github/redirect";
        }
    };
}
