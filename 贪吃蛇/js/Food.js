function Food(img, row, col) {
    this.img = img;
    this.row = row;
    this.col = col
}
Food.prototype.change = function(position) {
    this.row = position.row;
    this.col = position.col;
}