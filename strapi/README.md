# EMC Strapi CMS

Headless CMS for the EMC website with PostgreSQL database.

## Quick Start with Docker

### 1. Start the CMS

From the project root:

```bash
# Copy environment file
cp .env.example .env

# Start Strapi with PostgreSQL
docker-compose up -d

# Watch logs
docker-compose logs -f strapi
```

Strapi will be available at: http://localhost:1337

### 2. Create Admin User

1. Open http://localhost:1337/admin
2. Create your first admin account
3. The database will be automatically seeded with initial data

### 3. Configure API Permissions

1. Go to **Settings > Roles > Public**
2. Enable `find` and `findOne` for:
   - Product
   - Service
   - About
   - Contact

### 4. Generate API Token

1. Go to **Settings > API Tokens**
2. Click "Create new API Token"
3. Name: `NextJS Frontend`
4. Token type: `Read-only`
5. Copy the token to your `.env.local`:

```env
STRAPI_API_TOKEN=your-token-here
```

## Auto-Seeding

The database is automatically seeded on first boot when `SEED_DB=true` is set.

To re-seed manually:

```bash
# Connect to Strapi container
docker-compose exec strapi npm run seed
```

## Content Types

### Product (Collection)
| Field | Type | Description |
|-------|------|-------------|
| name | String | Stone name (required) |
| slug | UID | URL-friendly identifier |
| type | Enum | marble, granite, other |
| category | String | Sub-category |
| description | Text | Product description |
| image | Media | Main product image |
| gallery | Media[] | Additional images |
| color | String | Hex color code |
| specifications | JSON | {origin, finish, thickness} |
| order | Integer | Display order |

### Service (Collection)
| Field | Type | Description |
|-------|------|-------------|
| title | String | Service name (required) |
| description | Text | Service description |
| icon | String | Icon identifier |
| order | Integer | Display order |

### About (Single Type)
| Field | Type | Description |
|-------|------|-------------|
| title | String | Section title |
| subtitle | String | Section subtitle |
| description | RichText | Company description |
| stats | JSON | [{value, label}] |
| images | Media[] | About section images |
| mission | Text | Mission statement |
| vision | Text | Vision statement |

### Contact (Single Type)
| Field | Type | Description |
|-------|------|-------------|
| location | String | City/Country |
| address | Text | Full address |
| phone | String | Phone number |
| email | Email | Email address |
| linkedin | String | LinkedIn URL |
| instagram | String | Instagram URL |
| facebook | String | Facebook URL |
| whatsapp | String | WhatsApp number |
| mapUrl | String | Google Maps embed URL |

## Docker Commands

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f strapi

# Rebuild after changes
docker-compose up -d --build

# Access database (optional pgAdmin)
docker-compose --profile tools up -d
# Then visit http://localhost:5050
```

## Development without Docker

```bash
# Install dependencies
cd strapi
npm install

# Copy env file
cp .env.example .env

# Start Strapi (uses SQLite by default)
npm run develop
```

## API Endpoints

| Endpoint | Description |
|----------|-------------|
| GET /api/products | List all products |
| GET /api/products/:id | Get single product |
| GET /api/services | List all services |
| GET /api/about | Get about content |
| GET /api/contact | Get contact info |

All endpoints support `?populate=*` for including relations.

## i18n Support

The CMS supports English and Arabic locales. To fetch localized content:

```
GET /api/products?locale=ar
GET /api/about?locale=ar
```

## Troubleshooting

### Database connection failed
```bash
# Ensure PostgreSQL is healthy
docker-compose ps
docker-compose logs postgres
```

### Permission denied errors
```bash
# Reset permissions
docker-compose down -v
docker-compose up -d
```

### Content not appearing
1. Check content is published (not draft)
2. Verify Public role permissions
3. Check API token is valid
