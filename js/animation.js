
function onloadBody() {

// DECLARE REQUIRED FUNCTIONS
    
    // FINDS ELEMENTS WITH COMMON CENTER 
    function commonCenter(element1, element2) // compares elements centers
    {
        var rect1 = element1.getBoundingClientRect();
        pointX1 = (rect1.left + rect1.right) / 2;
        pointY1 = (rect1.top + rect1.bottom) / 2;

        var rect2 = element2.getBoundingClientRect();
        pointX2 = (rect2.left + rect2.right) / 2;
        pointY2 = (rect2.top + rect2.bottom) / 2;

        if (Math.abs(pointX1 - pointX2) <= 10 && Math.abs(pointY1 - pointY2) <= 10) // +/- 10 
        {
            return true;
        }
    }

    // SETS ADDITIONAL "origin_" ATTRIBUTE 
    function setOriginAttribute(orElement, orAttribute) {
        orElement.setAttribute("origin_" + orAttribute, orElement.getAttribute(orAttribute));
    }

    // SETS INITIAL ATTRIBUTES AS NEW ADDITIONAL ATTRIBUTE "origin_" 
    function setOriginAttributes(orElement) 
    {
        if (orElement == "circle") {
            setOriginAttribute(orElement, "cx"); // "origin_cx" for <circle> elements
            setOriginAttribute(orElement, "cy"); // "origin_cy" for <circle> elements
        }

        setOriginAttribute(orElement.parentNode, "transform"); // "origin_transform" for <g> elements
    }
    
    // SETS PROPER IDS AND CLASSES FOR TEXT AND CIRCLE ELEMENTS WITH COMMON CENTERS
    function setIdsAndClasses(svgID) {
        var texts = document.getElementById(svgID).getElementsByTagName("text");
        for (var i = 0; i < texts.length; i++) {
            var gDisplay = "";
            if (texts[i].parentNode.getAttribute("display") == "none") {gDisplay = "invisible";}
            texts[i].id = "txt" + texts[i].textContent.replace(/\D/g, '') + gDisplay;
            var circles = document.getElementById(svgID).getElementsByTagName("circle");
            var sameCircles = 0;
            for (var x = 0; x < circles.length; x++) {

                if (commonCenter(texts[i], circles[x])) {
                    var circleID = "crcltxt" + texts[i].textContent.replace(/\D/g, '') + sameCircles;
                    var circlesClass = "crcltxt" + texts[i].textContent.replace(/\D/g, '');
                    circles[x].setAttribute("id", circleID);
                    circles[x].setAttribute("class", circlesClass);
                    texts[i].setAttribute("class", "has_circle");
                    sameCircles++;
                }
            }
        }
    }

    // SET IDS SVGS
    document.getElementById("svgAnimationCanvas").getElementsByTagName("svg")[0].id = "pic1";
    document.getElementById("svgAnimationCanvas").getElementsByTagName("svg")[1].id = "pic2";

    // SET EQUAL HEIGHT & WIDTH FOR SVGS
    var pic1 = document.getElementById("pic1");
    var pic2 = document.getElementById("pic2");
    if (pic1.clientHeight > pic2.clientHeight) {
        pic2.setAttribute("height", pic1.getAttribute("height")+pic2.getAttribute("height"))
    } else {
      pic1.setAttribute("height", pic2.getAttribute("height"))
    }

    if (pic1.clientWidth > pic2.clientWidth) {
        pic2.setAttribute("width", pic1.getAttribute("width")+pic2.getAttribute("width"))
    } else {
      pic1.setAttribute("width", pic2.getAttribute("width"))
    }

    // SET IDS AND CLASSES FOR SVGS ELEMENTS
    setIdsAndClasses("pic1");
    setIdsAndClasses("pic2");


    // SET ORIGIN ATTRIBUTES
    var g_s = document.getElementsByTagName("g");
    for (i = 0; i < g_s.length; i++) {
        g_s[i].setAttribute("origin_transform", g_s[i].getAttribute("transform"));
    }
    var circle_s = document.getElementsByTagName("circle");
    for (i = 0; i < circle_s.length; i++) {
        circle_s[i].setAttribute("origin_cx", circle_s[i].getAttribute("cx"));
        circle_s[i].setAttribute("origin_cy", circle_s[i].getAttribute("cy"));
    }
}

// TRANSFORMS 1ST SVG INTO 2ND

function animateSVG() {

    // DECLARE 1ST SVG AS SNAP.SVG OBJECT
    var s = Snap("#pic1");
    pic1 = document.getElementById("pic1");
    pic2 = document.getElementById("pic2");

    // SET ATTRIBUTES OF 2ND SVG IN INITIAL POSITIONS (required if this isn't first cicle of animation)
    var g_s = pic2.getElementsByTagName('text');
    for (i = 0; i < g_s.length; i++) {
        var trans = (g_s[i].parentNode.getAttribute('origin_transform'));
        if (trans != null) {
            g_s[i].parentNode.setAttribute('transform', trans);
        }
    }

    var g_s = pic2.getElementsByTagName('circle');
    for (i = 0; i < g_s.length; i++) {
        var c_x = (g_s[i].getAttribute('origin_cx'));
        var c_y = (g_s[i].getAttribute('origin_cy'));
        var trans = (g_s[i].parentNode.getAttribute('origin_transform'));

        if (trans != null) {
            g_s[i].parentNode.setAttribute('transform', trans);
        }
        g_s[i].setAttribute('cx', c_x);
        g_s[i].setAttribute('cy', c_y);
    }

    
    // FADE-IN ELEMENTS OF 2ND SVG
    var fadeIns = pic2.getElementsByTagName("path"); // FADE-IN <path> ELEMENTS
    for (var i = 0; i < fadeIns.length; i++) {
        fadeIns[i].style.transition = "1s"; // SET FADE-IN ANIMATION DURATION 
        fadeIns[i].style.opacity = "1"; 
    }
    var fadeIns = pic2.getElementsByTagName("circle"); // FADE-IN <circle> ELEMENTS
    for (var i = 0; i < fadeIns.length; i++) {
        fadeIns[i].style.transition = "1s"; // SET FADE-IN ANIMATION DURATION
        fadeIns[i].style.opacity = "1";
    }
    var fadeIns = pic2.getElementsByTagName("text"); // FADE-IN <text> ELEMENTS
    for (var i = 0; i < fadeIns.length; i++) {
        fadeIns[i].style.transition = "1s"; // SET FADE-IN ANIMATION DURATION
        fadeIns[i].style.opacity = "1";
    }

    // FADE-OUT ELEMENTS OF 1ST SVG
    var faded = pic1.getElementsByTagName("path"); // FADE-OUT <path> ELEMENTS
    for (var i = 0; i < faded.length; i++) {
        faded[i].style.transition = ".5s"; // SET FADE-OUT ANIMATION DURATION 
        faded[i].style.opacity = "0";
    }
    var faded = pic1.getElementsByTagName("circle"); // FADE-OUT <path> ELEMENTS
    for (var i = 0; i < faded.length; i++) {
        faded[i].style.transition = ".5s"; // SET FADE-OUT ANIMATION DURATION 
        faded[i].style.opacity = "0";
    }
    var faded = pic1.getElementsByTagName("text"); // FADE-OUT <text> ELEMENTS
    for (var i = 0; i < faded.length; i++) {
        faded[i].style.transition = ".5s"; // SET FADE-OUT ANIMATION DURATION 
        faded[i].style.opacity = "0";
    }

    // MOVE ELEMENTS OF 1ST SVG TO THE POSITIONS OF 2ND

    var texts1 = pic1.getElementsByTagName("text");

    // SEARCH FOR COMMON TEXTS IN BOTH SVGS BY IDs
    for (var i = 0; i < texts1.length; i++) {
        var texts2 = pic2.getElementsByTagName("text");
        for (var x = 0; x < texts2.length; x++) {
            var texts1 = pic1.getElementsByTagName("text");
            if (texts1[i].id == texts2[x].id) {
                
                // TRANSFORM TEXT
                var textPosition2 = texts2[x].parentNode.getAttribute("origin_transform");
                texts1[i].style.opacity = "1";
                var snapElementID = "#" + texts1[i].id;
                var snapElement = s.select(snapElementID).parent();
                snapElement.animate({transform: textPosition2}, 1000); // SET TEXT ANIMATION WITH DURATION IN MS

                // TRANSFORM CIRCLES
                if (texts1[i].getAttribute("class") == "has_circle") {
                    var circles1Class = "crcl" + texts1[i].id;
                    var circles1 = pic1.querySelectorAll('.' + circles1Class);
                    var circleX = pic2.querySelectorAll('.' + circles1Class)[0].getAttribute("origin_cx");
                    var circleY = pic2.querySelectorAll('.' + circles1Class)[0].getAttribute("origin_cy");
                    var circlePosition2 = pic2.querySelectorAll('.' + circles1Class)[0].parentNode.getAttribute("origin_transform");
                    for (var z = 0; z < circles1.length; z++) {
                        var circleID = "#" + circles1[z].id;
                        circles1[z].parentNode.setAttribute("origin_transform", circles1[z].parentNode.getAttribute("origin_transform"));
                        circles1[z].setAttribute("origin_cx", circles1[z].getAttribute("cx"));
                        circles1[z].setAttribute("origin_cy", circles1[z].getAttribute("cy"));
                        var circleGroup = s.select(circleID).parent();
                        circleGroup.animate({ transform: circlePosition2 }, 1000);  // SET CIRCLE OUTTER <g> ANIMATION WITH DURATION IN MS
                        var circleOne = s.select(circleID);
                        circles1[z].style.transition = "0s";
                        circleOne.animate({ cx: circleX }, 1000); // SET CIRCLE CX ANIMATION WITH DURATION IN MS
                        circleOne.animate({ cy: circleY }, 1000); // SET CIRCLE CY ANIMATION WITH DURATION IN MS
                        circles1[z].style.opacity = "1";
                    }
                }
            }
        }
    }

    pic2.style.opacity = "1"; // FADE IN 2ND SVG
    pic2.style.transition = "1s";  // SET 2ND SVG FADE-IN ANIMATION DURATION
    pic2.style.transitionDelay = "1s"; // SET 2ND SVG FADE-IN ANIMATION DELAY
    pic1.style.opacity = "0"; // FADE OUT 1ST SVG
    pic1.style.transition = "1s"; // SET 1ST SVG FADE-OUT ANIMATION DURATION
    pic1.style.transitionDelay = "1s"; // SET 1ST SVG FADE-OUT ANIMATION DELAY
    document.getElementById("control").disabled = true;
    document.getElementById("control").onclick = returnBack; // SET TURN-BACK ANIMATION EVENT TO CONTROL BUTTON   
    setTimeout(function() { document.getElementById("control").disabled = false; }, 1000); // DISABLES BUTTON FOR INTERVAL IN MS
}

// TRANSFORMS 2ND SVG INTO 1ST

function returnBack() {

    // DECLARE 2ND SVG AS SNAP.SVG OBJECT
    var s = Snap("#pic2");
    pic1 = document.getElementById("pic1");
    pic2 = document.getElementById("pic2");

    // SET ATTRIBUTES OF 1ST SVG IN INITIAL POSITIONS
    var g_s = pic1.getElementsByTagName('text');
    for (i = 0; i < g_s.length; i++) {
        var trans = (g_s[i].parentNode.getAttribute('origin_transform'));
        if (trans != null) {
            g_s[i].parentNode.setAttribute('transform', trans);
        }
    }
    var g_s = pic1.getElementsByTagName('circle');
    for (i = 0; i < g_s.length; i++) {
        var c_x = (g_s[i].getAttribute('origin_cx'));
        var c_y = (g_s[i].getAttribute('origin_cy'));
        var trans = (g_s[i].parentNode.getAttribute('origin_transform'));
        if (trans != null) {
            g_s[i].parentNode.setAttribute('transform', trans);
        }
        g_s[i].setAttribute('cx', c_x);
        g_s[i].setAttribute('cy', c_y);
    }

    // FADE-IN ELEMENTS OF 1ST SVG
    var fadeIns = pic1.getElementsByTagName("path"); // FADE-IN <path> ELEMENTS
    for (var i = 0; i < fadeIns.length; i++) {
        fadeIns[i].style.transition = "1s";  // SET FADE-IN ANIMATION DURATION 
        fadeIns[i].style.opacity = "1";
    }
    var fadeIns = pic1.getElementsByTagName("circle"); // FADE-IN <circle> ELEMENTS
    for (var i = 0; i < fadeIns.length; i++) {
        fadeIns[i].style.transition = "1s"; // SET FADE-IN ANIMATION DURATION 
        fadeIns[i].style.opacity = "1";
    }
    var fadeIns = pic1.getElementsByTagName("text"); // FADE-IN <text> ELEMENTS
    for (var i = 0; i < fadeIns.length; i++) {
        fadeIns[i].style.transition = "1s"; // SET FADE-IN ANIMATION DURATION
        fadeIns[i].style.opacity = "1";
    }

    // FADE-OUT ELEMENTS OF 2ND SVG
    var faded = pic2.getElementsByTagName("path"); // FADE-OUT <path> ELEMENTS
    for (var i = 0; i < faded.length; i++) {
        faded[i].style.transition = ".5s"; // SET FADE-OUT ANIMATION DURATION
        faded[i].style.opacity = "0";
    }
    var faded = pic2.getElementsByTagName("circle"); // FADE-OUT <circle> ELEMENTS
    for (var i = 0; i < faded.length; i++) {
        faded[i].style.transition = ".5s"; // SET FADE-OUT ANIMATION DURATION
        faded[i].style.opacity = "0";
    }
    var faded = pic2.getElementsByTagName("text"); // FADE-OUT <text> ELEMENTS
    for (var i = 0; i < faded.length; i++) {
        faded[i].style.transition = ".5s"; // SET FADE-OUT ANIMATION DURATION
        faded[i].style.opacity = "0";
    }

    // MOVE ELEMENTS OF 1ST SVG TO THE POSITIONS OF 2ND

    var texts1 = document.getElementById("pic2").getElementsByTagName("text");

    // SEARCH FOR COMMON TEXTS IN BOTH SVGS BY IDs
    for (var i = 0; i < texts1.length; i++) {
        var texts2 = pic1.getElementsByTagName("text");
        for (var x = 0; x < texts2.length; x++) {
            var texts1 = pic2.getElementsByTagName("text");
            if (texts1[i].id == texts2[x].id) {
                
                // TRANSFORM TEXT
                var textPosition2 = texts2[x].parentNode.getAttribute("origin_transform");
                texts1[i].style.opacity = "1";
                var snapElementID = "#" + texts1[i].id;
                var snapElement = s.select(snapElementID).parent();
                snapElement.animate({ transform: textPosition2}, 1000); // SET TEXT ANIMATION WITH DURATION IN MS
                
                // TRANSFORM CIRCLES
                if (texts1[i].getAttribute("class") == "has_circle") {
                    var circles1Class = "crcl" + texts1[i].id;
                    var circles1 = pic2.querySelectorAll('.' + circles1Class);
                    var circleX = pic1.querySelectorAll('.' + circles1Class)[0].getAttribute("origin_cx");
                    var circleY = pic1.querySelectorAll('.' + circles1Class)[0].getAttribute("origin_cy");
                    var circlePosition2 = pic1.querySelectorAll('.' + circles1Class)[0].parentNode.getAttribute("origin_transform");
                    for (var z = 0; z < circles1.length; z++) {
                        var circleID = "#" + circles1[z].id;
                        var circleGroup = s.select(circleID).parent();
                        circles1[z].style.transition = "0s";
                        circleGroup.animate({ transform: circlePosition2 }, 1000); // SET CIRCLE OUTTER <g> ANIMATION WITH DURATION IN MS
                        var circleOne = s.select(circleID);
                        circleOne.animate({ cx: circleX }, 1000);  // SET CIRCLE CX ANIMATION WITH DURATION IN MS
                        circleOne.animate({ cy: circleY }, 1000);  // SET CIRCLE CY ANIMATION WITH DURATION IN MS
                        circles1[z].style.opacity = "1";
                    }
                }
            }
        }
    }

    pic1.style.opacity = "1"; // FADE IN 1ST SVG
    pic1.style.transition = "1s"; // SET 1ST SVG FADE-IN ANIMATION DURATION
    pic1.style.transitionDelay = "1s"; // SET 1ST SVG FADE-IN ANIMATION DELAY
    pic2.style.opacity = "0";  // FADE OUT 2ND SVG
    pic2.style.transition = "1s"; // SET 2ND SVG FADE-OUT ANIMATION DURATION
    pic2.style.transitionDelay = "1s"; // SET 2ND SVG FADE-IN ANIMATION DELAY
    document.getElementById("control").disabled = true;
    document.getElementById("control").onclick = animateSVG; // SET FIRST ANIMATION EVENT TO CONTROL BUTTON
    setTimeout(function() { document.getElementById("control").disabled = false; }, 1000); // DISABLES BUTTON FOR INTERVAL IN MS

}