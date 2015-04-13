var content = "";
var created = false;
var interval_sec = 15;

$(function () {
    setInterval("notifier()", interval_sec * 1000);
});

function notifier() {
    //設定値がない場合即時復帰
    if (!localStorage["url"]) return;
    if (localStorage["interval"]) {
        interval_sec = parseInt(localStorage["interval"]);
    }

    $.ajax({
            url: localStorage["url"],
            dataType: 'xml',
            cache: false,
        })
        .done(function (data) {
            var $target = $(data).find("item:first");
            var temp_content = $target.find("title").text();

            // 更新なしの場合即時復帰する。
            // XMLは順番が保証されないので（確か）この判定方法は怪しい。
            if (content === temp_content) return;
            content = temp_content;
            var pubdate = $target.find("pubDate").text();
            var notify_obj = {
                type: "basic",
                iconUrl: "image.png",
                title: content,
                message: pubdate,
                priority: 0
            };
            if (created) {
                chrome.notifications.clear(
                    "id1",
                    function () { /* nop */ }
                );
            }
            chrome.notifications.create(
                "id1", notify_obj,
                function () { /* nop */ }
            );
            created = true;
        })
        .fail(function (data) {});
}