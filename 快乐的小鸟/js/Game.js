function Game(land, bird, bg, pipe, ctx) {
    this.land = land;
    this.bird = bird;
    this.bg = bg;
    this.pipes = [pipe];
    this.ctx = ctx;
    this.idx = 0;
    this.timer = null;
    this.init();
};

Game.prototype.init = function () {
    var me = this;
    me.timer = setInterval(function () {
        // 清除
        me.ctx.clearRect(0, 0, me.ctx.canvas.width, me.ctx.canvas.height);

        // 检测
        if (me.check()) {
            clearInterval(me.timer);
            me.ctx.clearRect(0, 0, 400, 600);
            var img = new Image();
            var img_bg = new Image();
            img_bg.src = 'images/bg_night.png';
            img.src = 'images/text_game_over.png';
            img.onload = function() {

                me.ctx.drawImage(img_bg, 0, 0);
                me.ctx.drawImage(img_bg, img_bg.width, 0);
                me.ctx.drawImage(img, 80, 200);
            }
            return;
        }

        // 渲染背景
        me.renderBg();

        // 渲染管子
        me.renderPipe();

        // 渲染大地
        me.renderLand();
 
        // 渲染小鸟
        me.renderBird();

        // 事件监听
        me.bindEvent();

        me.fly();
    }, 30)

};

// 渲染背景
Game.prototype.renderBg = function () {
    this.ctx.drawImage(this.bg.img, this.bg.x, this.bg.y);
    this.ctx.drawImage(this.bg.img, this.bg.x + this.bg.img.width, this.bg.y);
    this.ctx.drawImage(this.bg.img, this.bg.x + this.bg.img.width * 2, this.bg.y);

    this.bg.x -= this.bg.speed;

    if (this.bg.x < -this.bg.img.width) {
        this.bg.x = 0;
    }
};

// 渲染大地
Game.prototype.renderLand = function () {
    this.ctx.drawImage(this.land.img, this.land.x, this.land.y);
    this.ctx.drawImage(this.land.img, this.land.x + this.land.img.width, this.land.y);
    this.ctx.drawImage(this.land.img, this.land.x + this.land.img.width * 2, this.land.y);

    this.land.x -= this.land.speed;

    if (this.land.x < -this.land.img.width) {
        this.land.x = 0;
    }
};

// 渲染管子
Game.prototype.renderPipe = function () {
    var me = this;

    // 循环渲染
    this.pipes.forEach(function (value) {
        me.ctx.drawImage(value.up, value.x, value.h);
        me.ctx.drawImage(value.down, value.x, value.h + me.pipes[0].up.height + 100);
        value.x -= value.speed;
        // console.log(value.x);
    });

    // 边界判断
    if (this.pipes[0].x == 60) {
        this.pipes.push(new Pipe(imgs[2], imgs[3], 360, 0, 3));
    } else if (this.pipes[0].x < -this.pipes[0].up.width) {
        this.pipes.shift();
    }
};


// 渲染小鸟
Game.prototype.renderBird = function() {
    // 渲染翅膀
    this.ctx.save();

    this.ctx.translate(this.bird.x-25, this.bird.y-25);
    // console.log(this.bird.x, this.bird.y);
    
    if (this.bird.direction == 'down') {
        var deg = Math.PI / 180 * this.bird.speed * 3;
    } else {
        var deg = Math.PI / 180 * -this.bird.speed * 3;
    };
    this.ctx.rotate(deg);

    this.ctx.drawImage(this.bird.imgs[this.idx % 3], -25, -25);
    
    this.ctx.restore();

    // this.idx++;

    // // 向下掉落
    // if (this.bird.direction == 'down') {
    //     this.bird.y += this.bird.speed;
    //     this.bird.speed += 0.3;
        
    // } else {
    //     // 向上飞起
    //     this.bird.direction = 'up';
    //     this.bird.y -= this.bird.speed;;
    //     this.bird.speed -= 0.3;
        

    //     if (this.bird.speed <= 0) {
    //         this.bird.direction = 'down';
    //     }
    // }
};

// 点击
Game.prototype.bindEvent = function() {
    var me = this;
    document.onclick = function() {
        me.bird.direction = 'up';
        me.bird.speed = 5;
    }
};

// 检测
Game.prototype.check = function() {
    if (this.bird.y <= 0 || this.bird.y >= 400 + 24) {
        console.log('撞到上下面');
        return true;
    };
    this.ctx.save();
    this.renderPipe();
    this.ctx.globalCompositeOperation = 'source-in';
    this.renderBird();
    this.ctx.restore();
    // this.bird.speed = 1;
    var data = this.ctx.getImageData(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    for (var i = 0; i < data.data.length; i++) {
        if (data.data[i]) {
            console.log(222)
            return true;
        }
    }
}

Game.prototype.fly = function() {
    this.idx++;

    // 向下掉落
    if (this.bird.direction == 'down') {
        this.bird.y += this.bird.speed;
        this.bird.speed += 0.5;
        
    } else {
        // 向上飞起
        this.bird.direction = 'up';
        this.bird.y -= this.bird.speed;;
        this.bird.speed -= 0.5;
        
        if (this.bird.speed <= 0) {
            this.bird.direction = 'down';
        }
    }
}

    