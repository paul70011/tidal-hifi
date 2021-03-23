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
    const playIcon = document.querySelector("[data-type='button__pause'] svg").cloneNode(true)
    toCurrentButton.appendChild(playIcon)
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

setTimeout(() => {
    let observer = new MutationObserver(mutations => {
        if([...mutations[0].target.classList].reduce(c => c.includes("containerIsOpen"))){
            setTimeout(() => {
                scrollToCurrentPlayQueueItem()
                createToCurrentButton()
            }, 50)
        }
    })
    observer.observe(document.querySelector("#playQueueSidebar"), {attributes: true})
}, 4000)