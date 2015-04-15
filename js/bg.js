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
            var image_url = "../image/image.png"
            if (localStorage["emphasize"]) {
                var idx = content.indexOf(localStorage["emphasize"]);
                if (idx != -1) {
                    image_url = "../image/image2.png"
                }
            }
            var pubdate = $target.find("pubDate").text();
            var notify_obj = {
                type: "basic",
                iconUrl: image_url,
                title: content,
                message: pubdate,
                priority: 0
            };
            chrome.notifications.create(
                notify_obj,
                function () { /* nop */ }
            );
            created = true;
        })
        .fail(function (data) {});
}