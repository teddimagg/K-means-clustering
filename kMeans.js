//K-means algorithm
class K {
	constructor(X, K, Niters) {
		// Data includes data set x and the responsibility variable as well
		this.data = X;
		
		//Initialize the prototypes. K's are picked randomly
		this.prototypes = []; //µ
		let scale = dataScale(this.data);
		for(let i = 0; i < K; i++){
			this.prototypes[i] = {
				x: random(scale.x.min, scale.x.max),
				y: random(scale.y.min, scale.y.max)
			}
		}

		// Training iterations
		let iterations = setInterval(() => {
			this.eStep();
			this.mStep();
			Niters--;
			!Niters && clearInterval(iterations);
		}, 400);
	}

	eStep() {
		// Each data point is labelled according to it's closest prototype µ
		this.data.forEach(point => {
			let distances = [];
			this.prototypes.forEach((proto, i) => {
				distances[i] = {i: i, dist: dist(point.x, point.y, proto.x, proto.y)};
			});
			distances = distances.sort((a,b) => a.dist > b.dist);
			point.label = (distances[0].i + 1).toString()
		});
	}

	mStep() {
		// Each prototype is assigned a new value from its class's mean (µ).
		this.prototypes.forEach((proto, i) => {
			this.prototypes[i] = mean(this.data.filter(point => (point.label == i + 1)));
		});
	}

	computeJ() {
		// J represents the sum of the squares of the distances of 
		// each data point to its assigned vector µk.
		let j = 0;
		this.data.forEach(x => {
			this.prototypes.forEach((mu, k) => {
				(x.label == k) && (j += pow(dist(x.x, x.y, mu.x, mu.y), 2));
			});
		});
		return j;
	}

	classRationing() {
		// Calculates the ratio between all classes
		let ratio = [];
		this.data.forEach(point => {
			(ratio[point.label] != undefined) ? ratio[point.label]++ : ratio[point.label] = 0;
		});
		return ratio.map(r => (r / data.length).toFixed(2) + '%');
	}

	missClassification(classlabel) {
		// Generates a confusion table from the classification accuracy
		// don't know the class names, go with the most frequent of each prototype.
		
		let misclass = [];
		this.data.forEach(point => {
			if(point[classlabel] == undefined) 
				point[classlabel] = { correct: 0, missed: 0 };

			if(point[classlabel] == point.label){
				misclass[label].correct++;
			} else {
				misclass[label].missed++;
			}
		});
	}
}

// Helpers
generateData = () => {
	let data = [];
	for(i = 0; i < 75; i++){
	  	data[i] = {
	  		x: randomGaussian(-1,1),
	  		y: randomGaussian(1,1.1)
	  	}
  	}

	for(i = 0; i < 150; i++){
		data[75+i] = {
			x: randomGaussian(1,0.3),
			y: randomGaussian(-1,1)
		}
	}
	return data;
}

dataScale = data => ({
	x: {
		min: Math.min.apply(null, data.map(p => p.x)),
		max: Math.max.apply(null, data.map(p => p.x))
	},
	y: {
		min: Math.min.apply(null, data.map(p => p.y)),
		max: Math.max.apply(null, data.map(p => p.y))
	}
});

mean = points => ({ 
	x: points.reduce((sum, value) => sum + value.x, 1) / points.length,
	y: points.reduce((sum, value) => sum + value.y, 1) / points.length
});