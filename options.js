$(function () {
    if (localStorage["url"]) {
        $("#name").val(localStorage["url"]);
    }
    if (localStorage["interval"]) {
        $("#foo").val(localStorage["interval"]);
    }
    $("#sub").click(
        function () {
            localStorage["url"] = $("#name").val();
            localStorage["interval"] = $("#foo").val();
        });
});
