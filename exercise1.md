# 11.1 Warming up — a team of six working on a Python web application

We are building a booking service in Python (FastAPI + SQLAlchemy + Postgres)
with a React frontend, and six of us work on it. Every pull request should go
through the same checks and the main branch should always be releasable.

**The tools for each step.** For *linting* we use `ruff` (fast, replaces
flake8, black and isort) together with `pre-commit`, so formatting problems are
caught before a commit is created. Mypy runs in strict mode on the backend and
TypeScript does the same job on the frontend. For *testing* we use `pytest`
with `httpx` for the async API tests, `hypothesis` for property based tests of
the booking logic, and Playwright for a few end-to-end tests. The *build*
produces a multi-stage Docker image: `poetry install` for the backend and
`npm ci && npm run build` for the frontend bundle. Packaging is therefore the
same `docker build`, and deployment is a `flyctl deploy` driven by the pipeline.

**Other options.** Besides Jenkins and GitHub Actions we could use GitLab CI/CD
or CircleCI, and for bigger setups Azure Pipelines, AWS CodePipeline, Buildkite
or Drone with self-hosted runners.

**Self-hosted or cloud-based?** Cloud-based. The deciding information is the
team size, the runtime of the pipeline and the required hardware. Six
developers with a ten-minute pipeline and no special hardware is exactly the
profile that makes GitHub Actions the cheapest and simplest choice: the
repository already lives there, so no extra account and no separate machine to
patch. A self-hosted runner only pays off when the build needs special
hardware, when the monthly minutes would exceed a dedicated machine, or when
the code cannot leave our network. None of that applies here.