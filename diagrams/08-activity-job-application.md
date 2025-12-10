# Job Application Activity Diagram

**Generated**: 2025-12-09T23:43:03.766Z
**Description**: Complete workflow for students applying to job postings

## Diagram

```mermaid
flowchart TD
    Start([Student Views Job Board]) --> Browse[Browse Available Jobs]
    Browse --> Filter{Apply Filters?}
    Filter -->|Yes| ApplyFilter[Filter by Skills/Location/Type]
    Filter -->|No| ViewJobs[View Job Listings]
    ApplyFilter --> ViewJobs
    ViewJobs --> SelectJob[Select Job to View Details]
    SelectJob --> CheckAuth{Authenticated?}
    CheckAuth -->|No| Login[Redirect to Login]
    Login --> SelectJob
    CheckAuth -->|Yes| ViewDetails[View Job Details]
    ViewDetails --> CheckApplied{Already Applied?}
    CheckApplied -->|Yes| ShowStatus[Show Application Status]
    ShowStatus --> End([End])
    CheckApplied -->|No| ClickApply[Click Apply Button]
    ClickApply --> SubmitApp[Submit Application]
    SubmitApp --> UpdateDB[(Update Database)]
    UpdateDB --> NotifyAlumni[Notify Job Poster]
    NotifyAlumni --> ShowConfirm[Show Confirmation]
    ShowConfirm --> End
```

## Legend

- Rounded rectangles represent start/end
- Rectangles represent activities
- Diamonds represent decision points
- Cylinder represents database operations

## Notes

Students must be authenticated to apply. Duplicate applications are prevented.
