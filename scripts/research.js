var research_text = `from academia import PublicationList
from DOI.api import fetch_citation
from itertools import chain

pubs = PublicationList(
    researcher='Mark Baum',
    orcid=[0, 1, 8832, 4963],
    published=True,
    perished=True
)

mars_papers = map(
    fetch_citation,
    [
        '10.1029/2020JE006397',
        '10.1038/s41561-021-00701-8',
        '10.3847/PSJ/ac01de',
        '10.1016/j.icarus.2022.115178'
    ]
)

earth_papers = map(
    fetch_citation,
    [
        '10.1344/GeologicaActa2021.19.10',
        '10.1029/2022GL098843',
        '10.1029/2022GC010611',
        '10.1002/2017JD027539'
    ]
)

for citation in chain(mars_papers, earth_papers):
    pubs.append_citation(citation)

pubs.sort(
    by=[
        'first-author',
        'date'
    ],
    inplace=True
)
pubs.pretty_print(links=True)`;