// constructor:
function Bubble(posX, posY) {
	this.x = posX;
	this.y = posY;
	this.r = 20;
	this.color = 0; 	// 1=blue 2=green 3=brown else=grey

	this.display = function() {
		if (this.color == 1) {
			// blue
			//stroke(120, 200, 255);
			stroke(140, 200, 255);
			fill(100, 180, 240, 80);
		} else if (this.color == 2) {
			// green
			stroke(170, 255, 190);
			fill(140, 240, 120, 80);
		} else if (this.color == 3) {
			// brown
			stroke(190, 150, 80);
			fill(150, 100, 50, 80);
		} else {
			// grey
			stroke(180, 180, 180);
			fill(150, 150, 150, 80);
		}
		ellipse(this.x, this.y, this.r * 2, this.r * 2);
	}

	this.updatePos = function() {
		// wiggle randomly
		this.x = this.x + random(-1,1);
		this.y = this.y + random(-1,1);
	}
}
