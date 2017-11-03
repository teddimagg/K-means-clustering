let data = [];
let kmeans;
let scale;
let j;

function setup() {
	// Init data clusters and kmeans algorithm
	data = generateData();
	kmeans = new K(data, 2, 3);
	
	// Visual attributes
	rescale();

	// Init visual DOM
	createCanvas(600, 600);
	const eBtn = createButton('eStep');
	const mBtn = createButton('mStep');

	eBtn.mousePressed(e => kmeans.eStep());
	mBtn.mousePressed(e => kmeans.mStep());

	// Dataset swapping
	sel = createSelect();
	sel.option('Gaussian data clusters');
	sel.option('Old faithful');
	sel.option('Iris Dataset');

	sel.changed(() => {
		if(sel.value() == 'Old faithful'){
			data = oldFaithful;
			kmeans = new K(data, 2, 3);
		} else if(sel.value() == 'Iris Dataset'){
			data = iris;
			kmeans = new K(data, 3, 3);
		} else {
			data = generateData();
			kmeans = new K(data, 2, 3);
		}

		rescale();
	});
}

function draw() {
	canvas.getContext('2d').transform(1, 0, 0, -1, 0, canvas.height);
	background(200);
	
	fill('white');
	kmeans.data.forEach(elem => {
		if(elem.label)	
			labelColor(elem.label)
		ellipse(fitX(elem.x), fitY(elem.y), 8, 8);
	});
	
	kmeans.prototypes.forEach((prototype, i) => {
		labelColor(i+1);
		rect(fitX(prototype.x), fitY(prototype.y), 8, 8);
	});
}

// Visual helpers
rescale = () => {
	scale = dataScale(data);
	scale.x.delta = Math.abs(scale.x.min - scale.x.max);
	scale.y.delta = Math.abs(scale.y.min - scale.y.max);
}

fitX = x => ( map(x, scale.x.min - (0.2 * scale.x.delta), scale.x.max + (0.2 * scale.x.delta), 0, 600));
fitY = y => ( map(y, scale.y.min - (0.2 * scale.y.delta), scale.y.max + (0.2 * scale.y.delta), 0, 600));

labelColor = x => {
	switch(Number(x)) {
  		case 1:
  			fill('red');
  			break;
  		case 2:
  			fill('blue');
  			break;
  		case 3:
  			fill('green');
  			break;
  	}
}