# Docker Setup for VisoCode

This project is now fully dockerized and ready to run in containers. Here are the different ways you can use Docker with this project.

## Quick Start

### Option 1: Using Docker Compose (Recommended)

The easiest way to run the application:

```bash
# Build and start the application
docker-compose up --build

# Or run in detached mode (background)
docker-compose up -d --build
```

The application will be available at `http://localhost:3000`

To stop the application:
```bash
docker-compose down
```

### Option 2: Using Docker directly

```bash
# Build the Docker image
docker build -t visocode-app .

# Run the container
docker run -p 3000:3000 visocode-app
```

## Development vs Production

### Production Build (Default)
The Dockerfile is optimized for production with:
- Multi-stage build for smaller image size
- Standalone Next.js output
- Non-root user for security
- Optimized layer caching

### Development Setup
For development with hot reload, you can modify the docker-compose.yml:

1. Uncomment the volumes section in docker-compose.yml
2. Change the build target or use a development-specific Dockerfile

```yaml
# Add this to the app service in docker-compose.yml
volumes:
  - .:/app
  - /app/node_modules
  - /app/.next
environment:
  - NODE_ENV=development
```

## Environment Variables

If your application uses environment variables:

1. Create a `.env.local` file with your variables
2. Uncomment the `env_file` section in docker-compose.yml
3. Or pass them directly in docker-compose.yml under `environment:`

```yaml
environment:
  - NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
  - NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

## Database Integration

If you need a local database (e.g., for Supabase local development):

1. Uncomment the `db` service in docker-compose.yml
2. Uncomment the `volumes` section at the bottom
3. Update your environment variables to point to the database

## Useful Commands

```bash
# Build without cache
docker-compose build --no-cache

# View logs
docker-compose logs -f app

# Execute commands inside the container
docker-compose exec app sh

# Remove all containers and volumes
docker-compose down -v

# Remove images
docker-compose down --rmi all
```

## Troubleshooting

### Port Already in Use
If port 3000 is already in use, change it in docker-compose.yml:
```yaml
ports:
  - "3001:3000"  # Use port 3001 instead
```

### Build Failures
- Make sure Docker has enough memory allocated (4GB+ recommended)
- Try building without cache: `docker-compose build --no-cache`
- Check that all files are properly copied (review .dockerignore)

### Permission Issues
The container runs as a non-root user for security. If you encounter permission issues with volumes, you may need to adjust file ownership.

## Image Size Optimization

The current Dockerfile uses several optimization techniques:
- Multi-stage builds to exclude development dependencies
- Alpine Linux base image for smaller size
- Next.js standalone output
- Proper layer caching

Final image size should be around 150-200MB depending on your dependencies.

## Security Notes

- The container runs as a non-root user (`nextjs`)
- Only necessary files are copied (controlled by .dockerignore)
- Production environment variables should be passed securely
- Consider using Docker secrets for sensitive data in production

## Deployment

This Docker setup is ready for deployment to:
- Docker Swarm
- Kubernetes
- Cloud platforms (AWS ECS, Google Cloud Run, etc.)
- VPS with Docker installed

For production deployment, make sure to:
1. Use proper environment variable management
2. Set up health checks
3. Configure proper logging
4. Use a reverse proxy (nginx) if needed
5. Set up SSL/TLS certificates
