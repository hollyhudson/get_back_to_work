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

var new_item_input;
var new_goal_btn;
var new_todo_btn;
var new_sabotage_btn;

var today = new Motivation();
//var section_header_test;
//var section_headers;

var prologue = true;

function setup() {
	canvas = createCanvas(windowWidth, windowHeight);
	canvas.position(0,0); 			// put the canvas at the top
	canvas.style('z-index', '-1'); 	// put it behind the page content

	get_back_to_work = select('.text-super');

	// Add the motivation lists to arrays
	/*
	for (var i = 0; i < today.goals.length; i++) {
		create_new_goal(today.goals[i]);
	}
	for (var i = 0; i < today.todos.length; i++) {
		create_new_todo(today.todos[i]);
	}
	for (var i = 0; i < today.sabotage.length; i++) {
		create_new_sabotage(today.sabotage[i]);
	}
	*/

	// make the bubbles
	for (var i = 0; i < num_bubbles; i++) {
		bubbles.push(new Bubble(random(width), random(height)));
	}	

/*
****** Create the control widgets at the top *********
*/

	// create the textbox
	new_item_input = createInput('add new');
	new_item_input.parent('#control-widgets');
	new_item_input.id('#new_item');

	// make some buttons for the textbox
	new_goal_btn = createButton('Goal');	
	new_goal_btn.parent('#control-widgets');
	new_goal_btn.id('#new_goal_btn');	
	new_goal_btn.mousePressed(create_new_goal_wrapper);

	new_todo_btn = createButton('To Do');	
	new_todo_btn.parent('#control-widgets');
	new_todo_btn.id('#new_todo_btn');	

	new_sabotage_btn = createButton('Sabotage');	
	new_sabotage_btn.parent('#control-widgets');
	new_sabotage_btn.id('#new_sabotage_btn');	

	new_goal_btn.mousePressed(create_new_goal_wrapper);
	new_todo_btn.mousePressed(create_new_todo_wrapper);
	new_sabotage_btn.mousePressed(create_new_sabotage_wrapper);

/*
****** Prologue dropzones *********

	goal_dropzone = createP("Drop your goals here");	
	goal_dropzone.style('z-index', '2');
	todo_dropzone = createP("Drop your to dos here");	
	todo_dropzone.style('z-index', '2');
	sabotage_dropzone = createP("Drop your sabotages here");	
	sabotage_dropzone.style('z-index', '2');

	finish_prologue_btn = createButton("Let's get started!");
	finish_prologue_btn.style('z-index', '2');
*/
}

/*
****** Adding buttons for goals, todos and sabotages *********
*/

function create_new_goal_wrapper() {
	create_new_goal(new_item_input.value());
	new_item_input.value(""); // clear the textbox
}

function create_new_todo_wrapper() {
	create_new_todo(new_item_input.value());
	new_item_input.value(""); // clear the textbox
}

function create_new_sabotage_wrapper() {
	create_new_sabotage(new_item_input.value());
	new_item_input.value(""); // clear the textbox
}

function create_new_goal(goal) {
	var new_goal = createElement('li');
	new_goal.parent("#goals");
	var new_button = createElement('button', goal);
	new_button.parent(new_goal);
	new_button.class('goal_button');
	goals.push(new_goal);
	new_button.mousePressed(more_blues);
}

function create_new_todo(todo) {
	var new_todo = createElement('li');
	new_todo.parent("#todos");
	var new_button = createElement('button', todo);
	new_button.parent(new_todo);
	new_button.class('todo_button');
	todos.push(new_todo);
	new_button.mousePressed(complete_todo);
}

function create_new_sabotage(sabotage) {
	var new_sabotage = createElement('li');
	new_sabotage.parent("#sabotage");
	var new_button = createElement('button', sabotage);
	new_button.parent(new_sabotage);
	new_button.class('sabotage_button');
	sabotages.push(new_sabotage);
	new_button.mousePressed(more_browns);
}

/*
****** Coloring bubbles based on clicks *********
*/

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
	if (prologue == true) {
		canvas.style('z-index', '1'); 	// cover page content
		noStroke();
		fill(240, 200, 255);
		if (windowWidth > windowHeight) {
			ellipse(windowWidth/2, windowHeight/2, windowWidth+500);
		} else {
			ellipse(windowWidth/2, windowHeight/2, windowHeight+500);
		}

	} else {
		canvas.style('z-index', '-1'); 	// put it behind the page content
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
}
