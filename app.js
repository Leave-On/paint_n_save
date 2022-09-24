const tools = document.querySelectorAll('.tool')
const thicks = document.querySelectorAll('.thickness-wrapper')
const colors = document.querySelectorAll('.color')
const canvas = document.getElementById('canvas')
const clear = document.getElementById('clear')
const save = document.getElementById('save')

const ctx = canvas.getContext("2d")

canvas.height = window.innerHeight
canvas.width = window.innerWidth

ctx.lineCap = 'round'
ctx.lineWidth = 10

let drawColor = 'black'

clear.addEventListener('click', (e) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
})

save.addEventListener("click", () => {
  let data = canvas.toDataURL("imag/png")
  let a = document.createElement("a")
  a.href = data
  // what ever name you specify here
  // the image will be saved as that name
  a.download = "sketch.png"
  a.click()
})


canvas.addEventListener("mousemove", (e) => {
  let prevX = e.offsetX
  let prevY = e.offsetY
  let currentX = e.movementX
  let currentY = e.movementY

  if (e.buttons > 0) {
    ctx.beginPath()
    ctx.moveTo(prevX, prevY)
    ctx.lineTo(prevX - currentX, prevY - currentY)
    ctx.stroke()
  }

})

function activate (items) {
  for (let i = 0; i < items.length; i++) {
    items[i].addEventListener("click", function(e) {
      let currentTool = document.getElementsByClassName("tool-active");
      let currentThickness = document.getElementsByClassName("thickness-active");
      let currentColor = document.getElementsByClassName("color-active");
      if (this.classList.contains('tool')) {
        currentTool[0].className = currentTool[0].className.replace(" tool-active", "");
        this.className += " tool-active";
        if(this.classList.contains('eraser')) {
          ctx.strokeStyle = 'white'
        } else if (this.classList.contains('pen')) {
          ctx.strokeStyle = drawColor
          console.log(drawColor);
        }
      }
      if (this.classList.contains('thickness-wrapper')) {
        currentThickness[0].className = currentThickness[0].className.replace(" thickness-active", "");
        this.className += " thickness-active";
        let howThick = this.children[0].className.replace(/[^0-9]/g,"")
        ctx.lineWidth = howThick
      }
      if (this.classList.contains('color')) {
        currentColor[0].className = currentColor[0].className.replace(" color-active", "");
        this.className += " color-active";
        ctx.strokeStyle = this.classList[1]
        drawColor = this.classList[1]
        currentTool[0].className = currentTool[0].className.replace(" tool-active", "")
        tools[0].className += ' tool-active'
      }
    });
}
}
activate(tools)
activate(thicks)
activate(colors)

