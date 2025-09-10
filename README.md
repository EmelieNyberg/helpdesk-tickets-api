# Project Helpdesk Tickets API



## The problem



### Approach and Tools:

- **Technologies:**
- Backend Framework: Express.js to manage API routes and middleware.
- Database: MongoDB with Mongoose for data modeling and validation.
- Deployment: Deployed the API on Render to make it accessible for frontend integration.
- Validation: Used Mongoose schema validation and manual checks to ensure user input met all requirements.

### Key Steps:

- **Thought Model:**
Defined a Mongoose schema with properties:
- message (required, 5-140 characters).
- hearts (default to 0, unassignable during creation).
- createdAt (default to current timestamp, unassignable during creation).
Endpoints:
- GET /thoughts: Returned up to 20 recent thoughts, sorted by creation date.
- POST /thoughts: Allowed new thoughts to be submitted, with proper validation and error handling.
- POST /thoughts/:thoughtId/like: Incremented the hearts property for a specific thought.
Validation and Error Handling:
- Ensured invalid input resulted in clear error messages and a 400 Bad Request status.
- Checked for non-existent thought IDs in the POST /thoughts/:thoughtId/like endpoint.
Frontend Integration:
- Updated the React app to use the new API by replacing the Technigo URL with the deployed API URL.

## View it live

Frontend Netlify: 
Frontend GitHub: 
Backend Render:
