function Map(width, height, row, col) {
    this.width = width;
    this.height = height;
    this.row = row;
    this.col = col;
    // 产生一个容器
    this.dom = document.createElement('div');
    // 接受节点
    this.divs = [];
}
Map.prototype.renderMap = function() {
    // 创建行
    for (var i = 0; i < this.row; i++) {
        var arr = [];
        var divrow = document.createElement('div');
        divrow.className = 'row';
        // 创建列
        for (var a = 0; a < this.col; a++) {
            var divcol = document.createElement('div');
            divcol.className = 'col';
            // 将列加入行
            divrow.appendChild(divcol);
            arr.push(divcol);
        }
        // 将行加入dom容器
        this.dom.appendChild(divrow);
        this.divs.push(arr);
    }
    // 将容器加入body
    document.body.appendChild(this.dom);
}


// 清屏
Map.prototype.clear = function() {
    for (var row = 0; row < this.divs.length; row++) {
        for(var col = 0; col < this.divs[row].length; col++) {
            this.divs[row][col].style.backgroundImage = 'none';
        }
    }
}
