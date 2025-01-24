document.addEventListener('DOMContentLoaded', () => {
    // 打开独立窗口的通用函数
    function openIndependentWindow(url, title, width = 400, height = 600) {
      chrome.windows.create({
        url: url,
        type: 'popup',
        width: width,
        height: height
      });
    }
  
    // 绑定功能按钮
    document.getElementById('domainReplace').addEventListener('click', () => {
      openIndependentWindow('domain-replace.html', '转换域名');
    });
  
    document.getElementById('organizeBookmarks').addEventListener('click', () => {
      openIndependentWindow('organize-bookmarks.html', '整理收藏夹');
    });
  
    document.getElementById('removeDuplicates').addEventListener('click', () => {
      openIndependentWindow('remove-duplicates.html', '删除重复项');
    });
  });
  