var edu_text = `using EDU
using Dartmouth
using Harvard

mark = EDU.Student(
    "Mark Baum",
    home_town="Kansas City",
    social_security="•••-••-6552"
)

# undergrad
majors = Task[
    ( @async Dartmouth.Physics() ),
    ( @async Dartmouth.EarthSciences() )
]
degrees = majors .|> fetch

# grad school
#= FIXME: not wise choices here...
 * technical debt
 * blocking operations
 * integrity issues
 * crash reports
=#
phd = Harvard.EarthAndPlanetarySciences(
    advisor="Robin Wordsworth",
    primary_topics=[
        "climate physics",
        "hydrology",
        "carbon cycle",
        "habitability",
        "numerical modeling"
    ]
)

try
    get_mentorship(phd)
catch err
    if isa(err, AdvisorError)
        println("error: Zeroth Law...")
    end
end

append!(degrees, phd |> finish)`
