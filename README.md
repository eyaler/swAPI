Add the library to your HTML after loading p5.js:

`<script src="https://cdn.jsdelivr.net/gh/eyaler/swapi/index.min.js"></script>`


There are two functions to use in `setup()`: `setupBoxes(myArray)`, `animateBoxes(i, j, kOrMode)`

and add `drawBoxes()` to `draw()`


|`kOrMode` can take values: |                         |
|---------------------------|-------------------------|
|`false`                    |Highlight box i and box j|
|`k` (index)                |Also highlight box k     |
|`true`, `'swap'` or missing|Swap box i and box j     |
|`'after'`                  |Insert box j after box i |
|`'before'` or `'insert'`   |Insert box j before box i|


## Usage examples:
```
function setup() {
	createCanvas(windowWidth, windowHeight)
	const algo = ['bubble', 'selection', 'selection_with_insertion', 'insertion'][0]
	const numbers = [1, 10, 3, 2, 9, 1, 0]
	setupBoxes(numbers)
	
	if (algo == 'bubble') {  // Demonstrate highlighting two boxes and swapping
		let lastSwap = numbers.length - 1
		while (lastSwap) {
			let lastIndex = lastSwap
			lastSwap = 0
			for (let i = 0; i < lastIndex; i++) {
				if (swapped = numbers[i] > numbers[i + 1]) {
					;[numbers[i], numbers[i + 1]] = [numbers[i + 1], numbers[i]]
					lastSwap = i
				}
				animateBoxes(i, i + 1, swapped)
			}
		}
	} else if (algo == 'selection') {  // Demonstrate highlighting three boxes and swapping two
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
	} else if (algo == 'selection_with_insertion') {  // Demonstrate highlighting three boxes and inserting the second box before the first
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
	} else if (algo == 'insertion') {  // Demonstrate highlighting two boxes and inserting the second box before the first
		for (let i = 1; i < numbers.length; i++) {
			const current = numbers[i]
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
}

function draw() {
	drawBoxes()
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight)
}
```
