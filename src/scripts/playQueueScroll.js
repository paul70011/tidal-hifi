function scrollToCurrentPlayQueueItem(){
    let playQueueItems = document.querySelector("[class*='playQueueItems']")
    let items = [...playQueueItems.querySelector(".ReactVirtualized__Grid__innerScrollContainer").children]
    let scrollDown = false

    for(let item of items){
        if(parseInt(item.style.height) > 64){
            playQueueItems.scrollTop = parseInt(item.style.top)
            return
        }
            if(item.querySelector("[class*='containerPriorityHistory']") != null){
            scrollDown = true
        }
    }
    if(scrollDown){
        playQueueItems.scrollTop = parseInt(items[items.length - 1].style.top)
    }else{
        playQueueItems.scrollTop -= playQueueItems.getBoundingClientRect().height
    }

    setTimeout(scrollToCurrentPlayQueueItem, 10)
}

function createToCurrentButton(){
    const playQueueSidebar = document.querySelector("#playQueueSidebar")
    const saveQueueWrapper = playQueueSidebar.querySelector("div[class*='tooltip']")
    const buttonsContainer = saveQueueWrapper.parentNode

    const wrapperClasses = [...saveQueueWrapper.classList]
    const buttonClasses = [...saveQueueWrapper.querySelector("button").classList]
    const tooltipClasses = [...saveQueueWrapper.querySelector("span").classList]

    const toCurrentButton = document.createElement("button")
    toCurrentButton.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-test="icon-PlaybackPlay" class="elemental__icon"><path d="M5 2.9V21.1C5 21.9 5.9 22.4 6.55 21.9L19.8 12.8C20.4 12.4 20.4 11.55 19.8 11.15L6.55 2.1C5.9 1.6 5 2.1 5 2.9Z" stroke="#FCFCFC" stroke-width="2px"></path></svg>'
    toCurrentButton.classList.add(...buttonClasses)
    toCurrentButton.addEventListener("click", () => {
        scrollToCurrentPlayQueueItem()
    })

    const toCurrentTooltip = document.createElement("span")
    toCurrentTooltip.innerText = "CURRENTLY PLAYING"
    toCurrentTooltip.classList.add(...tooltipClasses)

    const toCurrentWrapper = document.createElement("div")
    toCurrentWrapper.classList.add(...wrapperClasses)
    toCurrentWrapper.appendChild(toCurrentButton)
    toCurrentWrapper.appendChild(toCurrentTooltip)

    buttonsContainer.appendChild(toCurrentWrapper)
}

function attachMutationObserver(){
    const playQueueSidebar = document.querySelector("#playQueueSidebar")
    if(!playQueueSidebar){
        setTimeout(attachMutationObserver, 1000)
        return
    }
    let observer = new MutationObserver(mutations => {
        if([...mutations[0].target.classList].reduce(c => c.includes("containerIsOpen"))){
            setTimeout(() => {
                scrollToCurrentPlayQueueItem()
                createToCurrentButton()
            }, 50)
        }
    })
    observer.observe(playQueueSidebar, {attributes: true})
}

setTimeout(attachMutationObserver, 1000)