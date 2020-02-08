function Snake(imgs) {
    // 头
    this.head = imgs.head;
    this.head_idx = 2;
    // 身体
    this.body = imgs.body;
    // 尾部
    this.tail = imgs.tail;
    this.tail_idx = 0;
    // 位置
    this.position = [
        {row:3, col: 1}, // 尾部
        {row:3, col: 2},
        {row:3, col: 3},
        {row:3, col: 4}, // 头
    ];
    // 定义蛇头的方向   左 37 0 上  38  1 右 39  2 下 40 3
    this.direction = 39;
    // this.lock = false;
}

// 绑定蛇的移动事件
// 移动完之后才能改变方向
Snake.prototype.move = function() {
    // lock = true;
    console.log('move');
    // 获取蛇头的位置
    var new_head = {
        col: this.position[this.position.length - 1].col,
        row: this.position[this.position.length - 1].row,
    }
    // 判断按下的方向,改变图像下标
    if (this.direction == 37) {
        // 左  0;列--
        this.head_idx = 0;
        new_head.col--;
    } else if (this.direction == 38) {
        // 上  1;行--
        this.head_idx = 1;
        new_head.row--;
    } else if (this.direction == 39) {
        // 右  2;列++--
        this.head_idx = 2;
        new_head.col++;
    } else if (this.direction == 40) {
        // 上  1;行++
        this.head_idx = 3;
        new_head.row++;
    }
    // 去除数组中的第一个，尾部追加新蛇头
    this.position.shift();
    this.position.push(new_head);
    // 获取尾部数组的第一个
    var tail = this.position[0];
    var pg = this.position[1];
    // 改变尾部头像索引
    if (tail.row == pg.row) {
        this.tail_idx = tail.col > pg.col ? 2: 0;
    } else {
        this.tail_idx = tail.row > pg.row ? 3: 1;
    } 
    // this.lock = false;
}


Snake.prototype.change = function(key){
    if (this.lock) {
        return;
    }
    if (Math.abs(key- this.direction) % 2 != 0) {
        // 改变蛇头方向
        this.direction = key;
    }
}

Snake.prototype.growUp = function(){
    // 获取数组的第一个，把它追加在头部，第一个就变成了第二个，新追加的就变成了尾部
    var tail = {
        row: this.position[0].row,
        col: this.position[0].col
    }
    this.position.unshift(tail);
}