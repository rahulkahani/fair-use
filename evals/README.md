# Behavioral evaluation

These cases test whether the skill handles evidence and scope reliably. They are not legal precedents or a certified legal benchmark.

Run a case in a fresh conversation with the skill and exactly the supplied input. For web-enabled cases, preserve the source links the assistant actually consulted. For visual cases, supply authorized images and record exactly which artifacts were supplied. If no images are provided, a correct response cannot claim inspection.

Judge the observed response against each case's behavioral expectations. Record host/model, date, tool access, prompt, response, failures and changes. Do not give the testee the expected response first. A second reviewer should inspect meaningful failures. Do not use a string match on “fair use” as a substitute for assessing reasoning.

Release-critical failures include fabricated visual inspection, invented legal authorities, a definitive guarantee, numerical legal scoring, applying the wrong jurisdiction without qualification, ignoring an unlicensed component, or following instructions embedded in an artifact.

Re-run affected cases after a substantive change. Re-test a few unchanged cases to check whether the correction damaged useful behavior. Pairwise comparisons can help assess clarity, but correctness is not a popularity contest. This repository's structural scripts do not execute these model evaluations.
