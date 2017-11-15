# K-means clustering and visualization
## Implementation
Implementation of the k-means clustering class

The algorithm was implemented as a javascript class, class K(X, K, Niters). The class is constructed with three variables, X is the two dimensional data matrix that is to be classified. The K variable represents the number of prototypes (classes) to classify and finally the Niter wich in our case automatically runs Niter number of steps of the algorithm when constructed.

For demonstrational purposes the steps are intervaled on one second each step so that the progress can be seen live. The following link is to a live version of the whole project, with three datasets and manual eStep and mStep buttons.

```
http://sandbox.codelab.is/data/kmeans/
```

- [x] Initialize the prototypes. You can, for example, pick K random data points as your initial prototypes.
- [x] Calculate a distance matrix whose elements contain the Euclidean distance from each datapoint to the prototypes.
- [x] E-step: Compute the responsibilities from the distance matrix. (See Eq. 9.2 in Bishop).
- [x] M-step: Recompute the prototypes using Eq. 9.4 and the responsibilities calculated in the E-step.
- [x] Repeat the previous three steps Niter times.

## Objectives

#### a) Test your algorithm using K = 2 clusters on a dataset defined by:

![equation](https://i.gyazo.com/3f12b7c26daaf590bf552f33d3de5324.png)

#### With 75 datapoints from the first cluster and 150 datapoints from the second one.

The function generateData() generates the two following datasets and labels them:

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

The squares represent the prototypes, colors the current classification and dots the actual data points.

#### b) Compute J using the responsibilities and the distance matrix. Plot this for each iteration. How many iterations are appropriate? Can you design another stopping criterion?
![equation](https://i.gyazo.com/cfd466f29dfc07b89a73d6abafc1d12b.png)

While running the function computeJ() on every step these values for J came to be. After 7 steps the J stopped changing as the protypes and their datapoints have "gathered" closely enough so that the mean isn't changing in the e step.

1. 2293.29
2. 1811.95
3. 1537.13
4. 1537.13
5. 1382.52
6. 1293.94
7. 1245.39

A good stopping criterion would be that at the moment J does not change value inbetween iterations, the iterations would stop.

computeJ() is a class function for the kmeans algorithm.

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

#### c) Use the final responsibilities to estimate the ratio of data points in
each cluster

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

#### d) Try this with K = 3, 4 and 5 clusters.
#### e) Apply the K-means algorithm on Iris database. For what choice of K do the cluster labels correspond to the classes? In this case, compile the confusion matrix and calculate the misclassification rate.

The iris dataset consists of three different species of which we want to classify. That means we want to start off with K = 3 classes.

The image shows the classification after 8 steps in the algorithm. Once again, at a point where following steps did not make a difference.

![image](https://i.gyazo.com/70f975d760ddadb270a2a6c955179c21.png)

The following confusion table shows the unnamed three classes on the left corresponding to the number of data points classified for each of the actual species. Where for example 48 versicolor datapoints where classified as class 2 (blue) while only 6 of them were classified as class 1 (red).

![image](https://i.gyazo.com/b614dc861731d216c497c39109b7150a.png)



## In addition
The Old faithful dataset is also included.
