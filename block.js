(function () {
    const ulContainer = document.getElementById('list-with-big-data');
    if (!ulContainer) {
        return;
    }
    const total = 100000;
    const batchSize = 4;   // 每次批量插入的节点个数，个数越多，界面越卡顿
    const batchCount = total / batchSize; // 批量处理的个数
    let batchDone = 0;      // 已经处理的个数
    function appendItems() {
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < batchCount; i++) {
            const liItem = document.createElement('li');
            liItem.innerText = batchDone * batchCount + i + 1;
            fragment.appendChild(liItem);
        }
        ulContainer.appendChild(fragment);
        batchDone++;
        doAppendBatch();
    }
    function doAppendBatch () {
        if (batchDone < batchCount) {
            // 在重绘之前，分批插入新节点
            window.requestAnimationFrame(appendItems)
        }
    }
    doAppendBatch();
    // 使用 事件委托 ，利用 JavaScript 的事件机制，实现对海量元素的监听，有效减少事件注册的数量
    ulContainer.addEventListener("click", function(e) {
        const target = e.target;

        if (target.tagName === "LI") {
            alert(target.innerText);
        }
    });
})();