function Game(map, food, stone, snake) {
    this.map = map;
    this.food = food;
    this.stone = stone;
    this.snake = snake;
    this.init();
    this.timer = null;
}
Game.prototype.init = function() {
    // 渲染背景
    this.map.renderMap();
    // 渲染食物
    this.renderFood();
    // 渲染障碍物
    this.renderStone();
    // 渲染蛇
    this.renderSnake();
    this.bindEvent();
    this.start();
}


// 渲染食物
Game.prototype.renderFood = function() {
    // 找到对应的div
    var div = this.map.divs[this.food.row][this.food.col];
    // 设置背景图
    div.style.backgroundImage = 'url(' + this.food.img + ')';
    div.style.backgroundSize = 'cover';

}

// 渲染障碍物
Game.prototype.renderStone = function() {
    // 遍历position对象，找到里面对应的节点，改变背景
    for (var i = 0; i < this.stone.position.length; i++) {
        var div = this.map.divs[this.stone.position[i].row][this.stone.position[i].col];
        div.style.backgroundImage = 'url(' + this.stone.img + ')';
        div.style.backgroundSize = 'cover';
    }

}

// 渲染蛇
Game.prototype.renderSnake = function() {
    // 头部--position里的最后一组 默认显示4个图片中的第三张
    var div = this.map.divs[this.snake.position[this.snake.position.length -1].row][this.snake.position[this.snake.position.length -1].col];
    console.log(div);
    div.style.backgroundImage = 'url(' + this.snake.head[this.snake.head_idx] + ')';
    div.style.backgroundSize = 'cover';

    // 尾部 默认显示4个图片中的第三张
    var div = this.map.divs[this.snake.position[0].row][this.snake.position[0].col];
    div.style.backgroundImage = 'url(' + this.snake.tail[this.snake.tail_idx] + ')';
    div.style.backgroundSize = 'cover';
    
    // 身体 除了头尾都是身体
    for (var i = 1; i < this.snake.position.length - 1; i++) {
        var div = this.map.divs[this.snake.position[i].row][this.snake.position[i].col];
        div.style.backgroundImage = 'url(' + this.snake.body + ')';
        div.style.backgroundSize = 'cover';
    }
}

// 方向键让蛇动起来
Game.prototype.bindEvent = function(){
    var me = this;
    document.onkeydown = function(e){
        console.log(e.keyCode);
        var e = e || event;
        if (e.keyCode >= 37 && e.keyCode <= 40) {
            me.snake.change(e.keyCode)
        }
    }
}
// 开始游戏
Game.prototype.start = function() {
    var me = this;
    this.timer = setInterval(function() {
        me.snake.move()
        // 吃食物长身体
        if (me.checkFood()) {
            // 长身体
            me.snake.growUp();
            // 获取随机产生的食物坐标
            var position = me.changeFood()
            // 更改食物的坐标
            me.food.change(position);
        }
        // 碰撞检测
        if (me.check()) {
            this.map.dom.innerHTML = '<img src="img/gameover.jpg">';
            clearInterval(me.timer)
            return;
        }
        // 移动后重新渲染
        me.map.clear();
        me.renderFood();
        // 渲染障碍物
        me.renderStone();
        // 渲染蛇
        me.renderSnake();
        me.bindEvent();
    },300)
}
// 吃食物
Game.prototype.checkFood = function() {
    // 获取头部
    var row = this.snake.position[this.snake.position.length-1].row;
    var col = this.snake.position[this.snake.position.length-1].col;
    // 判断是否重合
    if (row == this.food.row && col == this.food.col) {
        return true;
    }
}
// 改变食物位置
Game.prototype.changeFood = function() {
    // 获取石头和蛇的位置数组
    var position = this.snake.position.concat(this.stone.position);
    var food = {
        row: parseInt(Math.random() * this.map.row),
        col: parseInt(Math.random() * this.map.col)
    }
    var me = this;
    position.forEach(function(value) {
        // 如果产生的位置与position数组中的位置重合，就重新产生
        if (value.row == food.row && value.col == food.col) {
            return me.changeFood();
        }
    })
    return food;
}
// 碰撞检测
Game.prototype.check = function() {
    return this.checkOut() || this.checkStone() || this.checkSnake();
}
// 出界
Game.prototype.checkOut = function() {
    var row = this.snake.position[this.snake.position.length - 1].row;
    var col = this.snake.position[this.snake.position.length - 1].col;
    if(row < 0 || row == this.map.row || col < 0 || col == this.map.col) {
        return true;
    }
}
// 石头
Game.prototype.checkStone = function() {
    var row = this.snake.position[this.snake.position.length - 1].row;
    var col = this.snake.position[this.snake.position.length - 1].col;
    for (var i = 0; i < this.stone.position.length; i++) {
        if (row == this.stone.position[i].row && col == this.stone.position[i].col) {
            return true;
        }
    }
};

// 撞到自己
Game.prototype.checkSnake = function() {
    var row = this.snake.position[this.snake.position.length - 1].row;
    var col = this.snake.position[this.snake.position.length - 1].col;
    for (var i = 0; i < this.snake.position.length - 1; i++) {
        if (row == this.snake.position[i].row && col == this.snake.position[i].col) {
            return true;
        }
    }
}