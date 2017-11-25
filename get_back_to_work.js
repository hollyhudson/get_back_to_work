// Here's a more complex example to play with css with p5.js

let canvas;
let radius; // of the ellipse that covers the page during the prologue
const SHRINK_RATE = 20; // num pixels to subtract from radius while shrinking
let get_back_to_work;
let dir = 3;
let col_g = 0;

let goals = [];
let todos = [];
let sabotages = [];

const NUM_BUBBLES = 80;
let bubbles = [];

let new_item_input;
let new_goal_btn;
let new_todo_btn;
let new_sabotage_btn;

let today = new Motivation();

let prologue = 1; // 1 is on, 0 is transition, -1 is off

function setup() {
	canvas = createCanvas(windowWidth, windowHeight);
	canvas.position(0,0); 			// put the canvas at the top
	canvas.style('z-index', '-1'); 	// put it behind the page content
	canvas.id("canvas");

	get_back_to_work = select('.text-super');

	// Add the motivation lists to arrays
	/*
	for (let i = 0; i < today.goals.length; i++) {
		create_new_goal(today.goals[i]);
	}
	for (let i = 0; i < today.todos.length; i++) {
		create_new_todo(today.todos[i]);
	}
	for (let i = 0; i < today.sabotage.length; i++) {
		create_new_sabotage(today.sabotage[i]);
	}
	*/

	// make the bubbles
	for (let i = 0; i < NUM_BUBBLES; i++) {
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
*/

	goal_dropzone = createP("Drop your goals here");	
	goal_dropzone.class('dropzone');	
	goal_dropzone.position(10, 10);
	goal_dropzone.drop(got_goal_file);

	todo_dropzone = createP("Drop your to dos here");	
	todo_dropzone.class('dropzone');	
	todo_dropzone.position(10, 140);
	todo_dropzone.drop(got_todo_file);

	sabotage_dropzone = createP("Drop your sabotages here");	
	sabotage_dropzone.class('dropzone');	
	sabotage_dropzone.position(10, 270);
	sabotage_dropzone.drop(got_sabotage_file);

	finish_prologue_btn = createButton("Let's get started!");
	finish_prologue_btn.style('background-color', 'black');
	finish_prologue_btn.style('z-index', '2');
	finish_prologue_btn.position(10,400);
	finish_prologue_btn.mousePressed(end_prologue);
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
	console.log("creating a new goal!");
	let new_goal = createElement('li');
	new_goal.parent("#goals");
	let new_button = createElement('button', goal);
	new_button.parent(new_goal);
	new_button.class('goal_button');
	goals.push(new_goal);
	new_button.mousePressed(more_blues);
}

function create_new_todo(todo) {
	let new_todo = createElement('li');
	new_todo.parent("#todos");
	let new_button = createElement('button', todo);
	new_button.parent(new_todo);
	new_button.class('todo_button');
	todos.push(new_todo);
	new_button.mousePressed(complete_todo);
}

function create_new_sabotage(sabotage) {
	let new_sabotage = createElement('li');
	new_sabotage.parent("#sabotage");
	let new_button = createElement('button', sabotage);
	new_button.parent(new_sabotage);
	new_button.class('sabotage_button');
	sabotages.push(new_sabotage);
	new_button.mousePressed(more_browns);
}

/*
****** Processing files from dropzones *********
*/

function got_goal_file(file) {
	loadStrings(file.data, bulk_add_goals);
	goal_dropzone.remove();
}

function got_todo_file(file) {
	loadStrings(file.data, bulk_add_todos);
	todo_dropzone.remove();
}

function got_sabotage_file(file) {
	loadStrings(file.data, bulk_add_sabotages);
	sabotage_dropzone.remove();
}

function bulk_add_goals(data) {
	for (let i = 0; i < data.length; i++) {
		create_new_goal(data[i]);
	}
}

function bulk_add_todos(data) {
	for (let i = 0; i < data.length; i++) {
		create_new_todo(data[i]);
	}
}

function bulk_add_sabotages(data) {
	for (let i = 0; i < data.length; i++) {
		create_new_sabotage(data[i]);
	}
}

function end_prologue() {
	let dropzones = selectAll('.dropzone');
	for (let i = 0; i < dropzones.length; i++) {
		dropzones[i].remove();
	}	
	finish_prologue_btn.remove();
	prologue = 0; // start the transition off of the prologue screen
}

/*
****** Coloring bubbles based on clicks *********
*/

function more_blues() {
	for (let i = 0; i < bubbles.length; i++) {
		if (parseInt(random(10)) == 0) {
			bubbles[i].color = 1;
		}
	}	
}

function more_browns() {
	for (let i = 0; i < bubbles.length; i++) {
		if (parseInt(random(10)) == 0) {
			bubbles[i].color = 3;
		}
	}	
}

function complete_todo() {
	for (let i = 0; i < bubbles.length; i++) {
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
	if (prologue == 1) {
		// Prologue mode
		canvas.style('z-index', '1'); 	// cover page content
		
		// set the radius based on current window size
		if (windowWidth > windowHeight) {
			radius = windowWidth+500;
		} else {
			radius = windowHeight+500;
		}

		noStroke();
		fill(140, 100, 220);
		ellipse(windowWidth/2, windowHeight/2, radius);

	} else if (prologue == 0) {
		background(130);
		// Transition
		if (radius < 1) {
			// end transition
			prologue = -1;
		}
		radius = radius - SHRINK_RATE;
		ellipse(windowWidth/2, windowHeight/2, radius);
		
	} else if (prologue == -1) {
		// Prologue is done, main page configuration is active
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
		for (let i = 0; i < bubbles.length; i++) {
			bubbles[i].updatePos();
			bubbles[i].display();
		}
		
	} else {
		console.log("Something went wrong with the prologue timing.");
	}
	
}
