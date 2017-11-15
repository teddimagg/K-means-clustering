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

![equation](https://i.gyazo.com/3f12b7c26daaf590bf552f33d3de5324.png)

With 75 datapoints from the first cluster and 150 datapoints from the second one.

The following image shows the dataset classified by the algorithm for 3 steps.

![image](https://i.gyazo.com/ae6ad362ed306eb4b0b957c058bb7fff.png)

The squares represent the prototypes and dots the data points.

![equation](https://i.gyazo.com/cfd466f29dfc07b89a73d6abafc1d12b.png)

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non doloremque recusandae dolore at deserunt, repellat accusamus, adipisci veniam sunt quo ipsam vel quae molestias assumenda animi voluptatibus itaque! Dolores, dolore?

## In addition
The Iris dataset and the Old faithful dataset are also included. 
