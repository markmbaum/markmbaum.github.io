// draws a time interval for timeout that is equal to `t` on average but distributed uniformly around that value
function randomInterval (t) {
    return( t*2*Math.random() );
}

// draws true/false with probability `p`
function bernoulli (p) {
    return( (Math.random() < p) ? true : false );
}

/**
 * selects a waiting/timeout interval for the type writer animation based on which character was just "typed"
 * new lines are given a longer wait time
 * spaces a moderate wait time
 * and all other characters a relatively short wait time
*/
function selectTime(char) {
    t = 0;
    if (char == "\n") {
        t += randomInterval(100);
        if (bernoulli(0.02)) t += 1000;
    } else if (char == " ") {
        t += randomInterval(50);
        if (bernoulli(0.02)) t += 250;
    } else {
        t += randomInterval(15);
    }
    return(t);
}

// applies syntax highlighting to python text/code using the hljs package
function highlightPython (s) {
    return hljs.highlight(s, {language: "python"}).value;
}

// applies syntax highlighting to julia text/code using the hljs package
function highlightJulia (s) {
    return hljs.highlight(s, {language: "julia"}).value;
}

function typeWriter (target, content, highlightFunc, fastforward, finalFunc, index = 0) {
    /**
     * if the fast forward button is clicked, it has been toggled to hidden
     * recursion is stopped and final animation proceeeds
    */
    var fastforwarded = fastforward.css("visibility") == "hidden";
    // when the animation starts, fade in the fast forward button and set up it's behavior on click
    if (index == 0) {
        // fade in the fast forward button slightly after the typewriter starts
        setTimeout(
            function () {
                fastforward.animate({
                    "opacity": "0.75"
                });
            },
            3000 // probably should be longer
        );
        // when fast forward is clicked, trigger several changes
        fastforward.one("click", function () {
            // change the icon to a checkmark
            fastforward.children().attr("src", "img/icons/checkmark.png");
            var fadespeed = 500;
            // fade the button out then
            fastforward.fadeOut(fadespeed);
            setTimeout(
                function () {
                    fastforward.css("visibility", "hidden");
                },
                fadespeed
            )
        });
    }
    // the content isn't fully printed yet, recursively add characters
    if (index <= content.length & !fastforwarded) {
        // get the next character
        var char = content.charAt(index);
        // only trigger syntax highlighting after individual words are fully typed
        if (char == ' ' || char == '\n') {
            target.innerHTML = highlightFunc(content.slice(0,index+1));
        } else {
            target.innerHTML += content.charAt(index);
        }
        // move on to the next character with incremented index
        setTimeout(
            typeWriter,
            selectTime(char),
            target,
            content,
            highlightFunc,
            fastforward,
            finalFunc,
            index + 1,
        );
    // the animation is finished
    } else {
        // hide the fast forward button (might already be hidden)
        if (!fastforwarded) {
            fastforward.fadeOut(250);
        }
        // fill in and highlight the whole block of text
        target.innerHTML = highlightFunc(content);
        // execute final sequence of animations
        finalFunc();
    }
}

// removes the extension from a file name string
function stripExtension(element) {
    html = element.innerHTML;
    idx = html.indexOf('.');
    element.innerHTML = html.slice(0,idx) + '/';
}

// adds typewriter animation sequence to the elements inside an accordion block
function scriptColumns (button, script, right, left, text, highlighter, label, fastforward, endFunc = function () {}) {
    button.one("click", function () {
        typeWriter(
            script,
            text,
            highlighter,
            fastforward,
            function () {
                setTimeout(
                    function () {
                        right.slideDown(500)
                    },
                    250
                );
                setTimeout(
                    function () {
                        stripExtension(label.children[0])
                    },
                    250
                );
                setTimeout(
                    function () {
                        left.hide(500);
                    },
                    10000
                );
                setTimeout(
                    function () {
                        right.animate({width: "100%"}, 500)
                    },
                    10000
                );
                endFunc();
            }
        );
    });
}