# K-means clustering and visualization
## Implementation
Implementation of the k-means clustering class

- [x] Initialize the prototypes. You can, for example, pick K random data points as your initial prototypes.
- [x] Calculate a distance matrix whose elements contain the Euclidean distance from each datapoint to the prototypes.
- [x] E-step: Compute the responsibilities from the distance matrix. (See Eq. 9.2 in Bishop).
- [x] M-step: Recompute the prototypes using Eq. 9.4 and the responsibilities calculated in the E-step.
- [x] Repeat the previous three steps Niter times.

## Objectives

a) The function generateData() generates two following datasets and labels them:
With 75 datapoints from the first cluster and 150 datapoints from the second one.

![equation](https://i.gyazo.com/3f12b7c26daaf590bf552f33d3de5324.png)

```javascript
generateData = () => {
	let data = [];
	for(i = 0; i < 75; i++){
	  	data[i] = {
	  		x: randomGaussian(-1,1),
	  		y: randomGaussian(1,1.1),
	  		actual: 'cluster1'
	  	}
  	}

	for(i = 0; i < 150; i++){
		data[75+i] = {
			x: randomGaussian(1,0.3),
			y: randomGaussian(-1,1),
			actual: 'cluster2'
		}
	}
	return data;
}
```

The following image shows the dataset classified by the algorithm after 6 steps. At that point the algorithm did not further move the prototypes nor re-compute the responsibilities.

![image](https://i.gyazo.com/ae6ad362ed306eb4b0b957c058bb7fff.png)

The squares represent the prototypes and dots the data points.

b) computeJ() is a class function for the kmeans algorithm.

![equation](https://i.gyazo.com/cfd466f29dfc07b89a73d6abafc1d12b.png)

```javascript
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
```

c) 

```javascript
classRationing() {
	// Calculates the ratio between all classes
	let ratio = [];
	this.data.forEach(point => {
		(ratio[point.label] != undefined) ? ratio[point.label]++ : ratio[point.label] = 0;
	});
	return ratio.map(r => (r / data.length).toFixed(2) + '%');
}
```

d) The iris dataset consists of three different species of which we want to classify. That means we want K = 3 in that particular case.

![image](https://i.gyazo.com/70f975d760ddadb270a2a6c955179c21.png)

![image](https://i.gyazo.com/b614dc861731d216c497c39109b7150a.png)



## In addition
The Old faithful dataset is also included.
