chrome.contextMenus.create({
  title: "复制链接地址",
  documentUrlPatterns: ["https://item.taobao.com/*"],
  onclick: function () {
    chrome.tabs.getSelected(null, function (tab) {
      var url = tab.url;
      if (url) {
        var reg = new RegExp("(^|&)id=([^&]*)(&|$)");
        var r = url.split("?")[1].match(reg); //search,查询？后面的参数，并匹配正则
        if (r != null) {
          var itemId = unescape(r[2]);
          var cpUrl = "https://item.taobao.com/item.htm?id=" + itemId;
          copyToClipboard(cpUrl);
        }
      }
    });
  },
});

function copyToClipboard(text) {
  const input = document.createElement("input");
  input.style.position = "fixed";
  input.style.opacity = 0;
  input.value = text;
  document.body.appendChild(input);
  input.select();
  document.execCommand("Copy");
  document.body.removeChild(input);
}
