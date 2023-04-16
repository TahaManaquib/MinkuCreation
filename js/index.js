(function () { const o = document.createElement("link").relList; if (o && o.supports && o.supports("modulepreload")) return; for (const e of document.querySelectorAll('link[rel="modulepreload"]')) r(e); new MutationObserver(e => { for (const t of e) if (t.type === "childList") for (const l of t.addedNodes) l.tagName === "LINK" && l.rel === "modulepreload" && r(l) }).observe(document, { childList: !0, subtree: !0 }); function i(e) { const t = {}; return e.integrity && (t.integrity = e.integrity), e.referrerpolicy && (t.referrerPolicy = e.referrerpolicy), e.crossorigin === "use-credentials" ? t.credentials = "include" : e.crossorigin === "anonymous" ? t.credentials = "omit" : t.credentials = "same-origin", t } function r(e) { if (e.ep) return; e.ep = !0; const t = i(e); fetch(e.href, t) } })(); const f = document.querySelector(".lights"), g = document.querySelector(".camera"), b = document.querySelector(".action"), c = document.querySelector(".lightInfo"), h = document.querySelector(".actionInfo"), a = document.querySelector(".cameraInfo"), s = document.querySelector(".anim"), v = document.querySelector(".landing"), u = document.querySelector("#navbar"), E = document.querySelector("#navbar-trigger"), d = document.querySelector("#navbar-default"), I = Array.from(document.querySelectorAll(".cursor")); let m = 0, y = 0; document.addEventListener("mousemove", n => { m = n.clientX, y = n.clientY }); I.forEach((n, o) => { let i = 0, r = 0, e = .2 - o * .01; const t = function () { i += (m - i) * e, r += (y - r) * e, n.style.left = `${i}px`, n.style.top = `${r}px`, requestAnimationFrame(t) }; t() }); const p = new Collapse(d); E.addEventListener("click", () => { p.expand() }); d.addEventListener("click", () => { p.collapse() }); setTimeout(() => { f.style.display = "flex", setTimeout(() => { g.style.display = "flex", c.style.opacity = "0" }, 1500), setTimeout(() => { b.style.display = "flex", a.style.opacity = "0" }, 3e3), setTimeout(() => { s.style.position = "absolute", c.style.opacity = "1", a.style.opacity = "1", c.style.marginTop = "-10rem", h.style.marginTop = "10rem", v.style.display = "flex" }, 5e3), setTimeout(() => { s.style.animation = "top 2s ease" }, 6500), setTimeout(() => { s.style.display = "none", u.style.display = "flex", u.style.animation = "bottom 1s ease" }, 8500) }, 1e3);

class ArrowPointer {
  constructor() {
    this.root = document.body
    this.cursor = document.querySelector(".curzr")

    this.position = {
      distanceX: 0,
      distanceY: 0,
      distance: 0,
      pointerX: 0,
      pointerY: 0,
    },
      this.previousPointerX = 0
    this.previousPointerY = 0
    this.angle = 0
    this.previousAngle = 0
    this.angleDisplace = 0
    this.degrees = 57.296
    this.cursorSize = 20

    this.cursorStyle = {
      boxSizing: 'border-box',
      position: 'fixed',
      top: '0px',
      left: `${-this.cursorSize / 2}px`,
      zIndex: '2147483647',
      width: `${this.cursorSize}px`,
      height: `${this.cursorSize}px`,
      transition: '250ms, transform 100ms',
      userSelect: 'none',
      pointerEvents: 'none'
    }

    this.init(this.cursor, this.cursorStyle)
  }

  init(el, style) {
    Object.assign(el.style, style)
    this.cursor.removeAttribute("hidden")

  }

  move(event) {
    this.previousPointerX = this.position.pointerX
    this.previousPointerY = this.position.pointerY
    this.position.pointerX = event.pageX + this.root.getBoundingClientRect().x
    this.position.pointerY = event.pageY + this.root.getBoundingClientRect().y
    this.position.distanceX = this.previousPointerX - this.position.pointerX
    this.position.distanceY = this.previousPointerY - this.position.pointerY
    this.distance = Math.sqrt(this.position.distanceY ** 2 + this.position.distanceX ** 2)

    this.cursor.style.transform = `translate3d(${this.position.pointerX}px, ${this.position.pointerY}px, 0)`

    if (this.distance > 1) {
      this.rotate(this.position)
    } else {
      this.cursor.style.transform += ` rotate(${this.angleDisplace}deg)`
    }
  }

  rotate(position) {
    let unsortedAngle = Math.atan(Math.abs(position.distanceY) / Math.abs(position.distanceX)) * this.degrees
    let modAngle
    const style = this.cursor.style
    this.previousAngle = this.angle

    if (position.distanceX <= 0 && position.distanceY >= 0) {
      this.angle = 90 - unsortedAngle + 0
    } else if (position.distanceX < 0 && position.distanceY < 0) {
      this.angle = unsortedAngle + 90
    } else if (position.distanceX >= 0 && position.distanceY <= 0) {
      this.angle = 90 - unsortedAngle + 180
    } else if (position.distanceX > 0 && position.distanceY > 0) {
      this.angle = unsortedAngle + 270
    }

    if (isNaN(this.angle)) {
      this.angle = this.previousAngle
    } else {
      if (this.angle - this.previousAngle <= -270) {
        this.angleDisplace += 360 + this.angle - this.previousAngle
      } else if (this.angle - this.previousAngle >= 270) {
        this.angleDisplace += this.angle - this.previousAngle - 360
      } else {
        this.angleDisplace += this.angle - this.previousAngle
      }
    }
    style.transform += ` rotate(${this.angleDisplace}deg)`

    setTimeout(() => {
      modAngle = this.angleDisplace >= 0 ? this.angleDisplace % 360 : 360 + this.angleDisplace % 360
      if (modAngle >= 45 && modAngle < 135) {
        style.left = `${-this.cursorSize}px`
        style.top = `${-this.cursorSize / 2}px`
      } else if (modAngle >= 135 && modAngle < 225) {
        style.left = `${-this.cursorSize / 2}px`
        style.top = `${-this.cursorSize}px`
      } else if (modAngle >= 225 && modAngle < 315) {
        style.left = '0px'
        style.top = `${-this.cursorSize / 2}px`
      } else {
        style.left = `${-this.cursorSize / 2}px`
        style.top = '0px'
      }
    }, 0)
  }

  remove() {
    this.cursor.remove()
  }
}

(() => {
  const cursor = new ArrowPointer()
  if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    document.onmousemove = function (event) {
      cursor.move(event)
    }
  } else {
    cursor.remove()
  }
})()

// send email 
document.querySelector("#submitBtn").addEventListener('click', () => {
  const userName = document.querySelector("#name")
  const userEmail = document.querySelector("#email")
  const userMessage = document.querySelector("#message")
  const params = {
    name: userName.value,
    email: userEmail.value,
    message: userMessage.value,
  }
  const serviceID = "service_dqh9z8a"
  const templateID = "template_gby6y9l"
  userName.value = ""
  userEmail.value = ""
  userMessage.value = ""
  emailjs.send(serviceID, templateID, params).then(res => {
    console.log(res)
    alert("Thank you for contacting with us!")
  }).catch(err => console.log(err))
})

function workFilter() {
  const btns = document.querySelectorAll('.work-filter-btn')
  const items = document.querySelectorAll('.work-item')

  btns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault()
      const filter = e.target.dataset.filter

      items.forEach((item) => {
        if (filter === 'all') {
          item.style.display = 'block'
        } else {
          if (item.classList.contains(filter)) {
            item.style.display = 'block'
          } else {
            item.style.display = 'none'
          }
        }
      })
    })
  })
}

function showMoreLess() {
  const hideUnhideBtn = document.querySelector('.hide-unhide-btn')
        hideUnhideBtn.innerHTML = 'Show More'
  const items = document.querySelectorAll('.hide-unhide')

  hideUnhideBtn.addEventListener('click', () => {
    if(hideUnhideBtn.innerHTML === 'Show More') hideUnhideBtn.innerHTML = 'Show Less'
    else hideUnhideBtn.innerHTML = 'Show More'
    items.forEach((item) => {
      item.classList.toggle('hidden')
    })
  })
}

function labnolIframe(div) {
  let iframe = document.createElement('iframe');
  iframe.setAttribute('src', 'https://www.youtube.com/embed/' + div.dataset.id + '?autoplay=1');
  iframe.setAttribute('frameborder', '0');
  iframe.setAttribute('allowfullscreen', '1');
  iframe.setAttribute('allow', 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture');
  div.parentNode.replaceChild(iframe, div);
}

function initYouTubeVideos() {
  let playerElements = document.querySelectorAll('.youtube-player');
  for (let n = 0; n < playerElements.length; n++) {
    let videoId = playerElements[n].dataset.id;
    let div = document.createElement('div');
    div.setAttribute('data-id', videoId);
    let thumbNode = document.createElement('img');
    thumbNode.src = '//i.ytimg.com/vi/ID/hqdefault.jpg'.replace('ID', videoId);
    div.appendChild(thumbNode);
    let playButton = document.createElement('div');
    playButton.setAttribute('class', 'play');
    div.appendChild(playButton);
    div.onclick = function () {
      labnolIframe(this);
    };
    playerElements[n].appendChild(div);
  }
  workFilter()
  showMoreLess()
}

document.addEventListener('DOMContentLoaded', initYouTubeVideos);
