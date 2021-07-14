var currentModel = -1;
var currentHousing = 4;

// Events page 1

function toggleProductIFrame(turnOn, soloIndex, showToggle, showInfo) {   
    const isSolo = soloIndex >= 0;
    const iFrame = document.getElementById("iframe-product");
    if (iFrame.getAttribute("src") == "") {
        iFrame.setAttribute("src", "iFrame_Babylon.html");
    }

    const iFrameContainer = document.getElementById("iframe-product-container");
    iFrameContainer.style.opacity = turnOn ? 1 : 0;
    iFrameContainer.style.pointerEvents = turnOn ? "all" : "none";   

    // When fading, wait for fade to finish. 300ms same delay as transition time in css.
    setTimeout(() => {
        document.getElementById("iframe-toggle-housing").style.display = showToggle ? "flex" : "none";
        document.getElementById("iframe-info-button").style.display = showInfo ? "inline-flex" : "none";
    }, turnOn ? 0 : 300);

    let contentWindow = iFrame.contentWindow;
    if (contentWindow.loaded) {
        contentWindow.toggleAutoRotate(turnOn);
    }

    if (contentWindow.loading) {
        console.log(contentWindow.loading);
        contentWindow.activateCorrectModel(-1);
    }

    if (turnOn) {       
        let index = isSolo ? soloIndex : housingOn ? currentHousing : currentModel;
       
        if (contentWindow.loaded) {            
            if (contentWindow.models[index] == null) {
                contentWindow.loadInModel(index);
            }
            else {
                contentWindow.cancelLoading();
                contentWindow.activateCorrectModel(index);
            }
        }
        else {
            
            iFrame.addEventListener("load", function() {
                contentWindow.loadInModel(index);
                contentWindow.addEventListener('pointerdown', function (ev) {
                    togglePointerEvents(false);
                }, false);
                contentWindow.addEventListener('pointerup', function (ev) {
                    togglePointerEvents(true);
                }, false);
            });
        }              
    }
    else {
        contentWindow.activateCorrectModel(-1);
    }  
}

var infoIFrameIsOn = false;
function toggleInfoIFrame(e) {
    infoIFrameIsOn = !infoIFrameIsOn;
    const iFrameContainer = document.getElementById("iframe-info-container");
    iFrameContainer.style.opacity = infoIFrameIsOn ? 1 : 0;
    iFrameContainer.style.pointerEvents = infoIFrameIsOn ? "all" : "none";
    
    e.stopPropagation();
}

function togglePointerEvents(turnOn) {
    document.getElementById("iframe-product-exit-button").style.pointerEvents = turnOn ? "all" : "none";
}