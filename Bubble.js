// constructor:
function Bubble(posX, posY) {
	this.x = posX;
	this.y = posY;
	this.r = 20;

	this.display = function() {
		stroke(180, 180, 180);
		fill(150, 150, 150, 80);
		ellipse(this.x, this.y, this.r * 2, this.r * 2);
	}

	this.updatePos = function() {
		// wiggle randomly
		this.x = this.x + random(-1,1);
		this.y = this.y + random(-1,1);
	}

	this.intersects = function(other) {
		var d = dist(this.x, this.y, other.x, other.y);

		if (d < this.r + other.r) {
			return true;
		} else {
			return false;
		}
	}

	this.touching = function(other) {
		this.blue = true;
	}

	this.notTouching = function() {
		this.blue = false;
	}

	this.clicked = function() {
		var d = dist(mouseX, mouseY, this.x, this.y);
		if (d < this.r) {
			this.blue = true;	
		}
	}

	this.isFinished = function() {
		if (this.r <= 0) {
			return true;
		} else {
			return false;
		}
	}
}
