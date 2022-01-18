const setupDropdown = (triggerId, contentId) => {
    const trigger = document.getElementById(triggerId)
    const content = document.getElementById(contentId)
    let show = false
    const expand = () => {
        show = true
        content.classList.toggle('expand')
    }

    const hide = () => {
        show = false
        content.classList.remove('expand')
    }

    trigger.onclick = () => {
        if (show) hide()
        else expand()
    }


    document.addEventListener('click', (e) => {
        if (e.target.id == triggerId) return;
        if (show) {
            hide()
        }
    })

}

setupDropdown('btn1', 'content1')
setupDropdown('btn2', 'content2')
setupDropdown('btn3', 'content3')
setupDropdown('btn4', 'content4')
setupDropdown('btn5', 'content5')