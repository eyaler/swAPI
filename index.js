const marginFrac = .5
const rowHeight = 0.5
const minBoxHeight = 80
const boxHeightFrac = 0.15
const boxHeightJumpFactor = 1.3
const indexDeltaY = 35
const animationRate = 0.01
const delayRate = 0.01
let boxHeight
let boxes
let draggingBox
let targetBox
let animationProgress
let animationFinish
let isAnimating
let values
let pairs

function boxWidth() {
	return 1 / ((values.length+2*marginFrac)+(values.length-1)*marginFrac)
}

function drawBoxes() {
	background(240)
	animatePair()
	for (let i = 0; i < boxes.length; i++) {
		textSize(20)
		fill('black')
		text(i, boxWidth() * (marginFrac+.5+i*(1+marginFrac)) * width, (rowHeight+boxHeight/2)*height + indexDeltaY)
	}
	for (let i = 0; i < boxes.length; i++)
		drawBox(boxes[i])

	if (isAnimating) {
		animationProgress += animationProgress < 0 ? delayRate : animationRate
		if (animationProgress < 0)
			return
		if (animationProgress >= animationFinish) {
			animationProgress = 1
			isAnimating = false
		}

		const centerX = (targetBox.lastX+draggingBox.lastX) / 2
		const centerY = (targetBox.lastY+draggingBox.lastY) / 2
		const angle = PI * animationProgress
		draggingBox.x = centerX + cos(angle)*(targetBox.lastX-centerX)
		draggingBox.y = sin(angle)*boxHeight*boxHeightJumpFactor*(centerY <= rowHeight ? -1 : 1) + targetBox.lastY + animationProgress*(targetBox.lastY-draggingBox.lastY)
		targetBox.x = centerX + cos(angle)*(draggingBox.lastX-centerX)
		targetBox.y = sin(-angle)*boxHeight*boxHeightJumpFactor*(centerY <= rowHeight ? -1 : 1) + draggingBox.lastY + animationProgress*(targetBox.lastY-draggingBox.lastY)
		if (!isAnimating) {
			targetBox = null
			draggingBox = null
		}
	}
}

function drawBox(box) {
	noStroke()
	fill(0, 50)
	rect(box.x*width + 5, box.y*height + 5, boxWidth() * width, boxHeight * height, 10)
	
	if (box == draggingBox)
	  fill(150, 250, 100)
	else if (box == targetBox)
	  fill(250, 100, 150)
	else
	  fill(100, 150, 250)
	stroke('black')
	strokeWeight(2)
	rect(box.x * width, box.y * height, boxWidth() * width, boxHeight * height, 10)

	noStroke()
	fill('white')
	textSize(min(30, boxWidth() * width * 0.8))
	textAlign(CENTER, CENTER)
	text(box.value, (box.x+boxWidth()/2) * width, (box.y+boxHeight/2) * height)
}

function animatePair() {
	if (isAnimating || !pairs.length)
		return
	const [i, j, swap] = pairs.shift()
	isAnimating = true
	animationProgress = -1
	animationFinish = +swap
	draggingBox = boxes[i]
	targetBox = boxes[j]
	if (!swap)
		return
	const saveX = targetBox.lastX
	const saveY = targetBox.lastY
	targetBox.lastX = draggingBox.lastX
	targetBox.lastY = draggingBox.lastY
	draggingBox.lastX = saveX
	draggingBox.lastY = saveY
	;[boxes[i], boxes[j]] = [boxes[j], boxes[i]]
	;[values[i], values[j]] = [values[j], values[i]]
}

function setupBoxes(numbers) {
	textAlign(CENTER, CENTER)
	if (numbers?.length) {
		values = [...numbers]
		pairs = []
		boxes = []
	}
	boxHeight = min(boxHeightFrac, minBoxHeight / height)
	if (values) {
		
		for (let i = 0; i < values.length; i++) {
			if (numbers?.length)
				boxes.push({value: values[i]})
			boxes[i].lastX = boxWidth() * (marginFrac+i*(1+marginFrac))
			boxes[i].lastY = rowHeight - boxHeight/2
			if (numbers?.length) {
				boxes[i].x = boxes[i].lastX
				boxes[i].y = boxes[i].lastY
			}
		}
	}
}

function animateBoxes(i, j, swap=true) {
	pairs.push([i, j, swap])
}
