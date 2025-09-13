# swAPI
### A p5.js library for visualizing sorting algorithms

Editable demo: https://openprocessing.org/sketch/2716521

Interactive web app: https://openprocessing.org/sketch/2330796

<br>

## Usage

HTML:
```html
<script src="https://cdn.jsdelivr.net/npm/p5"></script>
<script src="https://cdn.jsdelivr.net/gh/eyaler/swapi/index.min.js"></script>
```

JavaScript:
```js
function setup() {
	createCanvas(windowWidth, windowHeight)
	const numbers = [8, 42, 16, 15, 23, 4, 8]
	setupBoxes(numbers)
	mySort(numbers)
}

function draw() {
	drawBoxes()
}

function mySort(numbers) {
	...
	animateBoxes(i, j, kOrMode)
}
```

Where:

|`kOrMode`                  |Animation					   |
|---------------------------|------------------------------|
|`false`                    |Highlight box i and box j     |
|`k` (index)                |Also highlight box k          |
|`true`, `'swap'` or missing|Also wap box i and box j      |
|`'after'`                  |Also insert box j after box i |
|`'before'` or `'insert'`   |Also insert box j before box i|

<br>

## Examples
### Bubble sort
#### Highlighting two boxes and swapping
```js
function mySort(numbers) {
	let lastSwap = numbers.length - 1
	while (lastSwap) {
		let lastIndex = lastSwap
		lastSwap = 0
		for (let i = 0; i < lastIndex; i++) {
			let swapped
			if (swapped = numbers[i] > numbers[i + 1]) {
				;[numbers[i], numbers[i + 1]] = [numbers[i + 1], numbers[i]]
				lastSwap = i
			}
			animateBoxes(i, i + 1, swapped)
		}
	}
}
```
![bubble](https://github.com/user-attachments/assets/a015145d-a5be-477c-8050-caa5c75193fe)

[Open in code editor](https://io.eyalgruss.com/ediking/?temp=p5#%3Cscript%20src%3D%22https%3A%2F%2Fcdn.jsdelivr.net%2Fnpm%2Fp5%22%3E%3C%2Fscript%3E%0A%3Cscript%20src%3D%22https%3A%2F%2Fcdn.jsdelivr.net%2Fgh%2Feyaler%2Fswapi%2Findex.min.js%22%3E%3C%2Fscript%3E%0A%3Cstyle%3Ebody%20%7Bmargin%3A%200%7D%20canvas%20%7Bdisplay%3A%20block%7D%3C%2Fstyle%3E%0A%3Cscript%3E'use%20strict'%0Afunction%20setup()%20%7B%0A%09createCanvas(windowWidth%2C%20windowHeight)%0A%09const%20numbers%20%3D%20%5B8%2C%2042%2C%2016%2C%2015%2C%2023%2C%204%2C%208%5D%0A%09setupBoxes(numbers)%0A%09mySort(numbers)%0A%7D%0A%0Afunction%20draw()%20%7B%0A%09drawBoxes()%0A%7D%0A%0Afunction%20mySort(numbers)%20%7B%0A%09let%20lastSwap%20%3D%20numbers.length%20-%201%0A%09while%20(lastSwap)%20%7B%0A%09%09let%20lastIndex%20%3D%20lastSwap%0A%09%09lastSwap%20%3D%200%0A%09%09for%20(let%20i%20%3D%200%3B%20i%20%3C%20lastIndex%3B%20i%2B%2B)%20%7B%0A%09%09%09let%20swapped%0A%09%09%09if%20(swapped%20%3D%20numbers%5Bi%5D%20%3E%20numbers%5Bi%20%2B%201%5D)%20%7B%0A%09%09%09%09%3B%5Bnumbers%5Bi%5D%2C%20numbers%5Bi%20%2B%201%5D%5D%20%3D%20%5Bnumbers%5Bi%20%2B%201%5D%2C%20numbers%5Bi%5D%5D%0A%09%09%09%09lastSwap%20%3D%20i%0A%09%09%09%7D%0A%09%09%09animateBoxes(i%2C%20i%20%2B%201%2C%20swapped)%0A%09%09%7D%0A%09%7D%0A%7D%0A%0Afunction%20windowResized()%20%7B%0A%09resizeCanvas(windowWidth%2C%20windowHeight)%0A%7D%0A%3C%2Fscript%3E)

<br>

### Selection sort
#### Highlighting three boxes and swapping two
```js
function mySort(numbers) {
	for (let i = 0; i < numbers.length - 1; i++) {
		let indexOfSmallest = i
		for (let j = i + 1; j < numbers.length; j++) {
			if (numbers[j] < numbers[indexOfSmallest])
				indexOfSmallest = j
			animateBoxes(i, indexOfSmallest, j)
		}
		if (indexOfSmallest > i) {  // Check what happens if you relax this condition
			;[numbers[i], numbers[indexOfSmallest]] = [numbers[indexOfSmallest], numbers[i]]
			animateBoxes(i, indexOfSmallest)
		}
	}
}
```
![selection](https://github.com/user-attachments/assets/b7d7f29c-062e-4d55-be9e-884e7f3a5f09)

[Open in code editor](https://io.eyalgruss.com/ediking/?temp=p5#%3Cscript%20src%3D%22https%3A%2F%2Fcdn.jsdelivr.net%2Fnpm%2Fp5%22%3E%3C%2Fscript%3E%0A%3Cscript%20src%3D%22https%3A%2F%2Fcdn.jsdelivr.net%2Fgh%2Feyaler%2Fswapi%2Findex.min.js%22%3E%3C%2Fscript%3E%0A%3Cstyle%3Ebody%20%7Bmargin%3A%200%7D%20canvas%20%7Bdisplay%3A%20block%7D%3C%2Fstyle%3E%0A%3Cscript%3E'use%20strict'%0Afunction%20setup()%20%7B%0A%09createCanvas(windowWidth%2C%20windowHeight)%0A%09const%20numbers%20%3D%20%5B8%2C%2042%2C%2016%2C%2015%2C%2023%2C%204%2C%208%5D%0A%09setupBoxes(numbers)%0A%09mySort(numbers)%0A%7D%0A%0Afunction%20draw()%20%7B%0A%09drawBoxes()%0A%7D%0A%0Afunction%20mySort(numbers)%20%7B%0A%09for%20(let%20i%20%3D%200%3B%20i%20%3C%20numbers.length%20-%201%3B%20i%2B%2B)%20%7B%0A%09%09let%20indexOfSmallest%20%3D%20i%0A%09%09for%20(let%20j%20%3D%20i%20%2B%201%3B%20j%20%3C%20numbers.length%3B%20j%2B%2B)%20%7B%0A%09%09%09if%20(numbers%5Bj%5D%20%3C%20numbers%5BindexOfSmallest%5D)%0A%09%09%09%09indexOfSmallest%20%3D%20j%0A%09%09%09animateBoxes(i%2C%20indexOfSmallest%2C%20j)%0A%09%09%7D%0A%09%09if%20(indexOfSmallest%20%3E%20i)%20%7B%20%20%2F%2F%20Check%20what%20happens%20if%20you%20relax%20this%20condition%0A%09%09%09%3B%5Bnumbers%5Bi%5D%2C%20numbers%5BindexOfSmallest%5D%5D%20%3D%20%5Bnumbers%5BindexOfSmallest%5D%2C%20numbers%5Bi%5D%5D%0A%09%09%09animateBoxes(i%2C%20indexOfSmallest)%0A%09%09%7D%0A%09%7D%0A%7D%0A%0Afunction%20windowResized()%20%7B%0A%09resizeCanvas(windowWidth%2C%20windowHeight)%0A%7D%0A%3C%2Fscript%3E)

<br>

### Selection sort with insertion
#### Highlighting three boxes and inserting the second box before the first
```js
function mySort(numbers) {
	for (let i = 0; i < numbers.length - 1; i++) {
		let indexOfSmallest = i	
		for (let j = i + 1; j < numbers.length; j++) {
			if (numbers[j] < numbers[indexOfSmallest])
				indexOfSmallest = j
			animateBoxes(i, indexOfSmallest, j)
		}
		if (indexOfSmallest > i) {
			const smallest = numbers[indexOfSmallest]
			for (let j = indexOfSmallest; j > i; j--)
				numbers[j] = numbers[j - 1]
			numbers[i] = smallest
			animateBoxes(i, indexOfSmallest, 'before')
		}
	}
}
```
![selection_with_insertion](https://github.com/user-attachments/assets/851b25d6-8cec-4889-8b81-e893e17adacd)

[Open in code editor](https://io.eyalgruss.com/ediking/?temp=p5#%3Cscript%20src%3D%22https%3A%2F%2Fcdn.jsdelivr.net%2Fnpm%2Fp5%22%3E%3C%2Fscript%3E%0A%3Cscript%20src%3D%22https%3A%2F%2Fcdn.jsdelivr.net%2Fgh%2Feyaler%2Fswapi%2Findex.min.js%22%3E%3C%2Fscript%3E%0A%3Cstyle%3Ebody%20%7Bmargin%3A%200%7D%20canvas%20%7Bdisplay%3A%20block%7D%3C%2Fstyle%3E%0A%3Cscript%3E'use%20strict'%0Afunction%20setup()%20%7B%0A%09createCanvas(windowWidth%2C%20windowHeight)%0A%09const%20numbers%20%3D%20%5B8%2C%2042%2C%2016%2C%2015%2C%2023%2C%204%2C%208%5D%0A%09setupBoxes(numbers)%0A%09mySort(numbers)%0A%7D%0A%0Afunction%20draw()%20%7B%0A%09drawBoxes()%0A%7D%0A%0Afunction%20mySort(numbers)%20%7B%0A%09for%20(let%20i%20%3D%200%3B%20i%20%3C%20numbers.length%20-%201%3B%20i%2B%2B)%20%7B%0A%09%09let%20indexOfSmallest%20%3D%20i%09%0A%09%09for%20(let%20j%20%3D%20i%20%2B%201%3B%20j%20%3C%20numbers.length%3B%20j%2B%2B)%20%7B%0A%09%09%09if%20(numbers%5Bj%5D%20%3C%20numbers%5BindexOfSmallest%5D)%0A%09%09%09%09indexOfSmallest%20%3D%20j%0A%09%09%09animateBoxes(i%2C%20indexOfSmallest%2C%20j)%0A%09%09%7D%0A%09%09if%20(indexOfSmallest%20%3E%20i)%20%7B%0A%09%09%09const%20smallest%20%3D%20numbers%5BindexOfSmallest%5D%0A%09%09%09for%20(let%20j%20%3D%20indexOfSmallest%3B%20j%20%3E%20i%3B%20j--)%0A%09%09%09%09numbers%5Bj%5D%20%3D%20numbers%5Bj%20-%201%5D%0A%09%09%09numbers%5Bi%5D%20%3D%20smallest%0A%09%09%09animateBoxes(i%2C%20indexOfSmallest%2C%20'before')%0A%09%09%7D%0A%09%7D%0A%7D%0A%0Afunction%20windowResized()%20%7B%0A%09resizeCanvas(windowWidth%2C%20windowHeight)%0A%7D%0A%3C%2Fscript%3E)

<br>

### Insertion sort
#### Highlighting two boxes and inserting the second box before the first
```js
function mySort(numbers) {
	for (let i = 1; i < numbers.length; i++) {
		const current = numbers[i]
		let j
		for (j = i; j && numbers[j - 1] > current; j--) {
			numbers[j] = numbers[j - 1]
			animateBoxes(j - 1, i, false)
		}
		if (j)
			animateBoxes(j - 1, i, false)
		if (i > j) {
			numbers[j] = current
			animateBoxes(j, i, 'before')
		}
	}
}
```
![insertion](https://github.com/user-attachments/assets/c0479c14-0624-4bdd-b6aa-e5846bad52b6)

[Open in code editor](https://io.eyalgruss.com/ediking/?temp=p5#%3Cscript%20src%3D%22https%3A%2F%2Fcdn.jsdelivr.net%2Fnpm%2Fp5%22%3E%3C%2Fscript%3E%0A%3Cscript%20src%3D%22https%3A%2F%2Fcdn.jsdelivr.net%2Fgh%2Feyaler%2Fswapi%2Findex.min.js%22%3E%3C%2Fscript%3E%0A%3Cstyle%3Ebody%20%7Bmargin%3A%200%7D%20canvas%20%7Bdisplay%3A%20block%7D%3C%2Fstyle%3E%0A%3Cscript%3E'use%20strict'%0Afunction%20setup()%20%7B%0A%09createCanvas(windowWidth%2C%20windowHeight)%0A%09const%20numbers%20%3D%20%5B8%2C%2042%2C%2016%2C%2015%2C%2023%2C%204%2C%208%5D%0A%09setupBoxes(numbers)%0A%09mySort(numbers)%0A%7D%0A%0Afunction%20draw()%20%7B%0A%09drawBoxes()%0A%7D%0A%0Afunction%20mySort(numbers)%20%7B%0A%09for%20(let%20i%20%3D%201%3B%20i%20%3C%20numbers.length%3B%20i%2B%2B)%20%7B%0A%09%09const%20current%20%3D%20numbers%5Bi%5D%0A%09%09let%20j%0A%09%09for%20(j%20%3D%20i%3B%20j%20%26%26%20numbers%5Bj%20-%201%5D%20%3E%20current%3B%20j--)%20%7B%0A%09%09%09numbers%5Bj%5D%20%3D%20numbers%5Bj%20-%201%5D%0A%09%09%09animateBoxes(j%20-%201%2C%20i%2C%20false)%0A%09%09%7D%0A%09%09if%20(j)%0A%09%09%09animateBoxes(j%20-%201%2C%20i%2C%20false)%0A%09%09if%20(i%20%3E%20j)%20%7B%0A%09%09%09numbers%5Bj%5D%20%3D%20current%0A%09%09%09animateBoxes(j%2C%20i%2C%20'before')%0A%09%09%7D%0A%09%7D%0A%7D%0A%0Afunction%20windowResized()%20%7B%0A%09resizeCanvas(windowWidth%2C%20windowHeight)%0A%7D%0A%3C%2Fscript%3E)
