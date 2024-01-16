// right columns of the code animation blocks are initially hidden
$(".right-column").hide(0);

// fast forward buttons in the typewriter elements are dimmed to zero, but *not* hidden
$(".fast-forward").css("opacity", "0");

// cards in the accordion blocks glow a bit on hover
$(".card").hover(
    function () {
        $(this).find(".card-text").css("text-decoration", "underline");
    },
    function () {
        $(this).find(".card-text").css("text-decoration", "none");
    }
    );

    // add the typewriter animation sequence to the "research" block
    scriptColumns(
        $("#research-button"),
        document.getElementById("research-script"),
        $("#research-right"),
        $("#research-left"),
        research_text,
        highlightPython,
        document.getElementById('research-button'),
        $("#research-fast-forward")
        )

        // add the typewriter animation sequence to the "edu" block
        scriptColumns(
            $("#edu-button"),
            document.getElementById("edu-script"),
            $("#edu-right"),
            $("#edu-left"),
            edu_text,
            highlightJulia,
            document.getElementById('edu-button'),
            $("#edu-fast-forward"),
            function () {
                setTimeout(
                    function () {$("#advisor-error").hide(500)},
                    8000
                    );
                }
                );
