let activeIndex = 0;

const groups = document.getElementsByClassName("card-group");

function handleRightButton() {
    const nextIndex = activeIndex + 1 <= groups.length - 1 ? activeIndex + 1 : 0;

    const currentCardGroup = document.querySelector(`[data-index="${activeIndex}"]`),
        nextCardGroup = document.querySelector(`[data-index="${nextIndex}"]`),
        currentTextGroup = document.querySelector(`[text-index="${activeIndex}"]`),
        nextTextGroup = document.querySelector(`[text-index="${nextIndex}"]`);
    
    currentCardGroup.dataset.status = "after";
    currentTextGroup.dataset.status = "after";

    nextCardGroup.dataset.status = "becoming-active-from-before";
    nextTextGroup.dataset.status = "becoming-active-from-before";

    setTimeout(() => {
        nextTextGroup.dataset.status = "active";
        nextCardGroup.dataset.status = "active";
        activeIndex = nextIndex;
    });
}

function handleLeftButton() {
    const nextIndex = activeIndex - 1 >= 0 ? activeIndex - 1 : groups.length - 1;

    const currentCardGroup = document.querySelector(`[data-index="${activeIndex}"]`),
        nextCardGroup = document.querySelector(`[data-index="${nextIndex}"]`),
        currentTextGroup = document.querySelector(`[text-index="${activeIndex}"]`),
        nextTextGroup = document.querySelector(`[text-index="${nextIndex}"]`);

    currentCardGroup.dataset.status = "before";
    currentTextGroup.dataset.status = "before";

    nextCardGroup.dataset.status = "becoming-active-from-after";
    nextTextGroup.dataset.status = "becoming-active-from-before";

    setTimeout(() => {
        nextCardGroup.dataset.status = "active";
        nextTextGroup.dataset.status = "active";
        activeIndex = nextIndex;
    });
}