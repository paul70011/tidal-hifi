function scrollToCurrentPlayQueueItem(){
    let playQueueItems = document.querySelector("[class*='playQueueItems']")
    let items = [...playQueueItems.querySelector(".ReactVirtualized__Grid__innerScrollContainer").children]
    let scrollDown = false

    for(let item of items){
        if(parseInt(item.style.height) > 59){
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

    const buttonClasses = [...playQueueSidebar.querySelector("[class*='header']").querySelector("[class*='button']").classList]

    const toCurrentButton = document.createElement("button")
    toCurrentButton.innerText = "Currently Playing"
    toCurrentButton.classList.add(...buttonClasses)

    const header = playQueueSidebar.querySelector("[class*='header']")
    const saveButton = header.querySelector("button")

    header.insertBefore(toCurrentButton, saveButton)

    toCurrentButton.addEventListener("click", () => {
        scrollToCurrentPlayQueueItem()
    })
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
}, 2000)