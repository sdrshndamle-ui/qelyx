# Fullstack Project Cursor Rules

## Project Architecture

### Stack
- **Frontend**: React 18+ with JavaScript, Tailwind CSS
- **Backend**: Flask (Python 3.9+)
- **Database**: PostgreSQL 14+
- **API**: RESTful architecture

### Project Structure
```
project-root/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── contexts/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── tailwind.config.js
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── config.py
│   ├── migrations/
│   ├── requirements.txt
│   └── run.py
└── README.md
```

## Frontend Guidelines (React + Tailwind + JavaScript)

### Component Architecture
- Use functional components with hooks exclusively
- Follow component composition pattern - break down complex UIs into smaller reusable components
- One component per file, named in PascalCase matching the filename
- Component file structure: `ComponentName.jsx`

### Component Template
```jsx
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ComponentName = ({ prop1, prop2 }) => {
  const [state, setState] = useState(initialValue);

  useEffect(() => {
    // Side effects here
  }, [dependencies]);

  const handleEvent = () => {
    // Event handler logic
  };

  return (
    <div className="container mx-auto p-4">
      {/* Component JSX */}
    </div>
  );
};

ComponentName.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.number,
};

export default ComponentName;
```

### React Best Practices
- Use PropTypes for all components to validate props
- Implement error boundaries for production-level error handling
- Use custom hooks for reusable stateful logic (prefix with `use`)
- Keep components focused on single responsibility
- Lift state up when multiple components need the same data
- Use React Context API for global state (auth, theme, user data)
- Memoize expensive calculations with `useMemo`
- Memoize callbacks passed to child components with `useCallback`
- Use `React.lazy()` and `Suspense` for code splitting on routes

### State Management
- Local state: `useState` for component-specific data
- Side effects: `useEffect` with proper cleanup
- Global state: React Context API for app-wide state
- Form state: Controlled components with validation
- Async state: Handle loading, error, and success states explicitly

### Tailwind CSS Guidelines
- Use Tailwind utility classes exclusively, avoid custom CSS
- Follow mobile-first responsive design: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`
- Use Tailwind's spacing scale consistently (p-4, m-2, gap-6, etc.)
- Leverage Tailwind's color palette with opacity: `bg-blue-500/75`
- Use Tailwind's flexbox and grid utilities for layouts
- Apply dark mode with `dark:` prefix when implementing theme switching
- Extract repeated patterns into component classes in `tailwind.config.js` if needed
- Common patterns:
  - Cards: `bg-white rounded-lg shadow-md p-6`
  - Buttons: `px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition`
  - Inputs: `w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`

### API Communication
- Create API service layer in `src/services/api.js`
- Use `fetch` API or axios for HTTP requests
- Implement centralized error handling and request/response interceptors
- Store base URL in environment variables (`.env.local`)
- Always handle loading and error states in components

### API Service Template
```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }
  return response.json();
};

export const api = {
  get: async (endpoint) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return handleResponse(response);
  },
  
  post: async (endpoint, data) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },
  
  // Add put, patch, delete methods similarly
};
```

### Routing
- Use React Router v6 for client-side routing
- Define routes in a centralized location (`App.jsx` or `routes.jsx`)
- Implement protected routes with authentication checks
- Use lazy loading for route-based code splitting

### Environment Variables
- Prefix all variables with `VITE_` (e.g., `VITE_API_URL`)
- Never commit `.env.local` files
- Provide `.env.example` with dummy values

### Frontend Testing
- Write tests for critical user flows
- Test API service functions with mocked responses
- Use React Testing Library for component tests
- Test user interactions, not implementation details

## Backend Guidelines (Flask + PostgreSQL)

### Flask Application Structure
- Use Flask application factory pattern
- Organize code into blueprints by feature/domain
- Keep business logic in service layer, not in routes
- Use Flask-CORS for handling CORS
- Implement Flask-Migrate for database migrations

### Flask App Factory Pattern
```python
# app/__init__.py
from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

db = SQLAlchemy()
migrate = Migrate()

def create_app(config_name='development'):
    app = Flask(__name__)
    app.config.from_object(f'app.config.{config_name.capitalize()}Config')
    
    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    CORS(app)
    
    # Register blueprints
    from app.routes.users import users_bp
    from app.routes.auth import auth_bp
    
    app.register_blueprint(users_bp, url_prefix='/api/users')
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    
    return app
```

### Configuration Management
```python
# app/config.py
import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-secret-key')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
class DevelopmentConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = os.getenv('DEV_DATABASE_URL')
    
class ProductionConfig(Config):
    DEBUG = False
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')
    
class TestingConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = os.getenv('TEST_DATABASE_URL')
```

### Database Models (SQLAlchemy)
- Define models in `app/models/` directory
- Use clear, descriptive table and column names (snake_case)
- Always include `id`, `created_at`, and `updated_at` fields
- Define relationships explicitly with `relationship()` and `backref`
- Add `__repr__` method for better debugging
- Use mixins for common fields (timestamps, soft deletes)

### Model Template
```python
# app/models/user.py
from app import db
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    username = db.Column(db.String(80), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(255), nullable=False)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    posts = db.relationship('Post', backref='author', lazy='dynamic', cascade='all, delete-orphan')
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'username': self.username,
            'is_active': self.is_active,
            'created_at': self.created_at.isoformat(),
        }
    
    def __repr__(self):
        return f'<User {self.username}>'
```

### Route/Controller Guidelines
- Keep routes thin - delegate logic to service layer
- Use blueprints to organize related routes
- Return consistent JSON responses with proper HTTP status codes
- Implement proper error handling with try-except blocks
- Validate input data before processing
- Use decorators for authentication/authorization checks

### Route Template
```python
# app/routes/users.py
from flask import Blueprint, request, jsonify
from app.services.user_service import UserService
from app.utils.decorators import token_required
from app.utils.validators import validate_user_input

users_bp = Blueprint('users', __name__)

@users_bp.route('', methods=['GET'])
@token_required
def get_users(current_user):
    try:
        users = UserService.get_all_users()
        return jsonify({'users': users}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@users_bp.route('/<int:user_id>', methods=['GET'])
@token_required
def get_user(current_user, user_id):
    try:
        user = UserService.get_user_by_id(user_id)
        if not user:
            return jsonify({'error': 'User not found'}), 404
        return jsonify({'user': user}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@users_bp.route('', methods=['POST'])
def create_user():
    try:
        data = request.get_json()
        errors = validate_user_input(data)
        if errors:
            return jsonify({'errors': errors}), 400
        
        user = UserService.create_user(data)
        return jsonify({'user': user, 'message': 'User created successfully'}), 201
    except ValueError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500
```

### Service Layer Pattern
- Business logic goes in service classes
- Services interact with models and perform operations
- Keep services focused on single responsibility
- Services should raise exceptions for error cases, routes handle HTTP responses

### Service Template
```python
# app/services/user_service.py
from app import db
from app.models.user import User

class UserService:
    @staticmethod
    def get_all_users():
        users = User.query.filter_by(is_active=True).all()
        return [user.to_dict() for user in users]
    
    @staticmethod
    def get_user_by_id(user_id):
        user = User.query.get(user_id)
        return user.to_dict() if user else None
    
    @staticmethod
    def create_user(data):
        if User.query.filter_by(email=data['email']).first():
            raise ValueError('Email already exists')
        
        user = User(
            email=data['email'],
            username=data['username']
        )
        user.set_password(data['password'])
        
        db.session.add(user)
        db.session.commit()
        
        return user.to_dict()
    
    @staticmethod
    def update_user(user_id, data):
        user = User.query.get(user_id)
        if not user:
            raise ValueError('User not found')
        
        for key, value in data.items():
            if hasattr(user, key) and key != 'password':
                setattr(user, key, value)
        
        db.session.commit()
        return user.to_dict()
    
    @staticmethod
    def delete_user(user_id):
        user = User.query.get(user_id)
        if not user:
            raise ValueError('User not found')
        
        db.session.delete(user)
        db.session.commit()
```

### Authentication & Authorization
- Use JWT tokens for stateless authentication
- Store tokens in httpOnly cookies or localStorage (frontend)
- Implement token refresh mechanism
- Create decorator for protected routes
- Hash passwords with werkzeug.security or bcrypt

### JWT Authentication Template
```python
# app/utils/decorators.py
from functools import wraps
from flask import request, jsonify
import jwt
from app.config import Config
from app.models.user import User

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        
        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split(' ')[1]
        
        if not token:
            return jsonify({'error': 'Token is missing'}), 401
        
        try:
            data = jwt.decode(token, Config.SECRET_KEY, algorithms=['HS256'])
            current_user = User.query.get(data['user_id'])
            if not current_user:
                return jsonify({'error': 'Invalid token'}), 401
        except jwt.ExpiredSignatureError:
            return jsonify({'error': 'Token has expired'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'error': 'Invalid token'}), 401
        
        return f(current_user, *args, **kwargs)
    
    return decorated
```

### Input Validation
- Validate all incoming data before processing
- Create reusable validator functions
- Return clear, specific error messages
- Use libraries like marshmallow for complex validation

### Error Handling
- Implement global error handlers
- Return consistent error response format
- Log errors appropriately
- Never expose sensitive information in error messages

### Error Handler Template
```python
# app/__init__.py (add to create_app function)
@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Resource not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    db.session.rollback()
    return jsonify({'error': 'Internal server error'}), 500

@app.errorhandler(Exception)
def handle_exception(error):
    db.session.rollback()
    app.logger.error(f'Unhandled exception: {str(error)}')
    return jsonify({'error': 'An unexpected error occurred'}), 500
```

### Database Migrations
- Use Flask-Migrate for all schema changes
- Never modify database directly in production
- Write descriptive migration messages
- Test migrations on development database first
- Keep migrations in version control

### Migration Commands
```bash
# Initialize migrations (first time only)
flask db init

# Create a new migration
flask db migrate -m "Add users table"

# Apply migrations
flask db upgrade

# Rollback migrations
flask db downgrade
```

## API Design Standards

### RESTful Conventions
- Use plural nouns for resource names: `/api/users`, `/api/posts`
- Use HTTP methods correctly:
  - GET: Retrieve resources
  - POST: Create new resources
  - PUT: Update entire resource
  - PATCH: Partial update
  - DELETE: Remove resource
- Use proper HTTP status codes:
  - 200: Success
  - 201: Created
  - 204: No Content
  - 400: Bad Request
  - 401: Unauthorized
  - 403: Forbidden
  - 404: Not Found
  - 500: Internal Server Error

### Response Format
```json
{
  "data": {},
  "message": "Success message",
  "errors": [],
  "meta": {
    "page": 1,
    "total": 100
  }
}
```

### Pagination
- Implement pagination for list endpoints
- Use query parameters: `?page=1&per_page=20`
- Return pagination metadata in response

### API Versioning
- Version APIs in URL: `/api/v1/users`
- Maintain backward compatibility when possible

## Environment Configuration

### Backend (.env)
```
FLASK_APP=run.py
FLASK_ENV=development
SECRET_KEY=your-secret-key-here
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
JWT_SECRET_KEY=your-jwt-secret
JWT_ACCESS_TOKEN_EXPIRES=3600
```

### Frontend (.env.local)
```
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=My App
```

## Development Workflow

### Setup Process
1. Clone repository
2. Install backend dependencies: `pip install -r requirements.txt`
3. Install frontend dependencies: `npm install`
4. Create PostgreSQL database
5. Copy `.env.example` to `.env` and configure
6. Run migrations: `flask db upgrade`
7. Start backend: `flask run`
8. Start frontend: `npm run dev`

### Git Workflow
- Use feature branches: `feature/user-authentication`
- Write descriptive commit messages
- Keep commits atomic and focused
- Use pull requests for code review

### Code Quality
- Follow PEP 8 for Python code
- Use ESLint and Prettier for JavaScript/React
- Write meaningful comments for complex logic
- Keep functions small and focused
- Use descriptive variable and function names

## Security Best Practices

### General
- Never commit sensitive data (API keys, passwords)
- Use environment variables for configuration
- Implement rate limiting on API endpoints
- Validate and sanitize all user input
- Use HTTPS in production

### Backend Security
- Use parameterized queries to prevent SQL injection
- Implement CORS properly
- Hash passwords before storing
- Use secure session management
- Implement CSRF protection for state-changing operations

### Frontend Security
- Sanitize user input before rendering
- Implement proper authentication checks
- Don't store sensitive data in localStorage
- Use Content Security Policy headers

## Performance Optimization

### Frontend
- Lazy load routes and components
- Optimize images (use WebP, proper sizing)
- Minimize bundle size with code splitting
- Use React.memo for expensive components
- Implement virtual scrolling for long lists

### Backend
- Use database indexes on frequently queried columns
- Implement caching for expensive operations
- Use connection pooling for database
- Optimize database queries (avoid N+1 problems)
- Implement pagination for large datasets

### Database
- Create indexes on foreign keys and frequently queried columns
- Use database-level constraints
- Normalize data appropriately
- Use connection pooling

## Testing Strategy

### Frontend Testing
- Unit tests for utility functions and hooks
- Component tests for UI components
- Integration tests for user flows
- Test API integration with mocked responses

### Backend Testing
- Unit tests for service layer
- Integration tests for API endpoints
- Test database operations with test database
- Mock external services

## Deployment Considerations

### Frontend
- Build optimized production bundle: `npm run build`
- Deploy to Vercel, Netlify, or similar
- Configure environment variables in hosting platform
- Set up CI/CD pipeline

### Backend
- Use production-grade WSGI server (Gunicorn)
- Configure PostgreSQL for production
- Set up database backups
- Use environment-specific configuration
- Implement logging and monitoring
- Set up SSL certificates

### Database
- Regular backups
- Use connection pooling
- Monitor query performance
- Set up replication for high availability

## Documentation Requirements

- Maintain README with setup instructions
- Document API endpoints (consider using Swagger/OpenAPI)
- Comment complex business logic
- Keep environment variable examples updated
- Document deployment process

## Monitoring & Logging

### Backend
- Use Flask logging
- Log errors with stack traces
- Monitor API response times
- Track database query performance

### Frontend
- Implement error boundaries
- Use error tracking service (Sentry)
- Monitor bundle size
- Track user interactions for UX improvements