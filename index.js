'use strict'

const marginFrac = 0.5
const rowHeight = 0.5
const maxBoxHeight = 80
const maxBoxHeightFrac = 0.15
const boxHeightJumpFactor = 1.5
const indexDeltaY = 35
const animationRate = 0.01
const delayRate = 0.01
const initialDelay = 1
const realignWeight = 0.99
const fgColors = ['white', 'black', 'red', 'orange', 'silver']
const bgColors = [[100, 150, 250], [150, 250, 100], [250, 100, 150], [250, 100, 250]]
let boxWidth
let boxHeight
let boxes
let firstBox
let secondBox
let thirdBox
let animationProgress
let animationFinish
let isAnimating
let maxChars
let values
let queue

function drawBoxes() {
	if (!values)
		return
	background(240)
	textAlign(CENTER, CENTER)
	
	if (queue.length && !isAnimating && frameCount > 1 / delayRate | 0) {
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
			firstBox.z = 1
			secondBox.z = 2
			if (kOrMode === true || kOrMode == 'swap') {
				;[boxes[i], boxes[j]] = [boxes[j], boxes[i]]
				;[values[i], values[j]] = [values[j], values[i]]
			} else if (['after', 'before', 'insert'].includes(kOrMode) && i != j) {
				boxes.splice(j, 1)
				const newI = boxes.indexOf(firstBox) + (kOrMode == 'after')
				boxes.splice(newI, 0, secondBox)
				values.splice(newI, 0, values.splice(j, 1)[0])
				firstBox.passive = true
			}
		} else if (kOrMode !== false)
			thirdBox = boxes[kOrMode]
	}
	
	textSize(20)
	fill('black')
	for (let i = 0; i < boxes.length; i++)
		text(i, boxWidth * (marginFrac+0.5+i*(1+marginFrac)) * width, (rowHeight+boxHeight/2)*height + indexDeltaY)
	boxes.toSorted((a, b) => a.z - b.z).forEach(drawBox)

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
		boxes.forEach((box, i) => {
			if ((box != firstBox || firstBox.passive) && box != secondBox)
				box.x = box.x + (boxWidth*(marginFrac+i*(1+marginFrac))-box.x)*(1-0.01**animationRate)
		})
		if (!isAnimating) {
		  firstBox.passive = false
			firstBox.z = secondBox.z = 0
			secondBox = null
			firstBox = null
			thirdBox = null
			for (let i = 0; i < boxes.length; i++)
				boxes[i].lastX = boxes[i].x
		}
	}
}

function drawBox(box) {
	const xw = box.x * width
	const yh = box.y * height
	const ww = boxWidth * width
	const hh = boxHeight * height
	
	noStroke()
	fill(0, 50)
	rect(xw + 5, yh + 5, ww, hh, 10)
	
	if (box == firstBox)
	  fill(bgColors[1])
	else if (box == secondBox)
	  fill(bgColors[2])
	else if (box == thirdBox)
		fill(bgColors[3])
	else
	  fill(bgColors[0])
	stroke('black')
	strokeWeight(2)
	rect(xw, yh, ww, hh, 10)

	noStroke()
	fill(box.color)
	textSize(min(30, ww * 0.8 * 2 / maxChars))
	text(box.value, xw + ww/2, yh + hh/2)
}

function setupBoxes(numbers) {
	if (numbers == null)
		throw Error('You forgot to pass an array to setupBoxes()')
	values = [...numbers]
	queue = []
	boxes = []
	const counter = {}
	maxChars = max(2, ...values.map(i => i.toString().length))
	boxWidth = 1 / ((values.length+2*marginFrac)+(values.length-1)*marginFrac)
	boxHeight = min(maxBoxHeightFrac, maxBoxHeight / height)
	values.forEach((val, i) => {
		boxes.push({value: val})
		counter[val] = counter[val] + 1 || 0
		boxes[i].color = fgColors[counter[val] % fgColors.length]
		boxes[i].x = boxes[i].lastX = boxWidth * (marginFrac+i*(1+marginFrac))
		boxes[i].y = boxes[i].lastY = rowHeight - boxHeight/2
		boxes[i].z = 0
	})
}

function animateBoxes(i, j, kOrMode=true) {
	if (i == null || j == null)
		throw Error('You forgot to pass at least two indices to animateBoxes()')
	if (typeof kOrMode == 'string')
		kOrMode = kOrMode.toLowerCase()
	queue.push([i, j, kOrMode])
}
