var content = "";
var created = false;

$(function () {
    setInterval("notifier()", 10000);
});

function notifier() {
    $.ajax({
            url: 'http://chaton.practical-scheme.net/haskell-ja/var/index.rdf',
            dataType: 'xml',
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