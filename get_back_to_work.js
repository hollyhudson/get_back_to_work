// Here's a more complex example to play with css with p5.js

var canvas;
var get_back_to_work;
var dir = 3;
var col_g = 0;

var goals = [];
var todos = [];
var sabotages = [];

var num_bubbles = 80;
var bubbles = [];

var today = new Motivation();
//var section_header_test;
//var section_headers;

function setup() {
	canvas = createCanvas(windowWidth, windowHeight);
	canvas.position(0,0); 			// put the canvas at the top
	canvas.style('z-index', '-1'); 	// put it behind the page content

	get_back_to_work = select('.text-super');

	// Add the motivation lists to arrays
	for (var i = 0; i < today.goals.length; i++) {
		var new_goal = createElement('li');
		new_goal.parent("#goals");
		var new_button = createElement('button', today.goals[i]);
		new_button.parent(new_goal);
		new_button.class('goal_button');
		goals.push(new_goal);
		new_button.mousePressed(more_blues);
	}
	for (var i = 0; i < today.todos.length; i++) {
		var new_todo = createElement('li');
		new_todo.parent("#todos");
		var new_button = createElement('button', today.todos[i]);
		new_button.parent(new_todo);
		new_button.class('todo_button');
		todos.push(new_todo);
		new_button.mousePressed(complete_todo);
	}
	for (var i = 0; i < today.sabotage.length; i++) {
		var new_sabotage = createElement('li');
		new_sabotage.parent("#sabotage");
		var new_button = createElement('button', today.sabotage[i]);
		new_button.parent(new_sabotage);
		new_button.class('sabotage_button');
		sabotages.push(new_sabotage);
		new_button.mousePressed(more_browns);
	}

	for (var i = 0; i < num_bubbles; i++) {
		bubbles.push(new Bubble(random(width), random(height)));
	}	
}

function more_blues() {
	for (var i = 0; i < bubbles.length; i++) {
		if (parseInt(random(10)) == 0) {
			bubbles[i].color = 1;
		}
	}	
}

function more_browns() {
	for (var i = 0; i < bubbles.length; i++) {
		if (parseInt(random(10)) == 0) {
			bubbles[i].color = 3;
		}
	}	
}

function complete_todo() {
	for (var i = 0; i < bubbles.length; i++) {
		if (parseInt(random(10)) == 0) {
			bubbles[i].color = 2;
		}
	}	
	this.remove();
}

function highlight() {
	this.style('color', 'rgb(240,' + col_g + ',240)');
	
}

function unhighlight() {
	this.style('color', 'rgb(240, 240, 240)');
}

function draw() {
	background(130);

	// flash the Get Back to Work text
	get_back_to_work.style('color', 'rgb(240,' + col_g + ',240)');

	if (col_g >= 240) {
		dir = -3;	
	} else if (col_g <= 0){
		// more magenta
		dir = 3;
	}	
	col_g += dir;	

	// Show the bubbles
	for (var i = 0; i < bubbles.length; i++) {
		bubbles[i].updatePos();
		bubbles[i].display();
	}
}
