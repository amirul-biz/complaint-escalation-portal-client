
(Project overview) 

 
This is a Complaint Management Portal built as part of a take-home assessment.
It allows authenticated users to create, view, search, edit, and escalate complaints.
The application follows a production-ready structure with modular code, proper error handling,
and optional testing.

(Business logic)

1. Escalation Rule — A complaint is auto-escalated if:
  o priority === HIGH and
  o status === NEW after 3 working days (exclude Saturdays and Sundays)
  from createdAt.

2. Rate Limit — A customer can submit max 5 complaints per rolling week (7
  calendar days). If exceeded, the API returns HTTP 429 with message: "Rate limit
  exceeded: max 5 complaints per customer per week".

4. Auto-High Priority — If title contains the word "urgent" (case-insensitive), server
  sets priority = HIGH regardless of the request body.

6. Validation —
  o title minimum length: 10 characters
  o description minimum length: 30 characters
```
src/
├── app/
│   ├── auth/                  # All authentication components
│   │   ├── auth-login-component/  # Login page
│   │   └── guards/            # Route protection
│   ├── complaint/             # Complaint features
│   │   ├── complaint-component/       # Main complaint layout
│   │   ├── complaint-listing-component/ # Complaint list
│   │   ├── complaint-add-edit-component/ # Add/edit forms
│   │   └── complaint-form/    # Shared form component
│   ├── interfaces/            # Type definitions
│   ├── enums/                 # Constant values
│   └── services/              # API services
```

- Login/logout functions
- JWT token handling
- Route protection with `AuthGuard`

* View complaint list with pagination
* Add new complaints
* Edit existing complaints
* Search and filter complaints

```typescript
const routes: Routes = [
  { path: '', component: ComponentAuthLogin },
  {
    path: 'complaint',
    canActivate: [AuthGuard], // Protected route
    children: [
      { path: ':pageMode', component: ComplaintAddComponent },
      { path: ':pageMode/:complaintId', component: ComplaintAddComponent },
      { path: '', component: ComplaintListingComponent }
    ]
  }
];
```

Handles:

- User login/logout
- Token storage
- Token refresh
- Session check

* Adds token to API requests
* Handles 401 errors (auto token refresh)
* Manages 403 errors (force logout)

**Complaint Listing**

- Shows all complaints in table
- Pagination support
- Search and filter functions

**Add/Edit Complaint**

- Form validation (`title min 10 chars`, `description min 30 chars`)
- Priority selection (LOW, MEDIUM, HIGH)
- Status update for existing complaints

1. User opens app → Checks login status
2. If not logged in → Redirect to login page
3. After login → Goes to complaint list
4. User can:
   - View complaints
   - Add new complaint
   - Edit existing complaint

**All API calls protected with token**

- **Form Validation**

  - Title: at least 10 characters
  - Description: at least 30 characters
  - Required fields marked with `*`

- **Auto Priority**

  - Title containing `"urgent"` → priority auto-set to HIGH

- **Error Handling**

  - Shows error messages in alert
  - Handles token expiration automatically

- **UI Features**

  - Pagination
  - Sorting
  - Status badges (color-coded)
  - Priority badges (color-coded)

* `AuthService` - handles all authentication
* `ComplaintService` - handles complaint API calls
* `AuthInterceptor` - manages API request headers

**Best Practices Followed**

- Clear component separation
- Shared services
- Route protection
- Robust error handling


