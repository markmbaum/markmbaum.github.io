var code_text = `using GitHub
using PrettyPrint: pprint, Card

GitHub.request(
    [
        "orthopoly",
        "BasicInterpolators.jl",
        "libode",
        "GEOCLIM.jl"
    ],
    username="markmbaum",
    badges=[:downloads]
) .|> Card .|> pprint

GitHub.request(
    [
        "Richards",
        ""
    ],
    username="markmbaum"
) .|> Card .|> pprint`