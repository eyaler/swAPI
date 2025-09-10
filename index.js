const marginFrac = 0.5
const rowHeight = 0.5
const minBoxHeight = 80
const boxHeightFrac = 0.15
const boxHeightJumpFactor = 1.3
const indexDeltaY = 35
const animationRate = 0.01
const delayRate = 0.01
const realignWeight = 0.99
let boxHeight
let boxes
let firstBox
let secondBox
let thirdBox
let animationProgress
let animationFinish
let isAnimating
let maxDigits
let values
let queue

function boxWidth() {
	return 1 / ((values.length+2*marginFrac)+(values.length-1)*marginFrac)
}

function drawBoxes() {
	if (!values)
		return
	background(240)
	textAlign(CENTER, CENTER)
	
	if (!isAnimating && queue.length) {
		const [i, j, kOrMode] = queue.shift()
		isAnimating = true
		animationProgress = -1
		animationFinish = 0
		firstBox = boxes[i]
		secondBox = boxes[j]
		thirdBox = null
		if (kOrMode === true || typeof kOrMode == 'string') {
			animationFinish = 1
			const saveX = secondBox.lastX
			const saveY = secondBox.lastY
			secondBox.lastX = firstBox.lastX
			secondBox.lastY = firstBox.lastY
			firstBox.lastX = saveX
			firstBox.lastY = saveY	
			if (kOrMode === true || kOrMode.toLowerCase() == 'swap') {
				;[boxes[i], boxes[j]] = [boxes[j], boxes[i]]
				;[values[i], values[j]] = [values[j], values[i]]
			} else if (['after', 'before', 'insert'].includes(kOrMode.toLowerCase()) && i != j) {
				boxes.splice(j, 1)
				const newI = boxes.indexOf(firstBox) + (kOrMode.toLowerCase() == 'after')
				boxes.splice(newI, 0, secondBox)
				values.splice(newI, 0, values.splice(j, 1)[0])
				firstBox.passive = true
			}
		} else if (kOrMode !== false)
			thirdBox = boxes[kOrMode]
	}
	
	textSize(20)
	fill('black')
	const w = boxWidth()
	for (let i = 0; i < boxes.length; i++)
		text(i, w * (marginFrac+0.5+i*(1+marginFrac)) * width, (rowHeight+boxHeight/2)*height + indexDeltaY)
	for (let i = boxes.length - 1; i >= 0; i--)
		drawBox(boxes[i])

	if (isAnimating) {
		animationProgress += animationProgress < 0 ? delayRate : animationRate
		if (animationProgress < 0)
			return
		if (animationProgress >= animationFinish) {
			animationProgress = 1
			isAnimating = false
		}

		const centerX = (secondBox.lastX+firstBox.lastX) / 2
		const centerY = (secondBox.lastY+firstBox.lastY) / 2
		const angle = PI * animationProgress
		if (!firstBox.passive) {
			firstBox.x = centerX + cos(angle)*(secondBox.lastX-centerX)
			firstBox.y = sin(-angle)*boxHeight*boxHeightJumpFactor*(centerY <= rowHeight ? -1 : 1) + secondBox.lastY + animationProgress*(secondBox.lastY-firstBox.lastY)
		}
		secondBox.x = centerX + cos(angle)*(firstBox.lastX-centerX)
		secondBox.y = sin(angle)*boxHeight*boxHeightJumpFactor*(centerY <= rowHeight ? -1 : 1) + firstBox.lastY + animationProgress*(secondBox.lastY-firstBox.lastY)
		for (let i = 0; i < values.length; i++)
			if ((boxes[i] != firstBox || firstBox.passive) && boxes[i] != secondBox)
				boxes[i].x = boxes[i].x + (w*(marginFrac+i*(1+marginFrac))-boxes[i].x)*(1-0.01**animationRate)
		if (!isAnimating) {
			firstBox.passive = false
			secondBox = null
			firstBox = null
			thirdBox = null
			for (let i = 0; i < values.length; i++)
				boxes[i].lastX = boxes[i].x
		}
	}
}

function drawBox(box) {
	const xw = box.x * width
	const yh = box.y * height
	const ww = boxWidth() * width
	const hh = boxHeight * height
	
	noStroke()
	fill(0, 50)
	rect(xw + 5, yh + 5, ww, hh, 10)
	
	if (box == firstBox)
	  fill(150, 250, 100)
	else if (box == secondBox)
	  fill(250, 100, 150)
	else if (box == thirdBox)
		fill(250, 100, 250)
	else
	  fill(100, 150, 250)
	stroke('black')
	strokeWeight(2)
	rect(xw, yh, ww, hh, 10)

	noStroke()
	fill('white')
	textSize(min(30, ww * 0.8 * 2 / maxDigits))
	text(box.value, xw + ww/2, yh + hh/2)
}

function setupBoxes(numbers) {
	if (numbers == null)
		throw Error('You forgot to pass an array to setupBoxes()')
	values = [...numbers]
	queue = []
	boxes = []
	maxDigits = max(2, ...values.map(i => i.toString().length))
	boxHeight = min(boxHeightFrac, minBoxHeight / height)
	for (let i = 0; i < values.length; i++) {
		boxes.push({value: values[i]})
		boxes[i].x = boxes[i].lastX = boxWidth() * (marginFrac+i*(1+marginFrac))
		boxes[i].y = boxes[i].lastY = rowHeight - boxHeight/2
	}
}

function animateBoxes(i, j, kOrMode=true) {
	if (i == null || j == null)
		throw Error('You forgot to pass at least two indices to animateBoxes()')
	queue.push([i, j, kOrMode])
}
