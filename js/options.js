$(function () {
    if (localStorage["url"]) {
        $("#name").val(localStorage["url"]);
    }
    if (localStorage["interval"]) {
        $("#foo").val(localStorage["interval"]);
    }
    if (localStorage["emphasize"]) {
        $("#emphasize").val(localStorage["emphasize"]);
    }
    $("#sub").click(
        function () {
            localStorage["url"] = $("#name").val();
            localStorage["interval"] = $("#foo").val();
            localStorage["emphasize"] = $("#emphasize").val();
        });
});