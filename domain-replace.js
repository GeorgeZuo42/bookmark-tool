document.getElementById('replaceForm').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const oldDomain = document.getElementById('oldDomain').value.trim();
    const newDomain = document.getElementById('newDomain').value.trim();
    const resultDiv = document.getElementById('result');
  
    console.log('旧域名:', oldDomain); // 调试信息
    console.log('新域名:', newDomain); // 调试信息
  
    // 检查输入是否有效
    if (!oldDomain || !newDomain) {
      resultDiv.textContent = '请输入有效的旧域名和新域名！';
      resultDiv.style.color = 'red';
      console.error('输入无效！');
      return;
    }
  
    try {
      // 显示正在处理的状态
      resultDiv.textContent = '正在替换，请稍候...';
      resultDiv.style.color = '#333';
  
      const bookmarks = await chrome.bookmarks.getTree();
      console.log('获取到的书签:', bookmarks); // 调试信息
      let updatedCount = 0;
  
      // 遍历书签并替换域名
      function replaceDomainInBookmarks(nodes) {
        for (const node of nodes) {
          if (node.url && node.url.includes(oldDomain)) {
            const newUrl = node.url.replace(oldDomain, newDomain);
            chrome.bookmarks.update(node.id, { url: newUrl });
            console.log(`替换: ${node.url} -> ${newUrl}`); // 调试信息
            updatedCount++;
          }
          if (node.children) {
            replaceDomainInBookmarks(node.children);
          }
        }
      }
  
      replaceDomainInBookmarks(bookmarks);
  
      // 显示结果
      if (updatedCount > 0) {
        resultDiv.textContent = `替换完成，共更新了 ${updatedCount} 个书签！`;
        resultDiv.style.color = 'green';
      } else {
        resultDiv.textContent = '未找到匹配的书签！';
        resultDiv.style.color = 'orange';
      }
    } catch (error) {
      console.error('发生错误:', error); // 错误调试信息
      resultDiv.textContent = '替换过程中出现错误，请检查控制台！';
      resultDiv.style.color = 'red';
    }
  });
  